import { connectToParent, AsyncMethodReturns } from 'penpal';
import { create as createStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser as ProseMirrorDOMParser, Node as ProseMirrorNode } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';
import { baseKeymap } from 'prosemirror-commands';

// Types
interface EditorMethods {
  closeRTE?: (args: {
    editable: EditableInfo;
    isModified: boolean;
    newContent: {
      html: string;
      text: string;
    };
  }) => void;
  getRTEStylesheet?: () => Promise<string>;
  trackCorsVersion?: (args: { version: string }) => void;
}

interface EditableInfo {
  selector: string;
  copyInfo?: {
    copyIndex: number;
  };
}

interface RTEConfig {
  selector?: string;
  toolbar?: string;
  useProse?: boolean;
  target?: HTMLElement;
  setup?: (editor: any) => void;
  [key: string]: any;
}

interface EditorStore {
  mode: string;
  isInEditor: boolean;
  prefix: string | null;
  editor: EditorMethods | null;
  setMode: (args: { mode: string }) => void;
  setPrefix: (prefix: string) => void;
  setEditor: (editor: EditorMethods) => void;
}

interface ContentMoveEvent extends CustomEvent {
  detail: {
    component: string;
    before: string;
    from: string;
    to: string;
  };
}

interface ContentPatchEvent extends CustomEvent {
  detail: {
    request: {
      target: {
        resource: string;
      };
    };
    patch: {
      name: string;
      value: string;
    };
  };
}

interface ContentCopyEvent extends CustomEvent {
  detail: {
    source: {
      container: string;
    };
    target: {
      container: string;
      before: string;
      newName: string;
    };
    response: {
      resource: string;
    };
  };
}

// Constants
const EditorMode = {
  EDIT: 'edit',
  PREVIEW: 'preview'
} as const;

const ContentType = {
  TEXT: 'text',
  MEDIA: 'media',
  RICHTEXT: 'richtext',
  REFERENCE: 'reference',
  CONTAINER: 'container',
  COMPONENT: 'component'
} as const;

const AttributeNames = Object.freeze({
  UUID: 'id',
  RESOURCE: 'resource',
  TYPE: 'type',
  PROP: 'prop',
  PARENTID: 'parentid',
  BEHAVIOR: 'behavior',
  LABEL: 'label',
  MODEL: 'model',
  FILTER: 'filter',
  COMPONENT: 'component'
});

const Events = {
  EVENT_APP_INITIALIZED: 'aue:initialized',
  EVENT_CONTENT_ADD: 'aue:content-add',
  EVENT_CONTENT_REMOVE: 'aue:content-remove',
  EVENT_CONTENT_MOVE: 'aue:content-move',
  EVENT_CONTENT_PATCH: 'aue:content-patch',
  EVENT_CONTENT_UPDATE: 'aue:content-update',
  EVENT_CONTENT_COPY: 'aue:content-copy',
  EVENT_UI_EDIT: 'aue:ui-edit',
  EVENT_UI_PREVIEW: 'aue:ui-preview',
  EVENT_UI_SELECT: 'aue:ui-select',
  META_NAMESPACE: 'meta[name="urn:adobe:aue:system:namespace"]',
  DEFAULT_PREFIX: 'data-aue-',
  RTE_URL: 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js'
} as const;

// State Management
const useEditorStore = createStore<EditorStore>()(
  subscribeWithSelector((set, get) => ({
    mode: EditorMode.PREVIEW,
    isInEditor: false,
    prefix: null,
    editor: null,

    setMode: ({ mode }: { mode: string }) => {
      set((state) => {
        const isInEditor = mode === EditorMode.EDIT || mode === EditorMode.PREVIEW;
        return { ...state, mode, isInEditor };
      });
    },

    setPrefix: (prefix: string) => {
      set((state) => ({ ...state, prefix }));
    },

    setEditor: (editor: EditorMethods) => {
      set((state) => ({ ...state, editor }));
    }
  }))
);

// ProseMirror Schema
const editorSchema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, 'paragraph block*', 'block'),
  marks: basicSchema.spec.marks
});

// Editor View Cache
const editorViewCache = new Map<string, EditorView>();

// ProseMirror Editor Creation
function createProseMirrorEditor(target: HTMLElement, content: string | null, editable: EditableInfo): EditorView {
  const htmlContent = content || target.innerHTML || '';
  const parser = ProseMirrorDOMParser.fromSchema(editorSchema);
  
  // Create a temporary container to parse HTML
  const temp = document.createElement('div');
  temp.innerHTML = htmlContent;
  const doc = parser.parse(temp);

  const state = EditorState.create({
    doc,
    plugins: [
      history(),
      keymap(baseKeymap)
    ]
  });

  const view = new EditorView(target, {
    state,
    editable: () => true,
    handleDOMEvents: {
      keyup: (view: EditorView, event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          (view.dom as HTMLElement).blur();
        }
        return false;
      },
      blur: (view: EditorView, event: FocusEvent) => {
        const relatedTarget = event.relatedTarget as HTMLElement | null;
        if (relatedTarget && relatedTarget.closest('#universal-editor-toolbar')) {
          return false;
        }

        view.setProps({
          ...view.props,
          editable: () => false
        });

        const { editor } = useEditorStore.getState();
        const targetElement = event.target as HTMLElement;
        const newHTML = targetElement.innerHTML || '';
        const newText = targetElement.textContent || '';

        if (editor?.closeRTE) {
          editor.closeRTE({
            editable,
            isModified: htmlContent !== newHTML,
            newContent: {
              html: newHTML,
              text: newText
            }
          });
        }
        return false;
      },
      navigate: (view: EditorView, event: Event) => {
        if (view.props.editable) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
        return false;
      }
    }
  });

  return view;
}

// TinyMCE Editor Initialization
function initializeTinyMCE({ editable, config }: { editable: EditableInfo; config: RTEConfig }, retryCount: number = 0): void {
  if (!(window as any).tinymce) {
    if (retryCount < 3) {
      setTimeout(() => initializeTinyMCE({ editable, config }, retryCount + 1), 100);
    }
    return;
  }

  delete config?.selector;

  const copyIndex = editable.copyInfo?.copyIndex;
  const targetElement = copyIndex
    ? document.querySelectorAll(editable.selector)[copyIndex] as HTMLElement
    : document.querySelector(editable.selector) as HTMLElement;

  if (!targetElement) return;

  if (!config.toolbar || config.useProse) {
    // Use ProseMirror
    const view = createProseMirrorEditor(targetElement, null, editable);
    (window as any).view = view;
    view.focus();
  } else {
    // Use TinyMCE
    (window as any).tinymce.init({
      ...config,
      target: targetElement,
      setup: (editor: any) => {
        editor.on('init', () => {
          (window as any).tinymce.activeEditor.focus(false);
          (window as any).navigation?.addEventListener('navigate', (e: Event) => e.preventDefault());
        });

        editor.on('keyup', (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            (event.target as HTMLElement).blur();
          }
        });

        editor.on('blur', (event: any) => {
          const { editor: storeEditor } = useEditorStore.getState();
          const { bodyElement, startContent } = event.target;
          const newContent = (window as any).tinymce.activeEditor.getContent();

          if (storeEditor?.closeRTE) {
            storeEditor.closeRTE({
              editable,
              isModified: startContent !== newContent,
              newContent: {
                html: newContent,
                text: bodyElement.textContent || ''
              }
            });
          }

          event.preventDefault();
          event.stopImmediatePropagation();
          editor.remove();
          (window as any).navigation?.removeEventListener('navigate', (e: Event) => e.preventDefault());
        });
      }
    });
  }
}

// Event Utilities
function triggerEvent(eventName: string, selector?: string, detail?: any, editable?: EditableInfo): boolean {
  const event = new CustomEvent(eventName, { bubbles: true, detail });
  
  let targetElement: Element | null = null;
  if (selector) {
    const copyIndex = editable?.copyInfo?.copyIndex;
    targetElement = copyIndex
      ? document.querySelectorAll(selector)[copyIndex]
      : document.querySelector(selector);
  }

  const element = targetElement || document.body;
  element.dispatchEvent(event);
  return !!targetElement;
}

// Parent Communication Methods
const parentMethods = {
  getDocumentProperties: (properties: string[]) => {
    return properties.reduce((result: Record<string, any>, prop: string) => {
      result[prop] = (document as any)[prop] ?? null;
      return result;
    }, {});
  },

  getDefinitions: async () => {
    const definitions: Record<string, any> = {};
    const scriptElements = document.querySelectorAll('script[type^="application/vnd.adobe.aue."]');

    await Promise.all(
      Array.from(scriptElements).map(async (scriptEl) => {
        const { type, src, innerText } = scriptEl as HTMLScriptElement;
        const defType = type.replace('application/vnd.adobe.aue.', '').replace('+json', '');
        
        let data: any;
        if (innerText) {
          try {
            data = JSON.parse(innerText);
          } catch (error) {
            console.error('Failed to parse definitions:', error);
            data = null;
          }
        } else if (src) {
          try {
            const response = await fetch(src);
            data = await response.json();
          } catch (error) {
            console.error('Failed to fetch definitions:', error);
            data = null;
          }
        }

        definitions[defType] = data;
      })
    );

    return definitions;
  },

  triggerEvent,
  openRTE: initializeTinyMCE
};

// DOM Manipulation Utilities
function toggleClass(selector: string, classNames: string[], operation: 'toggle' | 'add' | 'remove' = 'toggle'): void {
  const element = document.querySelector(selector);
  if (element) {
    classNames.forEach(className => {
      element.classList[operation](className);
    });
  }
}

function setMode(mode: string): void {
  const { mode: currentMode, setMode } = useEditorStore.getState();
  const modeClasses: Record<string, string> = {
    [EditorMode.EDIT]: 'aue-edit-mode',
    [EditorMode.PREVIEW]: 'aue-preview-mode'
  };

  toggleClass('html', [modeClasses[mode]], 'add');

  if (currentMode !== mode) {
    toggleClass('html', [modeClasses[currentMode]], 'remove');
    setMode({ mode });
  }
}

function moveElement({ container, beforeSelector, refresh, element, attributes }: {
  container?: Element | null;
  beforeSelector?: string;
  refresh?: boolean;
  element?: Element | null;
  attributes?: Record<string, string>;
}): void {
  if (element && container) {
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    if (beforeSelector) {
      const beforeElement = document.querySelector(beforeSelector);
      beforeElement?.before(element);
    } else {
      container.appendChild(element);
    }
  } else if (refresh) {
    window.location.reload();
  }
}

// Event Handlers Setup
function setupEventHandlers(): void {
  // Content Move Event
  document.addEventListener(Events.EVENT_CONTENT_MOVE, (event) => {
    const { prefix } = useEditorStore.getState();
    const { component, before, from, to } = (event as ContentMoveEvent).detail;
    const targetContainer = event.target as Element;

    const selector = `[${prefix}${AttributeNames.RESOURCE}="${component}"]`;
    const element = document.querySelector(selector);
    const resourceValue = element?.getAttribute(`${prefix}${AttributeNames.RESOURCE}`);

    const attributes: Record<string, string> = {};
    if (from !== to && resourceValue?.includes(from)) {
      const newResource = resourceValue.replace(from, '');
      attributes[`${prefix}${AttributeNames.RESOURCE}`] = `${to}${newResource}`;
    }

    moveElement({
      container: targetContainer,
      element,
      beforeSelector: before ? `[${prefix}${AttributeNames.RESOURCE}="${before}"]` : undefined,
      attributes
    });
  });

  // UI Select Event
  document.addEventListener(Events.EVENT_UI_SELECT, (event) => {
    const target = event.target as HTMLElement;
    if (target && (event as CustomEvent).detail.selected) {
      if ((target as any).scrollIntoViewIfNeeded) {
        (target as any).scrollIntoViewIfNeeded();
      } else {
        target.scrollIntoView({ block: 'nearest' });
      }
    }
  });

  // Content Patch Event
  document.addEventListener(Events.EVENT_CONTENT_PATCH, (event) => {
    const { prefix } = useEditorStore.getState();
    const { request, patch } = (event as ContentPatchEvent).detail;

    let element = document.querySelector(
      `[${prefix}${AttributeNames.RESOURCE}="${request?.target?.resource}"]`
    );

    const propValue = element?.getAttribute(`${prefix}${AttributeNames.PROP}`);

    if (element && patch.name && propValue !== patch.name) {
      element = element.querySelector(`[${prefix}${AttributeNames.PROP}='${patch.name}']`);
    }

    if (!element) {
      window.location.reload();
      return;
    }

    const typeValue = element.getAttribute(`${prefix}${AttributeNames.TYPE}`);

    if (typeValue === ContentType.MEDIA) {
      (element as HTMLImageElement).src = patch.value;
    } else if (typeValue === ContentType.TEXT || typeValue === ContentType.RICHTEXT) {
      element.innerHTML = patch.value;
    } else {
      window.location.reload();
    }
  });

  // Content Update Event
  document.addEventListener(Events.EVENT_CONTENT_UPDATE, (event) => {
    const { prefix } = useEditorStore.getState();
    const element = event.target as HTMLElement;
    const typeValue = element.getAttribute(`${prefix}${AttributeNames.TYPE}`);

    if (!element || typeValue !== ContentType.MEDIA) return;

    const { value } = (event as CustomEvent).detail;
    (element as HTMLImageElement).src = value;
  });

  // Content Remove Event
  document.addEventListener(Events.EVENT_CONTENT_REMOVE, (event) => {
    const resource = (event as CustomEvent).detail?.resource;
    if (!resource) return;

    const { prefix } = useEditorStore.getState();
    const element = document.querySelector(`[${prefix}${AttributeNames.RESOURCE}="${resource}"]`);
    element?.remove();
  });

  // Content Add Event
  document.addEventListener(Events.EVENT_CONTENT_ADD, () => {
    window.location.reload();
  });

  // UI Edit Event
  document.addEventListener(Events.EVENT_UI_EDIT, () => {
    setMode(EditorMode.EDIT);
  });

  // UI Preview Event
  document.addEventListener(Events.EVENT_UI_PREVIEW, () => {
    setMode(EditorMode.PREVIEW);
  });

  // Content Copy Event
  document.addEventListener(Events.EVENT_CONTENT_COPY, (event) => {
    const { source, target, response } = (event as ContentCopyEvent).detail;
    const sourceElement = event.target as Element;

    if (!source || !target || !sourceElement) return;

    const { prefix } = useEditorStore.getState();
    const clonedElement = sourceElement.cloneNode(true) as Element;

    clonedElement.setAttribute(`${prefix}${AttributeNames.RESOURCE}`, response?.resource);
    clonedElement.setAttribute(`${prefix}${AttributeNames.LABEL}`, target.newName || '');

    if (source.container === target.container) {
      moveElement({
        container: sourceElement.parentElement,
        element: clonedElement,
        beforeSelector: target.before
          ? `[${prefix}${AttributeNames.RESOURCE}="${target.before}"]`
          : undefined
      });
    }
  });
}

// Get Namespace Prefix
function getNamespacePrefix(): string {
  const metaElement = document.querySelector(Events.META_NAMESPACE) as HTMLMetaElement | null;
  return metaElement?.content ? `data-${metaElement.content}-` : Events.DEFAULT_PREFIX;
}

// Load TinyMCE Script
async function loadTinyMCE(editor: EditorMethods): Promise<void> {
  const script = document.createElement('script');
  script.id = 'tiny-mce-script';
  script.src = Events.RTE_URL;
  document.body.appendChild(script);

  const stylesheet = await editor.getRTEStylesheet?.();
  if (stylesheet) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = stylesheet;
    document.head.appendChild(link);
  }
}

// Initialize Application
async function initializeApp(): Promise<void> {
  // Connect to parent
  const connection = connectToParent({ methods: parentMethods });
  const editor = await connection.promise;

  // Set editor in store
  useEditorStore.getState().setEditor(editor as EditorMethods);

  // Setup event handlers
  setupEventHandlers();

  // Get namespace prefix
  const prefix = getNamespacePrefix();
  useEditorStore.getState().setPrefix(prefix);

  // Load TinyMCE
  await loadTinyMCE(editor as EditorMethods);

  // Trigger initialized event
  triggerEvent(Events.EVENT_APP_INITIALIZED);

  // Track version
  (editor as EditorMethods).trackCorsVersion?.({ version: '3.4.0' });
}

// Start the application
initializeApp();

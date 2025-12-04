import { connectToParent } from 'penpal';
import { create as createStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';
import { baseKeymap } from 'prosemirror-commands';

// Constants
const EditorMode = {
  EDIT: 'edit',
  PREVIEW: 'preview'
};

const ContentType = {
  TEXT: 'text',
  MEDIA: 'media',
  RICHTEXT: 'richtext',
  REFERENCE: 'reference',
  CONTAINER: 'container',
  COMPONENT: 'component'
};

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
};

// State Management
const useEditorStore = createStore(
  subscribeWithSelector((set, get) => ({
    mode: EditorMode.PREVIEW,
    isInEditor: false,
    prefix: null,
    editor: null,

    setMode: ({ mode }) => {
      set((state) => {
        const isInEditor = mode === EditorMode.EDIT || mode === EditorMode.PREVIEW;
        return { ...state, mode, isInEditor };
      });
    },

    setPrefix: (prefix) => {
      set((state) => ({ ...state, prefix }));
    },

    setEditor: (editor) => {
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
const editorViewCache = new Map();

// ProseMirror Editor Creation
function createProseMirrorEditor(target, content, editable) {
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
      keyup: (view, event) => {
        if (event.key === 'Escape') {
          view.dom.blur();
        }
        return false;
      },
      blur: (view, event) => {
        const relatedTarget = event.relatedTarget;
        if (relatedTarget && relatedTarget.closest('#universal-editor-toolbar')) {
          return false;
        }

        view.setProps({
          ...view.props,
          editable: () => false
        });

        const { editor } = useEditorStore.getState();
        const targetElement = event.target;
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
      navigate: (view, event) => {
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
function initializeTinyMCE({ editable, config }, retryCount = 0) {
  if (!window.tinymce) {
    if (retryCount < 3) {
      setTimeout(() => initializeTinyMCE({ editable, config }, retryCount + 1), 100);
    }
    return;
  }

  delete config?.selector;

  const copyIndex = editable.copyInfo?.copyIndex;
  const targetElement = copyIndex
    ? document.querySelectorAll(editable.selector)[copyIndex]
    : document.querySelector(editable.selector);

  if (!targetElement) return;

  if (!config.toolbar || config.useProse) {
    // Use ProseMirror
    const view = createProseMirrorEditor(targetElement, null, editable);
    window.view = view;
    view.focus();
  } else {
    // Use TinyMCE
    window.tinymce.init({
      ...config,
      target: targetElement,
      setup: (editor) => {
        editor.on('init', () => {
          window.tinymce.activeEditor.focus(false);
          window.navigation?.addEventListener('navigate', (e) => e.preventDefault());
        });

        editor.on('keyup', (event) => {
          if (event.key === 'Escape') {
            event.target.blur();
          }
        });

        editor.on('blur', (event) => {
          const { editor: storeEditor } = useEditorStore.getState();
          const { bodyElement, startContent } = event.target;
          const newContent = window.tinymce.activeEditor.getContent();

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
          window.navigation?.removeEventListener('navigate', (e) => e.preventDefault());
        });
      }
    });
  }
}

// Event Utilities
function triggerEvent(eventName, selector, detail, editable) {
  const event = new CustomEvent(eventName, { bubbles: true, detail });
  
  let targetElement;
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
  getDocumentProperties: (properties) => {
    return properties.reduce((result, prop) => {
      result[prop] = document[prop] ?? null;
      return result;
    }, {});
  },

  getDefinitions: async () => {
    const definitions = {};
    const scriptElements = document.querySelectorAll('script[type^="application/vnd.adobe.aue."]');

    await Promise.all(
      Array.from(scriptElements).map(async ({ type, src, innerText }) => {
        const defType = type.replace('application/vnd.adobe.aue.', '').replace('+json', '');
        
        let data;
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
function toggleClass(selector, classNames, operation = 'toggle') {
  const element = document.querySelector(selector);
  if (element) {
    classNames.forEach(className => {
      element.classList[operation](className);
    });
  }
}

function setMode(mode) {
  const { mode: currentMode, setMode } = useEditorStore.getState();
  const modeClasses = {
    [EditorMode.EDIT]: 'aue-edit-mode',
    [EditorMode.PREVIEW]: 'aue-preview-mode'
  };

  toggleClass('html', [modeClasses[mode]], 'add');

  if (currentMode !== mode) {
    toggleClass('html', [modeClasses[currentMode]], 'remove');
    setMode({ mode });
  }
}

function moveElement({ container, beforeSelector, refresh, element, attributes }) {
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
function setupEventHandlers() {
  // Content Move Event
  document.addEventListener(Events.EVENT_CONTENT_MOVE, (event) => {
    const { prefix } = useEditorStore.getState();
    const { component, before, from, to } = event.detail;
    const targetContainer = event.target;

    const selector = `[${prefix}${AttributeNames.RESOURCE}="${component}"]`;
    const element = document.querySelector(selector);
    const resourceValue = element.getAttribute(`${prefix}${AttributeNames.RESOURCE}`);

    const attributes = {};
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
    const target = event.target;
    if (target && event.detail.selected) {
      if (target.scrollIntoViewIfNeeded) {
        target.scrollIntoViewIfNeeded();
      } else {
        target.scrollIntoView({ block: 'nearest' });
      }
    }
  });

  // Content Patch Event
  document.addEventListener(Events.EVENT_CONTENT_PATCH, (event) => {
    const { prefix } = useEditorStore.getState();
    const { request, patch } = event.detail;

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
      element.src = patch.value;
    } else if (typeValue === ContentType.TEXT || typeValue === ContentType.RICHTEXT) {
      element.innerHTML = patch.value;
    } else {
      window.location.reload();
    }
  });

  // Content Update Event
  document.addEventListener(Events.EVENT_CONTENT_UPDATE, (event) => {
    const { prefix } = useEditorStore.getState();
    const element = event.target;
    const typeValue = element.getAttribute(`${prefix}${AttributeNames.TYPE}`);

    if (!element || typeValue !== ContentType.MEDIA) return;

    const { value } = event.detail;
    element.src = value;
  });

  // Content Remove Event
  document.addEventListener(Events.EVENT_CONTENT_REMOVE, (event) => {
    const resource = event.detail?.resource;
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
    const { source, target, response } = event.detail;
    const sourceElement = event.target;

    if (!source || !target || !sourceElement) return;

    const { prefix } = useEditorStore.getState();
    const clonedElement = sourceElement.cloneNode(true);

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
function getNamespacePrefix() {
  const metaElement = document.querySelector(Events.META_NAMESPACE);
  return metaElement?.content ? `data-${metaElement.content}-` : Events.DEFAULT_PREFIX;
}

// Load TinyMCE Script
async function loadTinyMCE(editor) {
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
async function initializeApp() {
  // Connect to parent
  const connection = connectToParent({ methods: parentMethods });
  const editor = await connection.promise;

  // Set editor in store
  useEditorStore.getState().setEditor(editor);

  // Setup event handlers
  setupEventHandlers();

  // Get namespace prefix
  const prefix = getNamespacePrefix();
  useEditorStore.getState().setPrefix(prefix);

  // Load TinyMCE
  await loadTinyMCE(editor);

  // Trigger initialized event
  triggerEvent(Events.EVENT_APP_INITIALIZED);

  // Track version
  editor.trackCorsVersion?.({ version: '3.4.0' });
}

// Start the application
initializeApp();

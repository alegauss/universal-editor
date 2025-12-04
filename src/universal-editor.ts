// ============================================================================
// IMPORTS - External dependencies for editor functionality
// ============================================================================

import { connectToParent } from 'penpal';
import { create as createStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { EditorState} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser as ProseMirrorDOMParser} from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';
import { baseKeymap } from 'prosemirror-commands';

// ============================================================================
// TYPE DEFINITIONS - Interfaces for type safety across the application
// ============================================================================

/**
 * EditorMethods - Defines methods that the parent frame exposes to communicate
 * with the editor. These are callback functions called by the editor to notify
 * the parent of various events.
 */
interface EditorMethods {
  /**
   * Called when the rich text editor (RTE) is closed.
   * Reports the edited element, modification status, and new content.
   */
  closeRTE?: (args: {
    editable: EditableInfo;        // Information about the edited element
    isModified: boolean;            // Whether content was modified
    newContent: {
      html: string;                // HTML representation of content
      text: string;                // Plain text representation
    };
  }) => void;
  
  /**
   * Requests the stylesheet URL for the RTE interface styling.
   * Returns a promise that resolves to the stylesheet path.
   */
  getRTEStylesheet?: () => Promise<string>;
  
  /**
   * Tracks the CORS version for compatibility monitoring.
   * Called to report the editor version to parent.
   */
  trackCorsVersion?: (args: { version: string }) => void;
}

/**
 * EditableInfo - Contains metadata about the DOM element being edited.
 * Used to locate and identify the target element in the document.
 */
interface EditableInfo {
  selector: string;                 // CSS selector to find the element
  copyInfo?: {
    copyIndex: number;              // If multiple matches, which index to use
  };
}

/**
 * RTEConfig - Configuration object for initializing either TinyMCE or ProseMirror.
 * Allows flexible setup with multiple optional properties.
 */
interface RTEConfig {
  selector?: string;                // CSS selector for target element
  toolbar?: string;                 // Toolbar configuration string
  useProse?: boolean;               // Force use of ProseMirror over TinyMCE
  target?: HTMLElement;             // Direct reference to target element
  setup?: (editor: any) => void;    // Custom setup callback
  [key: string]: any;               // Accept additional configuration properties
}

/**
 * EditorStore - Zustand store schema defining the global editor state.
 * Manages editor mode, settings, and references.
 */
interface EditorStore {
  mode: string;                     // Current mode: 'edit' or 'preview'
  isInEditor: boolean;              // Whether currently in editor mode
  prefix: string | null;            // Data attribute prefix from namespace
  editor: EditorMethods | null;     // Reference to parent editor methods
  
  // Store action methods
  setMode: (args: { mode: string }) => void;
  setPrefix: (prefix: string) => void;
  setEditor: (editor: EditorMethods) => void;
}

/**
 * ContentMoveEvent - Custom event fired when content is moved within containers.
 * Includes source and destination information.
 */
interface ContentMoveEvent extends CustomEvent {
  detail: {
    component: string;              // Component being moved
    before: string;                 // Element it should be placed before
    from: string;                   // Source path/identifier
    to: string;                     // Destination path/identifier
  };
}

/**
 * ContentPatchEvent - Custom event fired when content properties are updated.
 * Used for granular updates to specific content attributes.
 */
interface ContentPatchEvent extends CustomEvent {
  detail: {
    request: {
      target: {
        resource: string;           // Resource identifier to update
      };
    };
    patch: {
      name: string;                 // Property name to update
      value: string;                // New value for the property
    };
  };
}

/**
 * ContentCopyEvent - Custom event fired when content is copied.
 * Includes source and destination container information.
 */
interface ContentCopyEvent extends CustomEvent {
  detail: {
    source: {
      container: string;            // Source container identifier
    };
    target: {
      container: string;            // Destination container identifier
      before: string;               // Position reference in destination
      newName: string;              // New name for the copied content
    };
    response: {
      resource: string;             // Resource identifier of copied content
    };
  };
}

// ============================================================================
// CONSTANTS - Immutable values used throughout the application
// ============================================================================

/**
 * EditorMode - Constants defining the two operational modes of the editor.
 * EDIT: User can modify content
 * PREVIEW: Content is read-only
 */
const EditorMode = {
  EDIT: 'edit',
  PREVIEW: 'preview'
} as const;

/**
 * ContentType - Enumeration of different content types the editor can handle.
 * Each type may be processed differently during updates and rendering.
 */
const ContentType = {
  TEXT: 'text',                     // Plain text content
  MEDIA: 'media',                   // Images, videos, etc.
  RICHTEXT: 'richtext',             // HTML-formatted text
  REFERENCE: 'reference',           // References to other content
  CONTAINER: 'container',           // Container elements
  COMPONENT: 'component'            // Reusable components
} as const;

/**
 * AttributeNames - Frozen object mapping semantic names to data attribute keys.
 * Using Object.freeze prevents accidental modifications at runtime.
 * These attributes are prefixed with the namespace prefix when used in the DOM.
 */
const AttributeNames = Object.freeze({
  UUID: 'id',                       // Unique identifier
  RESOURCE: 'resource',             // Resource path/identifier
  TYPE: 'type',                     // Content type indicator
  PROP: 'prop',                     // Property name
  PARENTID: 'parentid',             // Parent element identifier
  BEHAVIOR: 'behavior',             // Behavioral modifier
  LABEL: 'label',                   // Human-readable label
  MODEL: 'model',                   // Data model reference
  FILTER: 'filter',                 // Filter configuration
  COMPONENT: 'component'            // Component reference
});

/**
 * Events - Custom event names and configuration constants.
 * Defines all custom events the editor listens for and triggers.
 * Also includes metadata selectors and URLs.
 */
const Events = {
  // Content manipulation events
  EVENT_APP_INITIALIZED: 'aue:initialized',   // App startup complete
  EVENT_CONTENT_ADD: 'aue:content-add',       // Content addition
  EVENT_CONTENT_REMOVE: 'aue:content-remove', // Content removal
  EVENT_CONTENT_MOVE: 'aue:content-move',     // Content repositioning
  EVENT_CONTENT_PATCH: 'aue:content-patch',   // Partial content update
  EVENT_CONTENT_UPDATE: 'aue:content-update', // Full content update
  EVENT_CONTENT_COPY: 'aue:content-copy',     // Content duplication
  
  // UI mode events
  EVENT_UI_EDIT: 'aue:ui-edit',               // Switch to edit mode
  EVENT_UI_PREVIEW: 'aue:ui-preview',         // Switch to preview mode
  EVENT_UI_SELECT: 'aue:ui-select',           // Element selection
  
  // Metadata and configuration
  META_NAMESPACE: 'meta[name="urn:adobe:aue:system:namespace"]',
  DEFAULT_PREFIX: 'data-aue-',                // Default data attribute prefix
  RTE_URL: 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js' // TinyMCE CDN
} as const;

/**
 * VERSION - Application version string following semantic versioning.
 * Used to track compatibility and features available.
 */
const VERSION = '3.4.0';

// ============================================================================
// STATE MANAGEMENT - Zustand store for global state
// ============================================================================

/**
 * useEditorStore - Creates a Zustand store for managing editor state globally.
 * subscribeWithSelector middleware allows selecting specific state slices
 * and subscribing to their changes.
 * 
 * State shape:
 * - mode: Current editor mode (edit/preview)
 * - isInEditor: Boolean indicating if in editing context
 * - prefix: Namespace prefix for data attributes (e.g., "data-aue-")
 * - editor: Reference to parent editor methods object
 */
const useEditorStore = createStore<EditorStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    mode: EditorMode.PREVIEW,
    isInEditor: false,
    prefix: null,
    editor: null,

    /**
     * setMode - Updates the editor mode and derived isInEditor flag.
     * When mode is 'edit' or 'preview', isInEditor becomes true.
     * @param mode - New mode string ('edit' or 'preview')
     */
    setMode: ({ mode }: { mode: string }) => {
      set((state) => {
        const isInEditor = mode === EditorMode.EDIT || mode === EditorMode.PREVIEW;
        return { ...state, mode, isInEditor };
      });
    },

    /**
     * setPrefix - Updates the data attribute prefix.
     * Used to store the namespace prefix from meta tags.
     * @param prefix - New prefix string
     */
    setPrefix: (prefix: string) => {
      set((state) => ({ ...state, prefix }));
    },

    /**
     * setEditor - Stores reference to parent editor methods.
     * Called during initialization to connect with parent frame.
     * @param editor - EditorMethods object from parent
     */
    setEditor: (editor: EditorMethods) => {
      set((state) => ({ ...state, editor }));
    }
  }))
);

// ============================================================================
// PROSEMIRROR SCHEMA CONFIGURATION
// ============================================================================

/**
 * editorSchema - Defines the document structure and rules for ProseMirror.
 * 
 * Schema components:
 * - nodes: Structural elements (paragraphs, lists, etc.)
 *   addListNodes() adds bullet/numbered list support to basic nodes
 * - marks: Inline formatting (bold, italic, links, etc.)
 * 
 * The schema constrains what content users can create and ensures valid documents.
 */
const editorSchema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, 'paragraph block*', 'block'),
  marks: basicSchema.spec.marks
});

// ============================================================================
// EDITOR VIEW CACHE
// ============================================================================

/**
 * editorViewCache - Map storing ProseMirror EditorView instances.
 * Key: selector or identifier string
 * Value: EditorView instance
 * 
 * Allows reusing and managing multiple editor instances across the page.
 * Prevents memory leaks by centralizing editor lifecycle management.
 */
const editorViewCache = new Map<string, EditorView>();

// ============================================================================
// PROSEMIRROR EDITOR CREATION FUNCTION
// ============================================================================

/**
 * createProseMirrorEditor - Initializes a ProseMirror editor instance.
 * 
 * Process:
 * 1. Extract HTML content from target element or use provided content
 * 2. Parse HTML into ProseMirror document using schema
 * 3. Create editor state with history and keyboard plugins
 * 4. Create view with DOM event handlers
 * 5. Return editor view for use/caching
 * 
 * @param target - DOM element where editor attaches
 * @param content - Initial HTML content (null uses target.innerHTML)
 * @param editable - Metadata about the editable element
 * @returns EditorView instance ready for editing
 */
function createProseMirrorEditor(
  target: HTMLElement,
  content: string | null,
  editable: EditableInfo
): EditorView {
  // Determine initial content: provided content > target HTML > empty string
  const htmlContent = content || target.innerHTML || '';
  
  // Create parser using the defined schema
  const parser = ProseMirrorDOMParser.fromSchema(editorSchema);
  
  // Create temporary container to safely parse HTML into DOM
  const temp = document.createElement('div');
  temp.innerHTML = htmlContent;
  
  // Parse DOM into ProseMirror document format
  const doc = parser.parse(temp);

  // Create editor state with initial document and plugins
  const state = EditorState.create({
    doc,
    plugins: [
      history(),                    // Undo/redo functionality
      keymap(baseKeymap)            // Standard keyboard shortcuts
    ]
  });

  // Create the editor view with DOM event handlers
  const view = new EditorView(target, {
    state,
    editable: () => true,           // Editor is editable by default
    
    /**
     * handleDOMEvents - Object defining how to handle DOM events.
     * Each handler receives the view and event, returns boolean
     * indicating if event was handled.
     */
    handleDOMEvents: {
      /**
       * keyup - Detects Escape key to blur (unfocus) editor.
       * Allows users to exit editing mode with Escape key.
       */
      keyup: (view: EditorView, event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          (view.dom as HTMLElement).blur();
        }
        return false;  // Don't prevent default or stop propagation
      },

      /**
       * blur - Handles losing focus (blur) event.
       * Complex logic:
       * 1. Check if focus moved to toolbar (if so, allow re-editing)
       * 2. Make editor read-only
       * 3. Get final content
       * 4. Call parent's closeRTE method
       * 5. Return false to allow default blur behavior
       */
      blur: (view: EditorView, event: FocusEvent) => {
        // relatedTarget is the element that received focus
        const relatedTarget = event.relatedTarget as HTMLElement | null;
        
        // If focus went to toolbar, allow continuing edit without closing
        if (relatedTarget && relatedTarget.closest('#universal-editor-toolbar')) {
          return false;
        }

        // Disable editing when focus is lost
        view.setProps({
          ...view.props,
          editable: () => false
        });

        // Get editor reference from store
        const { editor } = useEditorStore.getState();
        
        // Extract final content from editor
        const targetElement = event.target as HTMLElement;
        const newHTML = targetElement.innerHTML || '';
        const newText = targetElement.textContent || '';

        // Notify parent that editor is closed
        if (editor?.closeRTE) {
          editor.closeRTE({
            editable,
            isModified: htmlContent !== newHTML,  // Compare with original
            newContent: {
              html: newHTML,
              text: newText
            }
          });
        }
        return false;
      },

      /**
       * navigate - Prevents default navigation behavior while editing.
       * Stops browser navigation events when editor is active.
       */
      navigate: (view: EditorView, event: Event) => {
        // If editor is editable, prevent navigation
        if (view.props.editable && view.props.editable(view.state)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
        return false;
      }
    }
  });

  return view;
}

// ============================================================================
// TINYMCE EDITOR INITIALIZATION FUNCTION
// ============================================================================

/**
 * initializeTinyMCE - Initializes TinyMCE rich text editor or falls back to ProseMirror.
 * 
 * Features:
 * - Retries loading TinyMCE library if not yet available
 * - Falls back to ProseMirror if no toolbar configured or useProse flag set
 * - Sets up event handlers for blur and escape key
 * - Communicates with parent via closeRTE callback
 * 
 * @param editable - Metadata about the element being edited
 * @param config - TinyMCE configuration object
 * @param retryCount - Internal retry counter (starts at 0)
 */
function initializeTinyMCE(
  { editable, config }: { editable: EditableInfo; config: RTEConfig },
  retryCount: number = 0
): void {
  // Check if TinyMCE library is loaded globally
  if (!(window as any).tinymce) {
    // Retry up to 3 times with 100ms delay
    if (retryCount < 3) {
      setTimeout(() => initializeTinyMCE({ editable, config }, retryCount + 1), 100);
    }
    return;
  }

  // Remove selector from config as TinyMCE uses 'target' instead
  delete config?.selector;

  // Find target DOM element
  // If copyInfo.copyIndex is set, use querySelectorAll to get specific copy
  const copyIndex = editable.copyInfo?.copyIndex;
  const targetElement = copyIndex
    ? document.querySelectorAll(editable.selector)[copyIndex] as HTMLElement
    : document.querySelector(editable.selector) as HTMLElement;

  // Exit if target element not found
  if (!targetElement) return;

  // Decision: Use ProseMirror if no toolbar or useProse flag is set
  if (!config.toolbar || config.useProse) {
    // Use ProseMirror editor
    const view = createProseMirrorEditor(targetElement, null, editable);
    // Store view globally for debugging/access
    (window as any).view = view;
    // Focus the editor
    view.focus();
  } else {
    // Use TinyMCE editor
    (window as any).tinymce.init({
      ...config,                    // Spread config options
      target: targetElement,        // Set DOM target
      
      /**
       * setup - TinyMCE setup callback called during initialization.
       * Configures event handlers and behavior.
       * @param editor - TinyMCE editor instance
       */
      setup: (editor: any) => {
        /**
         * 'init' event - Fired when editor is fully initialized and ready.
         * Sets up navigation prevention and focuses editor.
         */
        editor.on('init', () => {
          // Focus the editor (false = don't select content)
          (window as any).tinymce.activeEditor.focus(false);
          // Prevent browser navigation while editing
          (window as any).navigation?.addEventListener('navigate', (e: Event) => e.preventDefault());
        });

        /**
         * 'keyup' event - Fired on key release.
         * Detects Escape key to blur editor.
         */
        editor.on('keyup', (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            (event.target as HTMLElement).blur();
          }
        });

        /**
         * 'blur' event - Fired when editor loses focus.
         * Similar to ProseMirror blur handler - closes editor and reports changes.
         */
        editor.on('blur', (event: any) => {
          // Get editor reference from store
          const { editor: storeEditor } = useEditorStore.getState();
          
          // Extract content metadata from TinyMCE event
          const { bodyElement, startContent } = event.target;
          const newContent = (window as any).tinymce.activeEditor.getContent();

          // Notify parent that editor is closing
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

          // Clean up: remove event listener and destroy editor
          event.preventDefault();
          event.stopImmediatePropagation();
          editor.remove();
          (window as any).navigation?.removeEventListener('navigate', (e: Event) => e.preventDefault());
        });
      }
    });
  }
}

// ============================================================================
// EVENT UTILITIES
// ============================================================================

/**
 * triggerEvent - Creates and dispatches a custom event to trigger handlers.
 * 
 * Process:
 * 1. Create CustomEvent with event name and detail data
 * 2. Determine target element (optional selector or document.body)
 * 3. Handle copyIndex for multiple matching elements
 * 4. Dispatch event from target, allowing it to bubble
 * 5. Return success indicator
 * 
 * @param eventName - Custom event name to dispatch
 * @param selector - Optional CSS selector for target element
 * @param detail - Optional data object to attach to event
 * @param editable - Optional metadata about editable element
 * @returns True if target element was found, false otherwise
 */
function triggerEvent(
  eventName: string,
  selector?: string,
  detail?: any,
  editable?: EditableInfo
): boolean {
  // Create custom event with bubbling enabled
  const event = new CustomEvent(eventName, { bubbles: true, detail });
  
  let targetElement: Element | null = null;
  
  // Find target element if selector provided
  if (selector) {
    const copyIndex = editable?.copyInfo?.copyIndex;
    targetElement = copyIndex
      ? document.querySelectorAll(selector)[copyIndex]
      : document.querySelector(selector);
  }

  // Use target element or fall back to document.body
  const element = targetElement || document.body;
  element.dispatchEvent(event);
  
  // Return true only if we found the target element
  return !!targetElement;
}

// ============================================================================
// PARENT COMMUNICATION METHODS - Methods exposed to parent frame via Penpal
// ============================================================================

/**
 * parentMethods - Object containing methods that parent frame can call.
 * These methods are exposed through Penpal RPC connection.
 * Parent can call these to query document, load definitions, trigger events, etc.
 */
const parentMethods = {
  /**
   * getDocumentProperties - Retrieves document object properties.
   * Allows parent to access document.title, document.body, etc.
   * 
   * @param properties - Array of property names to retrieve
   * @returns Object mapping property names to their values (or null if undefined)
   */
  getDocumentProperties: (properties: string[]) => {
    return properties.reduce((result: Record<string, any>, prop: string) => {
      result[prop] = (document as any)[prop] ?? null;
      return result;
    }, {});
  },

  /**
   * getDefinitions - Loads content schema definitions from script tags.
   * 
   * Process:
   * 1. Find all script tags with type "application/vnd.adobe.aue.*+json"
   * 2. For each script tag, either:
   *    a. Parse inline JSON content, OR
   *    b. Fetch remote JSON from src attribute
   * 3. Return object mapping definition types to parsed data
   * 
   * Handles errors gracefully - null values for failed loads.
   * 
   * @returns Promise resolving to definitions object
   */
  getDefinitions: async () => {
    const definitions: Record<string, any> = {};
    
    // Query all script tags with Adobe AUE definition type
    const scriptElements = document.querySelectorAll('script[type^="application/vnd.adobe.aue."]');

    // Process all script elements in parallel
    await Promise.all(
      Array.from(scriptElements).map(async (scriptEl) => {
        const { type, src, innerText } = scriptEl as HTMLScriptElement;
        
        // Extract definition type from MIME type
        // "application/vnd.adobe.aue.models+json" -> "models"
        const defType = type.replace('application/vnd.adobe.aue.', '').replace('+json', '');
        
        let data: any;
        
        // Try inline content first
        if (innerText) {
          try {
            data = JSON.parse(innerText);
          } catch (error) {
            console.error('Failed to parse definitions:', error);
            data = null;
          }
        } 
        // Fall back to fetching from src URL
        else if (src) {
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

  /**
   * triggerEvent - Exposed method to allow parent to trigger custom events.
   * Delegates to triggerEvent function.
   */
  triggerEvent,
  
  /**
   * openRTE - Exposed method to allow parent to open rich text editor.
   * Delegates to initializeTinyMCE function.
   */
  openRTE: initializeTinyMCE
};

// ============================================================================
// DOM MANIPULATION UTILITIES
// ============================================================================

/**
 * toggleClass - Manipulates CSS classes on a DOM element.
 * 
 * Process:
 * 1. Find element by selector
 * 2. For each class name, perform specified operation
 * 
 * @param selector - CSS selector to find element
 * @param classNames - Array of class names to manipulate
 * @param operation - 'toggle' (default), 'add', or 'remove'
 */
function toggleClass(
  selector: string,
  classNames: string[],
  operation: 'toggle' | 'add' | 'remove' = 'toggle'
): void {
  const element = document.querySelector(selector);
  if (element) {
    classNames.forEach(className => {
      element.classList[operation](className);
    });
  }
}

/**
 * setMode - Changes editor mode and updates visual UI state.
 * 
 * Process:
 * 1. Get current mode from store
 * 2. Add class for new mode to <html> element
 * 3. If mode changed, remove class for old mode
 * 4. Update store with new mode
 * 
 * Classes applied to <html> allow CSS to style page based on mode:
 * - Edit mode: "aue-edit-mode"
 * - Preview mode: "aue-preview-mode"
 * 
 * @param mode - New mode string ('edit' or 'preview')
 */
function setMode(mode: string): void {
  const { mode: currentMode, setMode } = useEditorStore.getState();
  
  // Map mode to CSS class names
  const modeClasses: Record<string, string> = {
    [EditorMode.EDIT]: 'aue-edit-mode',
    [EditorMode.PREVIEW]: 'aue-preview-mode'
  };

  // Add class for new mode
  toggleClass('html', [modeClasses[mode]], 'add');

  // If mode actually changed, remove old mode class and update store
  if (currentMode !== mode) {
    toggleClass('html', [modeClasses[currentMode]], 'remove');
    setMode({ mode });
  }
}

/**
 * moveElement - Repositions a DOM element within the document.
 * Used by event handlers to move/reorder content elements.
 * 
 * Process:
 * 1. If element and container provided:
 *    a. Apply attributes to element (resource path, labels, etc.)
 *    b. Insert element before specified sibling OR append to container
 * 2. If refresh flag true, reload entire page
 * 
 * @param container - Parent element to contain moved element
 * @param beforeSelector - CSS selector for sibling to insert before
 * @param refresh - If true and no element, reload page
 * @param element - Element to move
 * @param attributes - Attributes to apply to element
 */
function moveElement({ 
  container, 
  beforeSelector, 
  refresh, 
  element, 
  attributes 
}: {
  container?: Element | null;
  beforeSelector?: string;
  refresh?: boolean;
  element?: Element | null;
  attributes?: Record<string, string>;
}): void {
  if (element && container) {
    // Apply any attributes to the element
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    // Insert element before sibling or append to container
    if (beforeSelector) {
      const beforeElement = document.querySelector(beforeSelector);
      beforeElement?.before(element);
    } else {
      container.appendChild(element);
    }
  } else if (refresh) {
    // Fallback: reload entire page if can't move element
    window.location.reload();
  }
}

// ============================================================================
// EVENT HANDLERS SETUP
// ============================================================================

/**
 * setupEventHandlers - Registers all custom event listeners.
 * Called during app initialization to hook up event processing.
 * 
 * This function sets up 8 different event handlers for content manipulation
 * and UI mode changes. Each handler retrieves the prefix from store and
 * manipulates the DOM accordingly.
 */
function setupEventHandlers(): void {
  // -------------------------------------------------------------------------
  // EVENT: Content Move - Reorder elements and update resource paths
  // -------------------------------------------------------------------------
  /**
   * Fired when content should be moved from one location to another.
   * Updates resource attributes and repositions element in DOM.
   */
  document.addEventListener(Events.EVENT_CONTENT_MOVE, (event) => {
    const { prefix } = useEditorStore.getState();
    const { component, before, from, to } = (event as ContentMoveEvent).detail;
    const targetContainer = event.target as Element;

    // Find element with matching resource
    const selector = `[${prefix}${AttributeNames.RESOURCE}="${component}"]`;
    const element = document.querySelector(selector);
    const resourceValue = element?.getAttribute(`${prefix}${AttributeNames.RESOURCE}`);

    // Update resource attribute if path changed
    const attributes: Record<string, string> = {};
    if (from !== to && resourceValue?.includes(from)) {
      const newResource = resourceValue.replace(from, '');
      attributes[`${prefix}${AttributeNames.RESOURCE}`] = `${to}${newResource}`;
    }

    // Move element to new position
    moveElement({
      container: targetContainer,
      element,
      beforeSelector: before ? `[${prefix}${AttributeNames.RESOURCE}="${before}"]` : undefined,
      attributes
    });
  });

  // -------------------------------------------------------------------------
  // EVENT: UI Select - Scroll selected element into view
  // -------------------------------------------------------------------------
  /**
   * Fired when an element is selected in the UI.
   * Scrolls element into view for visibility.
   */
  document.addEventListener(Events.EVENT_UI_SELECT, (event) => {
    const target = event.target as HTMLElement;
    if (target && (event as CustomEvent).detail.selected) {
      // Try scrollIntoViewIfNeeded first (non-standard but better UX)
      if ((target as any).scrollIntoViewIfNeeded) {
        (target as any).scrollIntoViewIfNeeded();
      } else {
        // Fall back to standard scrollIntoView
        target.scrollIntoView({ block: 'nearest' });
      }
    }
  });

  // -------------------------------------------------------------------------
  // EVENT: Content Patch - Update specific content properties
  // -------------------------------------------------------------------------
  /**
   * Fired when a specific property of an element should be updated.
   * Handles media src, text content, and other properties.
   * Falls back to full page reload if element not found.
   */
  document.addEventListener(Events.EVENT_CONTENT_PATCH, (event) => {
    const { prefix } = useEditorStore.getState();
    const { request, patch } = (event as ContentPatchEvent).detail;

    // Find element by resource
    let element = document.querySelector(
      `[${prefix}${AttributeNames.RESOURCE}="${request?.target?.resource}"]`
    );

    const propValue = element?.getAttribute(`${prefix}${AttributeNames.PROP}`);

    // If prop name provided and different, find nested element
    if (element && patch.name && propValue !== patch.name) {
      element = element.querySelector(`[${prefix}${AttributeNames.PROP}='${patch.name}']`);
    }

    // If element not found, reload page (safer than partial updates)
    if (!element) {
      window.location.reload();
      return;
    }

    // Update element based on its type
    const typeValue = element.getAttribute(`${prefix}${AttributeNames.TYPE}`);

    if (typeValue === ContentType.MEDIA) {
      // Update image/media source
      (element as HTMLImageElement).src = patch.value;
    } else if (typeValue === ContentType.TEXT || typeValue === ContentType.RICHTEXT) {
      // Update text or HTML content
      element.innerHTML = patch.value;
    } else {
      // Unknown type - reload to be safe
      window.location.reload();
    }
  });

  // -------------------------------------------------------------------------
  // EVENT: Content Update - Full content replacement for media
  // -------------------------------------------------------------------------
  /**
   * Fired for full content updates (typically media elements).
   * Simpler than patch - just updates the value.
   */
  document.addEventListener(Events.EVENT_CONTENT_UPDATE, (event) => {
    const { prefix } = useEditorStore.getState();
    const element = event.target as HTMLElement;
    const typeValue = element.getAttribute(`${prefix}${AttributeNames.TYPE}`);

    // Only handle media type
    if (!element || typeValue !== ContentType.MEDIA) return;

    const { value } = (event as CustomEvent).detail;
    (element as HTMLImageElement).src = value;
  });

  // -------------------------------------------------------------------------
  // EVENT: Content Remove - Delete element from DOM
  // -------------------------------------------------------------------------
  /**
   * Fired when an element should be removed from the document.
   * Finds element by resource and removes it.
   */
  document.addEventListener(Events.EVENT_CONTENT_REMOVE, (event) => {
    const resource = (event as CustomEvent).detail?.resource;
    if (!resource) return;

    const { prefix } = useEditorStore.getState();
    const element = document.querySelector(`[${prefix}${AttributeNames.RESOURCE}="${resource}"]`);
    element?.remove();
  });

  // -------------------------------------------------------------------------
  // EVENT: Content Add - Reload page when content added
  // -------------------------------------------------------------------------
  /**
   * Fired when new content is added to the document.
   * Simplest approach: reload page to refresh everything.
   * Could be optimized to insert new content via JavaScript.
   */
  document.addEventListener(Events.EVENT_CONTENT_ADD, () => {
    window.location.reload();
  });

  // -------------------------------------------------------------------------
  // EVENT: UI Edit - Switch to edit mode
  // -------------------------------------------------------------------------
  /**
   * Fired when user clicks edit button or similar trigger.
   * Changes mode and applies visual styling.
   */
  document.addEventListener(Events.EVENT_UI_EDIT, () => {
    setMode(EditorMode.EDIT);
  });

  // -------------------------------------------------------------------------
  // EVENT: UI Preview - Switch to preview mode
  // -------------------------------------------------------------------------
  /**
   * Fired when user clicks preview button or similar trigger.
   * Changes mode to read-only.
   */
  document.addEventListener(Events.EVENT_UI_PREVIEW, () => {
    setMode(EditorMode.PREVIEW);
  });

  // -------------------------------------------------------------------------
  // EVENT: Content Copy - Duplicate element to same or different container
  // -------------------------------------------------------------------------
  /**
   * Fired when an element is copied.
   * Clones element, updates resource/label attributes, inserts at target.
   * Only handles same-container copies (different container would need more logic).
   */
  document.addEventListener(Events.EVENT_CONTENT_COPY, (event) => {
    const { source, target, response } = (event as ContentCopyEvent).detail;
    const sourceElement = event.target as Element;

    // Validate all required data present
    if (!source || !target || !sourceElement) return;

    const { prefix } = useEditorStore.getState();
    
    // Deep clone the source element
    const clonedElement = sourceElement.cloneNode(true) as Element;

    // Update attributes for cloned element
    clonedElement.setAttribute(`${prefix}${AttributeNames.RESOURCE}`, response?.resource);
    clonedElement.setAttribute(`${prefix}${AttributeNames.LABEL}`, target.newName || '');

    // Insert cloned element in same container
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

// ============================================================================
// NAMESPACE AND INITIALIZATION HELPERS
// ============================================================================

/**
 * getNamespacePrefix - Retrieves data attribute prefix from page metadata.
 * 
 * Process:
 * 1. Query for meta tag with name "urn:adobe:aue:system:namespace"
 * 2. If found, use its content value as prefix base
 * 3. If not found, use default prefix "data-aue-"
 * 
 * Allows pages to customize attribute names for AUE integration.
 * Example: If content="myapp", prefix becomes "data-myapp-"
 * 
 * @returns Namespace prefix string
 */
function getNamespacePrefix(): string {
  const metaElement = document.querySelector(Events.META_NAMESPACE) as HTMLMetaElement | null;
  return metaElement?.content ? `data-${metaElement.content}-` : Events.DEFAULT_PREFIX;
}

/**
 * loadTinyMCE - Loads TinyMCE library script and stylesheet.
 * 
 * Process:
 * 1. Create script element for TinyMCE library
 * 2. Append to document body (triggers loading)
 * 3. Request stylesheet URL from parent
 * 4. If provided, create link element and append to head
 * 
 * @param editor - EditorMethods object to call getRTEStylesheet on
 */
async function loadTinyMCE(editor: EditorMethods): Promise<void> {
  // Create and append TinyMCE script tag
  const script = document.createElement('script');
  script.id = 'tiny-mce-script';
  script.src = Events.RTE_URL;
  document.body.appendChild(script);

  // Load and apply TinyMCE stylesheet
  const stylesheet = await editor.getRTEStylesheet?.();
  if (stylesheet) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = stylesheet;
    document.head.appendChild(link);
  }
}

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================

/**
 * initializeApp - Main initialization function called on page load.
 * 
 * Initialization sequence:
 * 1. Connect to parent frame via Penpal for RPC
 * 2. Store editor reference in Zustand store
 * 3. Register custom event listeners
 * 4. Read namespace prefix from meta tags
 * 5. Load TinyMCE library and stylesheet
 * 6. Dispatch initialized event to parent
 * 7. Report version to parent for compatibility checking
 * 
 * @returns Promise that resolves when initialization complete
 */
async function initializeApp(): Promise<void> {
  // Connect to parent frame using Penpal
  // This creates a two-way RPC channel for communication
  const connection = connectToParent({ methods: parentMethods });
  const editor = await connection.promise;

  // Store editor reference for later use in event handlers
  useEditorStore.getState().setEditor(editor as EditorMethods);

  // Register all event handlers for content manipulation
  setupEventHandlers();

  // Determine data attribute prefix from page metadata
  const prefix = getNamespacePrefix();
  useEditorStore.getState().setPrefix(prefix);

  // Load TinyMCE library and styling from parent
  await loadTinyMCE(editor as EditorMethods);

  // Notify parent that initialization is complete
  triggerEvent(Events.EVENT_APP_INITIALIZED);

  // Report version for compatibility tracking
  (editor as EditorMethods).trackCorsVersion?.({ version: VERSION });
}

// ============================================================================
// APPLICATION STARTUP
// ============================================================================

/**
 * Start the application by calling initialization function.
 * This runs immediately when the script loads.
 */
initializeApp();

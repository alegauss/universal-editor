// ============================================================================
// IMPORTS - External dependencies for editor functionality
// ============================================================================

// ============================================================================
// TYPE DEFINITIONS - Interfaces for type safety across the application
// ============================================================================

/**
 * EditorMethods - Defines methods that the parent frame exposes to communicate
 * with the editor. These are callback functions called by the editor to notify
 * the parent of various events.
 */
interface EditorMethods {
  closeRTE(): void;
  getRTEStylesheet(): string | null;
  openRTE(selector: string, config?: { label?: string }): void;
  openImageEditor(selector: string, config?: { label?: string }): void;
  updateContent(selector: string, content: any): void;
  selectElement(selector: string, info?: { type?: string; label?: string }): void;
  ready(): void;
}

/**
 * EditableInfo - Contains metadata about the DOM element being edited.
 * Used to locate and identify the target element in the document.
 */
interface EditableInfo {
  resource: string;
  selector: string;
  type: string;
  label: string;
  prop?: string;
  component?: string;
  model?: string;
  filter?: string;
  behavior?: string;
}

/**
 * MessageData - Structure for postMessage communication
 */
interface MessageData {
  source: string;
  method: string;
  args: any[];
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
 * Message sources for communication
 */
const MessageSource = {
  HOST: 'universal-editor-host',
  CHILD: 'universal-editor-child'
} as const;

/**
 * Attribute prefix for editable elements
 */
const ATTR_PREFIX = 'data-aue-';

// ============================================================================
// UNIVERSAL EDITOR CLASS
// ============================================================================

class UniversalEditor {
  private isInEditMode: boolean = false;
  private editableElements: Map<string, EditableInfo> = new Map();
  private currentEditIndicator: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  /**
   * Initialize the Universal Editor
   */
  private init(): void {
    console.log('🚀 Inicializando Universal Editor');

    // Check if running inside an iframe
    if (window.parent === window) {
      console.warn('⚠️ Universal Editor deve ser executado dentro de um iframe');
      return;
    }

    // Scan for editable elements
    this.scanEditableElements();

    // Setup message listener
    this.setupMessageListener();

    // Setup click handlers
    this.setupClickHandlers();

    // Notify parent that we're ready
    this.notifyReady();

    console.log(`📝 Encontrados ${this.editableElements.size} elementos editáveis`);
  }

  /**
   * Scan the DOM for editable elements
   */
  private scanEditableElements(): void {
    const elements = document.querySelectorAll(`[${ATTR_PREFIX}resource]`);

    elements.forEach((element) => {
      const resource = element.getAttribute(`${ATTR_PREFIX}resource`);
      if (!resource) return;

      const info: EditableInfo = {
        resource,
        selector: `[${ATTR_PREFIX}resource="${resource}"]`,
        type: element.getAttribute(`${ATTR_PREFIX}type`) || 'text',
        label: element.getAttribute(`${ATTR_PREFIX}label`) || resource,
        prop: element.getAttribute(`${ATTR_PREFIX}prop`) || undefined,
        component: element.getAttribute(`${ATTR_PREFIX}component`) || undefined,
        model: element.getAttribute(`${ATTR_PREFIX}model`) || undefined,
        filter: element.getAttribute(`${ATTR_PREFIX}filter`) || undefined,
        behavior: element.getAttribute(`${ATTR_PREFIX}behavior`) || undefined
      };

      this.editableElements.set(resource, info);
    });
  }

  /**
   * Setup message listener for parent frame communication
   */
  private setupMessageListener(): void {
    window.addEventListener('message', (event: MessageEvent<MessageData>) => {
      if (event.data?.source !== MessageSource.HOST) return;

      const { method, args } = event.data;
      console.log('📩 Mensagem recebida do host:', method, args);

      switch (method) {
        case 'enableEditMode':
          this.enableEditMode();
          break;
        case 'disableEditMode':
          this.disableEditMode();
          break;
      }
    });
  }

  /**
   * Setup click handlers for editable elements
   */
  private setupClickHandlers(): void {
    document.addEventListener('click', (e: MouseEvent) => {
      if (!this.isInEditMode) return;

      const target = e.target as HTMLElement;
      const editable = target.closest(`[${ATTR_PREFIX}resource]`) as HTMLElement;

      if (!editable) return;

      e.preventDefault();
      e.stopPropagation();

      const resource = editable.getAttribute(`${ATTR_PREFIX}resource`);
      if (!resource) return;

      const info = this.editableElements.get(resource);
      if (!info) return;

      this.handleEditableClick(editable, info);
    });
  }

  /**
   * Handle click on an editable element
   */
  private handleEditableClick(element: HTMLElement, info: EditableInfo): void {
    console.log('🎯 Clicou em elemento editável:', info);

    // Visual feedback
    this.highlightElement(element);

    // Notify parent about selection
    this.sendToParent('selectElement', [info.selector, { type: info.type, label: info.label }]);

    // Open appropriate editor based on type
    switch (info.type) {
      case 'richtext':
        this.sendToParent('openRTE', [info.selector, { label: info.label }]);
        break;
      case 'text':
        this.editTextInline(element, info);
        break;
      case 'media':
        this.sendToParent('openImageEditor', [info.selector, { label: info.label }]);
        break;
      case 'component':
      case 'container':
        // Future: Open component editor
        console.log('📦 Componente selecionado:', info);
        break;
    }
  }

  /**
   * Highlight element temporarily
   */
  private highlightElement(element: HTMLElement): void {
    element.style.outline = '3px solid #e67e22';
    setTimeout(() => {
      element.style.outline = '';
    }, 500);
  }

  /**
   * Enable edit mode
   */
  private enableEditMode(): void {
    console.log('✏️ Modo de edição ATIVADO');
    this.isInEditMode = true;
    document.documentElement.classList.add('aue-edit-mode');
    this.showEditModeIndicator();
  }

  /**
   * Disable edit mode
   */
  private disableEditMode(): void {
    console.log('👁️ Modo de visualização ATIVADO');
    this.isInEditMode = false;
    document.documentElement.classList.remove('aue-edit-mode');
    this.hideEditModeIndicator();
  }

  /**
   * Show edit mode indicator
   */
  private showEditModeIndicator(): void {
    if (this.currentEditIndicator) return;

    const indicator = document.createElement('div');
    indicator.id = 'aue-edit-mode-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #27ae60;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      z-index: 9999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      pointer-events: none;
    `;
    indicator.textContent = '✏️ MODO DE EDIÇÃO';
    document.body.appendChild(indicator);
    this.currentEditIndicator = indicator;
  }

  /**
   * Hide edit mode indicator
   */
  private hideEditModeIndicator(): void {
    if (this.currentEditIndicator) {
      this.currentEditIndicator.remove();
      this.currentEditIndicator = null;
    }
  }

  /**
   * Edit text inline
   */
  private editTextInline(element: HTMLElement, info: EditableInfo): void {
    const originalText = element.textContent || '';
    const input = document.createElement('input');

    input.type = 'text';
    input.value = originalText;
    
    // Copy styles from original element
    const styles = window.getComputedStyle(element);
    input.style.cssText = styles.cssText;
    input.style.width = '100%';
    input.style.border = '2px solid #3498db';
    input.style.outline = 'none';
    input.style.background = 'white';
    input.style.padding = '5px';

    element.replaceWith(input);
    input.focus();
    input.select();

    const save = () => {
      const newText = input.value.trim();
      element.textContent = newText;
      input.replaceWith(element);

      if (newText !== originalText) {
        console.log('💾 Salvando alteração inline:', info.selector, newText);
        this.sendToParent('updateContent', [info.selector, newText]);
      }
    };

    input.addEventListener('blur', save);
    input.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        save();
      }
      if (e.key === 'Escape') {
        element.textContent = originalText;
        input.replaceWith(element);
      }
    });
  }

  /**
   * Send message to parent frame
   */
  private sendToParent(method: string, args: any[] = []): void {
    window.parent.postMessage({
      source: MessageSource.CHILD,
      method,
      args
    }, '*');
  }

  /**
   * Notify parent that editor is ready
   */
  private notifyReady(): void {
    setTimeout(() => {
      this.sendToParent('ready', []);
      console.log('✅ Notificação de "ready" enviada ao host');
    }, 100);
  }
}

// ============================================================================
// AUTO-INITIALIZE
// ============================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new UniversalEditor();
  });
} else {
  new UniversalEditor();
}

// Export for manual initialization if needed
export default UniversalEditor;

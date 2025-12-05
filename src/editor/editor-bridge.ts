/**
 * Editor Bridge - Bridge between editor-host.html and universal-editor.ts
 * 
 * This file acts as an adapter that:
 * 1. Listens to messages from the host (editor-host.html)
 * 2. Interacts with the original universal-editor.ts
 * 3. Manages editing states locally
 */

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { createToolbar } from './prosemirror-toolbar';

// ============================================================================
// TYPES
// ============================================================================

interface MessageData {
  type: string;
  data?: any;
}

interface EditableElement extends HTMLElement {
  dataset: {
    aueResource?: string;
    aueType?: string;
    aueLabel?: string;
    aueProp?: string;
  };
}

// ============================================================================
// PROSEMIRROR SCHEMA
// ============================================================================

// Create schema with list support
const editorSchema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, 'paragraph block*', 'block'),
  marks: basicSchema.spec.marks
});

// ============================================================================
// EDITOR BRIDGE CLASS
// ============================================================================

class EditorBridge {
  private isInEditMode: boolean = false;
  private isInIframe: boolean = false;
  private parentConnection: any = null;
  private currentEditor: EditorView | null = null;
  private currentElement: HTMLElement | null = null;
  private currentSelector: string | null = null;
  private editorContainer: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  /**
   * Initialize the bridge
   */
  private init(): void {
    console.log('🌉 Editor Bridge initialized');

    // Check if inside an iframe
    this.isInIframe = window.parent !== window;

    if (!this.isInIframe) {
      console.warn('⚠️ Not inside an iframe');
      return;
    }

    // Setup communication with host
    this.setupHostCommunication();

    // Setup click handlers
    this.setupClickHandlers();

    // Notify ready
    this.notifyReady();

    // Debug: Show editable elements
    this.debugEditableElements();
  }

  /**
   * Setup communication with host frame
   */
  private setupHostCommunication(): void {
    window.addEventListener('message', (event: MessageEvent<MessageData>) => {
      if (event.source !== window.parent) return;

      const { type, data } = event.data;
      console.log('📩 Bridge received message:', { type, data });

      switch (type) {
        case 'aue:mode-change':
          this.handleModeChange(data);
          break;
      }
    });
  }

  /**
   * Handle mode change from host
   */
  private handleModeChange(data: { mode: string; event: string }): void {
    const { mode, event: eventName } = data;

    console.log(`🔄 Switching to mode: ${mode}`);

    // Update internal state
    this.isInEditMode = mode === 'edit';

    // Add/remove CSS class
    if (this.isInEditMode) {
      document.documentElement.classList.add('aue-edit-mode');
      console.log('✅ Edit mode ENABLED');
    } else {
      document.documentElement.classList.remove('aue-edit-mode');
      console.log('✅ Preview mode ENABLED');
      
      // Close editor if open
      this.closeEditor();
    }

    // Dispatch custom event for universal-editor.ts
    const customEvent = new CustomEvent(eventName, {
      detail: { mode }
    });
    window.dispatchEvent(customEvent);
    console.log(`✅ Event dispatched: ${eventName}`);
  }

  /**
   * Setup click handlers for editable elements
   */
  private setupClickHandlers(): void {
    document.addEventListener('click', (e: MouseEvent) => {
      if (!this.isInEditMode) {
        return;
      }

      const target = (e.target as HTMLElement).closest('[data-aue-resource]') as EditableElement;
      if (!target) return;

      // Check if click was inside an active ProseMirror editor
      const proseEditor = document.querySelector('.prosemirror-container');
      if (proseEditor && proseEditor.contains(e.target as Node)) {
        console.log('ℹ️ Click inside ProseMirror, ignoring');
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      this.handleElementClick(target);
    });
  }

  /**
   * Handle click on editable element
   */
  private handleElementClick(element: EditableElement): void {
    const resource = element.dataset.aueResource;
    const type = element.dataset.aueType;
    const label = element.dataset.aueLabel;
    const selector = `[data-aue-resource="${resource}"]`;

    console.log('🎯 Element clicked:', { selector, type, label });

    // Handle based on type
    switch (type) {
      case 'text':
        // For simple text, use inline editing
        this.editTextInline(element, selector);
        break;
        
      case 'richtext':
        // For richtext, use ProseMirror with toolbar
        this.openProseMirrorEditor(element, selector);
        break;
        
      case 'media':
        // For media, notify host to open modal
        this.notifyHost('aue:element-clicked', {
          selector,
          type,
          label,
          content: element.innerHTML
        });
        break;
        
      default:
        console.log(`ℹ️ Unsupported type: ${type}`);
    }
  }

  /**
   * Open ProseMirror editor with toolbar
   */
  private openProseMirrorEditor(element: HTMLElement, selector: string): void {
    console.log('📝 Opening ProseMirror editor with toolbar');

    // Close previous editor if exists
    this.closeEditor();

    // Store references
    this.currentElement = element;
    this.currentSelector = selector;

    // Get current HTML content
    const htmlContent = element.innerHTML || '';
    console.log('📄 Original content:', htmlContent);

    // Create parser using schema
    const parser = ProseMirrorDOMParser.fromSchema(editorSchema);

    // Create temporary container for parsing
    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;

    // Parse DOM to ProseMirror doc
    const doc = parser.parse(temp);

    // Cria estado do editor
    const state = EditorState.create({
      doc,
      plugins: [
        history(),
        keymap(baseKeymap)
      ]
    });

    // Create container for toolbar + editor
    this.editorContainer = document.createElement('div');
    this.editorContainer.className = 'prosemirror-container';
    Object.assign(this.editorContainer.style, {
      border: '2px solid #27ae60',
      borderRadius: '4px',
      background: 'white',
      padding: '0',
      marginBottom: '10px'
    });

    // Replace element content with container
    element.innerHTML = '';
    element.appendChild(this.editorContainer);

    // Create editor view (without toolbar yet)
    const editorMount = document.createElement('div');
    this.editorContainer.appendChild(editorMount);

    this.currentEditor = new EditorView(editorMount, {
      state,
      dispatchTransaction: (transaction) => {
        if (!this.currentEditor) return;
        const newState = this.currentEditor.state.apply(transaction);
        this.currentEditor.updateState(newState);
      }
    });

    console.log('🎨 EditorView created');

    // Create and add toolbar
    const toolbar = createToolbar(this.currentEditor, this.editorContainer);
    this.editorContainer.insertBefore(toolbar, editorMount);
    console.log('🛠️ Toolbar created and added');

    // Add CSS styles to editor
    const editorDom = editorMount.querySelector('.ProseMirror') as HTMLElement;
    if (editorDom) {
      Object.assign(editorDom.style, {
        padding: '12px',
        minHeight: '150px',
        outline: 'none',
        cursor: 'text'
      });
      console.log('✅ Styles applied to ProseMirror');
    } else {
      console.error('❌ .ProseMirror element not found!');
    }

    // Focus on editor
    this.currentEditor.focus();
    console.log('🎯 Editor focused');

    // Handler para salvar ao clicar fora
    const handleClickOutside = (e: MouseEvent) => {
      if (this.editorContainer && !this.editorContainer.contains(e.target as Node)) {
        console.log('💾 Clique fora detectado, salvando...');
        this.closeEditor();
        document.removeEventListener('click', handleClickOutside);
      }
    };

    // Adiciona listener após um pequeno delay
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      console.log('👂 Listener de click outside adicionado');
    }, 100);

    // Handler para ESC
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('🚪 ESC pressionado, salvando...');
        this.closeEditor();
        document.removeEventListener('keydown', handleEscape);
      }
    };

    document.addEventListener('keydown', handleEscape);
    console.log('👂 Listener de ESC adicionado');

    console.log('✅ ProseMirror completamente aberto e configurado');
  }

  /**
   * Close ProseMirror editor and save content
   */
  private closeEditor(): void {
    if (!this.currentEditor || !this.currentElement || !this.currentSelector) {
      return;
    }

    console.log('💾 Closing editor and saving content');

    // Get HTML from editor
    const editorDom = this.editorContainer?.querySelector('.ProseMirror');
    const newContent = editorDom ? editorDom.innerHTML : '';

    // Destroy editor
    this.currentEditor.destroy();

    // Remove container
    if (this.editorContainer) {
      this.editorContainer.remove();
    }

    // Restore content in element
    this.currentElement.innerHTML = newContent;

    // Notify host about the change
    this.notifyHost('aue:content-changed', {
      selector: this.currentSelector,
      content: newContent
    });

    console.log('✅ Content saved:', { selector: this.currentSelector });

    // Clear references
    this.currentEditor = null;
    this.currentElement = null;
    this.currentSelector = null;
    this.editorContainer = null;
  }

  /**
   * Edit text inline (for type="text")
   */
  private editTextInline(element: EditableElement, selector: string): void {
    const originalText = element.textContent?.trim() || '';
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
    input.style.boxSizing = 'border-box';

    // Replace element with input
    element.replaceWith(input);
    input.focus();
    input.select();

    const save = () => {
      const newText = input.value.trim();
      element.textContent = newText;
      input.replaceWith(element);

      if (newText !== originalText) {
        console.log('💾 Saving inline change:', selector, newText);
        this.notifyHost('aue:content-changed', { selector, content: newText });
      } else {
        console.log('ℹ️ No changes');
      }
    };

    const cancel = () => {
      element.textContent = originalText;
      input.replaceWith(element);
      console.log('❌ Editing cancelled');
    };

    input.addEventListener('blur', save);

    input.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        save();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        cancel();
      }
    });
  }

  /**
   * Send message to host
   */
  private notifyHost(type: string, data?: any): void {
    window.parent.postMessage({ type, data }, '*');
  }

  /**
   * Notify host that bridge is ready
   */
  private notifyReady(): void {
    setTimeout(() => {
      this.parentConnection = true;
      this.notifyHost('aue:ready');
      console.log('✅ Bridge notified host: ready');
    }, 100);
  }

  /**
   * Debug: Log editable elements
   */
  private debugEditableElements(): void {
    const editables = document.querySelectorAll('[data-aue-resource]');
    console.log(`📝 Editable elements found: ${editables.length}`);
    editables.forEach((el, index) => {
      const element = el as EditableElement;
      console.log(
        `  ${index + 1}. ${element.dataset.aueLabel} (${element.dataset.aueType})`
      );
    });
  }
}

// ============================================================================
// AUTO-INITIALIZE
// ============================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new EditorBridge();
  });
} else {
  new EditorBridge();
}

export default EditorBridge;
/**
 * Editor Bridge - Ponte entre editor-host.html e universal-editor.ts
 * 
 * Este arquivo atua como um adaptador que:
 * 1. Escuta mensagens do host (editor-host.html)
 * 2. Interage com o universal-editor.ts original
 * 3. Gerencia estados de edição localmente
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

// Cria schema com suporte a listas
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
    console.log('🌉 Editor Bridge inicializado');

    // Verifica se está dentro de um iframe
    this.isInIframe = window.parent !== window;

    if (!this.isInIframe) {
      console.warn('⚠️ Não está dentro de um iframe');
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
      console.log('📩 Bridge recebeu mensagem:', { type, data });

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

    console.log(`🔄 Mudando para modo: ${mode}`);

    // Update internal state
    this.isInEditMode = mode === 'edit';

    // Add/remove CSS class
    if (this.isInEditMode) {
      document.documentElement.classList.add('aue-edit-mode');
      console.log('✅ Modo de edição ATIVADO');
    } else {
      document.documentElement.classList.remove('aue-edit-mode');
      console.log('✅ Modo de visualização ATIVADO');
      
      // Fecha editor se estiver aberto
      this.closeEditor();
    }

    // Dispatch custom event for universal-editor.ts
    const customEvent = new CustomEvent(eventName, {
      detail: { mode }
    });
    window.dispatchEvent(customEvent);
    console.log(`✅ Evento disparado: ${eventName}`);
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

      // Verifica se o clique foi dentro de um editor ProseMirror ativo
      const proseEditor = document.querySelector('.prosemirror-container');
      if (proseEditor && proseEditor.contains(e.target as Node)) {
        console.log('ℹ️ Clique dentro do ProseMirror, ignorando');
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

    console.log('🎯 Elemento clicado:', { selector, type, label });

    // Handle based on type
    switch (type) {
      case 'text':
        // Para texto simples, usa edição inline
        this.editTextInline(element, selector);
        break;
        
      case 'richtext':
        // Para richtext, usa ProseMirror com toolbar
        this.openProseMirrorEditor(element, selector);
        break;
        
      case 'media':
        // Para mídia, notifica o host para abrir modal
        this.notifyHost('aue:element-clicked', {
          selector,
          type,
          label,
          content: element.innerHTML
        });
        break;
        
      default:
        console.log(`ℹ️ Tipo não suportado: ${type}`);
    }
  }

  /**
   * Open ProseMirror editor with toolbar
   */
  private openProseMirrorEditor(element: HTMLElement, selector: string): void {
    console.log('📝 Abrindo editor ProseMirror com toolbar');

    // Fecha editor anterior se existir
    this.closeEditor();

    // Guarda referências
    this.currentElement = element;
    this.currentSelector = selector;

    // Pega o conteúdo HTML atual
    const htmlContent = element.innerHTML || '';
    console.log('📄 Conteúdo original:', htmlContent);

    // Cria parser usando o schema
    const parser = ProseMirrorDOMParser.fromSchema(editorSchema);

    // Cria container temporário para parsing
    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;

    // Parse DOM para ProseMirror doc
    const doc = parser.parse(temp);

    // Cria estado do editor
    const state = EditorState.create({
      doc,
      plugins: [
        history(),
        keymap(baseKeymap)
      ]
    });

    // Cria container para toolbar + editor
    this.editorContainer = document.createElement('div');
    this.editorContainer.className = 'prosemirror-container';
    Object.assign(this.editorContainer.style, {
      border: '2px solid #27ae60',
      borderRadius: '4px',
      background: 'white',
      padding: '0',
      marginBottom: '10px'
    });

    // Substitui o conteúdo do elemento pelo container
    element.innerHTML = '';
    element.appendChild(this.editorContainer);

    // Cria a view do editor (sem toolbar ainda)
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

    console.log('🎨 EditorView criado');

    // Cria e adiciona a toolbar
    const toolbar = createToolbar(this.currentEditor, this.editorContainer);
    this.editorContainer.insertBefore(toolbar, editorMount);
    console.log('🛠️ Toolbar criada e adicionada');

    // Adiciona estilos CSS ao editor
    const editorDom = editorMount.querySelector('.ProseMirror') as HTMLElement;
    if (editorDom) {
      Object.assign(editorDom.style, {
        padding: '12px',
        minHeight: '150px',
        outline: 'none',
        cursor: 'text'
      });
      console.log('✅ Estilos aplicados ao ProseMirror');
    } else {
      console.error('❌ Elemento .ProseMirror não encontrado!');
    }

    // Foca no editor
    this.currentEditor.focus();
    console.log('🎯 Editor focado');

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

    console.log('💾 Fechando editor e salvando conteúdo');

    // Pega o HTML do editor
    const editorDom = this.editorContainer?.querySelector('.ProseMirror');
    const newContent = editorDom ? editorDom.innerHTML : '';

    // Destroi o editor
    this.currentEditor.destroy();

    // Remove o container
    if (this.editorContainer) {
      this.editorContainer.remove();
    }

    // Restaura o conteúdo no elemento
    this.currentElement.innerHTML = newContent;

    // Notifica o host sobre a mudança
    this.notifyHost('aue:content-changed', {
      selector: this.currentSelector,
      content: newContent
    });

    console.log('✅ Conteúdo salvo:', { selector: this.currentSelector });

    // Limpa referências
    this.currentEditor = null;
    this.currentElement = null;
    this.currentSelector = null;
    this.editorContainer = null;
  }

  /**
   * Edit text inline (para type="text")
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
        console.log('💾 Salvando alteração inline:', selector, newText);
        this.notifyHost('aue:content-changed', { selector, content: newText });
      } else {
        console.log('ℹ️ Sem alterações');
      }
    };

    const cancel = () => {
      element.textContent = originalText;
      input.replaceWith(element);
      console.log('❌ Edição cancelada');
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
      console.log('✅ Bridge notificou host: ready');
    }, 100);
  }

  /**
   * Debug: Log editable elements
   */
  private debugEditableElements(): void {
    const editables = document.querySelectorAll('[data-aue-resource]');
    console.log(`📝 Elementos editáveis encontrados: ${editables.length}`);
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
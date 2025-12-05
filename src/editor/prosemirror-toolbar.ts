/**
 * ProseMirror Toolbar
 * 
 * Creates a floating toolbar with formatting commands
 */

import { EditorView } from 'prosemirror-view';
import { toggleMark, setBlockType, wrapIn, lift } from 'prosemirror-commands';
import { wrapInList, liftListItem } from 'prosemirror-schema-list';
import { undo, redo } from 'prosemirror-history';

// ============================================================================
// TOOLBAR CREATION
// ============================================================================

export function createToolbar(view: EditorView, container: HTMLElement): HTMLElement {
  const toolbar = document.createElement('div');
  toolbar.className = 'prosemirror-toolbar';
  
  // Inline styles for toolbar
  Object.assign(toolbar.style, {
    position: 'sticky',
    top: '0',
    left: '0',
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    padding: '8px',
    marginBottom: '8px',
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap',
    zIndex: '1000',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  });

  // Toolbar buttons
  const buttons: Array<any> = [
    {
      title: 'Bold',
      icon: '𝐁',
      command: toggleMark(view.state.schema.marks.strong),
      active: (state: any) => markActive(state, state.schema.marks.strong)
    },
    {
      title: 'Italic',
      icon: '𝐼',
      command: toggleMark(view.state.schema.marks.em),
      active: (state: any) => markActive(state, state.schema.marks.em)
    },
    {
      title: 'Code',
      icon: '</>',
      command: toggleMark(view.state.schema.marks.code),
      active: (state: any) => markActive(state, state.schema.marks.code)
    },
    { type: 'separator' },
    {
      title: 'Heading 1',
      icon: 'H1',
      command: setBlockType(view.state.schema.nodes.heading, { level: 1 }),
      active: (state: any) => blockActive(state, state.schema.nodes.heading, { level: 1 })
    },
    {
      title: 'Heading 2',
      icon: 'H2',
      command: setBlockType(view.state.schema.nodes.heading, { level: 2 }),
      active: (state: any) => blockActive(state, state.schema.nodes.heading, { level: 2 })
    },
    {
      title: 'Heading 3',
      icon: 'H3',
      command: setBlockType(view.state.schema.nodes.heading, { level: 3 }),
      active: (state: any) => blockActive(state, state.schema.nodes.heading, { level: 3 })
    },
    {
      title: 'Paragraph',
      icon: '¶',
      command: setBlockType(view.state.schema.nodes.paragraph),
      active: (state: any) => blockActive(state, state.schema.nodes.paragraph)
    },
    { type: 'separator' },
    {
      title: 'Bullet list',
      icon: '• •',
      command: wrapInList(view.state.schema.nodes.bullet_list),
      active: (state: any) => blockActive(state, state.schema.nodes.bullet_list)
    },
    {
      title: 'Numbered list',
      icon: '1. 2.',
      command: wrapInList(view.state.schema.nodes.ordered_list),
      active: (state: any) => blockActive(state, state.schema.nodes.ordered_list)
    },
    { type: 'separator' },
    {
      title: 'Undo',
      icon: '↶',
      command: undo
    },
    {
      title: 'Redo',
      icon: '↷',
      command: redo
    }
  ];

  // Create buttons
  buttons.forEach(btn => {
    if (btn.type === 'separator') {
      const sep = document.createElement('div');
      Object.assign(sep.style, {
        width: '1px',
        background: '#dee2e6',
        margin: '0 4px'
      });
      toolbar.appendChild(sep);
      return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.title = btn.title || '';
    button.textContent = btn.icon || '';
    
    Object.assign(button.style, {
      background: 'white',
      border: '1px solid #dee2e6',
      borderRadius: '3px',
      padding: '6px 10px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      transition: 'all 0.2s',
      minWidth: '32px',
      fontFamily: 'monospace'
    });

    // Check if command is active
    if (btn.active && btn.active(view.state)) {
      button.style.background = '#007bff';
      button.style.color = 'white';
      button.style.borderColor = '#0056b3';
    }

    button.onmouseenter = () => {
      if (!btn.active || !btn.active(view.state)) {
        button.style.background = '#e9ecef';
      }
    };

    button.onmouseleave = () => {
      if (!btn.active || !btn.active(view.state)) {
        button.style.background = 'white';
      } else {
        button.style.background = '#007bff';
      }
    };

    button.onclick = (e) => {
      e.preventDefault();
      if (btn.command(view.state, view.dispatch, view)) {
        view.focus();
      }
      updateToolbar();
    };

    toolbar.appendChild(button);
  });

  // Update toolbar when state changes
  const updateToolbar = () => {
    Array.from(toolbar.children).forEach((child, index) => {
      if (child.tagName === 'BUTTON') {
        const btn = buttons.filter(b => b.type !== 'separator')[
          Array.from(toolbar.querySelectorAll('button')).indexOf(child as HTMLButtonElement)
        ];
        
        if (btn && btn.active && btn.active(view.state)) {
          (child as HTMLElement).style.background = '#007bff';
          (child as HTMLElement).style.color = 'white';
          (child as HTMLElement).style.borderColor = '#0056b3';
        } else {
          (child as HTMLElement).style.background = 'white';
          (child as HTMLElement).style.color = '#000';
          (child as HTMLElement).style.borderColor = '#dee2e6';
        }
      }
    });
  };

  // Observe state changes
  const originalDispatch = view.dispatch;
  view.dispatch = (tr) => {
    originalDispatch(tr);
    updateToolbar();
  };

  return toolbar;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function markActive(state: any, type: any) {
  const { from, $from, to, empty } = state.selection;
  if (empty) {
    return type.isInSet(state.storedMarks || $from.marks());
  }
  return state.doc.rangeHasMark(from, to, type);
}

function blockActive(state: any, type: any, attrs: any = {}) {
  const { $from, to, node } = state.selection;
  if (node) {
    return node.hasMarkup(type, attrs);
  }
  return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
}
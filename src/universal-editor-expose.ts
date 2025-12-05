/**
 * Universal Editor Expose
 * 
 * Expõe métodos do universal-editor.ts globalmente para que o editor-bridge.ts
 * possa usá-los sem modificar o código original.
 */

// Aguarda o evento de inicialização
window.addEventListener('aue:initialized', () => {
  console.log('🔌 Expondo métodos do Universal Editor');

  // O universal-editor.ts conecta com parent via Penpal
  // e expõe os métodos via parentMethods
  // Precisamos torná-los acessíveis localmente também

  // Cria um wrapper para o método openRTE
  (window as any).openRTE = (args: any) => {
    console.log('🎯 openRTE chamado via bridge:', args);

    const { editable, config } = args;

    // Usa a mesma lógica do universal-editor.ts
    // Verifica se deve usar ProseMirror ou TinyMCE
    const shouldUseProse = !config?.toolbar || config?.useProse;

    if (shouldUseProse) {
      console.log('✅ Usando ProseMirror');
      
      // Importa funções necessárias do universal-editor.ts
      // Como não podemos importar diretamente, vamos disparar um evento
      const event = new CustomEvent('aue:open-prose-editor', {
        detail: { editable, config }
      });
      
      document.dispatchEvent(event);
    } else {
      console.log('ℹ️ TinyMCE não configurado, usando evento padrão');
    }
  };

  console.log('✅ Métodos expostos globalmente');
});
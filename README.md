# universal-editor

Universal Editor for Adobe Experience Manager (AEM) - Clean, modular, and maintainable.

## 🎯 Overview

A modern, deminified implementation of the Universal Editor that allows content authors to edit content directly in context. This refactored version replaces the original minified bundle with clean, readable code using proper npm dependencies.

## ✨ Features

- **Multiple Editor Support**: Works with both TinyMCE and ProseMirror
- **Cross-frame Communication**: Uses Penpal for secure parent-child frame communication
- **Type-safe Validation**: Utilizes Zod for runtime type checking
- **State Management**: Built with Zustand for lightweight, reactive state
- **Event-driven Architecture**: Comprehensive event system for content operations
- **Clean Code**: Fully deminified and documented

## 📦 Installation

```bash
npm install
```

## 🔧 Dependencies

All public libraries are now properly managed via npm instead of being bundled:

- **penpal** (^6.2.2): Cross-frame communication
- **zod** (^3.22.4): TypeScript-first schema validation
- **prosemirror-*** : Rich text editor framework
- **zustand** (^4.4.7): State management

## 🚀 Usage

### For Production (Adobe CDN)

```html
<script src="https://universal-editor-service.adobe.io/cors.js" async></script>
```

### For Development (Local)

```html
<script src="universal-editor.js" type="module"></script>
```

See `example.html` for a complete working example.

## 📝 Content Editing

The editor supports various content types:

- ✏️ **Text**: Plain text content
- 📄 **Rich Text**: HTML formatted content  
- 🖼️ **Media**: Images and other media
- 🔗 **References**: Links to other content
- 📦 **Containers**: Groups of components
- 🧩 **Components**: Reusable content blocks

### Marking Content as Editable

Use data attributes to define editable regions:

```html
<!-- Text Content -->
<h1 
  data-aue-resource="urn:aem:/content/page/title" 
  data-aue-type="text"
  data-aue-prop="title">
  My Title
</h1>

<!-- Rich Text Content -->
<div 
  data-aue-resource="urn:aem:/content/page/body"
  data-aue-type="richtext"
  data-aue-prop="content">
  <p>Rich text content here...</p>
</div>

<!-- Image Content -->
<img 
  data-aue-resource="urn:aem:/content/page/hero"
  data-aue-type="media"
  data-aue-prop="image"
  src="/path/to/image.jpg" 
  alt="Hero" />

<!-- Container -->
<div 
  data-aue-resource="urn:aem:/content/page/container"
  data-aue-type="container">
  <!-- Components go here -->
</div>
```

## 🎪 Events

The editor dispatches various custom events you can listen to:

```javascript
// Editor initialized and ready
document.addEventListener('aue:initialized', () => {
  console.log('Editor ready!');
});

// Entering/exiting edit mode
document.addEventListener('aue:ui-edit', () => {
  console.log('Edit mode activated');
});

document.addEventListener('aue:ui-preview', () => {
  console.log('Preview mode activated');
});

// Content operations
document.addEventListener('aue:content-update', (event) => {
  console.log('Content updated:', event.detail);
});

document.addEventListener('aue:content-add', (event) => {
  console.log('Content added:', event.detail);
});

document.addEventListener('aue:content-remove', (event) => {
  console.log('Content removed:', event.detail);
});
```

### Available Events

| Event | Description |
|-------|-------------|
| `aue:initialized` | Editor is ready |
| `aue:content-add` | Content was added |
| `aue:content-remove` | Content was removed |
| `aue:content-move` | Content was moved |
| `aue:content-patch` | Content was patched |
| `aue:content-update` | Content was updated |
| `aue:content-copy` | Content was copied |
| `aue:ui-edit` | Entered edit mode |
| `aue:ui-preview` | Entered preview mode |
| `aue:ui-select` | Element was selected |

## 🛠️ Development

### Testing

```bash
npm test
```

This validates the code structure and verifies all required imports and functions are present.

### Building

```bash
npm run build
```

This validates that all dependencies are installed and provides guidance on bundling.

### Validation

```bash
npm run validate
```

Runs both tests and build validation.

### Code Structure

The refactored code is organized as follows:

```
universal-editor.js       # Main entry point (clean, readable)
├── State Management      # Zustand store for editor state
├── ProseMirror Setup     # Rich text editor configuration
├── Event Handlers        # DOM event listeners and handlers
├── Parent Communication  # Penpal methods for cross-frame calls
└── Initialization        # App startup logic
```

### Performance Metrics

**File Size Comparison:**
- Original minified bundle: ~596 KB
- New clean implementation: ~14 KB (core code)
- **Reduction: 97.6%**

*Note: When bundled with dependencies, the size will increase, but with proper tree-shaking, the final bundle will still be significantly smaller than the original.*

## 🔄 Migration from Minified Version

This version replaces the original `universal-editor.js` which was a 596KB minified bundle containing:
- Embedded Penpal library
- Embedded Zod library
- Embedded ProseMirror (full suite)
- Embedded Zustand
- Custom application code

**Benefits of the refactored version:**

✅ **Readable**: Clean, well-documented code  
✅ **Maintainable**: Proper separation of concerns  
✅ **Smaller**: Tree-shaking reduces bundle size  
✅ **Modern**: Uses ES modules and modern JavaScript  
✅ **Debuggable**: Source maps and clear stack traces  
✅ **Type-safe**: Better IDE support and autocomplete  

## 📄 Files

- `universal-editor.js` - Main editor implementation (clean)
- `example.html` - Usage example
- `index.html` - Original demo page
- `build.js` - Build validation script
- `package.json` - Dependencies and scripts
- `universal-editor.js.backup` - Original minified version (for reference)

## 🤝 Contributing

When contributing, please:
1. Keep code clean and well-documented
2. Use proper npm packages instead of bundling libraries
3. Follow existing code style
4. Test your changes thoroughly

## 📜 License

ISC

## 🔗 Links

- [Adobe Universal Editor Documentation](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/introduction.html)
- [ProseMirror](https://prosemirror.net/)
- [TinyMCE](https://www.tiny.cloud/)
- [Penpal](https://github.com/Aaronius/penpal)
- [Zod](https://zod.dev/)
- [Zustand](https://github.com/pmndrs/zustand)


# universal-editor

Universal Editor for Adobe Experience Manager (AEM) - Modern TypeScript implementation with clean, modular, and maintainable code.

## 🎯 Overview

A modern TypeScript implementation of the Universal Editor that allows content authors to edit content directly in context. This version is written in TypeScript and generates a minified JavaScript bundle with all dependencies included.

## ✨ Features

- **TypeScript**: Full TypeScript implementation with type safety
- **Multiple Editor Support**: Works with both TinyMCE and ProseMirror
- **Cross-frame Communication**: Uses Penpal for secure parent-child frame communication
- **Type-safe Validation**: Utilizes Zod for runtime type checking
- **State Management**: Built with Zustand for lightweight, reactive state
- **Event-driven Architecture**: Comprehensive event system for content operations
- **Minified Build**: Production-ready minified bundle with all dependencies included
- **Clean Code**: Fully documented TypeScript source

## 📦 Installation

```bash
npm install
```

## 🔨 Building

Build the TypeScript source into a minified JavaScript bundle:

```bash
npm run build
```

This will:
1. Compile TypeScript to JavaScript
2. Bundle all dependencies
3. Minify the output
4. Generate source maps
5. Output to `dist/universal-editor.min.js` (~224KB minified with all dependencies)

## 🔧 Dependencies

### Runtime Dependencies

All public libraries are now properly managed via npm:

- **penpal** (^6.2.2): Cross-frame communication
- **zod** (^3.22.4): TypeScript-first schema validation
- **prosemirror-*** : Rich text editor framework
- **zustand** (^4.4.7): State management

### Dev Dependencies

- **typescript** (^5.3.3): TypeScript compiler
- **esbuild** (^0.19.9): Fast JavaScript bundler and minifier
- **tsx** (^4.7.0): TypeScript execution engine

## 🚀 Usage

### For Production (Built Bundle)

Use the minified bundle that includes all dependencies:

```html
<script src="dist/universal-editor.min.js"></script>
```

### For Development (Local)

For backwards compatibility, the original JavaScript file is still available:

```html
<script src="universal-editor.js" type="module"></script>
```

Or use the built version:

```html
<script src="dist/universal-editor.min.js"></script>
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

This validates the TypeScript source structure and verifies:
- All required imports and functions are present
- TypeScript types are properly defined
- Built bundle exists and is correctly generated

### Building

```bash
npm run build
```

Compiles TypeScript and bundles into a minified JavaScript file with all dependencies.

### Cleaning

```bash
npm run clean
```

Removes the `dist/` directory with all built files.

### Validation

```bash
npm run validate
```

Runs both tests and build to ensure everything works correctly.

## 📁 Project Structure

```
universal-editor/
├── src/                          # TypeScript source files
│   ├── universal-editor.ts       # Main editor implementation
│   ├── build.ts                  # Build script
│   └── test.ts                   # Test script
├── dist/                         # Built files (generated)
│   ├── universal-editor.min.js   # Minified bundle with all dependencies
│   ├── universal-editor.min.js.map # Source map
│   ├── universal-editor.js       # Compiled TypeScript (not minified)
│   ├── universal-editor.d.ts     # TypeScript declarations
│   └── ...                       # Other compiled files
├── universal-editor.js           # Original JavaScript (backwards compatibility)
├── build.js                      # Original build script
├── test.js                       # Original test script
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project configuration
└── README.md                     # This file
```

### Code Structure

The TypeScript code is organized as follows:

```
src/universal-editor.ts       # Main entry point
├── Types & Interfaces        # TypeScript type definitions
├── Constants                 # EditorMode, ContentType, Events, etc.
├── State Management          # Zustand store for editor state
├── ProseMirror Setup         # Rich text editor configuration
├── Event Handlers            # DOM event listeners and handlers
├── Parent Communication      # Penpal methods for cross-frame calls
└── Initialization            # App startup logic
```

### Performance Metrics

**File Size Comparison:**
- Original minified bundle: ~596 KB
- TypeScript source: ~17 KB  
- New minified bundle (with all deps): ~224 KB (62% reduction)
- With tree-shaking and gzip, production size is even smaller

## 🔄 Migration to TypeScript

This version has been converted to TypeScript, providing:

✅ **Type Safety**: Catch errors at compile-time  
✅ **Better IDE Support**: Autocomplete and IntelliSense  
✅ **Readable**: Clean, well-documented TypeScript code  
✅ **Maintainable**: Proper separation of concerns  
✅ **Smaller Bundle**: Tree-shaking reduces final size  
✅ **Modern**: Uses ES modules and modern JavaScript  
✅ **Debuggable**: Source maps and clear stack traces  
✅ **Self-documenting**: TypeScript types serve as documentation  

### Breaking Changes

None! The original `universal-editor.js` file is still available for backwards compatibility. The new build process creates a minified bundle at `dist/universal-editor.min.js` that can be used as a drop-in replacement.

## 📄 Files

### TypeScript Source
- `src/universal-editor.ts` - Main editor implementation (TypeScript)
- `src/build.ts` - Build script (TypeScript)
- `src/test.ts` - Test script (TypeScript)
- `tsconfig.json` - TypeScript configuration

### Built Output
- `dist/universal-editor.min.js` - Minified bundle with all dependencies
- `dist/universal-editor.min.js.map` - Source map
- `dist/universal-editor.js` - Compiled JavaScript (not minified)
- `dist/universal-editor.d.ts` - TypeScript declarations

### Legacy Files (Backwards Compatibility)
- `universal-editor.js` - Original JavaScript implementation
- `build.js` - Original build script
- `test.js` - Original test script

### Documentation
- `example.html` - Usage example
- `README.md` - This file
- `REFACTORING_SUMMARY.md` - Details of the refactoring process

## 🤝 Contributing

When contributing, please:
1. Keep code clean and well-documented
2. Use TypeScript for new code
3. Follow existing code style
4. Test your changes thoroughly
5. Run `npm run validate` before submitting

## 📜 License

ISC

## 🔗 Links

- [Adobe Universal Editor Documentation](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/introduction.html)
- [ProseMirror](https://prosemirror.net/)
- [TinyMCE](https://www.tiny.cloud/)
- [Penpal](https://github.com/Aaronius/penpal)
- [Zod](https://zod.dev/)
- [Zustand](https://github.com/pmndrs/zustand)


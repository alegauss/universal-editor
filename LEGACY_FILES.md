# Legacy Build Artifacts

The following files are build artifacts from the original minified bundle and are **no longer needed** after the refactoring:

## 📦 Bundled Library Fragments

These files contained pieces of libraries that are now properly installed via npm:

### Penpal (Cross-frame Communication)
- `penpal.js` - Partial Penpal library implementation

### Zod (Validation)
- `ZodError.js` - Zod error class
- `ParseStatus.js` - Zod parsing status
- `ParseContext.js` - Zod parsing context
- `SchemaBase.js` - Zod schema base class
- `addIssueToContext.js` - Zod validation utilities

### ProseMirror (Text Editor)
- Various ProseMirror components were embedded in the minified bundle

### Zustand (State Management)
- State management code was embedded in the minified bundle

## 🔧 Bundler Utilities

These are helper files created by the build tool (likely Parcel):

- `copyExports.js` - Re-export helper
- `defineProperty.js` - Property definition helper
- `utils.js` - Utility functions
- `r.js`, `o.js`, `oe.js`, `ae.js` - Various bundler artifacts
- `F.js`, `K.js`, `W.js` - Short-named exports from bundler

## 📄 Other Files

- `main.js` - Original entry point (partially minified, now superseded by `universal-editor.js`)
- `EditorClient.js` - Legacy editor client code
- `config.js` - Configuration constants (still useful for reference)
- `regexes.js` - Regular expression patterns

## ✅ What to Keep

The following files are part of the new, clean implementation:

- ✅ `universal-editor.js` - **Main file** (clean, uses proper npm imports)
- ✅ `package.json` - Dependencies configuration
- ✅ `build.js` - Build validation script
- ✅ `example.html` - Usage example
- ✅ `index.html` - Demo page
- ✅ `README.md` - Documentation
- ✅ `.gitignore` - Git ignore rules

## 🗑️ Safe to Remove

All files listed above can be safely removed as they're no longer used by the new implementation. They've been kept for reference purposes during the migration, but the functionality is now provided by:

1. **Proper npm packages**: penpal, zod, prosemirror-*, zustand
2. **Clean implementation**: universal-editor.js

If you want to remove them:

```bash
# Remove legacy build artifacts (AFTER verifying everything works)
rm -f penpal.js ZodError.js ParseStatus.js ParseContext.js SchemaBase.js
rm -f addIssueToContext.js copyExports.js defineProperty.js utils.js
rm -f r.js o.js oe.js ae.js F.js K.js W.js
rm -f main.js EditorClient.js regexes.js
# Keep config.js for reference if needed
```

## 📝 Migration Notes

The original `universal-editor.js` (now backed up as `universal-editor.js.backup`) was a ~596KB minified bundle containing all these libraries and code bundled together. The new version:

- Uses proper npm dependencies (better for maintenance and updates)
- Is much more readable and debuggable
- Supports tree-shaking (smaller production bundles)
- Follows modern JavaScript/ES module patterns
- Has proper TypeScript type support via the npm packages

For a detailed explanation of the refactoring, see the README.md.

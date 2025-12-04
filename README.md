# universal-editor

Universal Editor for Adobe Experience Manager (AEM)

## Description

A clean, modern implementation of the Universal Editor that allows content authors to edit content directly in the context of their web pages. This editor integrates with Adobe Experience Manager and provides both TinyMCE and ProseMirror editing capabilities.

## Features

- **Multiple Editor Support**: Works with both TinyMCE and ProseMirror
- **Cross-frame Communication**: Uses Penpal for secure parent-child frame communication
- **Type-safe**: Utilizes Zod for runtime type validation
- **State Management**: Built-in state management using Zustand
- **Event-driven Architecture**: Comprehensive event system for content operations

## Installation

```bash
npm install
```

## Dependencies

- **penpal**: Cross-frame communication library
- **zod**: TypeScript-first schema validation
- **prosemirror-***: Rich text editor framework
- **zustand**: Lightweight state management

## Usage

Include the script in your HTML:

```html
<script src="universal-editor.js" type="module"></script>
```

## Content Editing

The editor supports various content types:
- Text
- Rich Text
- Media (Images)
- References
- Containers
- Components

Use data attributes to mark editable content:

```html
<div data-aue-resource="urn:aem:/content/path" data-aue-type="text" data-aue-prop="title">
  Editable Title
</div>
```

## Development

The code has been refactored from a minified bundle to a clean, modular structure using proper npm dependencies. This makes it:
- More maintainable
- Easier to debug
- Smaller bundle size (when using tree-shaking)
- Better documented

## Events

The editor dispatches various events:
- `aue:initialized` - When the editor is ready
- `aue:content-add` - When content is added
- `aue:content-remove` - When content is removed
- `aue:content-move` - When content is moved
- `aue:content-patch` - When content is patched
- `aue:content-update` - When content is updated
- `aue:ui-edit` - When entering edit mode
- `aue:ui-preview` - When entering preview mode

## License

ISC

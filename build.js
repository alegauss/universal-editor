#!/usr/bin/env node

/**
 * Build script for universal-editor
 * 
 * This script validates that all dependencies are installed and provides
 * guidance on bundling the application for production use.
 */

import { existsSync } from 'fs';
import { join } from 'path';

// All required dependencies from package.json
const requiredDeps = [
  'penpal',
  'zod',
  'prosemirror-state',
  'prosemirror-view',
  'prosemirror-model',
  'prosemirror-transform',
  'prosemirror-keymap',
  'prosemirror-history',
  'prosemirror-commands',
  'prosemirror-schema-basic',
  'prosemirror-schema-list',
  'zustand'
];

console.log('🔍 Checking dependencies...\n');

let allPresent = true;
for (const dep of requiredDeps) {
  const depPath = join(process.cwd(), 'node_modules', dep);
  if (existsSync(depPath)) {
    console.log(`✅ ${dep}`);
  } else {
    console.log(`❌ ${dep} - MISSING`);
    allPresent = false;
  }
}

if (allPresent) {
  console.log('\n✨ All dependencies are installed!');
  console.log('\n📦 To use the universal-editor:');
  console.log('   1. Import it as an ES module');
  console.log('   2. Or bundle it with your preferred bundler (webpack, rollup, esbuild, vite)');
  console.log('\nExample:');
  console.log('   import "./universal-editor.js"');
  console.log('\n💡 For production, consider using a bundler with tree-shaking to minimize size.');
} else {
  console.log('\n⚠️  Some dependencies are missing. Run: npm install');
  process.exit(1);
}

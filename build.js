#!/usr/bin/env node

/**
 * Build script for universal-editor
 * 
 * This script would normally bundle the universal-editor.js with its dependencies
 * For now, it just validates that all dependencies are installed
 */

import { existsSync } from 'fs';
import { join } from 'path';

const requiredDeps = [
  'penpal',
  'zod',
  'prosemirror-state',
  'prosemirror-view',
  'prosemirror-model',
  'zustand'
];

console.log('🔍 Checking dependencies...');

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
  console.log('   2. Or bundle it with your preferred bundler (webpack, rollup, esbuild)');
  console.log('\nExample:');
  console.log('   import "./universal-editor.js"');
} else {
  console.log('\n⚠️  Some dependencies are missing. Run: npm install');
  process.exit(1);
}

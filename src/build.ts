#!/usr/bin/env node

/**
 * Build script for universal-editor
 * 
 * This script bundles the TypeScript source into a minified JavaScript file
 * with all dependencies included.
 */

import { build } from 'esbuild';
import { existsSync } from 'fs';
import { join } from 'path';

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

if (!allPresent) {
  console.log('\n⚠️  Some dependencies are missing. Run: npm install');
  process.exit(1);
}

console.log('\n✨ All dependencies are installed!');
console.log('\n📦 Building universal-editor...\n');

async function buildProject() {
  try {
    // Build the main bundle - minified with all dependencies
    await build({
      entryPoints: ['src/universal-editor.ts'],
      bundle: true,
      minify: true,
      sourcemap: true,
      format: 'iife',
      target: 'es2020',
      outfile: 'dist/universal-editor.min.js',
      platform: 'browser',
      logLevel: 'info'
    });

    console.log('\n✅ Build completed successfully!');
    console.log('\n📦 Output files:');
    console.log('   - dist/universal-editor.min.js (minified bundle with all dependencies)');
    console.log('   - dist/universal-editor.min.js.map (source map)');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildProject();

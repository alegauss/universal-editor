#!/usr/bin/env node

/**
 * Build script for universal-editor
 * 
 * This script bundles the TypeScript source into a minified JavaScript file
 * with all dependencies included.
 */

import { build } from 'esbuild';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// Read dependencies from package.json to stay in sync
const packageJsonPath = join(process.cwd(), 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const requiredDeps = Object.keys(packageJson.dependencies || {});

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

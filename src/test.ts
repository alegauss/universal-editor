#!/usr/bin/env node

/**
 * Simple validation test for universal-editor.ts
 * Checks that the file structure is correct and imports are valid
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const tsFilePath = join(process.cwd(), 'src', 'universal-editor.ts');
const jsFilePath = join(process.cwd(), 'dist', 'universal-editor.min.js');

console.log('🧪 Testing universal-editor...\n');

// Test TypeScript source
console.log('Testing TypeScript source:\n');

try {
  if (!existsSync(tsFilePath)) {
    console.error(`❌ Source file not found: ${tsFilePath}`);
    process.exit(1);
  }

  const content = readFileSync(tsFilePath, 'utf-8');
  
  // Check for required imports - structured as [importName, packageName] pairs
  const requiredImports: [string, string][] = [
    ['connectToParent', 'penpal'],
    ['create', 'zustand'],
    ['EditorState', 'prosemirror-state'],
    ['EditorView', 'prosemirror-view'],
    ['Schema', 'prosemirror-model']
  ];
  
  let missingImports: string[] = [];
  let foundImports: string[] = [];
  
  for (const [importName, packageName] of requiredImports) {
    if (content.includes(importName) && content.includes(packageName)) {
      foundImports.push(`${importName} from ${packageName}`);
      console.log(`✅ Found import: ${importName} from ${packageName}`);
    } else {
      missingImports.push(`${importName} from ${packageName}`);
      console.log(`❌ Missing import: ${importName} from ${packageName}`);
    }
  }
  
  // Check for key functions
  const requiredFunctions = [
    'createProseMirrorEditor',
    'initializeTinyMCE',
    'triggerEvent',
    'setupEventHandlers',
    'initializeApp'
  ];
  
  let missingFunctions: string[] = [];
  let foundFunctions: string[] = [];
  
  console.log('\nChecking for key functions:');
  for (const func of requiredFunctions) {
    if (content.includes(`function ${func}`) || content.includes(`const ${func} =`)) {
      foundFunctions.push(func);
      console.log(`✅ Found function: ${func}`);
    } else {
      missingFunctions.push(func);
      console.log(`❌ Missing function: ${func}`);
    }
  }
  
  // Check for constants
  const requiredConstants = [
    'EditorMode',
    'ContentType',
    'AttributeNames',
    'Events'
  ];
  
  let missingConstants: string[] = [];
  let foundConstants: string[] = [];
  
  console.log('\nChecking for constants:');
  for (const constant of requiredConstants) {
    if (content.includes(`const ${constant}`)) {
      foundConstants.push(constant);
      console.log(`✅ Found constant: ${constant}`);
    } else {
      missingConstants.push(constant);
      console.log(`❌ Missing constant: ${constant}`);
    }
  }

  // Check for TypeScript types
  const requiredTypes = [
    'EditorMethods',
    'EditableInfo',
    'RTEConfig',
    'EditorStore'
  ];

  let missingTypes: string[] = [];
  let foundTypes: string[] = [];

  console.log('\nChecking for TypeScript types:');
  for (const type of requiredTypes) {
    if (content.includes(`interface ${type}`) || content.includes(`type ${type}`)) {
      foundTypes.push(type);
      console.log(`✅ Found type: ${type}`);
    } else {
      missingTypes.push(type);
      console.log(`❌ Missing type: ${type}`);
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TypeScript Source Test Summary');
  console.log('='.repeat(50));
  
  const totalChecks = foundImports.length + foundFunctions.length + foundConstants.length + foundTypes.length;
  const totalItems = requiredImports.length + requiredFunctions.length + requiredConstants.length + requiredTypes.length;
  
  console.log(`✅ Passed: ${totalChecks}/${totalItems}`);
  console.log(`❌ Failed: ${totalItems - totalChecks}/${totalItems}`);
  
  if (missingImports.length === 0 && missingFunctions.length === 0 && missingConstants.length === 0 && missingTypes.length === 0) {
    console.log('\n🎉 All TypeScript source checks passed!');
    
    // Check file size
    const sizeKB = (content.length / 1024).toFixed(2);
    console.log(`\n📦 TypeScript source size: ${sizeKB} KB`);
  } else {
    console.log('\n⚠️  Some checks failed. Please review the missing items above.');
    process.exit(1);
  }

  // Test built JavaScript
  console.log('\n' + '='.repeat(50));
  console.log('Testing built JavaScript bundle:\n');

  if (existsSync(jsFilePath)) {
    const builtContent = readFileSync(jsFilePath, 'utf-8');
    const builtSizeKB = (builtContent.length / 1024).toFixed(2);
    console.log(`✅ Built bundle exists: dist/universal-editor.min.js`);
    console.log(`📦 Minified bundle size: ${builtSizeKB} KB`);
    console.log(`   (includes all dependencies bundled and minified)`);
    
    console.log('\n✨ All tests passed successfully!');
    process.exit(0);
  } else {
    console.log('⚠️  Built bundle not found. Run: npm run build');
    console.log('\n✨ TypeScript source validation passed!');
    process.exit(0);
  }
  
} catch (error) {
  console.error('❌ Error reading file:', (error as Error).message);
  process.exit(1);
}

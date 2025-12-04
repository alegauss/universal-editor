#!/usr/bin/env node

/**
 * Simple validation test for universal-editor.js
 * Checks that the file structure is correct and imports are valid
 */

import { readFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'universal-editor.js');

console.log('🧪 Testing universal-editor.js...\n');

try {
  const content = readFileSync(filePath, 'utf-8');
  
  // Check for required imports
  const requiredImports = [
    'connectToParent',
    'penpal',
    'create',
    'zustand',
    'EditorState',
    'prosemirror-state',
    'EditorView',
    'prosemirror-view',
    'Schema',
    'prosemirror-model'
  ];
  
  let missingImports = [];
  let foundImports = [];
  
  for (let i = 0; i < requiredImports.length; i += 2) {
    const importName = requiredImports[i];
    const packageName = requiredImports[i + 1];
    
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
  
  let missingFunctions = [];
  let foundFunctions = [];
  
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
  
  let missingConstants = [];
  let foundConstants = [];
  
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
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Summary');
  console.log('='.repeat(50));
  
  const totalChecks = foundImports.length + foundFunctions.length + foundConstants.length;
  const totalItems = requiredImports.length / 2 + requiredFunctions.length + requiredConstants.length;
  
  console.log(`✅ Passed: ${totalChecks}/${totalItems}`);
  console.log(`❌ Failed: ${totalItems - totalChecks}/${totalItems}`);
  
  if (missingImports.length === 0 && missingFunctions.length === 0 && missingConstants.length === 0) {
    console.log('\n🎉 All checks passed! The file structure looks good.');
    
    // Check file size
    const sizeKB = (content.length / 1024).toFixed(2);
    console.log(`\n📦 File size: ${sizeKB} KB`);
    console.log(`   (Original minified: ~596 KB)`);
    console.log(`   Reduction: ~${(((596 - sizeKB) / 596) * 100).toFixed(1)}% smaller`);
    
    process.exit(0);
  } else {
    console.log('\n⚠️  Some checks failed. Please review the missing items above.');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error reading file:', error.message);
  process.exit(1);
}

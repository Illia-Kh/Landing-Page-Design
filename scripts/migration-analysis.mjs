#!/usr/bin/env node
/**
 * Migration Analysis Script
 * Analyzes the current React + Vite project for Next.js migration readiness
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Analysis patterns
const patterns = {
  clientSideHooks: /use(State|Effect|Reducer|Context|Callback|Memo|Ref|ImperativeHandle|LayoutEffect|DebugValue)/g,
  framerMotion: /import.*motion|from ['"]framer-motion['"]/g,
  documentAccess: /document\./g,
  windowAccess: /window\./g,
  localStorageAccess: /localStorage\./g,
  routerUsage: /Router|Route(?!r)/g,
  seoManipulation: /document\.title|document\.head/g,
  dynamicImports: /import\(/g,
  reactDomRender: /ReactDOM\.render|createRoot/g,
  useClientDirective: /"use client"/g
};

// File extensions to analyze
const extensions = ['.tsx', '.ts'];

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);
  
  const analysis = {
    path: relativePath,
    needsUseClient: false,
    reasons: [],
    imports: [],
    exports: []
  };

  // Check for client-side patterns
  Object.entries(patterns).forEach(([patternName, regex]) => {
    const matches = content.match(regex);
    if (matches) {
      analysis.needsUseClient = true;
      analysis.reasons.push({
        pattern: patternName,
        count: matches.length,
        matches: matches.slice(0, 3) // First 3 matches
      });
    }
  });

  // Extract imports
  const importPattern = /import\s+(?:(?:(?:\w+)|(?:{[^}]+}))\s+from\s+)?['"]([^'"]+)['"]/g;
  let importMatch;
  while ((importMatch = importPattern.exec(content)) !== null) {
    analysis.imports.push(importMatch[1]);
  }

  // Extract exports
  const exportPattern = /export\s+(?:default\s+)?(?:function|class|const|let|var)\s+(\w+)/g;
  let exportMatch;
  while ((exportMatch = exportPattern.exec(content)) !== null) {
    analysis.exports.push(exportMatch[1]);
  }

  return analysis;
}

function findFiles(dir, extensions) {
  const files = [];
  
  function scanDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDir(fullPath);
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  scanDir(dir);
  return files;
}

function generateReport() {
  console.log('🔍 Analyzing React + Vite project for Next.js migration...\n');
  
  const srcDir = path.join(process.cwd(), 'src');
  const files = findFiles(srcDir, extensions);
  
  const results = files.map(analyzeFile);
  
  // Statistics
  const stats = {
    total: results.length,
    needsUseClient: results.filter(r => r.needsUseClient).length,
    serverCompatible: results.filter(r => !r.needsUseClient).length
  };

  console.log('📊 Migration Analysis Summary');
  console.log('===============================');
  console.log(`Total files analyzed: ${stats.total}`);
  console.log(`Files needing "use client": ${stats.needsUseClient}`);
  console.log(`Server-compatible files: ${stats.serverCompatible}`);
  console.log(`Migration complexity: ${stats.needsUseClient > stats.total * 0.7 ? '🔴 High' : stats.needsUseClient > stats.total * 0.3 ? '🟡 Medium' : '🟢 Low'}\n`);

  // Files requiring "use client"
  const clientFiles = results.filter(r => r.needsUseClient);
  if (clientFiles.length > 0) {
    console.log('🛠️  Files requiring "use client" directive:');
    console.log('==========================================');
    
    clientFiles.forEach(file => {
      console.log(`\n📁 ${file.path}`);
      file.reasons.forEach(reason => {
        console.log(`   ⚠️  ${reason.pattern}: ${reason.count} occurrences`);
        if (reason.matches.length > 0) {
          console.log(`      Examples: ${reason.matches.join(', ')}`);
        }
      });
    });
  }

  // Server-compatible files
  const serverFiles = results.filter(r => !r.needsUseClient);
  if (serverFiles.length > 0) {
    console.log('\n\n✅ Server-compatible files (can remain as Server Components):');
    console.log('============================================================');
    serverFiles.forEach(file => {
      console.log(`   📁 ${file.path}`);
    });
  }

  // Pattern frequency analysis
  console.log('\n\n📈 Pattern Frequency Analysis:');
  console.log('==============================');
  
  const patternCounts = {};
  results.forEach(result => {
    result.reasons.forEach(reason => {
      patternCounts[reason.pattern] = (patternCounts[reason.pattern] || 0) + reason.count;
    });
  });

  Object.entries(patternCounts)
    .sort(([,a], [,b]) => b - a)
    .forEach(([pattern, count]) => {
      console.log(`   ${pattern}: ${count} occurrences`);
    });

  // Generate migration checklist
  console.log('\n\n📋 Migration Checklist:');
  console.log('=======================');
  
  const checklist = [
    '- [ ] Install Next.js dependencies (next, react, react-dom)',
    '- [ ] Create app/ directory structure',
    '- [ ] Configure next.config.js',
    '- [ ] Set up TypeScript configuration',
    '- [ ] Migrate global styles (index.css → globals.css)',
    `- [ ] Add "use client" directive to ${stats.needsUseClient} files`,
    '- [ ] Replace custom Router with Next.js App Router',
    '- [ ] Convert SEO components to metadata API',
    '- [ ] Set up i18n routing middleware',
    '- [ ] Migrate Vite plugins to Next.js equivalents',
    '- [ ] Update build and deployment scripts',
    '- [ ] Test all routes and functionality'
  ];

  checklist.forEach(item => console.log(item));

  // Save detailed report
  const reportPath = path.join(process.cwd(), 'migration-analysis.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    stats,
    files: results,
    patterns: patternCounts
  }, null, 2));
  
  console.log(`\n💾 Detailed analysis saved to: ${reportPath}`);
}

// Run analysis
generateReport();
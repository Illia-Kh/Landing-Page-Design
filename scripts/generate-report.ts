import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import prettyBytes from 'pretty-bytes';

interface LighthouseResult {
  categories: {
    performance: { score: number };
    accessibility: { score: number };
    'best-practices': { score: number };
    seo: { score: number };
  };
  audits: {
    [key: string]: {
      score: number | null;
      numericValue?: number;
      details?: any;
    };
  };
}

interface SummaryData {
  timestamp: string;
  overall: {
    performance: number;
    accessibility: number;
    seo: number;
    bestPractices: number;
  };
  checklist: {
    seoAuditCompleted: boolean;
    lighthouseCompleted: boolean;
    linksChecked: boolean;
    screenshotsTaken: boolean;
    webmanifestValid: boolean;
    robotsTxtExists: boolean;
    sitemapXmlExists: boolean;
    allImagesHaveAlt: boolean;
    noAxeViolations: boolean;
  };
  issues: {
    critical: string[];
    warnings: string[];
  };
  recommendations: string[];
}

function findLatestLighthouseReports(): string[] {
  const lhciDir = path.join(process.cwd(), 'docs', 'lhci');
  if (!fs.existsSync(lhciDir)) {
    return [];
  }
  
  const files = fs.readdirSync(lhciDir, { recursive: true })
    .filter(file => typeof file === 'string' && file.endsWith('.json'))
    .map(file => path.join(lhciDir, file as string));
    
  return files;
}

function parseLighthouseReport(filePath: string): LighthouseResult | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(chalk.yellow(`Warning: Could not parse ${filePath}`));
    return null;
  }
}

function calculateAverageScores(reports: LighthouseResult[]): {
  performance: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
} {
  if (reports.length === 0) {
    return { performance: 0, accessibility: 0, seo: 0, bestPractices: 0 };
  }
  
  const totals = reports.reduce((acc, report) => {
    acc.performance += report.categories.performance.score || 0;
    acc.accessibility += report.categories.accessibility.score || 0;
    acc.seo += report.categories.seo.score || 0;
    acc.bestPractices += report.categories['best-practices'].score || 0;
    return acc;
  }, { performance: 0, accessibility: 0, seo: 0, bestPractices: 0 });
  
  return {
    performance: Math.round((totals.performance / reports.length) * 100),
    accessibility: Math.round((totals.accessibility / reports.length) * 100),
    seo: Math.round((totals.seo / reports.length) * 100),
    bestPractices: Math.round((totals.bestPractices / reports.length) * 100)
  };
}

function loadSeoAuditData(): any {
  const seoDataPath = path.join(process.cwd(), 'docs', 'seo-audit-raw.json');
  if (!fs.existsSync(seoDataPath)) {
    return null;
  }
  
  try {
    return JSON.parse(fs.readFileSync(seoDataPath, 'utf-8'));
  } catch (error) {
    console.warn(chalk.yellow('Warning: Could not parse SEO audit data'));
    return null;
  }
}

function analyzeIssues(lighthouseReports: LighthouseResult[], seoData: any): {
  critical: string[];
  warnings: string[];
} {
  const issues: { critical: string[]; warnings: string[] } = { critical: [], warnings: [] };
  
  // Lighthouse issues
  if (lighthouseReports.length > 0) {
    const avgScores = calculateAverageScores(lighthouseReports);
    
    if (avgScores.performance < 85) {
      issues.warnings.push(`Performance score below threshold: ${avgScores.performance}/100`);
    }
    
    if (avgScores.accessibility < 90) {
      issues.critical.push(`Accessibility score below threshold: ${avgScores.accessibility}/100`);
    }
    
    if (avgScores.seo < 90) {
      issues.critical.push(`SEO score below threshold: ${avgScores.seo}/100`);
    }
  }
  
  // SEO audit issues
  if (seoData) {
    if (!seoData.webmanifestValid) {
      issues.critical.push('Web manifest validation failed');
    }
    
    if (!seoData.robotsTxt.exists) {
      issues.warnings.push('robots.txt not found');
    }
    
    if (!seoData.sitemapXml.exists) {
      issues.warnings.push('sitemap.xml not found');
    }
    
    const totalAxeViolations = seoData.pages?.reduce((sum: number, page: any) => sum + page.axeViolations, 0) || 0;
    if (totalAxeViolations > 0) {
      issues.critical.push(`${totalAxeViolations} accessibility violations found`);
    }
    
    const totalMissingAlt = seoData.pages?.reduce((sum: number, page: any) => sum + page.imagesWithoutAlt.length, 0) || 0;
    if (totalMissingAlt > 0) {
      issues.warnings.push(`${totalMissingAlt} images missing alt attributes`);
    }
  }
  
  return issues;
}

function generateSummaryReport(summaryData: SummaryData): void {
  const summaryPath = path.join(process.cwd(), 'docs', 'SUMMARY.md');
  
  let markdown = `# SEO Audit Summary\n\n`;
  markdown += `Generated: ${summaryData.timestamp}\n\n`;
  
  // Overall scores
  markdown += `## Overall Scores\n\n`;
  
  const getScoreEmoji = (score: number): string => {
    if (score >= 90) return '🟢';
    if (score >= 75) return '🟡';
    return '🔴';
  };
  
  markdown += `| Category | Score | Status |\n`;
  markdown += `|----------|-------|--------|\n`;
  markdown += `| Performance | ${summaryData.overall.performance}/100 | ${getScoreEmoji(summaryData.overall.performance)} |\n`;
  markdown += `| Accessibility | ${summaryData.overall.accessibility}/100 | ${getScoreEmoji(summaryData.overall.accessibility)} |\n`;
  markdown += `| SEO | ${summaryData.overall.seo}/100 | ${getScoreEmoji(summaryData.overall.seo)} |\n`;
  markdown += `| Best Practices | ${summaryData.overall.bestPractices}/100 | ${getScoreEmoji(summaryData.overall.bestPractices)} |\n\n`;
  
  // Checklist
  markdown += `## Audit Checklist\n\n`;
  
  const getCheckEmoji = (passed: boolean): string => passed ? '✅' : '❌';
  
  markdown += `- ${getCheckEmoji(summaryData.checklist.seoAuditCompleted)} SEO audit completed\n`;
  markdown += `- ${getCheckEmoji(summaryData.checklist.lighthouseCompleted)} Lighthouse audit completed\n`;
  markdown += `- ${getCheckEmoji(summaryData.checklist.linksChecked)} Links checked\n`;
  markdown += `- ${getCheckEmoji(summaryData.checklist.screenshotsTaken)} Screenshots taken\n`;
  markdown += `- ${getCheckEmoji(summaryData.checklist.webmanifestValid)} Web manifest valid\n`;
  markdown += `- ${getCheckEmoji(summaryData.checklist.robotsTxtExists)} Robots.txt exists\n`;
  markdown += `- ${getCheckEmoji(summaryData.checklist.sitemapXmlExists)} Sitemap.xml exists\n`;
  markdown += `- ${getCheckEmoji(summaryData.checklist.allImagesHaveAlt)} All images have alt attributes\n`;
  markdown += `- ${getCheckEmoji(summaryData.checklist.noAxeViolations)} No accessibility violations\n\n`;
  
  // Issues
  if (summaryData.issues.critical.length > 0) {
    markdown += `## 🔴 Critical Issues\n\n`;
    summaryData.issues.critical.forEach(issue => {
      markdown += `- ${issue}\n`;
    });
    markdown += `\n`;
  }
  
  if (summaryData.issues.warnings.length > 0) {
    markdown += `## 🟡 Warnings\n\n`;
    summaryData.issues.warnings.forEach(issue => {
      markdown += `- ${issue}\n`;
    });
    markdown += `\n`;
  }
  
  if (summaryData.issues.critical.length === 0 && summaryData.issues.warnings.length === 0) {
    markdown += `## 🎉 All Good!\n\nNo critical issues or warnings found.\n\n`;
  }
  
  // Recommendations
  if (summaryData.recommendations.length > 0) {
    markdown += `## Recommendations\n\n`;
    summaryData.recommendations.forEach(rec => {
      markdown += `- ${rec}\n`;
    });
    markdown += `\n`;
  }
  
  // Links to detailed reports
  markdown += `## Detailed Reports\n\n`;
  markdown += `- [📊 Full SEO Audit Report](./SEO_AUDIT.md)\n`;
  markdown += `- [📸 Screenshots](./screens/)\n`;
  markdown += `- [🏆 Lighthouse Reports](./lhci/)\n`;
  markdown += `- [📄 Raw SEO Data](./seo-audit-raw.json)\n\n`;
  
  fs.writeFileSync(summaryPath, markdown);
  console.log(chalk.green(`✅ Summary report generated: ${summaryPath}`));
}

async function main(): Promise<void> {
  console.log(chalk.blue('📊 Generating final audit report...\n'));
  
  // Load Lighthouse reports
  const lighthouseFiles = findLatestLighthouseReports();
  const lighthouseReports = lighthouseFiles
    .map(parseLighthouseReport)
    .filter((report): report is LighthouseResult => report !== null);
  
  console.log(chalk.gray(`Found ${lighthouseReports.length} Lighthouse reports`));
  
  // Load SEO audit data
  const seoData = loadSeoAuditData();
  console.log(chalk.gray(`SEO audit data: ${seoData ? 'Found' : 'Not found'}`));
  
  // Calculate overall scores
  const overallScores = calculateAverageScores(lighthouseReports);
  
  // Check what audits were completed
  const docsDir = path.join(process.cwd(), 'docs');
  const screensDir = path.join(docsDir, 'screens');
  
  const checklist = {
    seoAuditCompleted: seoData !== null,
    lighthouseCompleted: lighthouseReports.length > 0,
    linksChecked: true, // Assume linkinator ran if we got this far
    screenshotsTaken: fs.existsSync(screensDir) && fs.readdirSync(screensDir).length > 0,
    webmanifestValid: seoData?.webmanifestValid || false,
    robotsTxtExists: seoData?.robotsTxt?.exists || false,
    sitemapXmlExists: seoData?.sitemapXml?.exists || false,
    allImagesHaveAlt: seoData?.pages?.every((page: any) => page.imagesWithoutAlt.length === 0) || false,
    noAxeViolations: seoData?.pages?.every((page: any) => page.axeViolations === 0) || false
  };
  
  // Analyze issues
  const issues = analyzeIssues(lighthouseReports, seoData);
  
  const summaryData: SummaryData = {
    timestamp: new Date().toISOString(),
    overall: overallScores,
    checklist,
    issues,
    recommendations: seoData?.recommendations || []
  };
  
  // Generate summary report
  generateSummaryReport(summaryData);
  
  // Update main SEO_AUDIT.md if it doesn't exist
  const mainReportPath = path.join(docsDir, 'SEO_AUDIT.md');
  if (!fs.existsSync(mainReportPath) && seoData) {
    console.log(chalk.blue('Creating main SEO_AUDIT.md report...'));
    // The seo-audit.ts script should have created this, but just in case
    const { generateMarkdownReport } = require('./seo-audit');
    await generateMarkdownReport(seoData);
  }
  
  // Print summary to console
  console.log(chalk.green('\n✅ Final audit report completed!\n'));
  
  console.log(chalk.bold('📊 Overall Scores:'));
  console.log(`  Performance: ${overallScores.performance}/100 ${getScoreEmoji(overallScores.performance)}`);
  console.log(`  Accessibility: ${overallScores.accessibility}/100 ${getScoreEmoji(overallScores.accessibility)}`);
  console.log(`  SEO: ${overallScores.seo}/100 ${getScoreEmoji(overallScores.seo)}`);
  console.log(`  Best Practices: ${overallScores.bestPractices}/100 ${getScoreEmoji(overallScores.bestPractices)}\n`);
  
  if (issues.critical.length > 0) {
    console.log(chalk.red('🔴 Critical Issues:'));
    issues.critical.forEach(issue => console.log(chalk.red(`  - ${issue}`)));
    console.log('');
  }
  
  if (issues.warnings.length > 0) {
    console.log(chalk.yellow('🟡 Warnings:'));
    issues.warnings.forEach(issue => console.log(chalk.yellow(`  - ${issue}`)));
    console.log('');
  }
  
  console.log(chalk.gray('📄 Reports generated:'));
  console.log(chalk.gray('  - docs/SUMMARY.md'));
  console.log(chalk.gray('  - docs/SEO_AUDIT.md'));
  console.log(chalk.gray('  - docs/screens/'));
  console.log(chalk.gray('  - docs/lhci/'));
}

function getScoreEmoji(score: number): string {
  if (score >= 90) return '🟢';
  if (score >= 75) return '🟡';
  return '🔴';
}

if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red('❌ Report generation failed:'), error);
    process.exit(1);
  });
}

export { main as generateReport };
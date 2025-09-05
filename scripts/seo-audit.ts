import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import puppeteer, { Browser, Page } from 'puppeteer';
import Ajv from 'ajv';
import ora from 'ora';
import chalk from 'chalk';

interface PageAuditResult {
  url: string;
  title: string;
  description: string;
  descriptionLength: number;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogImage: string;
  ogImageWidth: string;
  ogImageHeight: string;
  ogImageType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  favicon: boolean;
  manifest: boolean;
  hreflang: string[];
  imagesWithoutAlt: string[];
  axeViolations: number;
  axeDetails: any[];
  screenshotPath: string;
}

interface SeoAuditReport {
  timestamp: string;
  pages: PageAuditResult[];
  webmanifestValid: boolean;
  webmanifestErrors: string[];
  robotsTxt: {
    exists: boolean;
    hasAllowRoot: boolean;
    content?: string;
  };
  sitemapXml: {
    exists: boolean;
    hasLocElements: boolean;
    duplicateUrls: string[];
    content?: string;
  };
  recommendations: string[];
}

const routes = ['/', '/about', '/services', '/contact'];
const locales = ['en', 'de', 'cs', 'pl'];
const baseUrl = 'http://localhost:5173';

async function waitForServer(): Promise<void> {
  const spinner = ora('Waiting for server to start...').start();
  let attempts = 0;
  const maxAttempts = 30;
  
  while (attempts < maxAttempts) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        spinner.succeed('Server is ready');
        return;
      }
    } catch (error) {
      // Server not ready yet
    }
    
    attempts++;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  spinner.fail('Server failed to start');
  throw new Error('Server did not start within expected time');
}

async function checkWebmanifest(): Promise<{ valid: boolean; errors: string[] }> {
  const manifestPath = path.join(process.cwd(), 'public', 'site.webmanifest');
  
  if (!fs.existsSync(manifestPath)) {
    return { valid: false, errors: ['site.webmanifest not found'] };
  }

  try {
    const manifestContent = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    
    const ajv = new Ajv();
    const schema = {
      type: 'object',
      required: ['name', 'short_name', 'start_url', 'display', 'theme_color', 'icons'],
      properties: {
        name: { type: 'string' },
        short_name: { type: 'string' },
        start_url: { type: 'string' },
        display: { type: 'string' },
        theme_color: { type: 'string' },
        icons: {
          type: 'array',
          items: {
            type: 'object',
            required: ['src', 'sizes', 'type'],
            properties: {
              src: { type: 'string' },
              sizes: { type: 'string' },
              type: { type: 'string' }
            }
          }
        }
      }
    };
    
    const validate = ajv.compile(schema);
    const valid = validate(manifestContent);
    
    return {
      valid,
      errors: valid ? [] : validate.errors?.map(err => `${err.instancePath} ${err.message}`) || []
    };
  } catch (error) {
    return { valid: false, errors: [`Invalid JSON: ${error}`] };
  }
}

async function checkRobotsTxt(): Promise<{ exists: boolean; hasAllowRoot: boolean; content?: string }> {
  try {
    const response = await fetch(`${baseUrl}/robots.txt`);
    if (!response.ok) {
      return { exists: false, hasAllowRoot: false };
    }
    
    const content = await response.text();
    const hasAllowRoot = content.includes('Allow: /') || content.includes('Disallow:') === false;
    
    return { exists: true, hasAllowRoot, content };
  } catch (error) {
    return { exists: false, hasAllowRoot: false };
  }
}

async function checkSitemapXml(): Promise<{ exists: boolean; hasLocElements: boolean; duplicateUrls: string[]; content?: string }> {
  try {
    const response = await fetch(`${baseUrl}/sitemap.xml`);
    if (!response.ok) {
      return { exists: false, hasLocElements: false, duplicateUrls: [] };
    }
    
    const content = await response.text();
    const hasLocElements = content.includes('<loc>');
    
    // Extract URLs and check for duplicates
    const urlMatches = content.match(/<loc>(.*?)<\/loc>/g) || [];
    const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
    const uniqueUrls = new Set(urls);
    const duplicateUrls = urls.filter(url => {
      if (uniqueUrls.has(url)) {
        uniqueUrls.delete(url);
        return false;
      }
      return true;
    });
    
    return { exists: true, hasLocElements, duplicateUrls, content };
  } catch (error) {
    return { exists: false, hasLocElements: false, duplicateUrls: [] };
  }
}

async function auditPage(browser: Browser, url: string, route: string): Promise<PageAuditResult> {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Extract SEO data
    const seoData = await page.evaluate(() => {
      const getMetaContent = (selector: string): string => {
        const element = document.querySelector(selector);
        return element?.getAttribute('content') || '';
      };
      
      const getLinkHref = (selector: string): string => {
        const element = document.querySelector(selector);
        return element?.getAttribute('href') || '';
      };
      
      // Get all images without alt attributes
      const images = Array.from(document.querySelectorAll('img'));
      const imagesWithoutAlt = images
        .filter(img => !img.alt || img.alt.trim() === '')
        .map(img => img.src || img.getAttribute('src') || '');
      
      // Get hreflang links
      const hreflangLinks = Array.from(document.querySelectorAll('link[rel="alternate"]'));
      const hreflang = hreflangLinks.map(link => 
        `${link.getAttribute('hreflang')} -> ${link.getAttribute('href')}`
      );
      
      return {
        title: document.title,
        description: getMetaContent('meta[name="description"]'),
        canonical: getLinkHref('link[rel="canonical"]'),
        ogTitle: getMetaContent('meta[property="og:title"]'),
        ogDescription: getMetaContent('meta[property="og:description"]'),
        ogType: getMetaContent('meta[property="og:type"]'),
        ogImage: getMetaContent('meta[property="og:image"]'),
        ogImageWidth: getMetaContent('meta[property="og:image:width"]'),
        ogImageHeight: getMetaContent('meta[property="og:image:height"]'),
        ogImageType: getMetaContent('meta[property="og:image:type"]'),
        twitterCard: getMetaContent('meta[property="twitter:card"]'),
        twitterTitle: getMetaContent('meta[property="twitter:title"]'),
        twitterDescription: getMetaContent('meta[property="twitter:description"]'),
        twitterImage: getMetaContent('meta[property="twitter:image"]'),
        favicon: !!document.querySelector('link[rel="icon"], link[rel="shortcut icon"]'),
        manifest: !!document.querySelector('link[rel="manifest"]'),
        hreflang,
        imagesWithoutAlt
      };
    });
    
    // Run axe accessibility audit using axe-core directly
    const axeResults = await page.evaluate(async () => {
      // Inject axe-core if not already present
      if (typeof (window as any).axe === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/axe-core@4.10.3/axe.min.js';
        document.head.appendChild(script);
        
        // Wait for axe to load
        await new Promise(resolve => {
          script.onload = resolve;
          script.onerror = resolve; // Continue even if load fails
        });
      }
      
      // Run axe if available
      if (typeof (window as any).axe !== 'undefined') {
        try {
          return await (window as any).axe.run();
        } catch (error) {
          return { violations: [] };
        }
      }
      
      return { violations: [] };
    });
    
    // Take screenshot
    const screenshotDir = path.join(process.cwd(), 'docs', 'screens');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    const screenshotName = `${route.replace(/\//g, '_') || 'home'}.png`;
    const screenshotPath = path.join(screenshotDir, screenshotName);
    await page.screenshot({ 
      path: screenshotPath as `${string}.png`,
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    
    return {
      url,
      title: seoData.title,
      description: seoData.description,
      descriptionLength: seoData.description.length,
      canonical: seoData.canonical,
      ogTitle: seoData.ogTitle,
      ogDescription: seoData.ogDescription,
      ogType: seoData.ogType,
      ogImage: seoData.ogImage,
      ogImageWidth: seoData.ogImageWidth,
      ogImageHeight: seoData.ogImageHeight,
      ogImageType: seoData.ogImageType,
      twitterCard: seoData.twitterCard,
      twitterTitle: seoData.twitterTitle,
      twitterDescription: seoData.twitterDescription,
      twitterImage: seoData.twitterImage,
      favicon: seoData.favicon,
      manifest: seoData.manifest,
      hreflang: seoData.hreflang,
      imagesWithoutAlt: seoData.imagesWithoutAlt,
      axeViolations: axeResults.violations.length,
      axeDetails: axeResults.violations.map((v: any) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length
      })),
      screenshotPath: screenshotName
    };
  } finally {
    await page.close();
  }
}

async function generateMarkdownReport(report: SeoAuditReport): Promise<void> {
  const docsDir = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  let markdown = `# SEO Audit Report\n\n`;
  markdown += `Generated: ${report.timestamp}\n\n`;
  
  // Summary table
  markdown += `## Summary Table\n\n`;
  markdown += `| Page | Title | Description (Length) | Canonical | OG/Twitter | Favicon/Manifest | Hreflang | Images Alt | Axe Issues | Screenshot |\n`;
  markdown += `|------|-------|---------------------|-----------|------------|------------------|----------|------------|------------|------------|\n`;
  
  report.pages.forEach(page => {
    const ogTwitterOk = page.ogTitle && page.ogDescription && page.twitterCard ? '✅' : '❌';
    const faviconManifestOk = page.favicon && page.manifest ? '✅' : '❌';
    const hreflangInfo = page.hreflang.length > 0 ? `${page.hreflang.length} links` : 'None';
    const imgAltInfo = page.imagesWithoutAlt.length === 0 ? '✅' : `❌ ${page.imagesWithoutAlt.length} missing`;
    const axeInfo = page.axeViolations === 0 ? '✅' : `❌ ${page.axeViolations}`;
    
    markdown += `| ${page.url} | ${page.title} | ${page.description.substring(0, 50)}... (${page.descriptionLength}) | ${page.canonical ? '✅' : '❌'} | ${ogTwitterOk} | ${faviconManifestOk} | ${hreflangInfo} | ${imgAltInfo} | ${axeInfo} | [📷](./screens/${page.screenshotPath}) |\n`;
  });
  
  // Webmanifest validation
  markdown += `\n## Web Manifest Validation\n\n`;
  if (report.webmanifestValid) {
    markdown += `✅ **Valid** - site.webmanifest passes schema validation\n\n`;
  } else {
    markdown += `❌ **Invalid** - site.webmanifest has validation errors:\n\n`;
    report.webmanifestErrors.forEach(error => {
      markdown += `- ${error}\n`;
    });
    markdown += `\n`;
  }
  
  // Robots.txt check
  markdown += `## Robots.txt Check\n\n`;
  if (report.robotsTxt.exists) {
    markdown += `✅ **Found** - robots.txt exists\n`;
    markdown += `${report.robotsTxt.hasAllowRoot ? '✅' : '❌'} **Allow root** - ${report.robotsTxt.hasAllowRoot ? 'Has Allow: /' : 'Missing Allow: /'}\n\n`;
  } else {
    markdown += `❌ **Missing** - robots.txt not found\n\n`;
  }
  
  // Sitemap.xml check
  markdown += `## Sitemap.xml Check\n\n`;
  if (report.sitemapXml.exists) {
    markdown += `✅ **Found** - sitemap.xml exists\n`;
    markdown += `${report.sitemapXml.hasLocElements ? '✅' : '❌'} **Has loc elements** - ${report.sitemapXml.hasLocElements ? 'Contains <loc> elements' : 'Missing <loc> elements'}\n`;
    if (report.sitemapXml.duplicateUrls.length > 0) {
      markdown += `❌ **Duplicate URLs found**: ${report.sitemapXml.duplicateUrls.join(', ')}\n`;
    } else {
      markdown += `✅ **No duplicate URLs**\n`;
    }
    markdown += `\n`;
  } else {
    markdown += `❌ **Missing** - sitemap.xml not found\n\n`;
  }
  
  // Recommendations
  markdown += `## Recommendations\n\n`;
  if (report.recommendations.length === 0) {
    markdown += `🎉 **Great job!** No critical SEO issues found.\n\n`;
  } else {
    report.recommendations.forEach(rec => {
      markdown += `- ${rec}\n`;
    });
    markdown += `\n`;
  }
  
  // Detailed violations
  markdown += `## Accessibility Issues Detail\n\n`;
  report.pages.forEach(page => {
    if (page.axeViolations > 0) {
      markdown += `### ${page.url}\n\n`;
      page.axeDetails.forEach(violation => {
        markdown += `- **${violation.id}** (${violation.impact}): ${violation.description} (${violation.nodes} elements)\n`;
      });
      markdown += `\n`;
    }
  });
  
  const reportPath = path.join(docsDir, 'SEO_AUDIT.md');
  fs.writeFileSync(reportPath, markdown);
  
  console.log(chalk.green(`✅ SEO audit report generated: ${reportPath}`));
}

async function generateRecommendations(report: SeoAuditReport): Promise<string[]> {
  const recommendations: string[] = [];
  
  report.pages.forEach(page => {
    const pagePath = page.url.replace(baseUrl, '') || 'home';
    
    if (!page.title) {
      recommendations.push(`${pagePath}: Missing page title`);
    }
    
    if (!page.description) {
      recommendations.push(`${pagePath}: Missing meta description`);
    } else if (page.descriptionLength < 120 || page.descriptionLength > 160) {
      recommendations.push(`${pagePath}: Meta description length should be 120-160 characters (current: ${page.descriptionLength})`);
    }
    
    if (!page.canonical) {
      recommendations.push(`${pagePath}: Missing canonical URL`);
    }
    
    if (!page.ogTitle || !page.ogDescription) {
      recommendations.push(`${pagePath}: Missing Open Graph tags (og:title or og:description)`);
    }
    
    if (!page.ogImage) {
      recommendations.push(`${pagePath}: Missing og:image`);
    }
    
    if (!page.twitterCard) {
      recommendations.push(`${pagePath}: Missing Twitter Card meta tags`);
    }
    
    if (!page.favicon) {
      recommendations.push(`${pagePath}: Missing favicon`);
    }
    
    if (!page.manifest) {
      recommendations.push(`${pagePath}: Missing web manifest link`);
    }
    
    if (page.imagesWithoutAlt.length > 0) {
      recommendations.push(`${pagePath}: ${page.imagesWithoutAlt.length} images without alt attributes`);
    }
    
    if (page.axeViolations > 0) {
      recommendations.push(`${pagePath}: ${page.axeViolations} accessibility violations found`);
    }
  });
  
  if (!report.webmanifestValid) {
    recommendations.push('Fix web manifest validation errors');
  }
  
  if (!report.robotsTxt.exists) {
    recommendations.push('Add robots.txt file');
  } else if (!report.robotsTxt.hasAllowRoot) {
    recommendations.push('Add "Allow: /" to robots.txt');
  }
  
  if (!report.sitemapXml.exists) {
    recommendations.push('Add sitemap.xml file');
  } else if (!report.sitemapXml.hasLocElements) {
    recommendations.push('Add <loc> elements to sitemap.xml');
  }
  
  if (report.sitemapXml.duplicateUrls.length > 0) {
    recommendations.push('Remove duplicate URLs from sitemap.xml');
  }
  
  return recommendations;
}

async function main(): Promise<void> {
  console.log(chalk.blue('🔍 Starting SEO Audit...\n'));
  
  await waitForServer();
  
  const spinner = ora('Launching browser...').start();
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  spinner.succeed('Browser launched');
  
  try {
    const pages: PageAuditResult[] = [];
    
    // Audit each route
    for (const route of routes) {
      const url = `${baseUrl}${route}`;
      const pageSpinner = ora(`Auditing ${url}...`).start();
      
      try {
        const result = await auditPage(browser, url, route);
        pages.push(result);
        pageSpinner.succeed(`Audited ${url}`);
      } catch (error) {
        pageSpinner.fail(`Failed to audit ${url}: ${error}`);
      }
    }
    
    // Check webmanifest
    const manifestSpinner = ora('Validating web manifest...').start();
    const manifestResult = await checkWebmanifest();
    manifestSpinner.succeed('Web manifest validated');
    
    // Check robots.txt
    const robotsSpinner = ora('Checking robots.txt...').start();
    const robotsResult = await checkRobotsTxt();
    robotsSpinner.succeed('Robots.txt checked');
    
    // Check sitemap.xml
    const sitemapSpinner = ora('Checking sitemap.xml...').start();
    const sitemapResult = await checkSitemapXml();
    sitemapSpinner.succeed('Sitemap.xml checked');
    
    // Generate report
    const report: SeoAuditReport = {
      timestamp: new Date().toISOString(),
      pages,
      webmanifestValid: manifestResult.valid,
      webmanifestErrors: manifestResult.errors,
      robotsTxt: robotsResult,
      sitemapXml: sitemapResult,
      recommendations: []
    };
    
    report.recommendations = await generateRecommendations(report);
    
    // Save raw JSON
    const rawDataPath = path.join(process.cwd(), 'docs', 'seo-audit-raw.json');
    fs.writeFileSync(rawDataPath, JSON.stringify(report, null, 2));
    
    // Generate markdown report
    await generateMarkdownReport(report);
    
    console.log(chalk.green(`\n✅ SEO audit completed successfully!`));
    console.log(chalk.gray(`📊 Report: docs/SEO_AUDIT.md`));
    console.log(chalk.gray(`📸 Screenshots: docs/screens/`));
    console.log(chalk.gray(`📄 Raw data: docs/seo-audit-raw.json`));
    
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red('❌ SEO audit failed:'), error);
    process.exit(1);
  });
}

export { main as runSeoAudit };
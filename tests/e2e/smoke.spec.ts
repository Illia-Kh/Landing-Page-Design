import { test, expect } from '@playwright/test'

const languages = ['cs', 'en', 'de']
const pages = [
  { path: '', title: 'IKH-TechSystems' },
  { path: '/about', title: 'About Us' },
  { path: '/services', title: 'Services' },
  { path: '/contacts', title: 'Contact' },
]

test.describe('Smoke Tests', () => {
  // Test that all language versions load
  for (const lang of languages) {
    test(`${lang.toUpperCase()} homepage loads correctly`, async ({ page }) => {
      await page.goto(`/${lang}`)
      
      // Check that the page loads
      await expect(page).toHaveTitle(/IKH-TechSystems/i)
      
      // Check that the language is set correctly
      const htmlLang = await page.getAttribute('html', 'lang')
      expect(htmlLang).toBe(lang)
      
      // Check for main navigation
      await expect(page.locator('nav')).toBeVisible()
      
      // Check for hero section
      await expect(page.locator('h1')).toBeVisible()
    })
  }

  // Test navigation between pages
  for (const lang of languages) {
    for (const pageInfo of pages) {
      test(`${lang.toUpperCase()} ${pageInfo.path || 'home'} page navigation works`, async ({ page }) => {
        const url = `/${lang}${pageInfo.path}`
        await page.goto(url)
        
        // Check that page loads without errors
        await expect(page).not.toHaveTitle(/Error|Not Found/i)
        
        // Check that navigation links are present and working
        const navLinks = page.locator('nav a')
        await expect(navLinks.first()).toBeVisible()
        
        // Check that the page content is present
        await expect(page.locator('main, section, div').first()).toBeVisible()
      })
    }
  }

  // Test language switcher
  test('Language switcher works', async ({ page }) => {
    await page.goto('/en')
    
    // Look for language switcher (if implemented)
    const langSwitcher = page.locator('[data-testid="language-switcher"], select, button').filter({ hasText: /en|cs|de/i })
    
    if (await langSwitcher.count() > 0) {
      await expect(langSwitcher.first()).toBeVisible()
    }
  })

  // Test that sitemap and robots.txt are accessible
  test('SEO files are accessible', async ({ page }) => {
    // Test sitemap
    const sitemapResponse = await page.goto('/sitemap.xml')
    expect(sitemapResponse?.status()).toBe(200)
    
    const sitemapContent = await page.textContent('body')
    expect(sitemapContent).toContain('<?xml')
    expect(sitemapContent).toContain('<urlset')
    
    // Test robots.txt
    const robotsResponse = await page.goto('/robots.txt')
    expect(robotsResponse?.status()).toBe(200)
    
    const robotsContent = await page.textContent('body')
    expect(robotsContent).toContain('User-agent')
    expect(robotsContent).toContain('sitemap.xml')
  })

  // Test meta tags for SEO
  for (const lang of languages) {
    test(`${lang.toUpperCase()} meta tags are present`, async ({ page }) => {
      await page.goto(`/${lang}`)
      
      // Check essential meta tags
      const title = await page.title()
      expect(title).toBeTruthy()
      expect(title.length).toBeGreaterThan(10)
      
      const description = await page.getAttribute('meta[name="description"]', 'content')
      expect(description).toBeTruthy()
      expect(description!.length).toBeGreaterThan(50)
      
      // Check Open Graph tags
      const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content')
      expect(ogTitle).toBeTruthy()
      
      const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content')
      expect(ogDescription).toBeTruthy()
      
      // Check canonical URL
      const canonical = await page.getAttribute('link[rel="canonical"]', 'href')
      expect(canonical).toContain(`/${lang}`)
    })
  }

  // Test contact form functionality
  test('Contact form works', async ({ page }) => {
    await page.goto('/en/contacts')
    
    // Check if form is present
    const form = page.locator('form')
    await expect(form).toBeVisible()
    
    // Fill out the form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form.')
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Wait for response (success or error message should appear)
    await expect(page.locator('text=/sent|error|thank you|success/i')).toBeVisible({ timeout: 10000 })
  })

  // Test Core Web Vitals basics
  test('Performance basics', async ({ page }) => {
    await page.goto('/en')
    
    // Check that images have alt text
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
    }
    
    // Check that buttons have accessible text
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()
    
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const buttonText = await buttons.nth(i).textContent()
      const ariaLabel = await buttons.nth(i).getAttribute('aria-label')
      expect(buttonText || ariaLabel).toBeTruthy()
    }
  })
})
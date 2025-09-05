# 🚀 IKH-TechSystems - Landing Page

Modern, SEO-optimized landing page for IKH-TechSystems with multilingual support, automated auditing, and cutting-edge web technologies.

![Preview](./public/preview.jpg)

## ✨ Features

- **🌍 Multilingual Support**: English, German, Czech, Polish
- **🔍 Advanced SEO**: Dynamic meta tags, Open Graph, Twitter Cards, structured data
- **📱 Progressive Web App**: Web manifest, service worker, offline support
- **♿ Accessibility First**: WCAG compliance, semantic HTML, proper ARIA labels
- **🎨 Modern Design**: Tailwind CSS, Framer Motion animations, responsive design
- **🚀 Performance Optimized**: Code splitting, lazy loading, Core Web Vitals monitoring
- **🔧 SEO Auditing**: Automated Lighthouse, accessibility, and SEO checks
- **📊 Analytics Ready**: Performance monitoring and tracking

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite 5
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **SEO**: Custom SEO components with meta tag management
- **PWA**: Vite PWA plugin
- **Auditing**: Puppeteer, Lighthouse CI, Axe-core
- **Testing**: Jest, Lighthouse CI

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 SEO & Auditing

### Running Audits

The project includes comprehensive SEO, accessibility, and performance auditing:

```bash
# Run complete audit suite
npm run check

# Individual audit commands
npm run audit:seo      # SEO and accessibility audit
npm run audit:lh:ci    # Lighthouse CI audit
npm run audit:links    # Link checking
npm run report         # Generate final report
```

### Audit Reports

After running `npm run check`, you'll find reports in the `docs/` directory:

- `docs/SEO_AUDIT.md` - Comprehensive SEO analysis
- `docs/SUMMARY.md` - Quick overview with scores
- `docs/screens/` - Above-the-fold screenshots
- `docs/lhci/` - Lighthouse CI reports

### SEO Configuration

Edit SEO metadata in `src/components/SEO.tsx`:

```tsx
// Dynamic SEO for each page and language
const seoContent = {
  title: "Your Page Title",
  description: "Your meta description (120-160 chars)",
  keywords: "relevant, keywords, here",
  url: "https://yourdomain.com/page",
  language: "en" // en, de, cs, pl
};
```

### Adding Images with Alt Text

Always include descriptive alt attributes:

```tsx
<img 
  src="/path/to/image.jpg" 
  alt="Descriptive alt text for accessibility"
  className="..."
/>
```

### Open Graph Images

Add OG images in the SEO component:

```tsx
<SEO 
  title="Page Title"
  description="Page description"
  image="https://yourdomain.com/og-image.jpg"
  url="https://yourdomain.com/page"
/>
```

## 🌍 Internationalization

### Supported Languages

- 🇬🇧 **English** (en) - Default
- 🇩🇪 **German** (de)
- 🇨🇿 **Czech** (cs)
- 🇵🇱 **Polish** (pl)

### Adding New Content

1. Edit translations in `src/i18n/translations.ts`
2. Add language-specific SEO data in `src/App.tsx`
3. Update hreflang links in `src/components/Hreflang.tsx`

### URL Structure

- Default: `https://yourdomain.com/` (English)
- Language-specific: `https://yourdomain.com/?lang=de`
- Auto-detection based on browser language

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── SEO.tsx          # SEO meta tag management
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   └── ...              # Other components
├── pages/               # Page components
│   ├── HomePage.tsx     # Landing page (/)
│   ├── AboutPage.tsx    # About page (/about)
│   ├── ServicesPage.tsx # Services page (/services)
│   └── ContactPage.tsx  # Contact page (/contact)
├── i18n/               # Internationalization
│   ├── translations.ts  # Translation dictionaries
│   └── locales/        # JSON translation files
├── hooks/              # Custom React hooks
├── styles/             # CSS and styling
└── types/              # TypeScript type definitions

public/                 # Static assets
├── favicon.ico         # Favicon
├── site.webmanifest   # PWA manifest
├── robots.txt         # Search engine directives
├── sitemap.xml        # Site structure for search engines
└── preview.jpg        # Social media preview image

scripts/               # Audit and build scripts
├── seo-audit.ts      # SEO and accessibility auditing
├── generate-report.ts # Report generation
└── tsconfig.json     # TypeScript config for scripts

docs/                 # Generated audit reports
├── SEO_AUDIT.md      # Detailed SEO report
├── SUMMARY.md        # Quick audit summary
├── screens/          # Page screenshots
└── lhci/            # Lighthouse CI reports
```

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build           # Production build
npm run preview         # Preview production build
npm run type-check      # TypeScript check

# Code Quality  
npm run lint            # ESLint check
npm run lint:fix        # Fix ESLint issues
npm run format          # Prettier formatting

# Analysis
npm run analyze         # Bundle size analysis
npm run depcheck        # Check unused dependencies
npm run ts-prune        # Find unused TypeScript code

# Testing & Auditing
npm run test            # Run tests
npm run audit:seo       # SEO audit with Puppeteer
npm run audit:lh:ci     # Lighthouse CI
npm run audit:links     # Link validation
npm run audit:all       # Complete audit suite
npm run report          # Generate audit reports
npm run check           # Full audit + report
```

## 🚀 Deployment

### Prerequisites

- Node.js 18+ 
- SSL/HTTPS certificate
- Modern web server (Nginx, Apache, or CDN)

### Build & Deploy

```bash
# 1. Build production assets
npm run build

# 2. Upload dist/ contents to your web server
scp -r dist/* user@server:/var/www/html/

# 3. Configure web server for SPA routing
# Nginx example:
location / {
  try_files $uri $uri/ /index.html;
}

# 4. Set up proper headers
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
```

### Performance Optimization

- **Static Assets**: Enable Gzip/Brotli compression
- **Caching**: Set appropriate cache headers for assets
- **CDN**: Use a CDN for global content delivery
- **Monitoring**: Set up Core Web Vitals monitoring

### SEO Checklist for Production

- [ ] SSL certificate installed (HTTPS)
- [ ] Custom 404 page configured
- [ ] robots.txt accessible at `/robots.txt`
- [ ] sitemap.xml accessible at `/sitemap.xml`
- [ ] Web manifest accessible at `/site.webmanifest`
- [ ] Open Graph images properly sized (1200x630)
- [ ] All images have alt attributes
- [ ] Page load time < 3 seconds
- [ ] Core Web Vitals in green zone
- [ ] Google Search Console configured
- [ ] Analytics tracking implemented

## 📊 Performance Thresholds

The project is configured with the following Lighthouse thresholds:

- **Performance**: ≥85% (warning below)
- **Accessibility**: ≥90% (error below)
- **SEO**: ≥90% (error below)
- **Best Practices**: ≥90% (monitoring)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Run audits: `npm run check`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain 90%+ test coverage
- Ensure all accessibility audits pass
- Keep bundle size optimized
- Document any new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Badges

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Vite](https://img.shields.io/badge/Vite-5.0+-purple.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![React](https://img.shields.io/badge/React-18+-61dafb.svg)
![Lighthouse](https://img.shields.io/badge/Lighthouse-95+-orange.svg)

---

**Built with ❤️ by IKH-TechSystems**

For support, email us at support@ikhsystems.com or visit our [website](https://ikhsystems.com).
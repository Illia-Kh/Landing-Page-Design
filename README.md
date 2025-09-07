# 🚀 IKH-TechSystems — Production-Ready Landing Page

A modern, high-performance landing page built with **Next.js 15**, **App Router**, **TypeScript**, and **Tailwind CSS**. This project features comprehensive SEO optimization, internationalization (i18n), performance monitoring, and production-ready security measures.

## ✨ Key Features

### 🏗️ Modern Architecture
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **ISR (Incremental Static Regeneration)** with 24-hour revalidation

### 🌍 Internationalization (i18n)
- **3 Languages**: Czech (cs), English (en), German (de)
- Localized routes: `/cs`, `/en`, `/de`
- Language-specific metadata and SEO
- Automatic hreflang generation

### 🔍 SEO Optimization
- **Structured Data**: Schema.org JSON-LD (Organization, WebSite, Service)
- **Complete Metadata**: Title, description, keywords, canonical URLs
- **Open Graph & Twitter Cards**: Full social media optimization
- **Sitemap.xml**: Auto-generated with hreflang attributes
- **Robots.txt**: Optimized for search engines
- **Core Web Vitals**: Optimized for performance scores

### 📊 Analytics & Tracking
- **Google Analytics 4** integration
- **Meta Pixel** support
- **Page view tracking** with pathname changes
- **Event tracking** for form submissions
- **Privacy-compliant** analytics

### ⚡ Performance Optimized
- **Next.js Image** optimization (WebP/AVIF)
- **Static Generation** for all pages
- **Chunked bundles** for optimal loading
- **Security headers** implementation
- **Lighthouse Score Targets**: Performance ≥85, SEO ≥90, Accessibility ≥90

### 📝 Contact Form
- **Server Actions** with API routes
- **Client & Server validation**
- **Anti-spam protection** (honeypot + timestamp)
- **Real-time feedback** with proper error handling
- **Analytics tracking** for form submissions

### 🔒 Security & Headers
- **Security Headers**: X-Content-Type-Options, Referrer-Policy, X-Frame-Options
- **HSTS** for HTTPS enforcement
- **CSP-ready** configuration
- **XSS Protection** headers

### 🧪 Testing & QA
- **Playwright E2E tests** for critical user journeys
- **Smoke tests** for all language versions
- **SEO validation** tests
- **Performance monitoring** setup

## 🚀 Quick Start

### Prerequisites
- Node.js ≥20.0.0
- npm ≥9.0.0

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Landing-Page-Design

# Install dependencies
npm install

# Install Playwright browsers (for testing)
npm run test:install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Testing

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Lint code
npm run lint
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── [lang]/            # Internationalized routes
│   │   ├── about/         # About page
│   │   ├── contacts/      # Contact page
│   │   ├── services/      # Services page
│   │   └── layout.tsx     # Language-specific layout
│   ├── api/               # API routes
│   │   └── contact/       # Contact form handler
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── robots.ts          # Robots.txt generator
│   └── sitemap.ts         # Sitemap generator
├── components/            # React components
│   ├── client/           # Client-side components
│   ├── sections/         # Page sections
│   ├── Analytics.tsx     # Google Analytics & Meta Pixel
│   ├── ContactForm.tsx   # Contact form with validation
│   ├── PageViewTracker.tsx # Analytics page tracking
│   └── StructuredData.tsx # Schema.org JSON-LD
├── lib/                  # Utility libraries
│   ├── env.ts           # Environment configuration
│   ├── i18n.ts          # Internationalization
│   └── utils.ts         # Utility functions
├── tests/               # Testing
│   └── e2e/            # End-to-end tests
├── types/              # TypeScript type definitions
├── next.config.mjs     # Next.js configuration
├── playwright.config.ts # Playwright test configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🌐 Environment Configuration

Create `.env.local` file:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXXX
```

## 🔍 SEO Features

### Structured Data
- **Organization Schema**: Company information
- **WebSite Schema**: Site-wide metadata
- **Service Schema**: Individual service descriptions

### Metadata Management
- **Dynamic metadata** generation per page/language
- **Canonical URLs** with proper language mapping
- **Hreflang attributes** for international SEO
- **Open Graph** images and metadata
- **Twitter Cards** optimization

### Performance Optimization
- **Image optimization** with next/image
- **Bundle splitting** for optimal loading
- **Static generation** with ISR
- **Security headers** for improved rankings

## 📊 Analytics & Tracking

### Google Analytics 4
- **Page view tracking** on route changes
- **Event tracking** for user interactions
- **Form submission tracking** with success/error states

### Meta Pixel
- **Page view events**
- **Custom event tracking**
- **Conversion tracking** ready

### Privacy Compliance
- **Consent management** ready
- **GDPR-compliant** tracking
- **Analytics opt-out** support

## 🧪 Testing Strategy

### E2E Tests Coverage
- ✅ All language versions load correctly
- ✅ Navigation between pages works
- ✅ Language switcher functionality
- ✅ SEO files accessibility (sitemap.xml, robots.txt)
- ✅ Meta tags presence and validation
- ✅ Contact form submission
- ✅ Basic accessibility checks
- ✅ Performance basics validation

### Performance Monitoring
- **Lighthouse CI** integration ready
- **Core Web Vitals** monitoring
- **Performance budget** enforcement

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npx vercel

# Set environment variables in Vercel dashboard
```

### Docker
```bash
# Build Docker image
docker build -t landing-page .

# Run container
docker run -p 3000:3000 landing-page
```

### Traditional Hosting
```bash
# Build static export (if needed)
npm run build
# Deploy the .next folder
```

## 🎯 Performance Targets

### Lighthouse Scores
- **Performance**: ≥ 85
- **SEO**: ≥ 90
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 90

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## 📋 Production QA Checklist

### SEO Validation
- [ ] All pages have unique, descriptive titles
- [ ] Meta descriptions are compelling and < 160 characters
- [ ] Canonical URLs are correctly set
- [ ] Hreflang attributes are properly configured
- [ ] Structured data validates on Google's Rich Results Test
- [ ] Sitemap.xml is accessible and contains all pages
- [ ] Robots.txt allows search engine crawling

### Performance Validation
- [ ] Lighthouse Performance score ≥ 85
- [ ] All images are optimized and have alt text
- [ ] Core Web Vitals are within thresholds
- [ ] No render-blocking resources
- [ ] CSS and JS are minified

### Functionality Testing
- [ ] All language versions work correctly
- [ ] Navigation between pages functions properly
- [ ] Contact form submits successfully
- [ ] Error handling works (404, form errors)
- [ ] Mobile responsiveness is optimal

### Analytics & Tracking
- [ ] Google Analytics is tracking page views
- [ ] Form submissions are tracked
- [ ] Analytics consent (if implemented) works
- [ ] Meta Pixel events fire correctly

### Security & Headers
- [ ] Security headers are properly set
- [ ] HTTPS is enforced
- [ ] No sensitive data exposed in client
- [ ] Form validation prevents XSS/injection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support, email contact@ikhsystems.com or create an issue in the repository.

---

**Built with ❤️ by [Illia Khromov](https://github.com/Illia-Kh)**
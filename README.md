# 🚀 IKH-TechSystems — Production-Ready Landing Page v0.3.1

A modern, high-performance landing page built with **Next.js 15**, **App Router**, **TypeScript**, and **Tailwind CSS**. This project features comprehensive SEO optimization, internationalization (i18n), performance monitoring, production-ready security measures, and advanced UI components with dark mode support.

## 🆕 What's New in v0.3.1

### 🎨 Enhanced UI/UX
- **Dark Mode Support**: Complete dark/light theme toggle with system preference detection
- **Hero Carousel**: Interactive image carousel with autoplay and navigation controls
- **Motion Animations**: Smooth Framer Motion animations throughout the interface
- **Responsive Design**: Improved mobile and tablet experience

### 🏢 Location-Based Pages
- **City-Specific Landing Pages**: Dedicated pages for major Czech cities
  - Praha (Prague)
  - Brno
  - Ostrava
  - Plzeň
  - Liberec
- **SEO-Optimized Content**: Location-specific titles, descriptions, and metadata
- **Local Business Focus**: Tailored content for each city's market

### 🧩 Component Architecture
- **Modular Layout Components**: Separated Header, Footer, and Navigation
- **Client-Side Components**: Optimized for interactivity and performance
- **Reusable Sections**: Hero, Services, Challenges, and Location pages
- **Theme System**: Centralized theme management with CSS variables

### 🎯 Performance Improvements
- **Optimized Images**: WebP format with proper sizing and lazy loading
- **Bundle Splitting**: Improved code splitting for faster loading
- **Motion Optimization**: Reduced motion support for accessibility
- **Carousel Performance**: Efficient autoplay with visibility detection

## ✨ Key Features

### 🏗️ Modern Architecture
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling with dark mode support
- **Framer Motion** for smooth animations and transitions
- **ISR (Incremental Static Regeneration)** with 24-hour revalidation
- **Embla Carousel** for interactive image galleries

### 🌍 Internationalization (i18n)
- **4 Languages**: Czech (cs), English (en), German (de), Ukrainian (ua)
- Localized routes: `/cs`, `/en`, `/de`, `/ua`
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

### 🎨 UI Components & Theming
- **Dark Mode Toggle**: System preference detection with smooth transitions
- **Hero Carousel**: Auto-playing image carousel with navigation controls
- **Motion Components**: Framer Motion animations with accessibility support
- **Theme System**: CSS variables for consistent theming
- **Responsive Layout**: Mobile-first design with breakpoint optimization

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

### New Dependencies in v0.3.1
- **embla-carousel**: ^8.6.0 - Modern carousel library
- **embla-carousel-autoplay**: ^8.6.0 - Autoplay functionality
- **embla-carousel-react**: ^8.6.0 - React integration
- **framer-motion**: ^12.23.12 - Animation library
- **lucide-react**: ^0.542.0 - Icon library

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
│   │   ├── locations/     # Location-specific pages
│   │   │   ├── praha/     # Prague landing page
│   │   │   ├── brno/      # Brno landing page
│   │   │   ├── ostrava/   # Ostrava landing page
│   │   │   ├── plzen/     # Plzeň landing page
│   │   │   └── liberec/   # Liberec landing page
│   │   └── layout.tsx     # Language-specific layout
│   ├── api/               # API routes
│   │   └── contact/       # Contact form handler
│   ├── globals.css        # Global styles with dark mode
│   ├── layout.tsx         # Root layout
│   ├── robots.ts          # Robots.txt generator
│   └── sitemap.ts         # Sitemap generator
├── components/            # React components
│   ├── client/           # Client-side components
│   │   ├── ContactForm.tsx    # Contact form with validation
│   │   ├── HeroCarousel.tsx   # Interactive image carousel
│   │   ├── LangSwitcher.tsx   # Language selection
│   │   ├── MotionSection.tsx  # Animated sections
│   │   └── ThemeToggle.tsx    # Dark/light mode toggle
│   ├── layout/           # Layout components
│   │   ├── Header.tsx     # Site header with navigation
│   │   ├── Footer.tsx     # Site footer with links
│   │   └── Nav.tsx        # Navigation menu
│   ├── sections/         # Page sections
│   │   ├── Hero.tsx       # Hero section with carousel
│   │   ├── HeroSection.tsx # Legacy hero component
│   │   ├── ServicesShowcase.tsx # Services display
│   │   ├── ChallengesSection.tsx # Challenges section
│   │   └── LocationPage.tsx # Location-specific content
│   ├── Analytics.tsx     # Google Analytics & Meta Pixel
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

## 🧩 Component Library

### Layout Components
- **Header**: Sticky navigation with logo, menu, language switcher, and theme toggle
- **Footer**: Comprehensive footer with contact info, links, and location-specific content
- **Nav**: Responsive navigation menu with mobile support

### Interactive Components
- **HeroCarousel**: Auto-playing image carousel with:
  - Touch/swipe support
  - Keyboard navigation
  - Accessibility features
  - Reduced motion support
  - Visibility-based autoplay control
- **ThemeToggle**: Dark/light mode switcher with:
  - System preference detection
  - Smooth transitions
  - Persistent storage
  - Hydration-safe rendering

### Section Components
- **Hero**: Main landing section with carousel integration
- **LocationPage**: Reusable template for city-specific pages
- **ServicesShowcase**: Service display with animations
- **ChallengesSection**: Problem/solution presentation

### Utility Components
- **MotionSection**: Wrapper for Framer Motion animations
- **LangSwitcher**: Language selection with proper routing
- **ContactForm**: Form with validation and analytics tracking

## 🔍 SEO Features

### Structured Data
- **Organization Schema**: Company information
- **WebSite Schema**: Site-wide metadata
- **Service Schema**: Individual service descriptions
- **LocalBusiness Schema**: Location-specific business data

### Metadata Management
- **Dynamic metadata** generation per page/language
- **Canonical URLs** with proper language mapping
- **Hreflang attributes** for international SEO
- **Open Graph** images and metadata
- **Twitter Cards** optimization
- **Location-specific SEO** for city pages

### Performance Optimization
- **Image optimization** with next/image
- **Bundle splitting** for optimal loading
- **Static generation** with ISR
- **Security headers** for improved rankings
- **WebP/AVIF** image format support

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
- ✅ Dark mode toggle functionality
- ✅ Hero carousel navigation and autoplay
- ✅ Location pages load correctly
- ✅ Theme persistence across sessions

### Performance Monitoring
- **Lighthouse CI** integration ready
- **Core Web Vitals** monitoring
- **Performance budget** enforcement
- **Motion performance** validation
- **Carousel performance** testing

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
- [ ] Dark mode toggle works correctly
- [ ] Theme preference persists across sessions
- [ ] Hero carousel autoplay and navigation work
- [ ] Location pages load with correct content
- [ ] Motion animations respect reduced motion preference

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

## 🔄 Migration Guide

### Upgrading to v0.3.1

If you're upgrading from a previous version:

1. **Install new dependencies**:
   ```bash
   npm install embla-carousel embla-carousel-autoplay embla-carousel-react framer-motion lucide-react
   ```

2. **Update your components**:
   - Replace old hero components with new `Hero` component
   - Add `ThemeToggle` to your header
   - Update layout components to use new structure

3. **Add location pages** (optional):
   - Create location-specific pages in `app/[lang]/locations/`
   - Use `LocationPage` component for consistent structure

4. **Update styling**:
   - Ensure dark mode CSS variables are properly configured
   - Test theme switching functionality

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

## 📋 Version History

### v0.3.1 (Current)
- ✨ Added dark mode support with system preference detection
- 🎠 Implemented interactive hero carousel with autoplay
- 🏢 Created location-specific landing pages for major Czech cities
- 🎨 Enhanced UI with Framer Motion animations
- 🧩 Refactored component architecture for better maintainability
- ⚡ Improved performance with optimized images and bundle splitting
- 🔧 Added comprehensive theme system with CSS variables

### v1.0.0 (Previous)
- 🚀 Initial release with Next.js 15 and App Router
- 🌍 Multi-language support (Czech, English, German)
- 🔍 Complete SEO optimization with structured data
- 📊 Analytics integration (Google Analytics 4, Meta Pixel)
- 📝 Contact form with server actions and validation
- 🧪 E2E testing with Playwright
- 🔒 Security headers and production-ready configuration

---

**Built with ❤️ by [Illia Khromov](https://github.com/Illia-Kh)**
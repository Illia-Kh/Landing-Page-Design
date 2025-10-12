# 🚀 IKH Systems — Ultra-Optimized Landing Page v0.4.1

A cutting-edge, **mobile-first** landing page built with **Next.js 15**, **App Router**, **TypeScript**, and **Tailwind CSS**. Optimized for **exceptional Core Web Vitals** with Performance scores **92-98** on mobile.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Performance](https://img.shields.io/badge/Lighthouse-92--98-success)](https://developers.google.com/web/tools/lighthouse)

---

## 🆕 What's New in v0.4.1 — Mobile CWV Optimization

### ⚡ Extreme Performance Optimization

**Mobile Lighthouse Scores:**
- 🎯 **Performance**: 92-98 (was 20-40)
- ⚡ **LCP**: 0.5-1.2s (was 27s) — **95% improvement**
- ⚡ **TBT**: 50-150ms (was 2.3s) — **93% improvement**
- ✨ **CLS**: 0.00-0.02 (was 0.26) — **98% improvement**
- 🚀 **FCP**: 0.3-0.7s
- 🎯 **SEO**: 98-100

### 🖼️ Advanced Image Optimization

#### AVIF/WebP with Mobile Variants
- **Desktop**: 100-137 KB (AVIF/WebP)
- **Mobile-LG** (640px): **49 KB AVIF** (-74%)
- **Mobile** (480px): **29 KB AVIF** (-84%)
- Total savings: **~541 KB** across all images

#### Smart Loading Strategy
```tsx
// Automatic mobile variant selection
<Image
  src="/media/banner/web-development.webp"
  // Mobile: → web-development-mobile.avif (29 KB)
  // Tablet: → web-development-mobile-lg.avif (49 KB)
  // Desktop: → web-development.avif (125 KB)
  priority
  fetchPriority="high"
  placeholder="blur"
  sizes="(max-width: 600px) 100vw, ..."
/>
```

### 🎬 JavaScript Optimization

#### Dynamic Imports with Idle Mounting
- **HeroCarousel**: Deferred 500ms (requestIdleCallback)
- **ScrollHeader**: Deferred 1000ms
- **MotionSection**: Deferred 800ms with CSS fallback
- **Analytics**: lazyOnload strategy

#### Bundle Optimization
- **First Load JS**: 102-107 kB (optimized)
- **Framer Motion**: Not in initial bundle
- **Embla Carousel**: Loaded on demand
- **Package imports**: Optimized for tree-shaking

### 🎨 CSS Performance

#### Mobile-First CSS Animations
```css
/* Lightweight CSS animations before JS hydration */
@media (max-width: 768px) {
  .motion-section {
    animation: fadeInUp 0.5s ease-out;
    will-change: transform, opacity;
  }
}
```

#### Font Optimization
- `font-display: swap` globally
- Preconnect to Google Fonts
- No FOIT (Flash of Invisible Text)

---

## ✨ Core Features

### 🏗️ Modern Tech Stack
- **Next.js 15.5.4** with App Router and React 19
- **TypeScript 5.9** for full type safety
- **Tailwind CSS 3.4** with custom design system
- **Framer Motion 12.23** for animations
- **Embla Carousel 8.6** for image galleries
- **ISR** (Incremental Static Regeneration) with 24h revalidation

### 🌍 Internationalization (i18n)
- **4 Languages**: Czech (cs), English (en), German (de), Ukrainian (ua)
- **Localized routes**: `/cs`, `/en`, `/de`, `/ua`
- **Language-specific metadata** and SEO
- **Automatic hreflang** generation
- **Country-specific base URLs**

### 🔍 Advanced SEO
- **Structured Data**: Schema.org JSON-LD (Organization, WebSite, Service, LocalBusiness)
- **Complete Metadata**: Title templates, descriptions, keywords, canonical URLs
- **Open Graph & Twitter Cards**: Full social media optimization
- **Dynamic Sitemap**: Auto-generated with hreflang and localized URLs
- **Performance-First**: Optimized for Core Web Vitals ranking signals

### 📊 Analytics & Privacy
- **Google Analytics 4** with consent management
- **Meta Pixel** support (optional)
- **Privacy-compliant** tracking
- **Cookie Consent** system ready
- **GDPR/CCPA** compatible

### ⚡ Performance Features

#### Image Optimization
- **AVIF** primary format (30% smaller than WebP)
- **WebP** fallback for compatibility
- **Mobile variants**: 29-49 KB for fast LCP
- **Blur placeholders**: Zero layout shift
- **Responsive sizes**: Optimal bandwidth usage
- **Custom loader**: Smart variant selection

#### JavaScript Optimization
- **Code splitting**: Dynamic imports for heavy components
- **Idle hydration**: Non-critical UI deferred to idle time
- **Tree shaking**: Optimized package imports
- **Console removal**: Production builds strip console logs
- **Compression**: Gzip/Brotli enabled

#### Rendering Strategy
- **Static Generation** for all routes
- **ISR**: 24-hour revalidation
- **Server Components**: Maximum performance
- **Client Components**: Only where needed
- **Suspense boundaries**: Progressive enhancement

### 📝 Content Pages
- **Home**: Hero with carousel, services showcase, challenges
- **Services**: Detailed service descriptions with icons
- **Contacts**: Contact form, team info, location map
- **Legal Pages**: Cookie Policy, Privacy Policy, Terms of Service
- **Locations**: City-specific landing pages (Praha, Brno, Ostrava, Plzeň, Liberec)

### 🎨 UI/UX Features
- **Dark Mode**: System preference + manual toggle with persistence
- **Hero Carousel**: Touch/swipe, keyboard navigation, autoplay
- **Motion Animations**: Framer Motion with reduced motion support
- **Scroll Header**: Auto-hide/show with smooth transitions
- **Responsive Design**: Mobile-first with optimal breakpoints
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 20.0.0
npm >= 9.0.0
```

### Installation

```bash
# Clone repository
git clone <repository-url>
cd "Landing Page Design"

# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local
# Edit .env.local with your settings

# Install Playwright (for testing)
npm run test:install
```

### Development

```bash
# Start dev server
npm run dev

# Open http://localhost:3000
# Navigate to /en, /cs, /de, or /ua
```

### Production Build

```bash
# Build optimized static export
npm run build

# Serve production build
npx serve@latest out -p 3000 -c serve.json

# Or upload 'out' folder to static hosting
```

---

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── [lang]/                  # Internationalized routes
│   │   ├── page.tsx             # Home page (Hero, Services, Challenges)
│   │   ├── contacts/            # Contact page with form
│   │   ├── services/            # Services detail page
│   │   ├── locations/           # City-specific pages
│   │   │   ├── praha/           # Prague
│   │   │   ├── brno/            # Brno
│   │   │   ├── ostrava/         # Ostrava
│   │   │   ├── plzen/           # Plzeň
│   │   │   └── liberec/         # Liberec
│   │   ├── cookie-policy/       # Cookie policy (GDPR)
│   │   ├── privacy-policy/      # Privacy policy
│   │   ├── terms-of-service/    # Terms of service
│   │   └── layout.tsx           # Localized layout
│   ├── globals.css              # Global styles + CSS variables
│   ├── layout.tsx               # Root layout with preload/fonts
│   ├── robots.ts                # Dynamic robots.txt
│   └── sitemap.ts               # Dynamic sitemap.xml
│
├── components/
│   ├── client/                  # Client-only components
│   │   ├── HeroCarousel.tsx     # Optimized carousel (idle mount)
│   │   ├── HeroCarouselLoader.tsx # Wrapper with skeleton
│   │   ├── HeroImage.tsx        # Mobile-optimized image
│   │   ├── MotionSectionClient.tsx # Framer Motion wrapper
│   │   ├── MotionStaggerClient.tsx # Stagger animations
│   │   ├── ScrollHeaderClient.tsx # Auto-hide header
│   │   ├── ContactForm.tsx      # Form with validation
│   │   ├── ThemeToggle.tsx      # Dark mode switcher
│   │   └── ...
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Site header
│   │   ├── Footer.tsx           # Site footer
│   │   └── Nav.tsx              # Navigation
│   ├── sections/                # Page sections
│   │   ├── Hero.tsx             # Hero with carousel
│   │   ├── ServicesShowcase.tsx # Services grid
│   │   ├── ChallengesSection.tsx # Problem/solution
│   │   └── LocationPage.tsx     # City page template
│   ├── Analytics.tsx            # GA4 + Meta Pixel
│   ├── StructuredData.tsx       # Schema.org JSON-LD
│   └── ...
│
├── lib/                         # Utilities
│   ├── i18n.ts                  # Translations (4 languages)
│   ├── imageLoader.ts           # Smart image variant loader
│   ├── env.ts                   # Environment config
│   └── utils.ts                 # Helper functions
│
├── public/media/banner/         # Optimized images
│   ├── web-development-mobile.avif    # 29 KB (480px)
│   ├── web-development-mobile-lg.avif # 49 KB (640px)
│   ├── web-development.avif           # 125 KB (1280px)
│   └── ... (all variants)
│
├── tests/e2e/                   # Playwright tests
├── next.config.mjs              # Next.js config (optimized)
├── tailwind.config.js           # Tailwind config
├── serve.json                   # Production server headers
└── package.json
```

---

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
# Required
NEXT_PUBLIC_SITE_URL=https://ikhsystems.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXXX
```

### Next.js Optimization Settings

```js
// next.config.mjs
{
  output: 'export',
  compress: true,
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  },
  compiler: {
    removeConsole: { exclude: ['error'] }
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536]
  }
}
```

---

## 🎯 Performance Architecture

### LCP Optimization (0.5-1.2s)
1. **AVIF preload** with responsive srcset
2. **Mobile variants**: 29-49 KB (vs 187 KB original)
3. **Priority loading**: fetchPriority="high"
4. **Blur placeholder**: Instant visual feedback
5. **Fixed aspect ratio**: Zero CLS

### TBT Reduction (50-150ms)
1. **Idle mounting**: All animations deferred to requestIdleCallback
2. **Lazy analytics**: Scripts load after page interactive
3. **Deferred scroll listener**: +500ms delay
4. **CSS fallback**: Lightweight animations before JS
5. **Dynamic imports**: Heavy components split from main bundle

### CLS Prevention (0.00-0.02)
1. **Fixed dimensions**: All images have aspect ratios
2. **Blur placeholders**: No jump during load
3. **Font swap**: font-display: swap
4. **Static skeleton**: Zero shift during hydration
5. **No layout changes**: After initial paint

---

## 📊 Performance Metrics

### Mobile Lighthouse (Production)

| Metric | Target | Achieved | Improvement |
|--------|--------|----------|-------------|
| **Performance** | ≥ 90 | **92-98** | ✅ |
| **LCP** | ≤ 2.5s | **0.5-1.2s** | **-95%** ⚡ |
| **TBT** | ≤ 300ms | **50-150ms** | **-93%** ⚡ |
| **CLS** | ≤ 0.1 | **0.00-0.02** | **-98%** ✨ |
| **FCP** | ≤ 1.8s | **0.3-0.7s** | ✅ |
| **TTI** | ≤ 4.5s | **1.5-3.0s** | ✅ |
| **SEO** | ≥ 95 | **98-100** | ✅ |

### Image Optimization Results

| Image | Original | Optimized | Mobile | Savings |
|-------|----------|-----------|--------|---------|
| web-development | 187 KB | 100 KB | **29 KB** | **-84%** |
| cybersecurity | 262 KB | 137 KB | - | -48% |
| infrastructure | 247 KB | 120 KB | - | -51% |
| mobile-development | 191 KB | 102 KB | - | -46% |
| system-integration | 149 KB | 88 KB | - | -41% |
| analytics | 115 KB | 63 KB | - | -45% |

**Total bandwidth saved**: ~541 KB (-46% average)

---

## 🌟 Key Features

### 🌍 Full Internationalization
- **4 Languages**: Czech, English, German, Ukrainian
- **Localized Content**: Translations for all pages
- **SEO per Language**: Unique metadata and hreflang
- **Country URLs**: Dedicated domains per market

### 🔍 Enterprise SEO
- **Structured Data**: Organization, WebSite, Service, LocalBusiness schemas
- **Meta Optimization**: Titles, descriptions, OG tags
- **Sitemap**: Auto-generated with localization
- **Robots**: Optimized crawl directives
- **Core Web Vitals**: Top 5% performance

### 📝 Complete Content Suite
- **Home**: Hero carousel, services, challenges
- **Services**: 6 detailed service blocks
- **Contacts**: Form, team, office locations
- **Legal**: Cookie/Privacy/Terms (all languages)
- **Locations**: 5 city-specific landing pages

### 🎨 Premium UI/UX
- **Dark/Light Mode**: System-aware with toggle
- **Hero Carousel**: Auto-play, swipe, keyboard nav
- **Framer Motion**: Smooth scroll animations
- **Responsive**: Mobile-first, optimized breakpoints
- **Accessibility**: WCAG 2.1 AA compliant

---

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Available at http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Serve static export
npx serve@latest out -p 3000 -c serve.json

# Or deploy 'out' folder to any static host
```

### Testing

```bash
# E2E tests
npm run test:e2e

# E2E with UI
npm run test:e2e:ui

# Lint code
npm run lint
```

---

## 🎯 Mobile CWV Strategy

### Phase 1: Foundation
- ✅ Dynamic imports for heavy components
- ✅ Image format conversion to WebP
- ✅ Basic lazy loading
- ✅ Meta descriptions

**Result:** LCP 27s → 6s, TBT 2.3s → 1.2s

### Phase 2: Mobile-First (Current)
- ✅ AVIF mobile variants (29-49 KB)
- ✅ Idle mounting (requestIdleCallback)
- ✅ CSS animation fallbacks
- ✅ Lazy analytics (lazyOnload)
- ✅ Blur placeholders
- ✅ Fixed aspect ratios
- ✅ Custom image loader

**Result:** LCP 6s → 0.8s, TBT 1.2s → 100ms, CLS 0.08 → 0.01

---

## 📦 Dependencies

### Core
```json
{
  "next": "^15.5.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.9.3"
}
```

### UI & Animations
```json
{
  "framer-motion": "^12.23.24",
  "embla-carousel": "^8.6.0",
  "embla-carousel-react": "^8.6.0",
  "embla-carousel-autoplay": "^8.6.0",
  "lucide-react": "^0.545.0",
  "tailwindcss": "^3.4.18"
}
```

### Dev Tools
```json
{
  "@playwright/test": "^1.56.0",
  "sharp": "^0.33.5",
  "eslint": "^9.37.0",
  "typescript-eslint": "^8.46.0"
}
```

---

## 🧪 Testing

### E2E Coverage
- ✅ All language routes functional
- ✅ Navigation and routing
- ✅ Contact form submission
- ✅ Dark mode toggle
- ✅ Carousel functionality
- ✅ SEO files (sitemap, robots)
- ✅ Accessibility checks

### Performance Testing
```bash
# Lighthouse audit
npm run build
npx serve@latest out -p 3000

# Chrome DevTools → Lighthouse → Mobile
```

---

## 🚢 Deployment

### Static Hosting (Netlify, Vercel, Cloudflare Pages)

```bash
# Build static export
npm run build

# Deploy 'out' folder
# - Netlify: Drag & drop or CLI
# - Vercel: vercel --prod
# - Cloudflare: wrangler pages publish out
```

### Docker

```bash
# Build image
docker build -t ikh-landing .

# Run container
docker run -p 3000:3000 ikh-landing
```

### Traditional Server (nginx/Apache)

```bash
# 1. Build locally
npm run build

# 2. Upload 'out' folder to server
scp -r out/ user@server:/var/www/html/

# 3. Configure server (see deployment docs)
```

---

## 📋 Production Checklist

### Before Deploy
- [x] npm run build succeeds
- [x] All routes tested (4 languages × 9 pages = 36 routes)
- [x] Images optimized (AVIF/WebP)
- [x] Meta descriptions present
- [x] Analytics configured
- [x] Lighthouse Mobile ≥ 92

### After Deploy
- [ ] Run PageSpeed Insights (mobile)
- [ ] Check Search Console
- [ ] Verify analytics tracking
- [ ] Test contact form
- [ ] Monitor Core Web Vitals

---

## 🔄 Maintenance

### Image Optimization
```bash
# When adding new banners:
# 1. Add original to public/media/banner/
# 2. Run optimization (requires sharp):
node scripts/optimize-images.js

# 3. For hero images, create mobile variants:
node scripts/optimize-mobile-hero.js

# 4. Rebuild
npm run build
```

### Content Updates
- Edit translations in `lib/i18n.ts`
- Update metadata in page `generateMetadata` functions
- Rebuild for static export

---

## 📚 Documentation

- **MOBILE_CWV_OPTIMIZATIONS.md** - Phase 2 optimization guide
- **FINAL_OPTIMIZATION_SUMMARY.md** - Technical implementation
- **SEO_OPTIMIZATION.md** - SEO strategy
- **QA-CHECKLIST.md** - Quality assurance
- **AUTO-DEPLOY-SETUP.md** - Deployment automation

---

## 🛠️ Development Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server (requires server mode)
npm run lint         # ESLint check
npm run test:e2e     # Run E2E tests
npm run test:e2e:ui  # E2E with Playwright UI
npm run lighthouse   # Manual Lighthouse audit
```

---

## 🎨 Customization

### Branding
- Update logo in `public/logo/`
- Modify colors in `app/globals.css` (CSS variables)
- Edit company info in `lib/i18n.ts`

### Content
- Add/edit pages in `app/[lang]/`
- Update translations in `lib/i18n.ts`
- Modify sections in `components/sections/`

### Styling
- Tailwind utilities in `tailwind.config.js`
- Custom classes in `app/globals.css`
- Component-specific styles inline

---

## 📈 Monitoring

### Core Web Vitals
- Monitor via Google Search Console
- PageSpeed Insights weekly
- Real User Monitoring (RUM) via analytics

### Performance Budgets
- First Load JS: < 120 kB ✅ (102-107 kB)
- LCP Image: < 50 KB ✅ (29 KB mobile)
- TBT: < 200 ms ✅ (50-150 ms)
- CLS: < 0.05 ✅ (0.00-0.02)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/name`
3. Make changes
4. Test thoroughly: `npm run test:e2e`
5. Commit: `git commit -m 'feat: description'`
6. Push: `git push origin feature/name`
7. Create Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 🙋 Support

- **Email**: contact@ikhsystems.com
- **Website**: https://ikhsystems.com
- **Issues**: GitHub Issues

---

## 📋 Version History

### v0.4.1 (Current) — Mobile CWV Mastery
- ⚡ **Mobile Performance**: 92-98 score (was 20-40)
- 🖼️ **AVIF Variants**: 29-49 KB mobile images
- ⚡ **LCP**: 0.5-1.2s (95% improvement)
- ⚡ **TBT**: 50-150ms (93% reduction)
- ✨ **CLS**: 0.00-0.02 (98% improvement)
- 🎬 **Idle Hydration**: All animations deferred
- 📦 **Bundle**: 102 kB optimized
- 🎨 **CSS Animations**: Mobile fallback
- 🚀 **Lazy Analytics**: lazyOnload strategy

### v0.4.0 — Legal & Compliance
- 📋 Legal pages (Cookie/Privacy/Terms)
- 🌍 Multi-language legal support
- 🔧 Enhanced mobile navigation
- 📊 Updated sitemap

### v0.3.1 — UI Enhancement
- 🎨 Dark mode support
- 🎠 Hero carousel
- 🏢 Location pages
- 🎬 Framer Motion
- 🧩 Component refactor

### v1.0.0 — Initial Release
- 🚀 Next.js 15 + App Router
- 🌍 i18n (4 languages)
- 🔍 SEO optimization
- 📊 Analytics integration
- 🧪 E2E testing

---

**Built with ❤️ and ⚡ performance obsession by [Illia Khromov](https://github.com/Illia-Kh)**

**Powered by Next.js 15 · React 19 · TypeScript · Tailwind CSS**

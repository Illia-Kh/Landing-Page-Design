# Next.js Migration Action Plan

## Executive Summary

The Landing-Page-Design project is a complex React + Vite SPA that requires significant refactoring for Next.js migration. **Migration complexity: 🔴 HIGH** due to 79% of files requiring "use client" directive and extensive client-side features.

## Critical Statistics
- **Total files:** 91
- **Need "use client":** 72 files (79%)
- **Server-compatible:** 19 files (21%)
- **Custom router usage:** 29 references
- **Document/Window API:** 76 total references
- **React hooks:** 115 occurrences

## Immediate Action Items

### 1. 🔨 Pre-Migration Refactoring (Week 1)
```bash
# Run analysis
node scripts/migration-analysis.mjs

# Apply quick fixes
chmod +x scripts/pre-migration-fixes.sh
./scripts/pre-migration-fixes.sh

# Review MIGRATION_QUICK_FIXES.md for detailed steps
```

### 2. 📂 Directory Structure Setup
```
app/
├── [lang]/                  # Language routing
│   ├── page.tsx            # HomePage → SSR
│   ├── about/page.tsx      # AboutPage → CSR (Framer)
│   ├── services/page.tsx   # ServicesPage → CSR (Framer)  
│   ├── contact/page.tsx    # ContactPage → CSR (Framer)
│   ├── portfolio/page.tsx  # LogoShowcase → CSR (Framer)
│   └── layout.tsx          # Language-specific layout
├── layout.tsx              # Root layout
├── middleware.ts           # Language detection
├── globals.css            # Global styles (from index.css)
└── not-found.tsx          # 404 page
```

### 3. 🚨 Critical Component Migrations

#### A. Router System (HIGHEST PRIORITY)
```typescript
// REMOVE: src/components/Router.tsx (11 router references)
// REPLACE WITH: Next.js App Router + middleware

// app/middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Language detection logic
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = !['cs', 'de', 'en'].some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/en${pathname}`, request.url)
    );
  }
}
```

#### B. SEO System (HIGHEST PRIORITY)
```typescript
// REMOVE: src/components/SEO.tsx (14 document references)
// REPLACE WITH: app/[lang]/layout.tsx with generateMetadata

export async function generateMetadata({ params }): Promise<Metadata> {
  const { lang } = params;
  return generatePageMetadata('home', lang);
}
```

#### C. State Management
```typescript
// src/contexts/AppProvider.tsx - Centralize app state
'use client'
export function AppProvider({ children, initialLang }) {
  const [language, setLanguage] = useState(initialLang);
  // Move App.tsx state here
}
```

### 4. 📋 Component Migration Checklist

#### ✅ Ready for Migration (Server Components)
- [ ] `src/types/index.ts`
- [ ] `src/i18n/index.ts` 
- [ ] `src/i18n/translations.ts`
- [ ] `src/lib/language.ts`
- [ ] `src/pages/HomePage.tsx` (surprisingly SSR-compatible!)
- [ ] 13 UI components (alert, badge, button, etc.)

#### 🔧 Need "use client" Addition
- [ ] 23 Framer Motion components
- [ ] 7 custom components with hooks
- [ ] 2 custom hooks
- [ ] 34 UI components (already have directive)

#### 🚨 Need Complete Refactor
- [ ] `src/components/Router.tsx` → App Router
- [ ] `src/components/SEO.tsx` → Metadata API
- [ ] `src/components/Hreflang.tsx` → Metadata API
- [ ] `src/components/JsonLd.tsx` → Metadata API
- [ ] `src/App.tsx` → Root layout + providers

## Risk Mitigation Strategies

### 1. Preserve Working Version
```bash
git checkout -b migration/nextjs-app-router
git push -u origin migration/nextjs-app-router
```

### 2. Gradual Migration Approach
1. **Week 1:** Pre-migration refactoring
2. **Week 2:** Core infrastructure (Router, SEO)
3. **Week 3:** Component migration + "use client"
4. **Week 4:** Testing + performance optimization

### 3. Feature Preservation Checklist
- [ ] Framer Motion page transitions
- [ ] Multilingual routing (cs/de/en)
- [ ] SEO metadata for all pages
- [ ] PWA functionality
- [ ] Performance optimizations
- [ ] Cookie consent system
- [ ] Analytics tracking

## Performance Considerations

### SSR vs CSR Strategy
```typescript
// Optimal distribution for this project:
// SSR (Server Components): 21% of files
//   - Static content, typography, layouts
//   - SEO-critical pages
//   - i18n data

// CSR (Client Components): 79% of files  
//   - Interactive UI (forms, dropdowns)
//   - Animations (Framer Motion)
//   - Browser APIs (localStorage, window)
//   - State management
```

### Bundle Optimization
- Lazy load Framer Motion components
- Code-split by language
- Preload critical routes

## Success Metrics

### Before Migration (Baseline)
- [ ] Run Lighthouse audit
- [ ] Measure bundle size
- [ ] Document current performance

### After Migration (Targets)
- [ ] Maintain/improve Lighthouse scores
- [ ] Reduce initial bundle size by 15%+
- [ ] Improve Time to First Byte (TTFB)
- [ ] Preserve animation smoothness

## Dependencies to Install/Remove

### Install
```bash
npm install next@latest
npm install next-pwa  # Replace vite-plugin-pwa
```

### Remove
```bash
npm uninstall vite @vitejs/plugin-react-swc vite-plugin-pwa
```

### Update
```bash
npm update react@latest react-dom@latest
```

## Final Migration Command Sequence

```bash
# 1. Backup and branch
git checkout -b migration/nextjs-app-router

# 2. Run analysis
node scripts/migration-analysis.mjs

# 3. Install Next.js
npm install next@latest react@latest react-dom@latest
npm install next-pwa @next/font

# 4. Remove Vite
npm uninstall vite @vitejs/plugin-react-swc vite-plugin-pwa

# 5. Create Next.js structure
mkdir -p app/{[lang]/{about,services,contact,portfolio},lib,components}

# 6. Copy compatible files
cp src/types/index.ts app/types/
cp src/lib/language.ts app/lib/

# 7. Create Next.js config
cat > next.config.js << 'EOF'
const withPWA = require('next-pwa')({
  dest: 'public'
});

module.exports = withPWA({
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['cs', 'de', 'en'],
    defaultLocale: 'en',
  },
});
EOF

# 8. Start migration
npm run dev
```

**Estimated Timeline:** 4 weeks for complete migration with testing

This action plan provides a concrete roadmap for successfully migrating to Next.js while preserving all current functionality.
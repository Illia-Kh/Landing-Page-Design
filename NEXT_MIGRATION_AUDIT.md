# Next.js Migration Audit Report

## Executive Summary
This document analyzes the current Vite + React + TypeScript SPA for migration to Next.js App Router with multilingual support (cs/en/de). The project currently uses a custom routing system, manual SEO management, and extensive client-side features that will require careful migration planning.

## Current Architecture Analysis

### 1. Routing System - Custom Implementation
**Current Implementation:**
- Custom `Router` component in `src/components/Router.tsx`
- Uses Framer Motion's `AnimatePresence` for transitions
- Page type: `'home' | 'about' | 'services' | 'contact' | 'logo-showcase'`
- State-based routing with `currentPage` state

**Files using routing:**
- `src/App.tsx` - Main router implementation
- `src/components/Router.tsx` - Custom router component
- `src/components/Footer.tsx` - Navigation links
- `src/components/Header.tsx` - Navigation menu
- `src/i18n/index.ts` - Route translations

**Migration Impact:** 🔴 **HIGH** - Complete replacement needed with Next.js App Router

### 2. SEO Implementation - Manual Document Manipulation
**Current Implementation:**
- Direct `document.title` manipulation in `src/components/SEO.tsx`
- Manual `document.head` modifications for meta tags
- Custom `Hreflang.tsx` component for multilingual SEO
- Structured data via `JsonLd.tsx` component

**Files with SEO concerns:**
- `src/components/SEO.tsx` - Document title/meta manipulation
- `src/components/Hreflang.tsx` - Manual hreflang tags
- `src/components/JsonLd.tsx` - Structured data injection
- `src/components/PerformanceOptimization.tsx` - Document head modifications

**Migration Impact:** 🔴 **HIGH** - Requires Next.js metadata API replacement

### 3. Components Requiring "use client" Directive

#### 3.1 Framer Motion Components
**Files using Framer Motion:**
- `src/pages/LogoShowcase.tsx`
- `src/pages/ContactPage.tsx` 
- `src/pages/ServicesPage.tsx`
- `src/pages/AboutPage.tsx`
- `src/components/SystemButton.tsx`
- `src/components/CodeLogo.tsx`
- `src/components/Footer.tsx`
- `src/components/CookieConsentBanner.tsx`
- `src/components/AboutUs.tsx`
- `src/components/Router.tsx`
- `src/components/LanguageDropdown.tsx`
- `src/components/CodeHeroLogo.tsx`

#### 3.2 Hook/Effect Usage
**Files using React hooks:**
- `src/App.tsx` - useState for language/page state
- `src/main.tsx` - ReactDOM.render
- `src/hooks/useTheme.ts` - Custom theme hook
- `src/hooks/usePageTracking.ts` - Analytics tracking
- `src/components/figma/ImageWithFallback.tsx` - Image state management
- `src/components/PerformanceOptimization.tsx` - Performance monitoring
- `src/components/CookieConsentBanner.tsx` - Consent state
- `src/components/ContactForm.tsx` - Form state
- `src/components/LanguageDropdown.tsx` - Dropdown state

#### 3.3 Browser API Usage
**Files accessing window/document/localStorage:**
- `src/components/SEO.tsx` - window.location.origin
- `src/components/PerformanceOptimization.tsx` - Web Vitals APIs
- `src/components/CookieConsentBanner.tsx` - localStorage
- `src/hooks/useTheme.ts` - localStorage, window.matchMedia
- `src/hooks/usePageTracking.ts` - Analytics APIs

**Migration Impact:** 🟡 **MEDIUM** - Systematic "use client" addition needed

### 4. Path Aliases and Import Structure
**Current aliases in tsconfig.json:**
```json
{
  "@/*": ["src/*"],
  "@components/*": ["src/components/*"], 
  "@pages/*": ["src/pages/*"],
  "@styles/*": ["src/styles/*"],
  "@utils/*": ["src/utils/*"],
  "@types/*": ["src/types/*"]
}
```

**Migration Impact:** 🟢 **LOW** - Next.js supports similar path mapping

### 5. Dynamic Imports
**Analysis Result:** ✅ No dynamic `import()` statements found

**Migration Impact:** 🟢 **NONE** - No blocking dynamic imports

### 6. CSS/Styling Architecture
**Current Implementation:**
- Single CSS import in `src/main.tsx`: `import "./index.css"`
- Tailwind CSS for styling
- No CSS modules or styled-components

**Migration Impact:** 🟢 **LOW** - Direct compatibility with Next.js

### 6. Vite-Specific Dependencies

#### 6.1 Build Configuration
**Current Vite plugins in `vite.config.ts`:**
- `@vitejs/plugin-react-swc` - Fast React refresh
- `vite-plugin-pwa` - Progressive Web App features
- Custom banner manifest plugin

#### 6.2 Vite-Specific Features
- Custom middleware for banner manifest
- SWC for fast React compilation
- Manual chunk splitting configuration
- PWA workbox integration

**Next.js Equivalents:**
- React refresh: Built-in Next.js Fast Refresh
- PWA: `next-pwa` package
- Custom middleware: Next.js middleware API
- Chunk splitting: Built-in optimization

**Migration Impact:** 🟡 **MEDIUM** - Plugin replacement needed

### 7. UI Component Library
**Current Implementation:**
- Extensive Radix UI component collection in `src/components/ui/`
- Shadcn/ui-style component architecture
- All UI components use "use client" directive

**Components requiring "use client":**
- 47 UI components in `src/components/ui/` directory
- All interactive Radix UI primitives

**Migration Impact:** 🟢 **LOW** - Radix UI works well with Next.js App Router

## Route Mapping Table

| Current SPA Route | Component | SEO Title/Meta | Proposed Next.js App Route |
|------------------|-----------|----------------|---------------------------|
| `home` | `HomePage.tsx` | "IKH-TechSystems - Инновационные IT решения" | `app/[lang]/page.tsx` |
| `about` | `AboutPage.tsx` | "О компании - IKH-TechSystems" | `app/[lang]/about/page.tsx` |
| `services` | `ServicesPage.tsx` | "Услуги - IKH-TechSystems" | `app/[lang]/services/page.tsx` |
| `contact` | `ContactPage.tsx` | "Контакты - IKH-TechSystems" | `app/[lang]/contact/page.tsx` |
| `logo-showcase` | `LogoShowcase.tsx` | "Portfolio log - IKH-TechSystems" | `app/[lang]/portfolio/page.tsx` |

## Multilingual Mapping: src/pages/* → app/[lang]/*/page.tsx

### Current Language Support
- **Languages:** `cs` (Czech), `en` (English), `de` (German), `pl` (Polish - in types but not fully implemented)
- **Default:** Russian (`ru`) - currently primary
- **i18n Structure:** `src/i18n/index.ts` with nested translation objects

### Proposed Next.js Structure
```
app/
├── [lang]/
│   ├── page.tsx                 # HomePage (root)
│   ├── about/
│   │   └── page.tsx            # AboutPage  
│   ├── services/
│   │   └── page.tsx            # ServicesPage
│   ├── contact/
│   │   └── page.tsx            # ContactPage
│   ├── portfolio/
│   │   └── page.tsx            # LogoShowcase (renamed)
│   └── layout.tsx              # Language-specific layout
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles
├── middleware.ts               # Language detection/routing
└── not-found.tsx              # 404 page
```

### Language Route Examples
- Czech: `/cs`, `/cs/about`, `/cs/services`
- English: `/en`, `/en/about`, `/en/services` 
- German: `/de`, `/de/about`, `/de/services`
- Default: Redirect `/` → `/en` (or user preference)

## Detailed Migration Analysis Results

### Complexity Assessment: 🔴 **HIGH**
- **Total files analyzed:** 91
- **Files requiring "use client":** 72 (79%)
- **Server-compatible files:** 19 (21%)
- **Migration complexity:** High due to extensive client-side usage

### Pattern Frequency Analysis
| Pattern | Occurrences | Impact |
|---------|-------------|--------|
| React Hooks | 115 | 🔴 High - Requires "use client" |
| Document API | 52 | 🔴 High - Needs refactor for SSR |
| Existing "use client" | 36 | 🟢 Low - Already prepared |
| Custom Router | 29 | 🔴 High - Complete replacement needed |
| Window API | 24 | 🟡 Medium - Hydration considerations |
| Framer Motion | 23 | 🟡 Medium - Add "use client" |
| SEO Manipulation | 15 | 🔴 High - Metadata API migration |
| LocalStorage | 9 | 🟡 Medium - Hydration safety |
| ReactDOM.render | 2 | 🔴 High - App entry point change |

## Migration Blockers & Risk Assessment

### 🔴 Critical Blockers
1. **Custom Router Replacement**
   - Remove custom `Router`/`Route` components (29 occurrences)
   - Migrate to Next.js App Router
   - Preserve Framer Motion page transitions

2. **SEO System Overhaul**
   - Replace manual document manipulation (52 occurrences)
   - Convert 15 SEO manipulation instances
   - Implement Next.js metadata API
   - Migrate to `generateMetadata()` functions

3. **Server/Client Boundary**
   - Add "use client" to 72 files (79% of codebase)
   - 115 React hook occurrences require client-side handling
   - Maintain SSR benefits where possible

### 🟡 Medium Risk Items
1. **State Management**
   - Current app-level state (language, theme, page)
   - Consider React Context vs URL-based state
   - Implement proper hydration handling

2. **Vite Plugin Migration**
   - PWA functionality via next-pwa
   - Custom build optimizations
   - Asset processing pipeline

3. **Animation System**
   - Framer Motion server/client considerations
   - Page transition preservation
   - Performance optimization

### 🟢 Low Risk Items
1. **Component Structure** - Most components can be preserved
2. **Styling** - Tailwind CSS works with Next.js
3. **TypeScript Configuration** - Minimal changes needed
4. **Asset Management** - Public folder structure similar

## Quick Fixes & Pre-Migration Refactors

### 1. Component Extraction (Low Risk)
```bash
# Separate pure components from client-side components
mkdir src/components/server    # SSR-compatible components
mkdir src/components/client    # Client-only components
```

### 2. State Management Preparation
```typescript
// Create context providers for client state
// src/contexts/AppProvider.tsx
'use client'
export function AppProvider({ children, initialLang }) {
  // Migrate current App.tsx state here
}
```

### 3. SEO Data Centralization
```typescript
// src/lib/metadata.ts
export function generatePageMetadata(page: Page, lang: Language) {
  // Centralize current SEO logic
}
```

### 4. Route Constants
```typescript
// src/lib/routes.ts
export const routes = {
  home: (lang: string) => `/${lang}`,
  about: (lang: string) => `/${lang}/about`,
  // ...
} as const
```

### 5. Environment Preparation
```bash
# Install Next.js dependencies
npm install next@latest react@latest react-dom@latest
npm install -D @types/node

# Install Next.js equivalents
npm install next-pwa           # Replace vite-plugin-pwa
npm uninstall vite @vitejs/plugin-react-swc vite-plugin-pwa
```

## Migration Timeline Estimate

### Phase 1: Foundation (2-3 days)
- Install Next.js and dependencies
- Create basic app directory structure
- Migrate global styles and configuration
- Add "use client" directives to 72 files

### Phase 2: Core Infrastructure (2-3 days)
- Replace custom Router with Next.js App Router (29 router references)
- Migrate SEO system (15 document manipulation instances)
- Implement metadata generation functions
- Set up language routing middleware

### Phase 3: Component Migration (2-3 days)
- Migrate 23 Framer Motion components
- Update 115 React hook implementations
- Handle 52 document API references
- Address 24 window API usages

### Phase 4: Features & Polish (1-2 days)
- Migrate PWA features
- Performance optimization
- Testing and bug fixes

**Total Estimated Time:** 7-11 days (increased due to high complexity)

## Next Steps Recommendations

1. **Start with Static Analysis**
   - Run automated tools to identify all client-side usage
   - Create component dependency mapping

2. **Create Migration Branch**
   - Preserve current working version
   - Allow for iterative development

3. **Begin with Core Components**
   - Start with leaf components (no routing dependencies)
   - Work up to page-level components

4. **Implement Gradual Migration**
   - Use feature flags if needed
   - Maintain parallel development capability

5. **Performance Baseline**
   - Measure current Lighthouse scores
   - Set Next.js performance targets

This audit provides a comprehensive roadmap for migrating from the current Vite SPA to Next.js App Router while preserving functionality and improving SEO capabilities.
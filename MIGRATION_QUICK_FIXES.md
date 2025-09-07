# Next.js Migration Quick Fixes & Refactors

This document outlines the immediate pre-migration refactors that will simplify the Next.js migration process.

## High-Priority Quick Fixes

### 1. Separate Server-Compatible Components

**Goal:** Identify components that can remain as Server Components

**Server-Compatible Files (19 files):**
```
src/components/ImageOptimization.tsx
src/components/InternalLink.tsx
src/components/ui/alert.tsx
src/components/ui/badge.tsx
src/components/ui/breadcrumb.tsx
src/components/ui/button.tsx
src/components/ui/card.tsx
src/components/ui/input.tsx
src/components/ui/navigation-menu.tsx
src/components/ui/pagination.tsx
src/components/ui/skeleton.tsx
src/components/ui/textarea.tsx
src/components/ui/utils.ts
src/i18n/index.ts
src/i18n/translations.ts
src/lib/language.ts
src/pages/HomePage.tsx
src/types/index.ts
src/types/theme.ts
```

**Action:** Mark these components as migration-ready (no "use client" needed)

### 2. Extract Client-Side Logic

**Current Issue:** Many components mix server-compatible logic with client-side features

**Example Refactor for `SEO.tsx`:**

```typescript
// Before (needs "use client")
export function SEO({ title, description, ... }) {
  useEffect(() => {
    document.title = title;
    // ... more document manipulation
  }, [title, description]);
  return null;
}

// After (Server Component with client wrapper)
// src/components/seo/ServerSEO.tsx
export function ServerSEO({ title, description, ... }) {
  return {
    title,
    description,
    // Return metadata object instead of DOM manipulation
  };
}

// src/components/seo/ClientSEO.tsx
'use client'
export function ClientSEO({ title, description, ... }) {
  useEffect(() => {
    // Client-side enhancements only
  }, [title, description]);
  return null;
}
```

### 3. State Management Centralization

**Current Issue:** App-level state scattered across App.tsx

**Solution:** Create centralized state provider

```typescript
// src/contexts/AppProvider.tsx
'use client'
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children, initialLang, initialPage }) {
  const [language, setLanguage] = useState(initialLang);
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  return (
    <AppContext.Provider value={{ language, setLanguage, currentPage, setCurrentPage }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
```

### 4. Routing Preparation

**Current Issue:** Custom router incompatible with Next.js

**Preparation Steps:**
1. Extract route constants
2. Create route helper functions
3. Prepare navigation components

```typescript
// src/lib/routes.ts
export const routes = {
  home: (lang: string) => `/${lang}`,
  about: (lang: string) => `/${lang}/about`,
  services: (lang: string) => `/${lang}/services`,
  contact: (lang: string) => `/${lang}/contact`,
  portfolio: (lang: string) => `/${lang}/portfolio`,
} as const;

export type RoutePath = keyof typeof routes;
```

### 5. SEO Metadata Preparation

**Current Issue:** Manual document manipulation

**Solution:** Create metadata generation functions

```typescript
// src/lib/metadata.ts
import type { Metadata } from 'next';

export function generatePageMetadata(
  page: RoutePath,
  lang: Language,
  customData?: Partial<Metadata>
): Metadata {
  const seoData = getSEOData(page, lang);
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: seoData.url,
      locale: getLocale(lang),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
    },
    ...customData
  };
}
```

## Component-Specific Migration Strategy

### Framer Motion Components (23 files)

**Pattern:** All require "use client" directive

**Strategy:**
1. Add "use client" to all Framer Motion components
2. Consider creating server-compatible wrappers for static content
3. Lazy load animations for performance

```typescript
// Example wrapper pattern
// ServerContent.tsx (no "use client")
export function StaticContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

// AnimatedContent.tsx ("use client")
'use client'
export function AnimatedContent({ children, ...props }) {
  return <motion.div {...props}>{children}</motion.div>;
}
```

### UI Components (47 files)

**Pattern:** Already have "use client" directive

**Strategy:** These are migration-ready, just need to verify imports work with Next.js

### Custom Hooks (2 files)

**Pattern:** All require "use client"

**Strategy:**
1. Mark with "use client"
2. Ensure proper hydration handling
3. Consider server-side alternatives where possible

## File-by-File Migration Priority

### Priority 1: Foundation (Core Infrastructure)
```
src/types/index.ts ✅ Server-compatible
src/lib/language.ts ✅ Server-compatible  
src/i18n/index.ts ✅ Server-compatible
src/i18n/translations.ts ✅ Server-compatible
```

### Priority 2: Layout & Navigation
```
src/components/Header.tsx → needs "use client"
src/components/Footer.tsx → needs "use client"
src/components/Router.tsx → REPLACE with Next.js routing
```

### Priority 3: Pages
```
src/pages/HomePage.tsx ✅ Server-compatible (surprising!)
src/pages/AboutPage.tsx → needs "use client" (Framer Motion)
src/pages/ServicesPage.tsx → needs "use client" (Framer Motion)  
src/pages/ContactPage.tsx → needs "use client" (Framer Motion)
src/pages/LogoShowcase.tsx → needs "use client" (Framer Motion)
```

### Priority 4: SEO & Performance
```
src/components/SEO.tsx → REFACTOR to metadata API
src/components/Hreflang.tsx → REFACTOR to metadata API
src/components/JsonLd.tsx → REFACTOR to metadata API
src/components/PerformanceOptimization.tsx → ADAPT for Next.js
```

## Breaking Changes to Address

### 1. Document/Window Access
**Files affected:** 15+ files
**Solution:** Move to useEffect with proper hydration checks

### 2. LocalStorage Usage
**Files affected:** 4 files
**Solution:** Add hydration safety checks

```typescript
// Before
const [theme, setTheme] = useState(localStorage.getItem('theme'));

// After
const [theme, setTheme] = useState();

useEffect(() => {
  setTheme(localStorage.getItem('theme'));
}, []);
```

### 3. Router State Management
**Files affected:** Custom Router.tsx + consumers
**Solution:** Replace with Next.js useRouter and URL params

## Estimated Effort by Category

| Category | Files | Effort | Risk |
|----------|-------|--------|------|
| Server Components | 19 | 🟢 Low | None |
| UI Components | 47 | 🟢 Low | Already have "use client" |
| Framer Motion | 23 | 🟡 Medium | Need "use client" + testing |
| SEO Components | 3 | 🔴 High | Complete refactor needed |
| Router System | 1 | 🔴 High | Complete replacement |
| Hooks & Utils | 8 | 🟡 Medium | Need "use client" + hydration |

## Pre-Migration Script

Create this script to automate basic fixes:

```bash
#!/bin/bash
# pre-migration-fixes.sh

# 1. Add "use client" to Framer Motion components
find src -name "*.tsx" -exec grep -l "framer-motion" {} \; | while read file; do
  if ! grep -q '"use client"' "$file"; then
    sed -i '1i"use client";\n' "$file"
  fi
done

# 2. Create Next.js directory structure
mkdir -p app/{[lang]/{about,services,contact,portfolio},globals}

# 3. Copy compatible components
cp src/types/index.ts app/types/
cp src/lib/language.ts app/lib/

echo "Pre-migration fixes completed!"
```

This document provides actionable steps to prepare the codebase for a smoother Next.js migration.
# 🎨 Design Specification - IKH-TechSystems Landing Page

## 📋 Overview

This design specification documents the visual design, layout patterns, components, animations, and styling system of the IKH-TechSystems landing page. The site follows modern design principles with a clean, professional aesthetic focused on technology and innovation.

## 🏗️ Architecture & Technology Stack

- **Framework**: React 18 + TypeScript + Vite 5
- **Styling**: Tailwind CSS 3 with custom CSS variables
- **UI Components**: Radix UI primitives with shadcn/ui patterns
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Inter font family
- **Build Tool**: Vite with optimized chunking

## 🎯 Key Pages Structure

### 🏠 Home Page
**Sections Hierarchy:**
1. **Hero Section** - Full-width with animated carousel and rotating text
2. **Challenges We Solve** - 4-column grid with icon cards
3. **Vision Steps** - Alternating image/text sections with external links

### 👥 About Page  
**Sections Hierarchy:**
1. **Hero** - Centered text introduction
2. **Stats** - 4-column metrics grid
3. **Team** - Side-by-side content with team member grid
4. **Mission** - Image + values list
5. **Innovation** - Technologies grid with icons

### 🛠️ Services Page
**Sections Hierarchy:**
1. **Hero** - Centered introduction
2. **Services Grid** - Alternating layout service cards with features
3. **Pricing** - 4-column pricing cards with disclaimer

### 📞 Contact Page
**Sections Hierarchy:**
1. **Hero** - Simple centered text
2. **Contact Info** - Split layout with contact cards and map
3. **Telegram Section** - Bot integration with features and CTA buttons

## 🎨 Design System

### 🎭 Color Palette

**Primary Colors:**
- **Primary**: `hsl(221.2, 83.2%, 53.3%)` - Main brand blue
- **Secondary**: `hsl(210, 40%, 96%)` - Light gray backgrounds
- **Accent**: `hsl(210, 40%, 96%)` - Same as secondary for consistency

**Brand Colors:**
- **CodeHero Blue**: `hsl(221.2, 83.2%, 53.3%)`
- **CodeHero Purple**: `hsl(262.1, 83.3%, 57.8%)`
- **CodeHero Green**: `hsl(142.1, 76.2%, 36.3%)`
- **CodeHero Orange**: `hsl(24.6, 95%, 53.1%)`
- **CodeHero Red**: `hsl(0, 84.2%, 60.2%)`

**Semantic Colors:**
- **Background**: `hsl(0, 0%, 100%)` (light) / `hsl(222.2, 84%, 4.9%)` (dark)
- **Foreground**: `hsl(222.2, 84%, 4.9%)` (light) / `hsl(210, 40%, 98%)` (dark)
- **Muted**: `hsl(215.4, 16.3%, 46.9%)` for secondary text
- **Destructive**: `hsl(0, 84.2%, 60.2%)` for errors/warnings

### 🌈 Gradients
- **Primary Gradient**: `linear-gradient(135deg, hsl(221.2, 83.2%, 53.3%) 0%, hsl(262.1, 83.3%, 57.8%) 100%)`
- **Secondary Gradient**: `linear-gradient(135deg, hsl(142.1, 76.2%, 36.3%) 0%, hsl(221.2, 83.2%, 53.3%) 100%)`
- **Hero Background**: `bg-gradient-to-br from-background to-accent/20`

### 📏 Spacing & Layout

**Container System:**
- **Default Container**: `container mx-auto px-4` (responsive max-width)
- **Narrow Container**: `max-w-4xl mx-auto` for content-focused sections
- **Wide Container**: `max-w-6xl mx-auto` for feature sections

**Common Spacing Patterns:**
- **Section Padding**: `py-20` (5rem top/bottom)
- **Card Padding**: `p-6` (1.5rem all sides)
- **Content Spacing**: `space-y-6` (1.5rem vertical gap)
- **Grid Gaps**: `gap-6`, `gap-8`, `gap-12` depending on context

**Responsive Grid Patterns:**
- **4-Column**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- **2-Column**: `grid-cols-1 lg:grid-cols-2`
- **12-Column**: `grid-cols-1 lg:grid-cols-12` (Hero layout)

### 📱 Responsive Breakpoints
- **sm**: `640px` - Small tablets
- **md**: `768px` - Tablets/small laptops
- **lg**: `1024px` - Laptops/desktops
- **xl**: `1280px` - Large desktops
- **2xl**: `1536px` - Extra large screens

### ✍️ Typography

**Font Stack:**
```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
```

**Heading Hierarchy:**
- **H1**: `text-4xl lg:text-5xl font-bold` (2.25rem/3rem)
- **H2**: `text-3xl font-bold` (1.875rem)
- **H3**: `text-xl font-semibold` (1.25rem)
- **H4**: `text-lg font-semibold` (1.125rem)

**Body Text:**
- **Large**: `text-lg leading-relaxed` (1.125rem, 1.625 line-height)
- **Base**: `text-base` (1rem)
- **Small**: `text-sm` (0.875rem)
- **Muted**: `text-muted-foreground` for secondary text

**Font Weights:**
- **Bold**: `font-bold` (700) - Headings
- **Semibold**: `font-semibold` (600) - Subheadings
- **Medium**: `font-medium` (500) - Buttons, emphasis
- **Normal**: `font-normal` (400) - Body text

## 🧩 Component System

### 🔘 Buttons

**Primary Button:**
```css
bg-primary text-primary-foreground hover:bg-primary/90 
px-6 py-3 rounded-md font-medium transition-colors
```

**Secondary Button:**
```css
border border-border bg-background text-foreground 
hover:bg-accent hover:text-accent-foreground 
px-6 py-3 rounded-md font-medium transition-colors
```

**Button Variants:** Default, Destructive, Outline, Secondary, Ghost, Link
**Button Sizes:** Default (h-9), Small (h-8), Large (h-10), Icon (size-9)

### 🃏 Cards

**Base Card:**
```css
bg-card text-card-foreground flex flex-col gap-6 rounded-xl border
```

**Interactive Card:**
```css
hover:shadow-lg transition-shadow duration-300
```

**Card Components:**
- `CardHeader` - Title and description area
- `CardContent` - Main content area  
- `CardFooter` - Action buttons area
- `CardTitle` - Styled heading
- `CardDescription` - Muted text

### 📋 Inputs & Forms

**Input Field:**
```css
border border-input bg-background text-foreground 
rounded-md px-3 py-2 focus-visible:ring-ring
```

**Label:**
```css
text-sm font-medium leading-none
```

## 🎭 Animation System

### 🎬 Framer Motion Patterns

**Page Entrance:**
```javascript
{
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
}
```

**Scroll Reveal:**
```javascript
{
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true }
}
```

**Staggered Animation:**
```javascript
{
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: index * 0.2 },
  viewport: { once: true }
}
```

**Hover Effects:**
- `hover:shadow-lg transition-shadow duration-300`
- `hover:bg-primary/90 transition-colors`
- `hover:scale-105 transition-transform`

### 🔄 Hero Carousel

**Slide Transitions:**
- **Auto-rotation**: 5.8 second intervals
- **Synchronized text rotation** with carousel
- **Fade transitions** between slides
- **Responsive image sizing** with aspect ratios

## 🖼️ Image & Media System

### 📸 Image Sources
- **Hero Carousel**: Local `/media/banner/` directory
- **Fallback System**: `ImageWithFallback` component with error handling
- **External Images**: Unsplash URLs with specific crop/format parameters

### 🎯 Aspect Ratios
- **Hero Images**: Various sizes, responsive scaling
- **Team Photos**: `aspect-square` for consistency
- **Feature Images**: `aspect-video` for wide content

### 🎨 Image Treatments
- **Rounded Corners**: `rounded-lg` for most images
- **Shadows**: Applied to elevated image containers
- **Overlays**: Gradient overlays on hero images

## 🏗️ Layout Patterns

### 📐 Common Grid Layouts

**4-Column Grid (Cards):**
```css
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
```

**2-Column Split:**
```css
grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
```

**Hero Layout:**
```css
grid grid-cols-1 lg:grid-cols-12 gap-6 items-center
/* Text: lg:col-span-7, Image: lg:col-span-5 */
```

### 📱 Mobile-First Approach
- **Base**: Single column layout
- **md+**: 2-column grids where appropriate  
- **lg+**: Full desktop layouts with complex grids

## 🌗 Dark Mode Support

### 🔄 Theme Toggle
- **Toggle Component**: Custom switch with sun/moon icons
- **CSS Variables**: Automatic color switching via `:root` and `[data-theme="dark"]`
- **Persistent Storage**: Theme preference saved to localStorage

### 🎨 Dark Mode Adjustments
- **Deeper Shadows**: Increased opacity for better contrast
- **Adjusted Borders**: Darker border colors
- **Inverted Text**: Automatic foreground/background inversion

## 🔍 Accessibility Features

### ♿ A11y Implementation
- **ARIA Labels**: Proper labeling for interactive elements
- **Focus States**: `focus-visible:ring-ring` for keyboard navigation
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: `@media (prefers-reduced-motion: reduce)`

### ⌨️ Keyboard Navigation
- **Tab Order**: Logical tab sequence
- **Skip Links**: Available for main content
- **Focus Indicators**: Clear visual focus states

## 📊 Performance Considerations

### ⚡ Optimization Strategies
- **Code Splitting**: Automatic chunking via Vite
- **Image Optimization**: WebP format with fallbacks
- **Font Loading**: Preloaded Inter variable font
- **CSS Optimization**: Purged unused Tailwind classes

### 📈 Core Web Vitals
- **LCP**: Optimized hero image loading
- **CLS**: Stable layouts with consistent sizing
- **FID**: Minimal JavaScript for interactions

## 🛠️ Development Guidelines

### 🎯 Component Architecture
- **Atomic Design**: Atoms → Molecules → Organisms → Templates
- **Consistent Naming**: BEM-inspired class naming
- **Reusable Patterns**: Extracted common layouts and components

### 📝 Code Standards
- **TypeScript**: Strict typing for all components
- **ESLint**: Zero warnings policy
- **Prettier**: Consistent code formatting
- **Tailwind**: Utility-first with custom CSS variables

### 🔧 Customization Points
- **CSS Variables**: Easy theme customization in `variables.css`
- **Tailwind Config**: Extended with custom colors and animations
- **Component Variants**: class-variance-authority for flexible components

---

**📋 Note**: This specification captures the current state of the design system as of the analysis date. For the most up-to-date patterns and components, refer to the source code and `pages.json` machine-readable specification.
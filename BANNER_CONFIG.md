# 🖼️ Banner Configuration Guide

## 📏 Optimal Format Specifications

### **Image Requirements:**
- **Format**: `.webp` (best compression)
- **Aspect Ratio**: `9:16` (vertical)
- **Dimensions**: 
  - **Recommended**: `720x1280px` (HD quality)
  - **Alternative**: `540x960px` (smaller size)
- **Quality**: 80-85% (balance size/quality)
- **File naming**: Use descriptive names (e.g., `web-development.webp`)

### **Placement:**
- Place new images in: `/public/media/banner/`
- Update configuration in: `/lib/i18n.ts`

## 🔄 Configuration Template

When you add new images, update the carousel slides in `lib/i18n.ts`:

```javascript
carousel: {
  slides: [
    {
      image: "/media/banner/your-image-name.webp",
      alt: "SEO-optimized description for web development services",
      title: "Service Title",
      subtitle: "Service description",
      cta: {
        label: "Call to action",
        href: "/services#anchor"
      }
    }
    // Add more slides...
  ]
}
```

## 🎯 SEO-Optimized Alt Text Examples

### **For Web Development:**
```
"Professional web development services using React and Next.js for modern business solutions"
```

### **For Frontend Development:**
```
"Modern frontend development with responsive design and user-friendly interfaces"
```

### **For Mobile Development:**
```
"Cross-platform mobile app development for iOS and Android with React Native"
```

### **For Analytics:**
```
"Business analytics dashboard showing data visualization and performance metrics"
```

### **For Infrastructure:**
```
"Cloud server infrastructure and hosting solutions for scalable business applications"
```

## ⚡ Performance Tips

1. **Optimize before upload**: Use tools like Squoosh or ImageOptim
2. **Include fallbacks**: Keep a `.jpg` version for older browsers
3. **Lazy loading**: Already implemented in HeroCarousel component
4. **Preload first image**: First slide has `priority={true}`

## 🌍 Multi-language Alt Texts

Remember to update alt texts for all languages:
- **English (en)**: Professional, technical descriptions
- **Czech (cs)**: Local market focused
- **German (de)**: Business-oriented descriptions  
- **Ukrainian (ua)**: Clear, accessible language

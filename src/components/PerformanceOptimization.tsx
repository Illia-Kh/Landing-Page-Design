import { useEffect, useRef } from 'react';
import { useState } from 'react';

// Component for lazy loading and performance optimization
export function LazySection({ 
  children, 
  className = "", 
  threshold = 0.1 
}: { 
  children: React.ReactNode; 
  className?: string;
  threshold?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <section 
      ref={sectionRef} 
      className={`${className} ${isVisible ? 'animate-in' : 'opacity-0'}`}
    >
      {children}
    </section>
  );
}

// Component for preloading critical resources
export function PreloadResources() {
  useEffect(() => {
    // Preload critical CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.as = 'style';
    criticalCSS.href = '/src/index.css';
    document.head.appendChild(criticalCSS);

    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.href = '/fonts/inter-var.woff2';
    fontPreload.crossOrigin = 'anonymous';
    document.head.appendChild(fontPreload);

    // Preload critical images
    const imagePreload = document.createElement('link');
    imagePreload.rel = 'preload';
    imagePreload.as = 'image';
    imagePreload.href = '/logo.png';
    document.head.appendChild(imagePreload);

    return () => {
      // Cleanup
      document.head.removeChild(criticalCSS);
      document.head.removeChild(fontPreload);
      document.head.removeChild(imagePreload);
    };
  }, []);

  return null;
}

// Component for monitoring Core Web Vitals
export function CoreWebVitalsMonitor() {
  useEffect(() => {
    // Monitor Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Send to analytics if needed
        if (lastEntry.startTime > 2500) {
          console.warn('LCP is too slow:', lastEntry.startTime);
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // First Input Delay calculation
          const fid = (entry as PerformanceEventTiming).processingStart - entry.startTime;
          console.warn('FID:', fid);
          
          if (fid > 100) {
            console.warn('FID is too slow:', fid);
          }
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0;
            console.warn('CLS:', clsValue);
            
            if (clsValue > 0.1) {
              console.warn('CLS is too high:', clsValue);
            }
          }
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return null;
}

// Component for service worker registration
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  return null;
}

// Component for resource hints
export function ResourceHints() {
  useEffect(() => {
    // DNS prefetch for external domains
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = '//fonts.googleapis.com';
    document.head.appendChild(dnsPrefetch);

    // Preconnect to external domains
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect);

    return () => {
      document.head.removeChild(dnsPrefetch);
      document.head.removeChild(preconnect);
    };
  }, []);

  return null;
}

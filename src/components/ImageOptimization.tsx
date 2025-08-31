import { ReactNode } from 'react';

interface ImageOptimizationProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  children?: ReactNode;
}

export function ImageOptimization({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  loading = 'lazy',
  priority = false,
  children 
}: ImageOptimizationProps) {
  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        className="w-full h-auto"
        onLoad={(e) => {
          // Add loading animation completion
          const target = e.target as HTMLImageElement;
          target.classList.add('loaded');
        }}
      />
      {children}
    </div>
  );
}

// SEO optimized image with structured data
export function SEOImage({ 
  src, 
  alt, 
  caption,
  width, 
  height, 
  className 
}: ImageOptimizationProps & { caption?: string }) {
  return (
    <figure className={className}>
      <ImageOptimization
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
      {caption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

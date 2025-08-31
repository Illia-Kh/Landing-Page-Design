import { ReactNode } from 'react';

// Semantic HTML components for better SEO
export function Main({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <main className={className} role="main">
      {children}
    </main>
  );
}

export function Section({ 
  children, 
  className = "", 
  id,
  "aria-label": ariaLabel 
}: { 
  children: ReactNode; 
  className?: string;
  id?: string;
  "aria-label"?: string;
}) {
  return (
    <section className={className} id={id} aria-label={ariaLabel}>
      {children}
    </section>
  );
}

export function Article({ 
  children, 
  className = "", 
  id 
}: { 
  children: ReactNode; 
  className?: string;
  id?: string;
}) {
  return (
    <article className={className} id={id}>
      {children}
    </article>
  );
}

export function Aside({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <aside className={className} role="complementary">
      {children}
    </aside>
  );
}

export function Nav({ 
  children, 
  className = "", 
  "aria-label": ariaLabel 
}: { 
  children: ReactNode; 
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <nav className={className} role="navigation" aria-label={ariaLabel}>
      {children}
    </nav>
  );
}

export function Header({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <header className={className} role="banner">
      {children}
    </header>
  );
}

export function Footer({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <footer className={className} role="contentinfo">
      {children}
    </footer>
  );
}

// Heading components with proper hierarchy
export function H1({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <h1 className={`text-4xl font-bold ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <h2 className={`text-3xl font-semibold ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <h3 className={`text-2xl font-medium ${className}`}>
      {children}
    </h3>
  );
}

export function H4({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <h4 className={`text-xl font-medium ${className}`}>
      {children}
    </h4>
  );
}

export function H5({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <h5 className={`text-lg font-medium ${className}`}>
      {children}
    </h5>
  );
}

export function H6({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <h6 className={`text-base font-medium ${className}`}>
      {children}
    </h6>
  );
}

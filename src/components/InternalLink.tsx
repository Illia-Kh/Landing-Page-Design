import { ReactNode } from 'react';

interface InternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  "aria-label"?: string;
}

export function InternalLink({ 
  href, 
  children, 
  className = "", 
  onClick,
  title,
  "aria-label": ariaLabel 
}: InternalLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      title={title}
      aria-label={ariaLabel}
      // SEO friendly attributes
      rel="internal"
    >
      {children}
    </a>
  );
}

// Breadcrumb link component
export function BreadcrumbLink({ 
  href, 
  children, 
  isCurrent = false,
  className = "" 
}: InternalLinkProps & { isCurrent?: boolean }) {
  return (
    <a
      href={href}
      className={className}
      aria-current={isCurrent ? 'page' : undefined}
      rel="internal"
    >
      {children}
    </a>
  );
}

// Navigation link component
export function NavLink({ 
  href, 
  children, 
  isActive = false,
  className = "" 
}: InternalLinkProps & { isActive?: boolean }) {
  return (
    <a
      href={href}
      className={`${className} ${isActive ? 'active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
      rel="internal"
    >
      {children}
    </a>
  );
}

/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showText?: boolean
  textClassName?: string
  variant?: 'default' | 'header' | 'footer'
}

export function Logo({ 
  className, 
  showText = true,
  textClassName,
  variant = 'default'
}: LogoProps) {
  // Размеры для разных вариантов
  const getImageSize = () => {
    switch (variant) {
      case 'header':
        return { width: 40, height: 40 }
      case 'footer':
        return { width: 50, height: 50 }
      default:
        return { width: 120, height: 120 }
    }
  }

  const getImageClass = () => {
    switch (variant) {
      case 'header':
        return "logo-image-header"
      case 'footer':
        return "logo-image-footer"
      default:
        return "logo-image"
    }
  }

  const getTextClass = () => {
    switch (variant) {
      case 'header':
        return "logo-text-header"
      case 'footer':
        return "logo-text-footer"
      default:
        return "logo-text"
    }
  }

  const imageSize = getImageSize()

  return (
    <div className={cn("logo-container", className)}>
      {/* Logo Image */}
      <div className="relative">
        <img
          src="/logo/ikh-logo.svg"
          alt="IKH Systems Logo"
          width={imageSize.width}
          height={imageSize.height}
          className={getImageClass()}
          loading="eager"
          decoding="async"
        />
      </div>
      
      {/* Company Name - скрывается на очень маленьких экранах */}
      {showText && (
        <span className={cn(
          getTextClass(),
          "hidden xs:block", // Скрывается на экранах меньше 475px
          textClassName
        )}>
          IKH Systems
        </span>
      )}
    </div>
  )
}

// Компактная версия для мобильных
export function LogoCompact({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <img
        src="/logo/ikh-logo.svg"
        alt="IKH Systems"
        width={40}
        height={40}
        className="h-8 w-auto"
        loading="eager"
        decoding="async"
      />
    </div>
  )
}

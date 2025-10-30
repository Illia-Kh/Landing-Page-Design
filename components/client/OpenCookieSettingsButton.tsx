'use client'

interface OpenCookieSettingsButtonProps {
  className?: string
  label?: string
}

export function OpenCookieSettingsButton({ className, label = 'Cookie Settings' }: OpenCookieSettingsButtonProps) {
  const handleClick = () => {
    const event = new Event('openCookieSettings')
    window.dispatchEvent(event)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label={label}
    >
      {label}
    </button>
  )
}



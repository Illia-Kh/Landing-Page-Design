/**
 * Utility functions for smooth scrolling and centering elements
 */

export function scrollToElementCenter(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId)
  if (!element) return

  const elementRect = element.getBoundingClientRect()
  const elementTop = elementRect.top + window.pageYOffset
  const elementHeight = elementRect.height
  const windowHeight = window.innerHeight
  
  // Calculate position to center the element
  const centerPosition = elementTop - (windowHeight / 2) + (elementHeight / 2) + offset
  
  window.scrollTo({
    top: Math.max(0, centerPosition),
    behavior: 'smooth'
  })
}

export function scrollToElementTop(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId)
  if (!element) return

  const elementRect = element.getBoundingClientRect()
  const elementTop = elementRect.top + window.pageYOffset
  
  window.scrollTo({
    top: Math.max(0, elementTop - offset),
    behavior: 'smooth'
  })
}

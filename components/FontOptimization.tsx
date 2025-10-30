'use client'

import { useEffect } from 'react'

interface FontLoaderProps {
  fonts?: string[]
  preload?: boolean
}

export function FontLoader({ fonts = [], preload = true }: FontLoaderProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Preload critical fonts
    if (preload) {
      fonts.forEach(font => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'font'
        link.href = font
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
    }

    // Load fonts with font-display: swap for better performance
    const style = document.createElement('style')
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2') format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+0400-045F, U+0451, U+045C, U+045D, U+045E, U+045F, U+0490-0491, U+0492-0493, U+0496-0497, U+0498-0499, U+049A-049B, U+049C-049D, U+049E-049F, U+04A0-04A1, U+04A2-04A3, U+04A4-04A5, U+04A6-04A7, U+04A8-04A9, U+04AA-04AB, U+04AC-04AD, U+04AE-04AF, U+04B0-04B1, U+04B2-04B3, U+04B4-04B5, U+04B6-04B7, U+04B8-04B9, U+04BA-04BB, U+04BC-04BD, U+04BE-04BF, U+04C0-04C1, U+04C2-04C3, U+04C4-04C5, U+04C6-04C7, U+04C8-04C9, U+04CA-04CB, U+04CC-04CD, U+04CE-04CF, U+04D0-04D1, U+04D2-04D3, U+04D4-04D5, U+04D6-04D7, U+04D8-04D9, U+04DA-04DB, U+04DC-04DD, U+04DE-04DF, U+04E0-04E1, U+04E2-04E3, U+04E4-04E5, U+04E6-04E7, U+04E8-04E9, U+04EA-04EB, U+04EC-04ED, U+04EE-04EF, U+04F0-04F1, U+04F2-04F3, U+04F4-04F5, U+04F6-04F7, U+04F8-04F9, U+04FA-04FB, U+04FC-04FD, U+04FE-04FF;
      }
      
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLqfAZ9hiJ-Ek-_EeA.woff2') format('woff2');
        unicode-range: U+0102-0103, U+0104-0105, U+0106-0107, U+0108-0109, U+010A-010B, U+010C-010D, U+010E-010F, U+0110-0111, U+0112-0113, U+0114-0115, U+0116-0117, U+0118-0119, U+011A-011B, U+011C-011D, U+011E-011F, U+0120-0121, U+0122-0123, U+0124-0125, U+0126-0127, U+0128-0129, U+012A-012B, U+012C-012D, U+012E-012F, U+0130-0131, U+0132-0133, U+0134-0135, U+0136-0137, U+0138, U+0139-013A, U+013B-013C, U+013D-013E, U+013F-0140, U+0141-0142, U+0143-0144, U+0145-0146, U+0147-0148, U+0149-014A, U+014B-014C, U+014D-014E, U+014F-0150, U+0151-0152, U+0153-0154, U+0155-0156, U+0157-0158, U+0159-015A, U+015B-015C, U+015D-015E, U+015F-0160, U+0161-0162, U+0163-0164, U+0165-0166, U+0167-0168, U+0169-016A, U+016B-016C, U+016D-016E, U+016F-0170, U+0171-0172, U+0173-0174, U+0175-0176, U+0177-0178, U+0179-017A, U+017B-017C, U+017D-017E, U+017F, U+0180-0181, U+0182-0183, U+0184-0185, U+0186-0187, U+0188-0189, U+018A-018B, U+018C-018D, U+018E-018F, U+0190-0191, U+0192-0193, U+0194-0195, U+0196-0197, U+0198-0199, U+019A-019B, U+019C-019D, U+019E-019F, U+01A0-01A1, U+01A2-01A3, U+01A4-01A5, U+01A6-01A7, U+01A8-01A9, U+01AA-01AB, U+01AC-01AD, U+01AE-01AF, U+01B0-01B1, U+01B2-01B3, U+01B4-01B5, U+01B6-01B7, U+01B8-01B9, U+01BA-01BB, U+01BC-01BD, U+01BE-01BF, U+01C0-01C1, U+01C2-01C3, U+01C4-01C5, U+01C6-01C7, U+01C8-01C9, U+01CA-01CB, U+01CC-01CD, U+01CE-01CF, U+01D0-01D1, U+01D2-01D3, U+01D4-01D5, U+01D6-01D7, U+01D8-01D9, U+01DA-01DB, U+01DC-01DD, U+01DE-01DF, U+01E0-01E1, U+01E2-01E3, U+01E4-01E5, U+01E6-01E7, U+01E8-01E9, U+01EA-01EB, U+01EC-01ED, U+01EE-01EF, U+01F0-01F1, U+01F2-01F3, U+01F4-01F5, U+01F6-01F7, U+01F8-01F9, U+01FA-01FB, U+01FC-01FD, U+01FE-01FF;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [fonts, preload])

  return null
}

// Hook for font loading optimization
export function useFontOptimization() {
  useEffect(() => {
    // Optimize font loading for better performance
    if (typeof window === 'undefined') return

    // Preload critical fonts
    const criticalFonts = [
      'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2'
    ]

    criticalFonts.forEach(font => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.href = font
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // Add font-display: swap to existing font faces
    const existingFonts = document.querySelectorAll('link[href*="fonts.googleapis.com"]')
    existingFonts.forEach(link => {
      if (!link.hasAttribute('data-swap')) {
        link.setAttribute('data-swap', 'true')
        const href = link.getAttribute('href')
        if (href && !href.includes('display=swap')) {
          link.setAttribute('href', `${href}&display=swap`)
        }
      }
    })
  }, [])
}

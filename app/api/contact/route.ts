import { NextRequest, NextResponse } from 'next/server'
import { ContactFormData, ContactFormResponse } from '@/types'

// Basic validation schema
const validateContactForm = (data: any): data is ContactFormData => {
  return (
    typeof data.name === 'string' &&
    data.name.length >= 2 &&
    data.name.length <= 100 &&
    typeof data.email === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    typeof data.message === 'string' &&
    data.message.length >= 10 &&
    data.message.length <= 1000
  )
}

// Basic anti-spam honeypot check
const checkHoneypot = (data: any): boolean => {
  // Check for honeypot field (should be empty)
  if (data.website || data.url || data.homepage) {
    return false
  }
  return true
}

// Basic time-based spam check
const checkTimestamp = (data: any): boolean => {
  const now = Date.now()
  const timestamp = data.timestamp
  
  if (!timestamp) return false
  
  // Form should take at least 3 seconds to fill
  const minTime = 3000
  // Form should not be older than 1 hour
  const maxTime = 3600000
  
  const timeDiff = now - timestamp
  return timeDiff >= minTime && timeDiff <= maxTime
}

export async function POST(request: NextRequest): Promise<NextResponse<ContactFormResponse>> {
  try {
    const data = await request.json()

    // Validate form data
    if (!validateContactForm(data)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          message: 'Please check your input and try again.',
        },
        { status: 400 }
      )
    }

    // Check anti-spam measures
    if (!checkHoneypot(data)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Spam detected',
          message: 'Your submission appears to be spam.',
        },
        { status:422 }
      )
    }

    if (!checkTimestamp(data)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid submission timing',
          message: 'Please try submitting the form again.',
        },
        { status:422 }
      )
    }

    // Clean and sanitize data
    const cleanData: ContactFormData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      message: data.message.trim(),
    }

    // Log the submission (in production, you would save to database or send email)
    console.log('Contact form submission:', {
      ...cleanData,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    })

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        data: {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
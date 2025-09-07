'use client'

import { useState, useEffect } from 'react'
import { ContactFormData, ContactFormResponse } from '@/types'
import { trackFormSubmission } from '@/components/PageViewTracker'
import { getTranslation } from '@/lib/i18n'
import { Language } from '@/types'
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import { MotionSection } from '@/components/client/MotionSection'

interface ContactFormProps {
  lang: Language
}

export function ContactForm({ lang }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState<ContactFormResponse | null>(null)
  const [formStartTime, setFormStartTime] = useState<number>(0)
  
  const t = getTranslation(lang)

  // Track when form is first interacted with for anti-spam
  useEffect(() => {
    setFormStartTime(Date.now())
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setResponse(null) // Clear previous response when user types
  }

  const validateForm = (): string[] => {
    const errors: string[] = []
    
    if (!formData.name.trim() || formData.name.length < 2) {
      errors.push('Name must be at least 2 characters long')
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address')
    }
    
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.push('Message must be at least 10 characters long')
    }
    
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const errors = validateForm()
    if (errors.length > 0) {
      setResponse({
        success: false,
        error: 'Validation failed',
        message: errors.join('. ')
      })
      trackFormSubmission('contact', false)
      return
    }

    setIsSubmitting(true)

    try {
      const submissionData = {
        ...formData,
        timestamp: formStartTime,
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result: ContactFormResponse = await res.json()
      setResponse(result)

      if (result.success) {
        setFormData({ name: '', email: '', message: '' })
        trackFormSubmission('contact', true)
      } else {
        trackFormSubmission('contact', false)
      }
    } catch (error) {
      setResponse({
        success: false,
        error: 'Network error',
        message: 'Failed to send message. Please try again.',
      })
      trackFormSubmission('contact', false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MotionSection className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      {response?.success ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Message Sent!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {response.message}
          </p>
          <button
            onClick={() => {
              setResponse(null)
              setFormStartTime(Date.now())
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="website"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />
          
          <div>
            <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <User className="w-4 h-4 mr-2" />
              {t.contact.form.name.label}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t.contact.form.name.placeholder}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              {t.contact.form.email.label}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t.contact.form.email.placeholder}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 mr-2" />
              {t.contact.form.message.label}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t.contact.form.message.placeholder}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          {response && !response.success && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {response.message}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                {t.contact.form.submit}
              </>
            )}
          </button>
        </form>
      )}
    </MotionSection>
  )
}
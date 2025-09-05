import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, MessageSquare } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { trackLeadSubmit } from '../lib/analytics'

interface ContactFormProps {
  language: string
}

const formTexts = {
  ru: {
    title: 'Отправить сообщение',
    name: 'Имя',
    email: 'Email',
    message: 'Сообщение',
    submit: 'Отправить',
    success: 'Сообщение отправлено!',
    error: 'Ошибка отправки. Попробуйте еще раз.',
    namePlaceholder: 'Введите ваше имя',
    emailPlaceholder: 'Введите ваш email',
    messagePlaceholder: 'Расскажите о вашем проекте...'
  },
  en: {
    title: 'Send Message',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Send',
    success: 'Message sent!',
    error: 'Error sending. Please try again.',
    namePlaceholder: 'Enter your name',
    emailPlaceholder: 'Enter your email',
    messagePlaceholder: 'Tell us about your project...'
  },
  de: {
    title: 'Nachricht senden',
    name: 'Name',
    email: 'Email',
    message: 'Nachricht',
    submit: 'Senden',
    success: 'Nachricht gesendet!',
    error: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
    namePlaceholder: 'Geben Sie Ihren Namen ein',
    emailPlaceholder: 'Geben Sie Ihre E-Mail ein',
    messagePlaceholder: 'Erzählen Sie uns von Ihrem Projekt...'
  },
  cs: {
    title: 'Odeslat zprávu',
    name: 'Jméno',
    email: 'Email',
    message: 'Zpráva',
    submit: 'Odeslat',
    success: 'Zpráva odeslána!',
    error: 'Chyba při odesílání. Zkuste to znovu.',
    namePlaceholder: 'Zadejte své jméno',
    emailPlaceholder: 'Zadejte svůj email',
    messagePlaceholder: 'Řekněte nám o svém projektu...'
  }
}

export function ContactForm({ language }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const text = formTexts[language as keyof typeof formTexts] || formTexts.en

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Track the form submission
      trackLeadSubmit('contact_form')
      
      // Simulate form submission (replace with your actual form submission logic)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">{text.title}</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4" />
              {text.name}
            </Label>
            <Input
              id="name"
              type="text"
              placeholder={text.namePlaceholder}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4" />
              {text.email}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={text.emailPlaceholder}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="message" className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4" />
              {text.message}
            </Label>
            <Textarea
              id="message"
              placeholder={text.messagePlaceholder}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={4}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
            className="w-full"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Sending...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                {text.submit}
              </div>
            )}
          </Button>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm"
            >
              {text.success}
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm"
            >
              {text.error}
            </motion.div>
          )}
        </form>
      </Card>
    </motion.div>
  )
}
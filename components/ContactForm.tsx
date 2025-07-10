"use client";

import { motion } from 'framer-motion';
import { Mail, Send, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { fashionToast } from '@/lib/toast';

interface ContactFormProps {
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
}

export default function ContactForm({
  title = "Send us a Message",
  description = "We're here to help and answer any question you might have.",
  compact = false,
  className = ""
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xdkzrrak', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
        fashionToast.form.submitted('contact message');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'There was an error submitting your message. Please try again.';
      setError(errorMessage);
      fashionToast.form.error('contact message', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={`text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-2xl border-2 border-green-200 relative overflow-hidden ${className}`}
      >
        {/* Success animation background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-emerald-100/50"></div>

        {/* Floating celebration elements */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-6 left-6 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-8 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            Message Sent Successfully! 🎉
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-gray-700 mb-6 text-lg"
          >
            Thank you for reaching out! We'll get back to you as soon as possible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Send Another Message
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl shadow-2xl p-8 border border-purple-100 relative overflow-hidden ${className}`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-indigo-50/50 opacity-60"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-6 left-6 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-1/3 right-8 w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-60"></div>

      <div className="relative z-10">
        {!compact && (
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className={compact ? "space-y-4" : "grid md:grid-cols-2 gap-6"}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                id="name"
                name="name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white"
                placeholder="Your full name"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                id="email"
                name="email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white"
            required
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="technical">Technical Support</option>
            <option value="feature">Feature Request</option>
            <option value="bug">Bug Report</option>
            <option value="partnership">Partnership</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={compact ? 4 : 6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white"
            placeholder="Tell us how we can help you..."
            required
          />
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </motion.div>
        )}

        {/* Honeypot field for spam protection */}
        <input type="text" name="_gotcha" style={{ display: 'none' }} />

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
      </div>
    </motion.div>
  );
}

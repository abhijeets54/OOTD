"use client";

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Contact() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MessageCircle className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <ContactForm
            title="Send us a Message"
            description="We're here to help and answer any question you might have."
          />
        </div>
      </section>
    </div>
  );
}

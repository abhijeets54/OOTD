"use client";

import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Search, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I create my first outfit with OOTD AI?",
          answer: "Getting started is easy! Simply sign up for an account, complete your style profile, and then either upload a photo of your outfit for analysis or use our AI generator to create new outfit recommendations based on your preferences."
        },
        {
          question: "What information do I need to provide for my style profile?",
          answer: "Your style profile includes your size preferences, favorite colors, style preferences (casual, formal, trendy, etc.), body type, and any specific fashion goals. This helps our AI provide more personalized recommendations."
        },
        {
          question: "Is OOTD AI free to use?",
          answer: "Yes! OOTD AI offers a free tier that includes basic outfit analysis and AI recommendations. We also offer premium features for users who want advanced styling options and unlimited generations."
        }
      ]
    },
    {
      title: "AI Features",
      faqs: [
        {
          question: "How accurate are the AI outfit recommendations?",
          answer: "Our AI uses advanced machine learning models trained on fashion data and user preferences. The accuracy improves as you use the platform more and provide feedback on recommendations. Most users see highly relevant suggestions within their first few uses."
        },
        {
          question: "Can the AI understand different fashion styles?",
          answer: "Absolutely! Our AI is trained on diverse fashion styles including casual, business, formal, streetwear, vintage, minimalist, and many others. It can adapt recommendations to match your preferred aesthetic."
        },
        {
          question: "How does the outfit analysis feature work?",
          answer: "Upload a photo of your outfit, and our AI analyzes color coordination, style coherence, fit, and overall aesthetic. You'll receive detailed feedback and suggestions for improvements or alternatives."
        }
      ]
    },
    {
      title: "Account & Privacy",
      faqs: [
        {
          question: "Is my personal information and photos secure?",
          answer: "Yes, we take privacy seriously. All photos and personal data are encrypted and stored securely. We never share your personal information with third parties, and you can delete your data at any time."
        },
        {
          question: "Can I delete my account and data?",
          answer: "Yes, you can delete your account and all associated data at any time from your profile settings. This action is permanent and cannot be undone."
        },
        {
          question: "How do I change my style preferences?",
          answer: "You can update your style preferences anytime by going to your profile settings. Changes will immediately affect future AI recommendations."
        }
      ]
    },
    {
      title: "Technical Support",
      faqs: [
        {
          question: "What image formats are supported for uploads?",
          answer: "We support JPG, PNG, and WebP formats. Images should be under 10MB for best performance. For optimal results, use clear, well-lit photos."
        },
        {
          question: "Why are my outfit generations taking a long time?",
          answer: "AI generation typically takes 10-30 seconds. Longer times may occur during peak usage. If you experience consistent delays, try refreshing the page or contact support."
        },
        {
          question: "The app isn't working properly on my device. What should I do?",
          answer: "Try clearing your browser cache, updating to the latest browser version, or switching to a different browser. If issues persist, contact our support team with details about your device and browser."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

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
            <HelpCircle className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Find quick answers to common questions about OOTD AI
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-purple-300 text-gray-900 placeholder-gray-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No FAQs found matching your search.</p>
                <Button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 bg-purple-600 hover:bg-purple-700"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              filteredFAQs.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                    {category.title}
                  </h2>
                  
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <div
                          key={faqIndex}
                          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-900 pr-4">
                              {faq.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            )}
                          </button>
                          
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-6 pb-4"
                            >
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Contact Support
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

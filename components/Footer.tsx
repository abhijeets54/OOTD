"use client";

import Link from 'next/link';
import { LoaderLink } from '@/components/ui/LoaderLink';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Heart,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "How it Works", href: "/#how-it-works" },
        { label: "Create Outfit", href: "/create-outfit" },
        { label: "My Outfits", href: "/outfits" },
      ]
    },
    {
      title: "Account",
      links: [
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/profile" },
        { label: "Style Preferences", href: "/profile" },
        { label: "Sign In", href: "/sign-in" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
      ]
    }
  ];



  return (
    <footer className="footer-glass text-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-lg blur opacity-75" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                    #OOTD
                  </span>
                  <span className="text-xs text-gray-600 -mt-1">AI Fashion Stylist</span>
                </div>
              </Link>
              
              <p className="text-gray-600 mb-6 max-w-sm">
                Transform your style with AI-powered outfit recommendations, style analysis, and personalized fashion insights.
              </p>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('http') ? (
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ) : (
                      <LoaderLink
                        href={link.href}
                        className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group"
                      >
                        {link.label}
                      </LoaderLink>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-300 pt-8 mb-8"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Connect With Us
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Transform your style with AI-powered outfit recommendations, style analysis, and personalized fashion insights.
            </p>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="https://github.com/abhijeets54"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
              >
                <Github className="h-5 w-5 text-gray-700 hover:text-gray-900" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/abhijeets9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
              >
                <Linkedin className="h-5 w-5 text-gray-700 hover:text-gray-900" />
              </motion.a>
              <motion.a
                href="https://twitter.com/abhijeets54"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
              >
                <Twitter className="h-5 w-5 text-gray-700 hover:text-gray-900" />
              </motion.a>
              <motion.a
                href="https://instagram.com/abhijeets54"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
              >
                <Instagram className="h-5 w-5 text-gray-700 hover:text-gray-900" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {currentYear} #OOTD. All rights reserved. Built with{' '}
            <Heart className="inline h-4 w-4 text-red-500 mx-1" />
            for fashion enthusiasts.
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600">Loved #OOTD?</span>
            <motion.a
              href="https://abhijeets-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-1"
            >
              <span>Contact Developer</span>
              <ExternalLink className="h-3 w-3" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

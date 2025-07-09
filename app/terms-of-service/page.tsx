"use client";

import { motion } from 'framer-motion';
import { FileText, Users, Shield, AlertTriangle, Scale, Calendar } from 'lucide-react';

export default function TermsOfService() {
  const lastUpdated = "March 1, 2025";

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        "By accessing and using OOTD AI, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, you may not use our service",
        "These terms apply to all users, including visitors, registered users, and premium subscribers",
        "Your continued use of the service constitutes acceptance of any updates to these terms"
      ]
    },
    {
      title: "User Accounts and Responsibilities",
      icon: Users,
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You must notify us immediately of any unauthorized use of your account",
        "You are responsible for all activities that occur under your account",
        "You must be at least 13 years old to use our service"
      ]
    },
    {
      title: "Acceptable Use",
      icon: Shield,
      content: [
        "Use the service only for lawful purposes and in accordance with these terms",
        "Do not upload inappropriate, offensive, or copyrighted content",
        "Respect other users and maintain a positive community environment",
        "Do not attempt to reverse engineer or compromise our AI technology",
        "Do not use the service for commercial purposes without our written consent"
      ]
    },
    {
      title: "Prohibited Activities",
      icon: AlertTriangle,
      content: [
        "Harassment, bullying, or threatening behavior toward other users",
        "Uploading malicious software, viruses, or harmful code",
        "Attempting to gain unauthorized access to our systems or other user accounts",
        "Scraping, crawling, or automated data collection from our platform",
        "Creating fake accounts or impersonating others"
      ]
    }
  ];

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
            <Scale className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-purple-100 mb-4 max-w-2xl mx-auto">
              Please read these terms carefully before using our AI-powered fashion recommendation service.
            </p>
            <div className="flex items-center justify-center text-purple-100">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to OOTD AI</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of the OOTD AI platform and services. 
                By using our service, you agree to these terms and our Privacy Policy.
              </p>
              <p className="text-gray-600 leading-relaxed">
                OOTD AI provides AI-powered fashion recommendations, outfit analysis, and style guidance. 
                These terms ensure a safe and positive experience for all users.
              </p>
            </motion.div>

            {/* Main Sections */}
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-lg mb-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-100 rounded-lg p-3 mr-4">
                      <Icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}

            {/* Additional Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Our Content</h3>
                  <p className="text-gray-600">All content, features, and functionality of OOTD AI are owned by us and protected by copyright, trademark, and other laws.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Your Content</h3>
                  <p className="text-gray-600">You retain ownership of content you upload, but grant us a license to use it for providing our services.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI Technology</h3>
                  <p className="text-gray-600">Our AI algorithms and models are proprietary and protected intellectual property.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We strive to provide reliable service, but cannot guarantee 100% uptime. We may temporarily suspend 
                or restrict access for maintenance, updates, or other operational reasons.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any part of our service at any time with 
                reasonable notice to users.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                OOTD AI is provided "as is" without warranties of any kind. We are not liable for any indirect, 
                incidental, special, or consequential damages arising from your use of our service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our total liability to you for any claims related to the service shall not exceed the amount 
                you paid us in the 12 months preceding the claim.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">By You</h3>
                  <p className="text-gray-600">You may terminate your account at any time by contacting us or using account settings.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">By Us</h3>
                  <p className="text-gray-600">We may terminate or suspend your account for violations of these terms or other legitimate reasons.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Effect of Termination</h3>
                  <p className="text-gray-600">Upon termination, your right to use the service ceases, and we may delete your account data.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may update these Terms of Service from time to time. We will notify users of significant changes 
                via email or through our platform.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Your continued use of the service after changes become effective constitutes acceptance of the new terms.
              </p>
            </motion.div>


          </div>
        </div>
      </section>
    </div>
  );
}

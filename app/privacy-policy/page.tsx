"use client";

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, UserCheck, FileText, Calendar } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "March 1, 2025";

  const sections = [
    {
      title: "Information We Collect",
      icon: FileText,
      content: [
        "Personal information you provide when creating an account (name, email, profile details)",
        "Photos and images you upload for outfit analysis",
        "Style preferences and fashion choices you share",
        "Usage data and interactions with our AI features",
        "Device information and technical data for service improvement"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: UserCheck,
      content: [
        "Provide personalized AI outfit recommendations",
        "Analyze your style preferences and improve our algorithms",
        "Communicate with you about your account and our services",
        "Ensure the security and integrity of our platform",
        "Comply with legal obligations and protect our rights"
      ]
    },
    {
      title: "Information Sharing",
      icon: Eye,
      content: [
        "We do not sell your personal information to third parties",
        "We may share anonymized data for research and improvement purposes",
        "Service providers who help us operate our platform (with strict confidentiality)",
        "Legal authorities when required by law or to protect our rights",
        "With your explicit consent for specific purposes"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "All data is encrypted in transit and at rest",
        "Regular security audits and vulnerability assessments",
        "Access controls and authentication measures",
        "Secure cloud infrastructure with industry-standard protections",
        "Incident response procedures for any security breaches"
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
            <Shield className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-purple-100 mb-4 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At OOTD AI, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                AI-powered fashion recommendation service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using our service, you agree to the collection and use of information in accordance with this policy. 
                We will not use or share your information with anyone except as described in this Privacy Policy.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Access and Portability</h3>
                  <p className="text-gray-600">You have the right to access your personal data and request a copy in a portable format.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Correction and Updates</h3>
                  <p className="text-gray-600">You can update or correct your personal information at any time through your account settings.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Deletion</h3>
                  <p className="text-gray-600">You have the right to request deletion of your personal data, subject to certain legal limitations.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Opt-out</h3>
                  <p className="text-gray-600">You can opt out of certain data processing activities, though this may limit service functionality.</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, 
                and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Essential cookies are necessary for the service to function properly, while optional cookies help us 
                improve our service and provide better recommendations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal 
                information from children under 13. If you are a parent or guardian and believe your child has provided 
                us with personal information, please contact us immediately.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy 
                Policy are effective when they are posted on this page.
              </p>
            </motion.div>


          </div>
        </div>
      </section>
    </div>
  );
}

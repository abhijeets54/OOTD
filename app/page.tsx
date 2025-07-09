"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SignInButton, SignUpButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { LoaderLink } from "@/components/ui/LoaderLink";
import {
  Sparkles,
  Camera,
  User,
  Shirt,
  Wand2,
  Upload,
  Eye,
  Download,
  ArrowRight,
  Star,
  CheckCircle,
  Zap,
  Heart,
  TrendingUp,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";

// Hero Section Component
const HeroSection = () => {
  const { user } = useUser();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left flex-1 max-w-lg"
          >
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-full blur opacity-75 animate-pulse" />
                <div className="relative bg-white rounded-full p-4">
                  <Sparkles className="h-12 w-12 text-purple-600" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              #OOTD
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Your AI-Powered Fashion Stylist
            </p>

            <p className="text-lg text-gray-600 mb-12">
              Get personalized outfit recommendations, analyze your style, and discover new fashion trends with our advanced AI technology.
            </p>

            <SignedOut>
              <div className="flex flex-col sm:flex-row gap-4">
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-purple-200 hover:bg-purple-50">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col sm:flex-row gap-4">
                <LoaderLink href="/ai-generator">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg">
                    Try AI Generator
                    <Wand2 className="ml-2 h-5 w-5" />
                  </Button>
                </LoaderLink>
                <LoaderLink href="/create-outfit">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-purple-200 hover:bg-purple-50">
                    Upload & Analyze
                    <Camera className="ml-2 h-5 w-5" />
                  </Button>
                </LoaderLink>
              </div>

              {user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg max-w-md"
                >
                  <p className="text-gray-700">
                    Welcome back, <span className="font-semibold text-purple-600">{user.firstName || 'Fashion Enthusiast'}</span>!
                    Ready to create your next stunning outfit?
                  </p>
                </motion.div>
              )}
            </SignedIn>
          </motion.div>

          {/* Right side - Smaller stylish person image with glossy effects */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center flex-shrink-0"
          >
            <div className="relative group w-80 h-96">
              {/* Glossy overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl z-10 pointer-events-none"></div>
              <div className="absolute top-3 left-3 w-20 h-20 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-lg z-10 pointer-events-none"></div>

              {/* Animated border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500 w-full h-full">
                <img
                  src="/hero.png"
                  alt="Stylish fashion inspiration"
                  className="w-full h-full object-cover object-center transition-all duration-1000"
                />

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>

                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-transparent opacity-60"></div>

                {/* Floating sparkles */}
                <div className="absolute top-6 right-6 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-700"></div>
                <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-1000"></div>
              </div>

              {/* Bottom glow effect */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2/3 h-6 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-indigo-600/20 blur-lg rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: Wand2,
      title: "AI Outfit Generator",
      description: "Answer personalized questions and get AI-generated outfit recommendations with visual representations created instantly on our platform.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Upload,
      title: "Upload & Analyze",
      description: "Upload photos of your outfits and get instant AI-powered style analysis and improvement suggestions.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Shirt,
      title: "My Outfits",
      description: "Save, organize, and manage your favorite outfits in your personal style collection.",
      color: "from-rose-500 to-orange-500"
    },
    {
      icon: User,
      title: "Style Profile",
      description: "Create a detailed style profile to get more accurate and personalized fashion recommendations.",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: Eye,
      title: "AI Outfit Visualization",
      description: "Generate realistic images of your outfit recommendations using free AI services - no external redirects needed.",
      color: "from-yellow-500 to-green-500"
    },
    {
      icon: Download,
      title: "Export & Share",
      description: "Download your outfit reports as PDFs and share your style discoveries with friends.",
      color: "from-green-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to elevate your style and make confident fashion choices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="card-3d h-full border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} animate-float`} style={{animationDelay: `${index * 0.5}s`}}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section Component
const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Create Your Profile",
      description: "Set up your style preferences, body type, and fashion goals to get personalized recommendations.",
      icon: User
    },
    {
      step: "02",
      title: "Upload Your Outfit",
      description: "Take a photo or upload an image of your outfit for instant AI-powered style analysis.",
      icon: Camera
    },
    {
      step: "03",
      title: "Get AI Insights",
      description: "Receive detailed feedback, style scores, and personalized suggestions to improve your look.",
      icon: Zap
    },
    {
      step: "04",
      title: "Save & Share",
      description: "Save your favorite outfits, track your style evolution, and share your looks with friends.",
      icon: Heart
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with your AI fashion journey in just four simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-purple-600">{step.step}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// AI Outfit Generator Section Component
const AIOutfitGeneratorSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI-Powered Outfit Generator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Answer a few personalized questions and let our AI create the perfect outfit recommendations just for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Process explanation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Tell Us About You</h3>
                  <p className="text-gray-600">Share your basic preferences - gender, occasion, time of day, and cultural considerations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">AI Generates Personal Questions</h3>
                  <p className="text-gray-600">Our AI creates unique follow-up questions based on your initial answers to understand your style better.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Get Your Perfect Outfit</h3>
                  <p className="text-gray-600">Receive detailed outfit recommendations with styling tips, color analysis, and confidence scores.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Visualize Your Style</h3>
                  <p className="text-gray-600">Generate AI-powered visual representations of your outfit recommendations directly on our platform.</p>
                </div>
              </div>
            </div>

            <SignedIn>
              <LoaderLink href="/ai-generator">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg">
                  Start AI Outfit Generator
                  <Wand2 className="ml-2 h-5 w-5" />
                </Button>
              </LoaderLink>
            </SignedIn>

            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg">
                  Sign Up to Try AI Generator
                  <Wand2 className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
            </SignedOut>
          </motion.div>

          {/* Right side - Visual representation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative space-y-6"
          >
            {/* AI Questions Card */}
            <div className="card-3d relative bg-white rounded-2xl p-6 border border-purple-100">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-float">
                <Sparkles className="h-4 w-4 text-white" />
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Personalized Questions</h3>
                  <p className="text-sm text-gray-600">Tailored to your preferences</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                    <p className="text-sm font-medium text-gray-700 mb-2">What's your preferred color palette?</p>
                    <div className="flex space-x-2">
                      <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                      <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
                      <div className="w-5 h-5 bg-pink-500 rounded-full"></div>
                      <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <p className="text-sm font-medium text-gray-700 mb-2">Style preference?</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-pink-500 text-white rounded-full text-xs">Casual</span>
                      <span className="px-2 py-1 bg-white rounded-full text-xs border border-pink-200">Formal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Visualization Card */}
            <div className="card-3d relative bg-white rounded-2xl p-6 border border-orange-100">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '1s'}}>
                <Eye className="h-4 w-4 text-white" />
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Outfit Visualization</h3>
                  <p className="text-sm text-gray-600">Generated directly on our platform</p>
                </div>

                {/* Mock outfit image placeholder */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Shirt className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">AI-Generated Outfit Image</p>
                    <p className="text-xs text-gray-500 mt-1">Appears here instantly</p>
                  </div>

                  {/* Sparkle effects */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-3 left-3 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute top-1/2 left-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs">
                    Quick Generate
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50 text-xs">
                    HD Quality
                  </Button>
                </div>

                <div className="text-center pt-2 border-t border-gray-100">
                  <div className="inline-flex items-center space-x-2 text-xs text-gray-600">
                    <Zap className="h-3 w-3 text-orange-500" />
                    <span>Free AI image generation</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// AI Visualization Feature Section
const AIVisualizationSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            See Your Outfits Come to Life
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI doesn't just recommend outfits - it creates visual representations so you can see exactly how your style will look
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Before - Text Only */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gray-100 rounded-2xl p-8 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Traditional Approach</h3>
                <div className="text-left space-y-2 text-sm text-gray-600">
                  <p>• Blue denim jeans</p>
                  <p>• White cotton t-shirt</p>
                  <p>• Black leather jacket</p>
                  <p>• White sneakers</p>
                  <p>• Silver accessories</p>
                </div>
                <div className="text-xs text-gray-500 italic">
                  "Imagine how this looks..."
                </div>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-700">Text Descriptions Only</h4>
            <p className="text-gray-600 text-sm">Hard to visualize the final look</p>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
              <ArrowRight className="h-8 w-8 text-white" />
            </div>
            <p className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              AI Enhancement
            </p>
          </motion.div>

          {/* After - With Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-6 border-2 border-orange-200">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">OOTD AI Approach</h3>

                {/* Mock generated image */}
                <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg h-32 flex items-center justify-center border border-gray-400">
                  <div className="text-center">
                    <Eye className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                    <p className="text-xs font-medium text-gray-700">AI-Generated Image</p>
                  </div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                    Quick Generate
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    HD Quality
                  </Button>
                </div>

                <div className="text-xs text-green-600 font-medium">
                  ✓ Visual representation included
                </div>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-700">Text + AI Visualization</h4>
            <p className="text-gray-600 text-sm">See exactly how your outfit looks</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 max-w-4xl mx-auto border border-orange-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">100% Free</h4>
                <p className="text-sm text-gray-600">No hidden costs or premium features</p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Instant Results</h4>
                <p className="text-sm text-gray-600">Images generated in seconds</p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">High Quality</h4>
                <p className="text-sm text-gray-600">Professional AI-generated images</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-full blur opacity-75 animate-pulse" />
              <div className="relative bg-white rounded-full p-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about OOTD? Want to share feedback or request new features? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <ContactForm
            compact={true}
            className="border-2 border-purple-200"
          />
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <AIOutfitGeneratorSection />
      <AIVisualizationSection />
      <HowItWorksSection />
      <ContactSection />

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-indigo-400/30 animate-gradient"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Style?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of fashion enthusiasts who are already using AI to elevate their style game.
            </p>

            <SignedOut>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                    Start Your Style Journey
                    <TrendingUp className="ml-2 h-5 w-5" />
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LoaderLink href="/ai-generator">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                    Try AI Generator
                    <Wand2 className="ml-2 h-5 w-5" />
                  </Button>
                </LoaderLink>
              </div>
            </SignedIn>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { InitialQuestions } from "@/components/InitialQuestions";
import { DynamicQuestions } from "@/components/DynamicQuestions";
import { OutfitReport } from "@/components/OutfitReport";
import { Compass, Sparkles, Palette, Scissors, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

const StepIcon = ({ step }: { step: number }) => {
  const icons = {
    1: Compass,
    2: Palette,
    3: Scissors
  };
  const Icon = icons[step as keyof typeof icons];
  
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full blur opacity-75 animate-pulse" />
      <div className="relative bg-white/90 backdrop-blur-sm rounded-full p-3">
        <Icon className="h-8 w-8 text-primary" />
      </div>
    </motion.div>
  );
};

// User profile component
const UserProfile = () => {
  const { user } = useUser();
  
  if (!user) return null;
  
  return (
    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
      <UserButton />
      <div className="text-sm">
        <p className="font-medium">{user.firstName || 'Fashion'} {user.lastName || 'Enthusiast'}</p>
        <p className="text-xs text-neutral-500">{user.primaryEmailAddress?.emailAddress}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    religion: "",
    occasion: "",
    timeOfDay: "morning",
    dynamicResponses: {},
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleInitialSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleDynamicSubmit = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      dynamicResponses: data.responses,
      dynamicQuestions: data.questions 
    }));
    setStep(3);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#ffe8f3] to-[#d9f3ff]" />
      
      {/* Animated gradient container */}
      <div className="fixed inset-0 container-bg">
        <div className="container-bg-inner" />
      </div>

      {/* Auth Header */}
      <div className="relative z-20 p-4 flex justify-between items-center">
        <SignedIn>
          <UserProfile />
        </SignedIn>
        <SignedOut>
          <div></div> {/* Empty div for flex spacing */}
        </SignedOut>
        
        <SignedOut>
          <div className="flex gap-3">
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-white/80 hover:bg-white/90 backdrop-blur-sm text-indigo-600 rounded-full flex items-center gap-2 transition shadow-sm">
                <LogIn className="h-4 w-4" />
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-indigo-500 hover:from-rose-600 hover:to-indigo-600 text-white rounded-full transition shadow-sm">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        <SignedIn>
          {/* Content only visible when signed in */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <StepIcon step={step} />
            </div>
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-rose-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
              #OOTD
            </h1>
            <p className="text-lg text-neutral-800">
              Your AI powered Fashion Stylist
            </p>
          </motion.div>
          
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Progress 
              value={progress} 
              className="h-2 bg-gradient-to-r from-rose-200 via-fuchsia-200 to-indigo-200"
            />
            <div className="flex justify-between mt-2 text-sm text-neutral-800">
              <span>Style Profile</span>
              <span>Vibe Check</span>
              <span>Your Look</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            {/* Content box with glass effect */}
            <div className="relative px-8 py-10 bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/20">
              <div className="relative">
                {step === 1 && (
                  <InitialQuestions
                    onSubmit={handleInitialSubmit}
                    formData={formData}
                  />
                )}
                {step === 2 && (
                  <DynamicQuestions
                    onSubmit={handleDynamicSubmit}
                    initialData={formData}
                  />
                )}
                {step === 3 && <OutfitReport formData={formData} />}
              </div>
            </div>
          </motion.div>
        </SignedIn>

        <SignedOut>
          {/* Welcome content for non-signed in users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
              #OOTD
            </h1>
            <p className="text-xl text-neutral-800 mb-10">
              Your AI powered Fashion Stylist
            </p>
            <div className="relative px-8 py-10 bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 max-w-xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Sign in to get started</h2>
              <p className="mb-6 text-neutral-600">
                Get personalized outfit recommendations based on your style, preferences, and occasions.
              </p>
              <div className="flex justify-center gap-4">
                <SignInButton mode="modal">
                  <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-indigo-500 hover:from-rose-600 hover:to-indigo-600 text-white rounded-full transition shadow-md font-medium">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-6 py-3 bg-white hover:bg-neutral-100 text-neutral-800 rounded-full transition shadow-md font-medium">
                    Create Account
                  </button>
                </SignUpButton>
              </div>
            </div>
          </motion.div>
        </SignedOut>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-neutral-800"
        >
          <Sparkles className="inline-block h-4 w-4 mr-2" />
          Fashion intelligence at your service
        </motion.div>
      </div>
    </div>
  );
}
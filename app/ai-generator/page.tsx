"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { InitialQuestions } from "@/components/InitialQuestions";
import { DynamicQuestions } from "@/components/DynamicQuestions";
import { OutfitReport } from "@/components/OutfitReport";
import { Compass, Sparkles, Palette, Scissors, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const StepIcon = ({ step }: { step: number }) => {
  const icons = {
    1: Compass,
    2: Palette,
    3: Scissors
  };
  const Icon = icons[step as keyof typeof icons];
  
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 rounded-full blur opacity-75" />
      <div className="relative bg-white/90 backdrop-blur-sm rounded-full p-3">
        <Icon className="h-8 w-8 text-purple-600" />
      </div>
    </div>
  );
};

export default function AIGeneratorPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    religion: "",
    occasion: "",
    timeOfDay: "morning",
    dynamicResponses: {},
  });
  const { user } = useUser();

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
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23a855f7%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <StepIcon step={step} />
            </div>
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              AI Outfit Generator
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Answer a few questions and let AI create your perfect outfit
            </p>
            
            {user && (
              <p className="text-gray-600">
                Welcome, <span className="font-semibold text-purple-600">{user.firstName || 'Fashion Enthusiast'}</span>! 
                Let's find your perfect style.
              </p>
            )}
          </motion.div>
        </div>
        
        {/* Progress Bar */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Progress 
            value={progress} 
            className="h-3 bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100"
          />
          <div className="flex justify-between mt-3 text-sm text-gray-700">
            <span className={step >= 1 ? "text-purple-600 font-medium" : ""}>Style Profile</span>
            <span className={step >= 2 ? "text-purple-600 font-medium" : ""}>Preferences</span>
            <span className={step >= 3 ? "text-purple-600 font-medium" : ""}>Your Outfit</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="relative px-8 py-10 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
            <div className="relative">
              {step === 1 && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Tell Us About Yourself</h2>
                    <p className="text-gray-600">Help us understand your style preferences and the occasion</p>
                  </div>
                  <InitialQuestions
                    onSubmit={handleInitialSubmit}
                    formData={formData}
                  />
                </div>
              )}
              {step === 2 && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Personalized Questions</h2>
                    <p className="text-gray-600">Our AI has generated custom questions based on your answers</p>
                  </div>
                  <DynamicQuestions
                    onSubmit={handleDynamicSubmit}
                    initialData={formData}
                  />
                </div>
              )}
              {step === 3 && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Perfect Outfit</h2>
                    <p className="text-gray-600">AI-generated outfit recommendations just for you</p>
                  </div>
                  <OutfitReport formData={formData} />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-sm text-gray-600"
        >
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>Powered by advanced AI fashion intelligence</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

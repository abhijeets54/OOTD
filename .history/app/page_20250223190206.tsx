"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { InitialQuestions } from "@/components/InitialQuestions";
import { DynamicQuestions } from "@/components/DynamicQuestions";
import { OutfitReport } from "@/components/OutfitReport";
import { Compass, Sparkles, Palette, Scissors } from "lucide-react";
import { motion } from "framer-motion";

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

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-3xl">
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
            Your AI Fashion Curator
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
            <span>Preferences</span>
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
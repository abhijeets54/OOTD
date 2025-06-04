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

const BackgroundPattern = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
    <div className="absolute w-full h-full rotate-45 bg-[linear-gradient(45deg,transparent_45%,rgba(0,0,0,0.05)_45%_55%,transparent_55%)] bg-[length:20px_20px]" />
    <div className="absolute w-full h-full -rotate-45 bg-[linear-gradient(-45deg,transparent_45%,rgba(0,0,0,0.05)_45%_55%,transparent_55%)] bg-[length:30px_30px]" />
  </div>
);

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-neutral-50 to-indigo-50">
      {/* Main background patterns */}
      <BackgroundPattern />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl relative">
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
          <p className="text-lg text-neutral-600">
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
          <div className="flex justify-between mt-2 text-sm text-neutral-600">
            <span>Style Profile</span>
            <span>Preferences</span>
            <span>Your Look</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          {/* Animated gradient border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          {/* Main content box with glass effect */}
          <div className="relative px-8 py-10 bg-gradient-to-br from-white/95 via-white/90 to-white/95 rounded-xl backdrop-blur-xl shadow-xl">
            {/* Inner decorative elements */}
            <div className="absolute inset-0 bg-grid-slate-100/[0.05] bg-[size:20px_20px] rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100/10 via-fuchsia-100/10 to-indigo-100/10 rounded-xl" />
            
            {/* Content */}
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
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-neutral-600"
        >
          <Sparkles className="inline-block h-4 w-4 mr-2" />
          Fashion intelligence at your service
        </motion.div>
      </div>
    </div>
  );
}

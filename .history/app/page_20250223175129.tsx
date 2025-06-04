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
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur opacity-75 animate-pulse" />
      <div className="relative bg-background rounded-full p-3">
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="absolute inset-0 bg-grid-black/5 pointer-events-none" />
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
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            #OOTD
          </h1>
          <p className="text-lg text-muted-foreground">
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
            className="h-2 bg-gradient-to-r from-pink-200 to-blue-200"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Style Profile</span>
            <span>Preferences</span>
            <span>Your Look</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground"
        >
          <Sparkles className="inline-block h-4 w-4 mr-2" />
          Fashion intelligence at your service
        </motion.div>
      </div>
    </div>
  );
}
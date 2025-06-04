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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Abstract fashion-inspired background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
        <div className="absolute top-0 left-0 w-full h-full rotate-45 bg-[linear-gradient(45deg,transparent_45%,rgba(0,0,0,0.05)_45%_55%,transparent_55%)] bg-[length:20px_20px]" />
      </div>

      <div className="absolute inset-0">
        {/* Decorative fashion elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
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
          className="relative bg-gradient-to-br from-white/80 to-neutral-50/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-neutral-100"
        >
          {/* Decorative card accents */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-rose-400/20 via-fuchsia-400/20 to-indigo-400/20 rounded-2xl blur-sm -z-10" />
          <div className="absolute -inset-[0.5px] bg-gradient-to-r from-rose-500/10 via-fuchsia-500/10 to-indigo-500/10 rounded-2xl" />

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
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-neutral-600"
        >
          <Sparkles className="inline-block h-4 w-4 mr-2" />
          Fashion intelligence at your service
        </motion.div>
      </div>
    </div>
  );
}

// Add these animations to your global CSS
const globalStyles = `
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
`;
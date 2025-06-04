"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
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

// Styled Form Components
const StyledFormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="group mb-6"
  >
    <label className="inline-block mb-2 text-sm font-medium bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
      {label}
    </label>
    {children}
  </motion.div>
);

// Initial Questions Component
const InitialQuestions = ({ onSubmit, formData, setFormData }: any) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <StyledFormField label="What's your gender?">
        <select
          value={formData.gender}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, gender: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg bg-white/50 backdrop-blur-sm border border-neutral-200 
          hover:border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
          transition-all duration-200 font-medium text-neutral-700"
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
        </select>
      </StyledFormField>

      <StyledFormField label="Tell us about your religious preferences">
        <select
          value={formData.religion}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, religion: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg bg-white/50 backdrop-blur-sm border border-neutral-200 
          hover:border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
          transition-all duration-200 font-medium text-neutral-700"
          required
        >
          <option value="">Select religion</option>
          <option value="muslim">Muslim</option>
          <option value="christian">Christian</option>
          <option value="jewish">Jewish</option>
          <option value="hindu">Hindu</option>
          <option value="buddhist">Buddhist</option>
          <option value="other">Other</option>
          <option value="none">None</option>
        </select>
      </StyledFormField>

      <StyledFormField label="What's the occasion?">
        <input
          type="text"
          placeholder="e.g., Wedding, Business Meeting, Casual Day Out"
          value={formData.occasion}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, occasion: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg bg-white/50 backdrop-blur-sm border border-neutral-200 
          hover:border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
          transition-all duration-200 font-medium text-neutral-700 placeholder:text-neutral-400"
          required
        />
      </StyledFormField>

      <StyledFormField label="When is the event?">
        <select
          value={formData.timeOfDay}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, timeOfDay: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg bg-white/50 backdrop-blur-sm border border-neutral-200 
          hover:border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
          transition-all duration-200 font-medium text-neutral-700"
          required
        >
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
        </select>
      </StyledFormField>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-4"
      >
        <button
          type="submit"
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
          hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg 
          shadow-indigo-500/20 hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 
          transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
        >
          Next Step
        </button>
      </motion.div>
    </form>
  );
};

// Main Component
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
          <div className="relative px-8 py-10 bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/20">
            {step === 1 && (
              <InitialQuestions
                onSubmit={handleInitialSubmit}
                formData={formData}
                setFormData={setFormData}
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
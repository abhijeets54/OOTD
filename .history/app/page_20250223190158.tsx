"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { motion } from "framer-motion";

const StyledFormWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-6">
    {children}
  </div>
);

const StyledFormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="group"
  >
    <Label className="inline-block mb-2 text-sm font-medium bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
      {label}
    </Label>
    {children}
  </motion.div>
);

const StyledSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>((props, ref) => (
  <select
    {...props}
    ref={ref}
    className="w-full px-4 py-2.5 rounded-lg bg-white/50 backdrop-blur-sm border border-neutral-200 
    hover:border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
    transition-all duration-200 font-medium text-neutral-700 placeholder:text-neutral-400"
  />
));
StyledSelect.displayName = "StyledSelect";

const StyledInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full px-4 py-2.5 rounded-lg bg-white/50 backdrop-blur-sm border border-neutral-200 
    hover:border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
    transition-all duration-200 font-medium text-neutral-700 placeholder:text-neutral-400"
  />
));
StyledInput.displayName = "StyledInput";

const StyledButton = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
    hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg 
    shadow-indigo-500/20 hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 
    transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
  >
    {children}
  </button>
);

export const InitialQuestions = ({ onSubmit, formData }: any) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <StyledFormWrapper>
      <form onSubmit={handleSubmit} className="space-y-6">
        <StyledFormField label="What's your gender?">
          <StyledSelect
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
          </StyledSelect>
        </StyledFormField>

        <StyledFormField label="Tell us about your religious preferences">
          <StyledSelect
            value={formData.religion}
            onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
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
          </StyledSelect>
        </StyledFormField>

        <StyledFormField label="What's the occasion?">
          <StyledInput
            type="text"
            placeholder="e.g., Wedding, Business Meeting, Casual Day Out"
            value={formData.occasion}
            onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
            required
          />
        </StyledFormField>

        <StyledFormField label="When is the event?">
          <StyledSelect
            value={formData.timeOfDay}
            onChange={(e) => formData({ ...formData, timeOfDay: e.target.value })}
            required
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </StyledSelect>
        </StyledFormField>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <StyledButton type="submit">
            Next Step
          </StyledButton>
        </motion.div>
      </form>
    </StyledFormWrapper>
  );
};
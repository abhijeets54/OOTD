"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { InitialQuestions } from "@/components/InitialQuestions";
import { DynamicQuestions } from "@/components/DynamicQuestions";
import { OutfitReport } from "@/components/OutfitReport";
import { Compass } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Compass className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Fashion AI Advisor</h1>
          <p className="text-muted-foreground">
            Your personal style guide powered by AI
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Step {step} of {totalSteps}
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-6">
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
    </div>
  );
}
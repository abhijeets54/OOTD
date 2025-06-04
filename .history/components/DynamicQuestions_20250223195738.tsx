"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateDynamicQuestions, DynamicQuestion } from "@/lib/llama";
import { useQuery } from "@tanstack/react-query";

const LoadingDog = () => (
  <>
    <div className="text-center mb-8">
      <h2 className="text-2xl font-medium mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text animate-pulse">
        We're generating more questions to know your vibe...
      </h2>
      <p className="text-xl font-light text-purple-600">
        Until then, say hello to Larry the dog!
      </p>
    </div>
    <div className="relative w-[23.5vmax] h-[23.5vmax] flex justify-center items-center mx-auto">
      <div className="relative w-[20vmax] h-[8vmax] before:content-[''] before:absolute before:bottom-[-0.75vmax] before:right-[-0.15vmax] before:w-full before:h-[1.5vmax] before:bg-[#b5c18e] before:rounded-[50%] before:z-[-1000] before:animate-[shadow_10s_cubic-bezier(0.3,0.41,0.18,1.01)_infinite]">
        <div className="absolute left-[4.5vmax] bottom-0 w-[8vmax] h-[5vmax] rounded-[4.05vmax_4.05vmax_3.3vmax_3.3vmax] bg-[#deac80] animate-[head_10s_cubic-bezier(0.3,0.41,0.18,1.01)_infinite]">
          <div className="absolute left-[-1.5vmax] bottom-0 w-[7.5vmax] h-[3.75vmax] rounded-[0_3vmax_3vmax_4.5vmax] bg-[#f7dcb9] animate-[snout_10s_cubic-bezier(0.3,0.41,0.18,1.01)_infinite] before:content-[''] before:absolute before:left-[-0.1125vmax] before:top-[-0.15vmax] before:w-[1.875vmax] before:h-[1.125vmax] before:rounded-[0_3vmax_3vmax_4.5vmax] before:bg-[#6c4e31]">
            <div className="absolute top-[-0.9vmax] left-[27%] w-[0.675vmax] h-[0.375vmax] rounded-[50%] bg-[#1c3130] animate-[eye_10s_cubic-bezier(0.3,0.41,0.18,1.01)_infinite]"></div>
            <div className="absolute top-[-0.9vmax] left-[65%] w-[0.675vmax] h-[0.375vmax] rounded-[50%] bg-[#1c3130] animate-[eye_10s_cubic-bezier(0.3,0.41,0.18,1.01)_infinite]"></div>
          </div>
        </div>
        <div className="absolute left-[1.5vmax] bottom-0 w-[9.75vmax] h-[8.25vmax] animate-[head_10s_cubic-bezier(0.3,0.41,0.18,1.01)_infinite] z-[-1]">
          <div className="absolute top-[1.5vmax] left-[10vmax] w-[5vmax] h-[3.3vmax] rounded-[3.3vmax_3vmax_5vmax_5vmax] bg-[#deac80] origin-bottom-left rotate-[-50deg] z-[-1] animate-[ear-l_10s_cubic-bezier(0.3,0.41,0.18,1.01)_infinite]"></div>
          <div className="absolute top-[1.5vmax] right-[3vmax] w-[5vmax] h-[3.3vmax] rounded-[3.3vmax_3vmax_5vmax_5vmax] bg-[#deac80] origin-bottom-right rotate-[25deg] z-[-2] animate-[ear-r_10s_cubic-bezier(0.3,0.41,0.18,1.01)_infinite]"></div>
        </div>
        <div className="flex justify-center items-end absolute bottom-[0.3vmax] left-[6vmax] w-[18vmax] h-[4vmax] rounded-[3vmax_6vmax_1.5vmax_6vmax] bg-[#914f1e] z-[-2] animate-[body_10s_cubic-bezier(0.3,0.41,0.18,1.01)_infinite]">
          <div className="absolute top-[20px] right-[-1.5vmax] h-[3vmax] w-[4vmax] bg-[#914f1e] rounded-[1.5vmax]"></div>
        </div>
        <div className="absolute bottom-0 left-[7.5vmax] w-[10vmax] h-[3vmax]">
          {[
            { className: "left-[-3vmax] z-[-10]", color: "#fffbe6", gradient: "80deg" },
            { className: "left-0 z-[10]", color: "#fffbe6", gradient: "70deg" },
            { className: "right-0", color: "#fffbe6", gradient: "70deg" }
          ].map((leg, i) => (
            <div key={i} className={`absolute ${leg.className} bottom-0 w-[2vmax] h-[2.125vmax]`}>
              <div className="absolute bottom-[2px] left-0 w-[1.95vmax] h-[1.8vmax] overflow-hidden before:content-[''] before:absolute before:w-[5vmax] before:h-[3vmax] before:rounded-[50%] before:bg-[${leg.color}]"></div>
              <div className={`absolute bottom-0 left-[0.75vmax] h-[4.5vmax] w-[2.625vmax] rounded-[1.425vmax_1.425vmax_0_0] origin-bottom-right rotate-90 translate-x-[-0.1vmax] translate-y-[1.5vmax] z-[-1] bg-gradient-to-r from-transparent from-20% to-[#deac80] to-20%`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

export function DynamicQuestions({ onSubmit, initialData }: any) {
  const [responses, setResponses] = useState<Record<string, any>>({});

  const { data: questions, isLoading, error } = useQuery({
    queryKey: ['dynamicQuestions', initialData],
    queryFn: () => generateDynamicQuestions(initialData),
    staleTime: 0,
    retry: 2,
  });

  const handleResponse = (id: string, value: any) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ responses, questions });
  };

  if (isLoading) {
    return <LoadingDog />;
  }

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-destructive">Error loading questions. Please try again.</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions?.map((q: DynamicQuestion) => (
        <Card key={q.id} className="p-6">
          <Label className="text-lg mb-4 block">{q.question}</Label>
          {q.type === "select" && (
            <Select
              onValueChange={(value) => handleResponse(q.id, value)}
              defaultValue={responses[q.id]}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {q.options?.map((opt) => (
                  <SelectItem key={opt} value={opt.toLowerCase()}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {q.type === "radio" && (
            <RadioGroup
              onValueChange={(value) => handleResponse(q.id, value)}
              defaultValue={responses[q.id]}
              className="flex flex-col space-y-2"
            >
              {q.options?.map((opt) => (
                <div key={opt} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.toLowerCase()} id={`${q.id}-${opt}`} />
                  <Label htmlFor={`${q.id}-${opt}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {q.type === "slider" && (
            <Slider
              min={q.min}
              max={q.max}
              step={1}
              value={[responses[q.id] || q.min]}
              onValueChange={(value) => handleResponse(q.id, value[0])}
              className="my-4"
            />
          )}
          {q.type === "multiple" && (
            <div className="grid grid-cols-2 gap-4">
              {q.options?.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant={
                    responses[q.id]?.includes(opt.toLowerCase())
                      ? "default"
                      : "outline"
                  }
                  onClick={() => {
                    const current = responses[q.id] || [];
                    const value = opt.toLowerCase();
                    if (current.includes(value)) {
                      handleResponse(
                        q.id,
                        current.filter((v: string) => v !== value)
                      );
                    } else {
                      handleResponse(q.id, [...current, value]);
                    }
                  }}
                >
                  {opt}
                </Button>
              ))}
            </div>
          )}
        </Card>
      ))}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <Button type="submit">Generate Outfit</Button>
      </div>
    </form>
  );
}
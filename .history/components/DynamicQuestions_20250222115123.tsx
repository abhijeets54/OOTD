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
import { Skeleton } from "@/components/ui/skeleton";
import { generateDynamicQuestions, DynamicQuestion } from "@/lib/llama";
import { useQuery } from "@tanstack/react-query";

export function DynamicQuestions({ onSubmit, initialData }: any) {
  const [responses, setResponses] = useState<Record<string, any>>({});

  const { data: questions, isLoading, error } = useQuery({
    queryKey: ['dynamicQuestions', initialData],
    queryFn: () => generateDynamicQuestions(initialData),
    staleTime: 0, // Cache for 5 minutes
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
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-10 w-full" />
          </Card>
        ))}
      </div>
    );
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
        <Button type="submit">Generate Recommendations</Button>
      </div>
    </form>
  );
}
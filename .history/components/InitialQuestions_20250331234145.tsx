"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ImageUpload } from "@/components/ImageUpload";

const formSchema = z.object({
  gender: z.enum(["male", "female", "non-binary"], {
    required_error: "Please select your gender",
  }),
  religion: z.enum(["hindu", "muslim", "christian", "sikh", "other"], {
    required_error: "Please select your religion",
  }),
  occasion: z.enum([
    "wedding",
    "festival",
    "formal-event",
    "casual-outing",
    "work",
  ], {
    required_error: "Please select an occasion",
  }),
  timeOfDay: z.number().min(0).max(24),
  outfitImage: z.string().optional(),
});

const timeLabels = {
  0: "Morning",
  8: "Afternoon",
  16: "Evening",
  24: "Night",
};

export function InitialQuestions({ onSubmit, formData }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData || {
      gender: undefined,
      religion: undefined,
      occasion: undefined,
      timeOfDay: 8,
      outfitImage: undefined,
    },
  });

  const handleImageUpload = (url: string) => {
    form.setValue('outfitImage', url);
  };

  const handleImageRemove = () => {
    form.setValue('outfitImage', undefined);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="non-binary" />
                    </FormControl>
                    <FormLabel className="font-normal">Non-binary</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="religion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Religion</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your religion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hindu">Hindu</SelectItem>
                  <SelectItem value="muslim">Muslim</SelectItem>
                  <SelectItem value="christian">Christian</SelectItem>
                  <SelectItem value="sikh">Sikh</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occasion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occasion</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an occasion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="formal-event">Formal Event</SelectItem>
                  <SelectItem value="casual-outing">Casual Outing</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeOfDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time of Day</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={24}
                    step={8}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    {Object.entries(timeLabels).map(([value, label]) => (
                      <span key={value}>{label}</span>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="outfitImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Your Outfit Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onUpload={handleImageUpload}
                  onRemove={handleImageRemove}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
}
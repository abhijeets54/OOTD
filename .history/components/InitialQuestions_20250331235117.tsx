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
  FormDescription,
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
  gender: z.enum(["male", "female", "other"]),
  age: z.string(),
  style: z.string(),
  occasion: z.string(),
  season: z.string(),
  outfitImages: z.array(z.string()).optional(),
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
    defaultValues: {
      gender: "male",
      age: "",
      style: "",
      occasion: "",
      season: "",
      outfitImages: [],
    },
  });

  const handleImageUpload = (url: string) => {
    const images = form.getValues("outfitImages") || [];
    form.setValue("outfitImages", [...images, url]);
  };

  const handleImageRemove = (index: number) => {
    const images = form.getValues("outfitImages") || [];
    form.setValue(
      "outfitImages",
      images.filter((_, i) => i !== index)
    );
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
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your age"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your style"
                  {...field}
                />
              </FormControl>
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
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter the occasion"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="season"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Season</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter the season"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="outfitImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Outfit Images</FormLabel>
              <FormDescription>
                Upload up to 15 images of your outfit. You can upload at least one image.
              </FormDescription>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {field.value?.map((url, index) => (
                  <ImageUpload
                    key={url}
                    value={url}
                    onUpload={() => {}}
                    onRemove={() => handleImageRemove(index)}
                  />
                ))}
                {(!field.value || field.value.length < 15) && (
                  <ImageUpload
                    onUpload={handleImageUpload}
                    onRemove={() => {}}
                    maxFiles={15}
                  />
                )}
              </div>
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
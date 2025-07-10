"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { NavigationLoaderProvider } from "@/components/providers/NavigationLoaderProvider";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Prevent automatic refetching to stop AI content from changing unexpectedly
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        // Cache AI-generated content for 30 minutes to prevent regeneration
        staleTime: 30 * 60 * 1000, // 30 minutes
        // Keep data in cache for 1 hour
        gcTime: 60 * 60 * 1000, // 1 hour (formerly cacheTime)
        // Only retry once on failure
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationLoaderProvider defaultStyle="sparkle" useRandomLoader={true}>
        {children}
        <Toaster />
      </NavigationLoaderProvider>
    </QueryClientProvider>
  );
}
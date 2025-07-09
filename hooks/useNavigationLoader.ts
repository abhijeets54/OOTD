'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useNavigationLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Listen for route changes
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (href: string, options?: any) => {
      handleStart();
      setTimeout(handleComplete, 1000); // Fallback timeout
      return originalPush.call(router, href, options);
    };

    router.replace = (href: string, options?: any) => {
      handleStart();
      setTimeout(handleComplete, 1000); // Fallback timeout
      return originalReplace.call(router, href, options);
    };

    // Cleanup
    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router]);

  return { isLoading, setIsLoading };
};

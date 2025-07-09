'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PageLoader, FashionLoaderStyle } from '@/components/ui/loader';

interface NavigationLoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loaderStyle: FashionLoaderStyle;
  setLoaderStyle: (style: FashionLoaderStyle) => void;
  useRandomLoader: boolean;
  setUseRandomLoader: (useRandom: boolean) => void;
  getRandomLoader: () => FashionLoaderStyle;
}

const NavigationLoaderContext = createContext<NavigationLoaderContextType | undefined>(undefined);

export const useNavigationLoader = () => {
  const context = useContext(NavigationLoaderContext);
  if (!context) {
    throw new Error('useNavigationLoader must be used within a NavigationLoaderProvider');
  }
  return context;
};

interface NavigationLoaderProviderProps {
  children: React.ReactNode;
  defaultStyle?: FashionLoaderStyle;
  useRandomLoader?: boolean;
}

export const NavigationLoaderProvider: React.FC<NavigationLoaderProviderProps> = ({
  children,
  defaultStyle = 'sparkle',
  useRandomLoader = true
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loaderStyle, setLoaderStyle] = useState<FashionLoaderStyle>(defaultStyle);
  const [useRandomLoaderState, setUseRandomLoader] = useState(useRandomLoader);
  const pathname = usePathname();

  // All available loader styles
  const allLoaderStyles: FashionLoaderStyle[] = [
    'sparkle', 'runway', 'wardrobe', 'crown', 'heart', 'hanger'
  ];

  // Function to get a random loader style
  const getRandomLoader = (): FashionLoaderStyle => {
    const randomIndex = Math.floor(Math.random() * allLoaderStyles.length);
    return allLoaderStyles[randomIndex];
  };

  // Auto-hide loader when pathname changes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  // Set different loader styles based on the current page or use random
  useEffect(() => {
    if (useRandomLoaderState) {
      // Don't auto-change style when using random loaders
      // The style will be set when navigation starts
      return;
    }

    // Context-aware loader selection (when not using random)
    if (pathname.includes('/outfits')) {
      setLoaderStyle('wardrobe');
    } else if (pathname.includes('/create-outfit')) {
      setLoaderStyle('hanger');
    } else if (pathname.includes('/ai-generator')) {
      setLoaderStyle('sparkle');
    } else if (pathname.includes('/profile')) {
      setLoaderStyle('crown');
    } else {
      setLoaderStyle(defaultStyle);
    }
  }, [pathname, defaultStyle, useRandomLoaderState]);

  const value = {
    isLoading,
    setIsLoading,
    loaderStyle,
    setLoaderStyle,
    useRandomLoader: useRandomLoaderState,
    setUseRandomLoader,
    getRandomLoader,
  };

  return (
    <NavigationLoaderContext.Provider value={value}>
      {children}
      <PageLoader isLoading={isLoading} style={loaderStyle} />
    </NavigationLoaderContext.Provider>
  );
};

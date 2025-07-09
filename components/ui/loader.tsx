'use client';

import React from 'react';
import { Sparkles, Shirt, Crown, Heart } from 'lucide-react';

export interface LoaderTheme {
  primary?: string;
  secondary?: string;
}

export type FashionLoaderStyle = 'sparkle' | 'runway' | 'wardrobe' | 'crown' | 'heart' | 'hanger';

interface FashionLoaderProps {
  style?: FashionLoaderStyle;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Sparkle Loader - Default style with animated sparkles
const SparkleLoader = ({ message, size = 'md' }: { message?: string; size?: string }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size as keyof typeof sizeClasses]} relative`}>
          <Sparkles className="w-full h-full text-purple-600 animate-pulse" />
          <div className="absolute inset-0 animate-spin">
            <div className="w-2 h-2 bg-pink-500 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full absolute bottom-0 right-0"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full absolute left-0 top-1/2 transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>
      {message && (
        <p className="text-sm font-medium bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

// Runway Loader - Fashion runway with walking animation
const RunwayLoader = ({ message, size = 'md' }: { message?: string; size?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-32 h-16">
        {/* Runway */}
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>

        {/* Walking figure */}
        <div className="absolute bottom-1 w-4 h-8 animate-runway-walk">
          <div className="w-full h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full relative">
            <div className="absolute top-0 w-2 h-2 bg-pink-400 rounded-full left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>

        {/* Spotlight effect */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-radial from-yellow-200 to-transparent opacity-50 animate-pulse"></div>
      </div>
      {message && (
        <p className="text-sm font-medium bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
          {message}
        </p>
      )}
      <style jsx>{`
        @keyframes runway-walk {
          0% { left: -10%; }
          100% { left: 110%; }
        }
        .animate-runway-walk {
          animation: runway-walk 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Wardrobe Loader - Rotating clothes
const WardrobeLoader = ({ message, size = 'md' }: { message?: string; size?: string }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size as keyof typeof sizeClasses]} relative animate-spin`}>
          <Shirt className="w-full h-full text-purple-600" />
          <div className="absolute inset-0 animate-pulse">
            <div className="w-2 h-2 bg-pink-500 rounded-full absolute top-1 right-1"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full absolute bottom-1 left-1"></div>
          </div>
        </div>
      </div>
      {message && (
        <p className="text-sm font-medium bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

// Crown Loader - Luxury fashion theme
const CrownLoader = ({ message, size = 'md' }: { message?: string; size?: string }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size as keyof typeof sizeClasses]} relative`}>
          <Crown className="w-full h-full text-yellow-500 animate-bounce" />
          <div className="absolute inset-0 animate-pulse">
            <div className="w-1 h-1 bg-yellow-300 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-ping"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full absolute top-3 left-1/3 animate-ping delay-100"></div>
            <div className="w-1 h-1 bg-yellow-300 rounded-full absolute top-3 right-1/3 animate-ping delay-200"></div>
          </div>
        </div>
      </div>
      {message && (
        <p className="text-sm font-medium bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 bg-clip-text text-transparent animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

// Heart Loader - Love for fashion
const HeartLoader = ({ message, size = 'md' }: { message?: string; size?: string }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size as keyof typeof sizeClasses]} relative animate-pulse`}>
          <Heart className="w-full h-full text-pink-500 fill-pink-500 animate-heartbeat" />
        </div>
      </div>
      {message && (
        <p className="text-sm font-medium bg-gradient-to-r from-pink-600 via-red-500 to-pink-600 bg-clip-text text-transparent animate-pulse">
          {message}
        </p>
      )}
      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-heartbeat {
          animation: heartbeat 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Hanger Loader - Clothes hanger with swinging animation
const HangerLoader = ({ message, size = 'md' }: { message?: string; size?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        {/* Hanger hook */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-600 rounded-full"></div>

        {/* Hanger body with swing animation */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 animate-swing origin-top">
          <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full relative">
            {/* Hanger ends */}
            <div className="absolute -left-1 top-0 w-2 h-1 bg-purple-600 rounded-full transform -rotate-45"></div>
            <div className="absolute -right-1 top-0 w-2 h-1 bg-pink-600 rounded-full transform rotate-45"></div>
          </div>

          {/* Hanging clothes */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-b-lg opacity-80">
            <div className="w-full h-1 bg-white opacity-50 mt-1"></div>
            <div className="w-full h-1 bg-white opacity-30 mt-1"></div>
          </div>
        </div>
      </div>
      {message && (
        <p className="text-sm font-medium bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
          {message}
        </p>
      )}
      <style jsx>{`
        @keyframes swing {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        .animate-swing {
          animation: swing 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Inline Fashion Loader Component (for previews and inline use)
export const FashionLoaderInline: React.FC<FashionLoaderProps> = ({
  style = 'sparkle',
  message = 'Loading your fashion experience...',
  size = 'md'
}) => {
  const loaderComponents = {
    sparkle: SparkleLoader,
    runway: RunwayLoader,
    wardrobe: WardrobeLoader,
    crown: CrownLoader,
    heart: HeartLoader,
    hanger: HangerLoader,
  };

  const LoaderComponent = loaderComponents[style];

  return <LoaderComponent message={message} size={size} />;
};

// Main Fashion Loader Component (fullscreen overlay)
export const FashionLoader: React.FC<FashionLoaderProps> = ({
  style = 'sparkle',
  message = 'Loading your fashion experience...',
  size = 'md'
}) => {
  const loaderComponents = {
    sparkle: SparkleLoader,
    runway: RunwayLoader,
    wardrobe: WardrobeLoader,
    crown: CrownLoader,
    heart: HeartLoader,
    hanger: HangerLoader,
  };

  const LoaderComponent = loaderComponents[style];

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 max-w-sm mx-4">
        <LoaderComponent message={message} size={size} />
      </div>
    </div>
  );
};

// Page Navigation Loader - Specifically for page transitions
export const PageLoader: React.FC<{ isLoading: boolean; style?: FashionLoaderStyle }> = ({
  isLoading,
  style = 'sparkle'
}) => {
  if (!isLoading) return null;

  const messages = [
    'Styling your experience...',
    'Curating the perfect look...',
    'Fashion magic in progress...',
    'Preparing your style journey...',
    'Loading fashion inspiration...',
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return <FashionLoader style={style} message={randomMessage} size="lg" />;
};

// Legacy support - keep the original LoaderIcon for backward compatibility
export const LoaderIcon = ({ primary = '#616161', secondary = '#e0e0e0' }: LoaderTheme) => (
  <div
    className="w-3 h-3 border-2 border-solid rounded-full animate-spin"
    style={{
      borderColor: secondary,
      borderRightColor: primary,
    }}
  />
);

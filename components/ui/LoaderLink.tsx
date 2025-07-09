'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useNavigationLoader } from '@/components/providers/NavigationLoaderProvider';

interface LoaderLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const LoaderLink: React.FC<LoaderLinkProps> = ({
  children,
  className,
  onClick,
  ...linkProps
}) => {
  const { setIsLoading, useRandomLoader, getRandomLoader, setLoaderStyle } = useNavigationLoader();

  const handleClick = () => {
    // Set random loader style if random mode is enabled
    if (useRandomLoader) {
      const randomStyle = getRandomLoader();
      setLoaderStyle(randomStyle);
    }

    setIsLoading(true);
    onClick?.();
  };

  return (
    <Link {...linkProps} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

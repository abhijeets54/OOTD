"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { LoaderLink } from '@/components/ui/LoaderLink';
import { Home, User, Shirt, Plus, Sparkles, Menu, X, Camera, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/ai-generator', label: 'AI Generator', icon: Sparkles },
    { href: '/create-outfit', label: 'Upload & Analyze', icon: Camera },
    { href: '/outfits', label: 'My Outfits', icon: Shirt },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 nav-glass">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <LoaderLink href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                #OOTD
              </span>
              <span className="text-xs text-gray-500 -mt-1">AI-Powered Fashion Stylist</span>
            </div>
          </LoaderLink>

          {/* Desktop Navigation */}
          <SignedIn>
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <LoaderLink key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`flex items-center space-x-2 transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                          : "hover:bg-purple-50 hover:text-purple-600"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </LoaderLink>
                );
              })}
            </nav>
          </SignedIn>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <div className="hidden sm:flex items-center space-x-3">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="hover:bg-purple-50 hover:text-purple-600">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="hidden lg:flex items-center space-x-4">
                {user && (
                  <div className="text-sm text-gray-600">
                    Welcome, <span className="font-medium text-purple-600">{user.firstName || 'User'}</span>
                  </div>
                )}
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9 ring-2 ring-purple-200 hover:ring-purple-300 transition-all"
                    }
                  }}
                />
              </div>
            </SignedIn>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t nav-glass"
            >
              <div className="py-4 space-y-2">
                <SignedOut>
                  <div className="px-4 space-y-2">
                    <SignInButton mode="modal">
                      <Button variant="ghost" className="w-full justify-start hover:bg-purple-50 hover:text-purple-600">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        Get Started
                        <TrendingUp className="ml-2 h-4 w-4" />
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>

                <SignedIn>
                  <div className="px-4 space-y-2">
                    {user && (
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox: "h-8 w-8"
                            }
                          }}
                        />
                        <div className="text-sm">
                          <p className="font-medium text-purple-600">{user.firstName || 'User'} {user.lastName || ''}</p>
                          <p className="text-gray-500 text-xs">{user.primaryEmailAddress?.emailAddress}</p>
                        </div>
                      </div>
                    )}

                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <LoaderLink key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className={`w-full justify-start transition-all duration-200 ${
                              isActive
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                : "hover:bg-purple-50 hover:text-purple-600"
                            }`}
                          >
                            <Icon className="h-4 w-4 mr-3" />
                            {item.label}
                          </Button>
                        </LoaderLink>
                      );
                    })}
                  </div>
                </SignedIn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

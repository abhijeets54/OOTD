"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, User, Settings, Heart } from 'lucide-react';
import { fashionToast } from '@/lib/toast';

interface UserProfile {
  id: string;
  clerk_user_id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  preferences?: {
    gender?: string;
    religion?: string;
    style_preferences?: string[];
    color_preferences?: string[];
    budget_range?: string;
    comfort_priority?: number;
  };
}

export default function ProfilePage() {
  const { user: clerkUser, isLoaded } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    religion: '',
    stylePreferences: [] as string[],
    colorPreferences: [] as string[],
    budgetRange: '',
    comfortPriority: 5
  });

  // Load user profile
  useEffect(() => {
    if (isLoaded && clerkUser && !profileLoaded) {
      loadProfile();
    }
  }, [isLoaded, clerkUser, profileLoaded]);

  const loadProfile = async () => {
    try {
      setProfileLoaded(true); // Mark as loaded to prevent duplicate calls
      const response = await fetch('/api/user');

      if (response.status === 404) {
        // User doesn't exist in database, create profile
        await createProfile();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to load profile');
      }

      const data = await response.json();
      setProfile(data.user);

      // Populate form with existing data
      setFormData({
        email: data.user.email || clerkUser?.emailAddresses[0]?.emailAddress || '',
        firstName: data.user.first_name || clerkUser?.firstName || '',
        lastName: data.user.last_name || clerkUser?.lastName || '',
        gender: data.user.preferences?.gender || '',
        religion: data.user.preferences?.religion || '',
        stylePreferences: data.user.preferences?.style_preferences || [],
        colorPreferences: data.user.preferences?.color_preferences || [],
        budgetRange: data.user.preferences?.budget_range || '',
        comfortPriority: data.user.preferences?.comfort_priority || 5
      });
    } catch (error) {
      fashionToast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: clerkUser?.emailAddresses[0]?.emailAddress,
          firstName: clerkUser?.firstName,
          lastName: clerkUser?.lastName,
          preferences: {}
        })
      });

      if (response.status === 409) {
        // User already exists, just load the profile
        const getResponse = await fetch('/api/user');
        if (getResponse.ok) {
          const data = await getResponse.json();
          setProfile(data.user);
          fashionToast.info('Profile Loaded', 'Welcome back! Your profile has been loaded successfully.');
          return;
        }
      }

      if (!response.ok) {
        throw new Error('Failed to create profile');
      }

      const data = await response.json();
      setProfile(data.user);

      // Set initial form data
      setFormData({
        email: clerkUser?.emailAddresses[0]?.emailAddress || '',
        firstName: clerkUser?.firstName || '',
        lastName: clerkUser?.lastName || '',
        gender: '',
        religion: '',
        stylePreferences: [],
        colorPreferences: [],
        budgetRange: '',
        comfortPriority: 5
      });

      fashionToast.success('Profile Created! 👤', 'Your profile has been created successfully. You can now customize your style preferences.');
    } catch (error) {
      fashionToast.api.error('Create Profile', 'Failed to create your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          preferences: {
            gender: formData.gender,
            religion: formData.religion,
            style_preferences: formData.stylePreferences,
            color_preferences: formData.colorPreferences,
            budget_range: formData.budgetRange,
            comfort_priority: formData.comfortPriority
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setProfile(data.user);
      fashionToast.success('Profile Updated! ✨', 'Your style preferences have been saved successfully.');
    } catch (error) {
      fashionToast.api.error('Update Profile', 'Failed to update your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addStylePreference = (style: string) => {
    if (style && !formData.stylePreferences.includes(style)) {
      setFormData(prev => ({
        ...prev,
        stylePreferences: [...prev.stylePreferences, style]
      }));
    }
  };

  const removeStylePreference = (style: string) => {
    setFormData(prev => ({
      ...prev,
      stylePreferences: prev.stylePreferences.filter(s => s !== style)
    }));
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <User className="h-8 w-8" />
          Profile Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your personal information and style preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Style Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Style Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="religion">Religion</Label>
                <Select value={formData.religion} onValueChange={(value) => setFormData(prev => ({ ...prev, religion: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select religion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hindu">Hindu</SelectItem>
                    <SelectItem value="muslim">Muslim</SelectItem>
                    <SelectItem value="christian">Christian</SelectItem>
                    <SelectItem value="sikh">Sikh</SelectItem>
                    <SelectItem value="buddhist">Buddhist</SelectItem>
                    <SelectItem value="jain">Jain</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="budgetRange">Budget Range</Label>
              <Select value={formData.budgetRange} onValueChange={(value) => setFormData(prev => ({ ...prev, budgetRange: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget (₹1,000 - ₹5,000)</SelectItem>
                  <SelectItem value="moderate">Moderate (₹5,000 - ₹15,000)</SelectItem>
                  <SelectItem value="premium">Premium (₹15,000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Style Preferences</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.stylePreferences.map((style) => (
                  <Badge key={style} variant="secondary" className="cursor-pointer" onClick={() => removeStylePreference(style)}>
                    {style} ×
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Casual', 'Formal', 'Traditional', 'Modern', 'Bohemian', 'Minimalist', 'Vintage', 'Sporty'].map((style) => (
                  !formData.stylePreferences.includes(style) && (
                    <Badge key={style} variant="outline" className="cursor-pointer" onClick={() => addStylePreference(style)}>
                      + {style}
                    </Badge>
                  )
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="min-w-32">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

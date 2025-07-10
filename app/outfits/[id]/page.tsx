"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CldImage } from 'next-cloudinary';
import { 
  Loader2, 
  ArrowLeft, 
  Heart, 
  Star, 
  Trash2, 
  Calendar, 
  Clock, 
  Edit,
  Palette,
  Lightbulb,
  DollarSign,
  Shirt
} from 'lucide-react';
import { fashionToast, confirmAction } from '@/lib/toast';
import Link from 'next/link';

interface OutfitAnalysis {
  upper_wear?: string;
  lower_wear?: string;
  footwear?: string;
  accessories?: string[];
  colors?: string[];
  styling_tips?: string[];
  cultural_considerations?: string[];
  budget_options?: {
    premium?: string;
    moderate?: string;
    budget?: string;
  };
  ai_feedback?: string;
  style_score?: number | null;
}

interface Outfit {
  id: string;
  title: string;
  image_url?: string;
  cloudinary_public_id?: string;
  occasion: string;
  time_of_day: string;
  ai_analysis?: OutfitAnalysis;
  user_rating?: number;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export default function OutfitDetailPage() {
  const { user, isLoaded } = useUser();
  const params = useParams();
  const router = useRouter();
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const outfitId = params.id as string;

  useEffect(() => {
    if (isLoaded && user && outfitId) {
      loadOutfit();
    }
  }, [isLoaded, user, outfitId]);

  const loadOutfit = async () => {
    try {
      const response = await fetch(`/api/outfits/${outfitId}`);
      if (!response.ok) {
        if (response.status === 404) {
          fashionToast.error('Outfit not found', 'The outfit you\'re looking for doesn\'t exist or has been deleted.');
          router.push('/outfits');
          return;
        }
        throw new Error('Failed to load outfit');
      }
      const data = await response.json();
      setOutfit(data.outfit);
    } catch (error) {
      console.error('Error loading outfit:', error);
      fashionToast.api.error('Load Outfit', 'Failed to load outfit details. Please try again.');
      router.push('/outfits');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!outfit) return;

    confirmAction(
      `This will permanently delete "${outfit.title}" from your collection.`,
      async () => {
        setDeleting(true);
        try {
          const response = await fetch(`/api/outfits/${outfit.id}`, {
            method: 'DELETE'
          });

          if (!response.ok) {
            throw new Error('Failed to delete outfit');
          }

          fashionToast.outfit.deleted(outfit.title);
          router.push('/outfits');
        } catch (error) {
          console.error('Error deleting outfit:', error);
          fashionToast.api.error('Delete Outfit', 'Failed to delete outfit. Please try again.');
        } finally {
          setDeleting(false);
        }
      },
      {
        title: 'Delete Outfit?',
        confirmLabel: 'Delete',
        cancelLabel: 'Keep',
        description: 'This action cannot be undone.',
      }
    );
  };

  const toggleFavorite = async () => {
    if (!outfit) return;

    try {
      const response = await fetch(`/api/outfits/${outfit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !outfit.is_favorite })
      });

      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }

      setOutfit(prev => prev ? { ...prev, is_favorite: !prev.is_favorite } : null);

      if (outfit.is_favorite) {
        fashionToast.outfit.unfavorited(outfit.title);
      } else {
        fashionToast.outfit.favorited(outfit.title);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
      fashionToast.api.error('Update Favorite', 'Failed to update favorite status. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!outfit) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Outfit Not Found</h1>
          <Link href="/outfits">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Outfits
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/outfits">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Outfits
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{outfit.title}</h1>
            <p className="text-gray-600 mt-1">
              Created on {formatDate(outfit.created_at)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFavorite}
          >
            <Heart 
              className={`h-4 w-4 mr-2 ${outfit.is_favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
            {outfit.is_favorite ? 'Favorited' : 'Add to Favorites'}
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Trash2 className="h-4 w-4 mr-2" />
            )}
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              {outfit.cloudinary_public_id ? (
                <CldImage
                  src={outfit.cloudinary_public_id}
                  alt={outfit.title}
                  width={600}
                  height={800}
                  crop="fill"
                  className="w-full h-96 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <Shirt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <span className="text-gray-500">No image available</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Outfit Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  {outfit.occasion}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {outfit.time_of_day}
                </Badge>
              </div>
              
              {outfit.user_rating && (
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{outfit.user_rating}/5</span>
                  <span className="text-gray-500">Your Rating</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Analysis Section */}
        <div className="space-y-6">
          {outfit.ai_analysis && (
            <>
              {/* Style Score */}
              {outfit.ai_analysis.style_score && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      AI Style Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {outfit.ai_analysis.style_score}/10
                      </div>
                      <p className="text-gray-600">AI Style Rating</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Outfit Components */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shirt className="h-5 w-5" />
                    Outfit Components
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {outfit.ai_analysis.upper_wear && (
                    <div>
                      <span className="font-medium">Upper Wear:</span>
                      <span className="ml-2 text-gray-700">{outfit.ai_analysis.upper_wear}</span>
                    </div>
                  )}
                  {outfit.ai_analysis.lower_wear && (
                    <div>
                      <span className="font-medium">Lower Wear:</span>
                      <span className="ml-2 text-gray-700">{outfit.ai_analysis.lower_wear}</span>
                    </div>
                  )}
                  {outfit.ai_analysis.footwear && (
                    <div>
                      <span className="font-medium">Footwear:</span>
                      <span className="ml-2 text-gray-700">{outfit.ai_analysis.footwear}</span>
                    </div>
                  )}
                  {outfit.ai_analysis.accessories && outfit.ai_analysis.accessories.length > 0 && (
                    <div>
                      <span className="font-medium">Accessories:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {outfit.ai_analysis.accessories.map((accessory, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {accessory}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Colors */}
              {outfit.ai_analysis.colors && outfit.ai_analysis.colors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Color Palette
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {outfit.ai_analysis.colors.map((color, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Styling Tips */}
              {outfit.ai_analysis.styling_tips && outfit.ai_analysis.styling_tips.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Styling Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {outfit.ai_analysis.styling_tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Budget Options */}
              {outfit.ai_analysis.budget_options && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Budget Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {outfit.ai_analysis.budget_options.budget && (
                      <div>
                        <span className="font-medium text-green-600">Budget:</span>
                        <span className="ml-2 text-gray-700">{outfit.ai_analysis.budget_options.budget}</span>
                      </div>
                    )}
                    {outfit.ai_analysis.budget_options.moderate && (
                      <div>
                        <span className="font-medium text-blue-600">Moderate:</span>
                        <span className="ml-2 text-gray-700">{outfit.ai_analysis.budget_options.moderate}</span>
                      </div>
                    )}
                    {outfit.ai_analysis.budget_options.premium && (
                      <div>
                        <span className="font-medium text-purple-600">Premium:</span>
                        <span className="ml-2 text-gray-700">{outfit.ai_analysis.budget_options.premium}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* AI Feedback */}
              {outfit.ai_analysis.ai_feedback && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      AI Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {outfit.ai_analysis.ai_feedback}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Cultural Considerations */}
              {outfit.ai_analysis.cultural_considerations && outfit.ai_analysis.cultural_considerations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Cultural Considerations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {outfit.ai_analysis.cultural_considerations.map((consideration, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          <span className="text-gray-700">{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

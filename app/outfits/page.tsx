"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CldImage } from 'next-cloudinary';
import { Loader2, Plus, Heart, Star, Trash2, Eye, Calendar, Clock } from 'lucide-react';
import { fashionToast, confirmAction } from '@/lib/toast';
import Link from 'next/link';
import { LoaderLink } from '@/components/ui/LoaderLink';

interface Outfit {
  id: string;
  title: string;
  image_url?: string;
  cloudinary_public_id?: string;
  occasion: string;
  time_of_day: string;
  ai_analysis?: any;
  user_rating?: number;
  is_favorite: boolean;
  created_at: string;
}

export default function OutfitsPage() {
  const { user, isLoaded } = useUser();
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      loadOutfits();
    }
  }, [isLoaded, user]);

  const loadOutfits = async () => {
    try {
      const response = await fetch('/api/outfits');
      if (!response.ok) {
        throw new Error('Failed to load outfits');
      }
      const data = await response.json();
      setOutfits(data.outfits || []);
    } catch (error) {
      fashionToast.error('Failed to load outfits');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (outfitId: string) => {
    const outfit = outfits.find(o => o.id === outfitId);

    confirmAction(
      `This will permanently delete "${outfit?.title || 'this outfit'}" from your collection.`,
      async () => {
        setDeletingId(outfitId);
        try {
          const response = await fetch(`/api/outfits/${outfitId}`, {
            method: 'DELETE'
          });

          if (!response.ok) {
            throw new Error('Failed to delete outfit');
          }

          setOutfits(prev => prev.filter(outfit => outfit.id !== outfitId));
          fashionToast.outfit.deleted(outfit?.title);
        } catch (error) {
          fashionToast.api.error('Delete Outfit', 'Failed to delete outfit. Please try again.');
        } finally {
          setDeletingId(null);
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

  const toggleFavorite = async (outfitId: string, currentFavorite: boolean) => {
    const outfit = outfits.find(o => o.id === outfitId);

    try {
      const response = await fetch(`/api/outfits/${outfitId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !currentFavorite })
      });

      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }

      setOutfits(prev => prev.map(outfit =>
        outfit.id === outfitId
          ? { ...outfit, is_favorite: !currentFavorite }
          : outfit
      ));

      if (currentFavorite) {
        fashionToast.outfit.unfavorited(outfit?.title);
      } else {
        fashionToast.outfit.favorited(outfit?.title);
      }
    } catch (error) {
      fashionToast.api.error('Update Favorite', 'Failed to update favorite status. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Outfits</h1>
          <p className="text-gray-600 mt-2">
            Your outfit collection and AI analysis history
          </p>
        </div>
        <LoaderLink href="/create-outfit">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Outfit
          </Button>
        </LoaderLink>
      </div>

      {outfits.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <Plus className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No outfits yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start building your outfit collection with AI-powered analysis
                </p>
                <LoaderLink href="/create-outfit">
                  <Button>Create Your First Outfit</Button>
                </LoaderLink>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outfits.map((outfit) => (
            <Card key={outfit.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                {outfit.cloudinary_public_id ? (
                  <CldImage
                    src={outfit.cloudinary_public_id}
                    alt={outfit.title}
                    width={400}
                    height={300}
                    crop="fill"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
                
                {/* Favorite button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(outfit.id, outfit.is_favorite)}
                >
                  <Heart 
                    className={`h-4 w-4 ${outfit.is_favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                </Button>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{outfit.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {outfit.occasion}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {outfit.time_of_day}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {outfit.user_rating && (
                      <>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{outfit.user_rating}/5</span>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(outfit.created_at)}
                  </span>
                </div>

                {outfit.ai_analysis?.style_score !== null && outfit.ai_analysis?.style_score !== undefined && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>AI Style Score</span>
                      <span className="font-medium">{Number(outfit.ai_analysis.style_score).toFixed(1)}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(Number(outfit.ai_analysis.style_score) / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <LoaderLink href={`/outfits/${outfit.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </LoaderLink>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(outfit.id)}
                    disabled={deletingId === outfit.id}
                  >
                    {deletingId === outfit.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

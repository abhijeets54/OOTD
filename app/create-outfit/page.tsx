"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, Sparkles, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import SimpleImageUpload from '@/components/SimpleImageUpload';
import Link from 'next/link';

interface UploadedImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

export default function CreateOutfitPage() {
  const { isLoaded } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    occasion: '',
    timeOfDay: '',
    description: ''
  });
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (imageData: UploadedImage) => {
    setUploadedImage(imageData);
    
    // Automatically analyze the image if we have context
    if (formData.occasion && formData.timeOfDay) {
      await analyzeImage(imageData.secure_url);
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
    setAiAnalysis(null);
  };

  const analyzeImage = async (imageUrl?: string) => {
    const urlToAnalyze = imageUrl || uploadedImage?.secure_url;
    
    if (!urlToAnalyze) {
      toast.error('Please upload an image first');
      return;
    }

    setAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: urlToAnalyze,
          context: {
            occasion: formData.occasion,
            timeOfDay: formData.timeOfDay,
            gender: 'male' // You can get this from user profile
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      setAiAnalysis(data.analysis);
      toast.success('Image analyzed successfully!');
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('Failed to analyze image');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.occasion || !formData.timeOfDay) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/outfits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          imageUrl: uploadedImage?.secure_url,
          cloudinaryPublicId: uploadedImage?.public_id,
          occasion: formData.occasion,
          timeOfDay: formData.timeOfDay,
          aiAnalysis: aiAnalysis,
          isFavorite: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save outfit');
      }

      toast.success('Outfit saved successfully!');
      router.push('/outfits');
    } catch (error) {
      console.error('Error saving outfit:', error);
      toast.error('Failed to save outfit');
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/outfits">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Outfits
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create New Outfit</h1>
        <p className="text-gray-600 mt-2">
          Upload an outfit image and get AI-powered style analysis
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Form */}
        <div className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>Outfit Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Outfit Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Wedding Guest Outfit"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="occasion">Occasion *</Label>
                  <Select value={formData.occasion} onValueChange={(value) => setFormData(prev => ({ ...prev, occasion: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="party">Party</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeOfDay">Time of Day *</Label>
                  <Select value={formData.timeOfDay} onValueChange={(value) => setFormData(prev => ({ ...prev, timeOfDay: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                      <SelectItem value="night">Night</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add any additional notes about this outfit..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleImageUpload
                onImageUpload={handleImageUpload}
                onImageRemove={handleImageRemove}
                currentImage={uploadedImage ? {
                  public_id: uploadedImage.public_id,
                  secure_url: uploadedImage.secure_url
                } : undefined}
              />
              
              {uploadedImage && (
                <div className="mt-4">
                  <Button
                    onClick={() => analyzeImage()}
                    disabled={analyzing}
                    className="w-full"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Analyze with AI
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - AI Analysis */}
        <div>
          {aiAnalysis ? (
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 animate-float" />
                  AI Style Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Outfit Description</h4>
                  <p className="text-sm text-gray-600">{aiAnalysis.outfit_description}</p>
                </div>

                {aiAnalysis.style_score !== null && aiAnalysis.style_score !== undefined && (
                  <div>
                    <h4 className="font-medium mb-2">Style Score</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(Number(aiAnalysis.style_score) / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Number(aiAnalysis.style_score).toFixed(1)}/10</span>
                    </div>
                  </div>
                )}

                {aiAnalysis.strengths && aiAnalysis.strengths.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-green-700">Strengths</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {aiAnalysis.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiAnalysis.improvements && aiAnalysis.improvements.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-orange-700">Suggestions</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {aiAnalysis.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiAnalysis.color_palette && aiAnalysis.color_palette.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Color Palette</h4>
                    <div className="flex flex-wrap gap-2">
                      {aiAnalysis.color_palette.map((color: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="card-3d border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Sparkles className="h-12 w-12 text-gray-400 mb-4 animate-float" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  AI Analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  Upload an image and fill in the details to get AI-powered style analysis
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="min-w-32">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Outfit
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

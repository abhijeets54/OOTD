"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Shirt,
  Tangent as Pants,
  Shovel as Shoe,
  Crown,
  Gem,
  Palette,
  Lightbulb,
  Heart,
  Share2,
  Printer,
  Twitter,
  Facebook,
  Instagram,
  Download,
  RefreshCcw
} from "lucide-react";
import { generateOutfitReport } from "@/lib/llama";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import html2canvas from 'html2canvas';
import { FormData } from "@/lib/llama";



const TruckLoader = ({ message = "Currently delivering an iconic outfit for an icon like you ✨" }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <p className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">{message}</p>
    <div className="loader">
      <div className="truckWrapper">
        <div className="truckBody">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93" className="trucksvg">
            <path stroke-width="3" stroke="#282828" fill="#F83D3D" d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"></path>
            <path stroke-width="3" stroke="#282828" fill="#7D7C7C" d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"></path>
            <path stroke-width="2" stroke="#282828" fill="#282828" d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"></path>
            <rect stroke-width="2" stroke="#282828" fill="#FFFCAB" rx="1" height="7" width="5" y="63" x="187"></rect>
            <rect stroke-width="2" stroke="#282828" fill="#282828" rx="1" height="11" width="4" y="81" x="193"></rect>
            <rect stroke-width="3" stroke="#282828" fill="#DFDFDF" rx="2.5" height="90" width="121" y="1.5" x="6.5"></rect>
            <rect stroke-width="2" stroke="#282828" fill="#DFDFDF" rx="2" height="4" width="6" y="84" x="1"></rect>
          </svg>
        </div>
        <div className="truckTires">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
            <circle stroke-width="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
            <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
            <circle stroke-width="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
            <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
          </svg>
        </div>
        <div className="road"></div>
      </div>
    </div>
    <style jsx>{`
      .loader {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .truckWrapper {
        width: 200px;
        height: 100px;
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        justify-content: flex-end;
        overflow-x: hidden;
      }
      .truckBody {
        width: 130px;
        height: fit-content;
        margin-bottom: 6px;
        animation: motion 1s linear infinite;
      }
      @keyframes motion {
        0% { transform: translateY(0px); }
        50% { transform: translateY(3px); }
        100% { transform: translateY(0px); }
      }
      .truckTires {
        width: 130px;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 10px 0px 15px;
        position: absolute;
        bottom: 0;
      }
      .truckTires svg {
        width: 24px;
      }
      .road {
        width: 100%;
        height: 1.5px;
        background-color: #282828;
        position: relative;
        bottom: 0;
        align-self: flex-end;
        border-radius: 3px;
      }
      .road::before {
        content: "";
        position: absolute;
        width: 20px;
        height: 100%;
        background-color: #282828;
        right: -50%;
        border-radius: 3px;
        animation: roadAnimation 1.4s linear infinite;
        border-left: 10px solid white;
      }
      .road::after {
        content: "";
        position: absolute;
        width: 10px;
        height: 100%;
        background-color: #282828;
        right: -65%;
        border-radius: 3px;
        animation: roadAnimation 1.4s linear infinite;
        border-left: 4px solid white;
      }
      @keyframes roadAnimation {
        0% { transform: translateX(0px); }
        100% { transform: translateX(-350px); }
      }
    `}</style>
  </div>
);

// In OutfitReport.tsx
const formatOutfitForGrok = (report: any, formData: FormData) => {
  // Extract key preferences from dynamic responses
  const preferences = Object.entries(formData.dynamicResponses || {})
    .map(([id, answer]) => {
      const question = formData.dynamicQuestions?.find(q => q.id === id);
      if (!question) return null;
      return `${question.question.replace('?', '')}: ${answer}`;
    })
    .filter(Boolean)
    .join('. ');
    
  return `Generate a modern, styled fashion image of an outfit SPECIFICALLY for a ${formData.gender} person following ${formData.religion} traditions for a ${formData.occasion} during the ${formData.timeOfDay}.

Style preferences: ${preferences}

Components:
- Upper wear: ${report.upperWear}
- Lower wear: ${report.lowerWear}
- Footwear: ${report.footwear}
- Headwear: ${report.headwear || "None"}
- Accessories: ${report.accessories?.join(', ')}
- Color palette: ${report.colors?.join(', ')}

Style notes: Follow these styling tips: ${report.stylingTips?.join('. ')}
Cultural considerations: ${report.cultural?.join('. ')}
Religious context: This outfit respects ${formData.religion} dress traditions and modesty requirements.
Gender: This outfit is designed for a ${formData.gender} individual and must be gender-appropriate.`;
};


export function OutfitReport({ formData }: { formData: FormData }){
  const reportRef = useRef(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [fallbackImageUrl, setFallbackImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [currentService, setCurrentService] = useState<string>("");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const queryClient = useQueryClient();

  const { data: report, isLoading, error, refetch } = useQuery({
    queryKey: ['outfitReport', formData],
    queryFn: () => generateOutfitReport(formData),
    // Cache outfit report for the entire session to prevent regeneration
    staleTime: Infinity, // Never consider stale
    gcTime: Infinity, // Keep in cache indefinitely
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  // Auto-fallback image generation function (Hugging Face -> Pollinations AI)
  const handleGenerateImage = async () => {
    if (!report) return;

    setIsGeneratingImage(true);

    // Create detailed prompt for image generation
    const headwearText = report.headwear && report.headwear !== "None" ? `, ${report.headwear}` : '';
    const outfitDescription = `${formData.gender} person wearing ${report.upperWear}, ${report.lowerWear}, ${report.footwear}${headwearText}`;
    const styleDetails = `${report.colors?.join(' and ')} colors, ${formData.occasion} setting, ${formData.timeOfDay} lighting`;
    const prompt = `fashion photography, ${outfitDescription}, ${styleDetails}, high quality, detailed, professional`;

    // Define service configurations in priority order: Hugging Face first, then Pollinations AI
    const services = [
      {
        name: 'Hugging Face',
        id: 'huggingface',
        execute: async () => {
          const response = await fetch('/api/generate-image-hf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(`Hugging Face API failed: ${errorData.error || response.statusText}`);
          }

          const data = await response.json();
          if (!data.success) {
            throw new Error(data.error || 'Hugging Face service failed');
          }

          return data.imageUrl;
        }
      },
      {
        name: 'Pollinations.ai',
        id: 'pollinations',
        execute: async () => {
          // Use the API route for better error handling
          const response = await fetch('/api/generate-image-pollinations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(`Pollinations.ai API failed: ${errorData.error || response.statusText}`);
          }

          const data = await response.json();
          if (!data.success) {
            throw new Error(data.error || 'Pollinations.ai service failed');
          }

          // Store fallback URL if available
          if (data.fallbackUrl) {
            setFallbackImageUrl(data.fallbackUrl);
          }

          return data.imageUrl;
        }
      }
    ];

    // Try each service in order
    for (const service of services) {
      try {
        setCurrentService(service.name);
        console.log(`Trying ${service.name}...`);

        const imageUrl = await service.execute();

        setGeneratedImage(imageUrl);
        setIsGeneratingImage(false);
        setCurrentService("");
        return;

      } catch (error) {
        console.log(`${service.name} failed:`, error);

        // If this is the last service, show a more detailed error
        if (service === services[services.length - 1]) {
          console.error('All services failed, last error:', error);
        }
        continue;
      }
    }

    // If all services fail
    setIsGeneratingImage(false);
    setCurrentService("");
  };

  const shareOnSocial = async (platform: string) => {
    const shareData = {
      title: 'My #OOTD AI-Styled Outfit',
      text: `Check out my personalized AI-styled outfit! #OOTD #AIFashion`,
      url: window.location.href
    };

    try {
      switch (platform) {
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
            '_blank'
          );
          break;
        
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
            '_blank'
          );
          break;
        
        case 'instagram':
          if (reportRef.current) {
            try {
              const canvas = await html2canvas(reportRef.current);
              const image = canvas.toDataURL('image/png');
              
              const link = document.createElement('a');
              link.download = 'my-ootd-outfit.png';
              link.href = image;
              link.click();
            } catch (err) {
              console.error('Error generating image:', err);
            }
          }
          break;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRetry = () => {
    window.location.href = '/';
  };

  const handleRefresh = async () => {
    setIsRegenerating(true);
    setGeneratedImage(null); // Clear any existing generated image
    setFallbackImageUrl(null); // Clear fallback URL

    try {
      await refetch();
    } catch (error) {
      console.error('Error regenerating outfit:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  if (isLoading || isRegenerating) {
    const loadingMessage = isRegenerating
      ? "Regenerating your perfect outfit... ✨"
      : "Currently delivering an iconic outfit for an icon like you ✨";

    return (
      <div className="space-y-6">
        <TruckLoader message={loadingMessage} />
        <Skeleton className="h-32 w-full animate-pulse" />
        <Skeleton className="h-32 w-full animate-pulse" />
        <Skeleton className="h-32 w-full animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-300 bg-red-50">
        <p className="text-destructive text-center mb-4">Error generating outfit recommendations. Please try again.</p>
        <div className="flex justify-center">
          <Button
            onClick={handleRefresh}
            disabled={isRegenerating}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
          >
            <RefreshCcw className={`h-4 w-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
            {isRegenerating ? 'Retrying...' : 'Retry'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 relative" ref={reportRef}>
      {/* Loading overlay for regeneration */}
      {isRegenerating && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <RefreshCcw className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-2" />
            <p className="text-purple-600 font-medium">Regenerating your outfit...</p>
          </div>
        </div>
      )}


      
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">Your Personalized Outfit</h2>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleRefresh}
            disabled={isRegenerating || isLoading}
            className="border-purple-200 hover:bg-purple-50 transition-all duration-300"
          >
            <RefreshCcw className={`h-4 w-4 mr-2 text-purple-500 ${isRegenerating || isLoading ? 'animate-spin' : ''}`} />
            {isRegenerating || isLoading ? 'Regenerating...' : 'Regenerate Outfit'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRetry}
            disabled={isRegenerating || isLoading}
            className="border-gray-200 hover:bg-gray-50 transition-all duration-300"
          >
            <RefreshCcw className="h-4 w-4 mr-2 text-gray-500" />
            Start Over
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => shareOnSocial('instagram')}
            disabled={isRegenerating || isLoading}
            className="border-pink-200 hover:bg-pink-50 transition-all duration-300"
          >
            <Download className="h-4 w-4 mr-2 text-pink-500" />
            Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrint}
            disabled={isRegenerating || isLoading}
            className="border-indigo-200 hover:bg-indigo-50 transition-all duration-300"
          >
            <Printer className="h-4 w-4 mr-2 text-indigo-500" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-3d p-6 border-l-4 border-l-purple-500 bg-gradient-to-br from-white to-purple-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 animate-float">
              <Shirt className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg text-purple-700">Upper Wear</h3>
          </div>
          <p className="text-gray-700">{report?.upperWear}</p>
        </Card>

        <Card className="card-3d p-6 border-l-4 border-l-blue-500 bg-gradient-to-br from-white to-blue-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 animate-float" style={{animationDelay: '0.5s'}}>
              <Pants className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg text-blue-700">Lower Wear</h3>
          </div>
          <p className="text-gray-700">{report?.lowerWear}</p>
        </Card>

        <Card className="card-3d p-6 border-l-4 border-l-teal-500 bg-gradient-to-br from-white to-teal-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 animate-float" style={{animationDelay: '1s'}}>
              <Shoe className="h-5 w-5 text-teal-600" />
            </div>
            <h3 className="font-semibold text-lg text-teal-700">Footwear</h3>
          </div>
          <p className="text-gray-700">{report?.footwear}</p>
        </Card>

        <Card className="card-3d p-6 border-l-4 border-l-amber-500 bg-gradient-to-br from-white to-amber-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 animate-float" style={{animationDelay: '1.5s'}}>
              <Crown className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="font-semibold text-lg text-amber-700">Headwear</h3>
          </div>
          <p className="text-gray-700">{report?.headwear}</p>
        </Card>
      </div>

      <Card className="card-3d p-6 border-l-4 border-l-pink-500 bg-gradient-to-br from-white to-pink-50">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-3 animate-float" style={{animationDelay: '2s'}}>
            <Gem className="h-5 w-5 text-pink-600" />
          </div>
          <h3 className="font-semibold text-lg text-pink-700">Accessories</h3>
        </div>
        <ul className="list-disc list-inside text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
          {report?.accessories?.map((item: string, index: number) => (
            <li key={index} className="hover:text-pink-700 transition-colors">{item}</li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-3d p-6 border-l-4 border-l-indigo-500 bg-gradient-to-br from-white to-indigo-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 animate-float" style={{animationDelay: '2.5s'}}>
              <Palette className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-lg text-indigo-700">Color Palette</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {report?.colors?.map((color: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm shadow-sm animate-fadeIn hover-lift"
                style={{
                  backgroundColor: color.toLowerCase().includes('black') ? '#333' :
                                   color.toLowerCase().includes('white') ? '#f8f8f8' :
                                   `#${Math.floor(Math.random()*16777215).toString(16)}`,
                  color: color.toLowerCase().includes('black') ? 'white' :
                         color.toLowerCase().includes('white') ? 'black' : 'white'
                }}
              >
                {color}
              </span>
            ))}
          </div>
        </Card>

        <Card className="card-3d p-6 border-l-4 border-l-green-500 bg-gradient-to-br from-white to-green-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 animate-float" style={{animationDelay: '3s'}}>
              <Lightbulb className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg text-green-700">Styling Tips</h3>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            {report?.stylingTips?.map((tip: string, index: number) => (
              <li key={index} className="mb-2 hover:text-green-700 transition-colors">{tip}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="card-3d p-6 border-l-4 border-l-rose-500 bg-gradient-to-br from-white to-rose-50">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center mr-3 animate-float" style={{animationDelay: '3.5s'}}>
            <Heart className="h-5 w-5 text-rose-600" />
          </div>
          <h3 className="font-semibold text-lg text-rose-700">Cultural Considerations</h3>
        </div>
        <ul className="list-disc list-inside text-gray-700">
          {report?.cultural?.map((note: string, index: number) => (
            <li key={index} className="mb-2 hover:text-rose-700 transition-colors">{note}</li>
          ))}
        </ul>
      </Card>

      <Card className="card-3d p-6 border-l-4 border-l-emerald-500 bg-gradient-to-br from-white to-emerald-50">
        <h3 className="font-semibold text-lg text-emerald-700 mb-4 flex items-center">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 animate-float" style={{animationDelay: '4s'}}>
            <span className="text-emerald-600 font-bold">$</span>
          </div>
          Budget Options
        </h3>
        <div className="space-y-4">
          {report?.budget && Object.entries(report.budget).map(([key, value]: [string, any]) => (
            <div key={key} className="flex justify-between items-center p-2 rounded-lg hover:bg-emerald-100 transition-colors hover-lift">
              <span className="capitalize font-medium text-emerald-800">{key}</span>
              <span className="text-emerald-700 font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="card-3d p-6 mt-6 bg-white border border-gray-200 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h3 className="font-bold text-2xl text-gray-900">Visualize Your Outfit</h3>

          {/* Generated Image Display */}
          {generatedImage && (
            <div className="w-full max-w-md mx-auto">
              <img
                src={generatedImage}
                alt="AI Generated Outfit"
                className="w-full h-auto rounded-lg shadow-lg border-2 border-gray-200"
                onError={() => {
                  console.error('Image failed to load:', generatedImage);

                  // Try fallback URL if available
                  if (fallbackImageUrl && generatedImage !== fallbackImageUrl) {
                    console.log('Trying fallback URL:', fallbackImageUrl);
                    setGeneratedImage(fallbackImageUrl);
                    setFallbackImageUrl(null); // Clear fallback to prevent infinite loop
                  } else {
                    setGeneratedImage(null);
                  }
                }}
              />
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = generatedImage;
                    link.download = 'ai-generated-outfit.png';
                    link.click();
                  }}
                  className="flex-1 bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
                >
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGeneratedImage(null)}
                  className="flex-1 bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
                >
                  Generate New
                </Button>
              </div>
            </div>
          )}

          {/* Generation Button */}
          <div className="flex justify-center w-full max-w-lg">
            <Button
              size="lg"
              className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white transform hover:scale-105 transition-all duration-300 shadow-lg px-8"
              onClick={handleGenerateImage}
              disabled={isGeneratingImage || isRegenerating || isLoading}
            >
              {isGeneratingImage ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {currentService === 'Hugging Face' ? 'Generating HD Quality...' :
                   currentService === 'Pollinations.ai' ? 'Trying Backup Service...' :
                   'Generating...'}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Generate Outfit Image
                </>
              )}
            </Button>
          </div>

          <p className="text-gray-600 text-sm text-center max-w-md font-medium">
            {generatedImage
              ? 'Your AI-generated outfit visualization is ready!'
              : isGeneratingImage
                ? currentService === 'Hugging Face'
                  ? 'Generating high-quality image with Hugging Face...'
                  : currentService === 'Pollinations.ai'
                  ? 'Trying backup service (Pollinations AI)...'
                  : 'Generating...'
                : 'Generate a visual representation of your outfit using AI'
            }
          </p>
        </div>
      </Card>
    </div>
  );
}

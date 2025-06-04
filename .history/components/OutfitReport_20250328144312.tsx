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
  RefreshCcw,
  X,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { generateOutfitReport } from "@/lib/llama";
import { useQuery } from "@tanstack/react-query";
import html2canvas from 'html2canvas';
import { FormData } from "@/lib/llama";

// Custom notification component
const FashionNotification = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fadeIn">
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 animate-scaleIn relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 rounded-full opacity-20"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-yellow-300 via-amber-200 to-orange-300 rounded-full opacity-20"></div>
      
      <button 
        onClick={onClose} 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <X size={20} />
      </button>
      
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Fashion Success!</h3>
        <p className="text-gray-600">{message}</p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Button 
          onClick={onClose}
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white transition-all duration-300"
        >
          Continue
        </Button>
      </div>
    </div>
  </div>
);

const TruckLoader = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <p className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">Currently delivering an iconic outfit for an icon like you ✨</p>
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

// Custom image popup component
const OutfitImagePopup = ({ prompt, onClose }: { prompt: string; onClose: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [partialFallback, setPartialFallback] = useState(false);

  useEffect(() => {
    const generateImages = async () => {
      try {
        setLoading(true);
        
        // Call our API endpoint to generate images
        const response = await fetch('/api/generate-images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate images');
        }
        
        const data = await response.json();
        
        if (data.success && data.images && data.images.length > 0) {
          setImages(data.images);
          if (data.fallback) {
            setUsingFallback(true);
          }
          if (data.partialFallback) {
            setPartialFallback(true);
          }
        } else {
          throw new Error('No images were generated');
        }
        
        setLoading(false);
      } catch (err: any) {
        console.error('Error generating images:', err);
        setError(err.message || 'Failed to generate images. Please try again.');
        setLoading(false);
      }
    };

    generateImages();
  }, [prompt]);

  const downloadImage = (imageUrl: string, index: number) => {
    // For base64 images, we can directly download them
    const link = document.createElement('a');
    link.download = `outfit-image-${index}.jpg`;
    link.href = imageUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full mx-4 animate-scaleIn relative overflow-hidden max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full p-1 z-10"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">Your AI Generated Outfit</h3>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-purple-600 animate-spin mb-4" />
            <p className="text-lg text-gray-600">Generating your perfect outfit...</p>
            <p className="text-sm text-gray-500 mt-2 max-w-md text-center">This may take a moment as we craft the perfect fashion visualization just for you.</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-red-500 text-center mb-4">{error}</p>
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-violet-600 to-indigo-600"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            {usingFallback && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
                <p className="flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  We're showing placeholder images. To see AI-generated outfits based on your prompt, you'll need to set up an image generation API with proper permissions.
                </p>
              </div>
            )}
            {partialFallback && !usingFallback && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-700 text-sm">
                <p className="flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  We've generated some AI images and included some placeholders. Not all images could be generated due to API limitations.
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {images.map((imageUrl, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg border border-gray-200">
                  <img 
                    src={imageUrl} 
                    alt={`Generated outfit ${index+1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white text-black hover:bg-white/90"
                      onClick={() => downloadImage(imageUrl, index+1)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Save Image
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Select your favorite outfit by downloading it</p>
                <Button 
                  onClick={onClose}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

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
    
  // Create a shorter, more focused prompt for Stable Diffusion
  // SD models work better with concise, clear prompts
  return `full body photograph of a ${formData.gender} modeling ${report.upperWear}, ${report.lowerWear}, and ${report.footwear}. 
${formData.religion} ${formData.occasion} outfit, ${formData.timeOfDay} lighting, professional fashion photography, 
accessories: ${report.accessories?.join(', ')}, color palette: ${report.colors?.join(', ')}, 
clear background, high detail, 4k, photorealistic`;
};


export function OutfitReport({ formData }: { formData: FormData }){
  const reportRef = useRef(null);
  const [notification, setNotification] = useState({ show: false, message: "" });
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [grokPrompt, setGrokPrompt] = useState("");
  
  const { data: report, isLoading, error } = useQuery({
    queryKey: ['outfitReport', formData],
    queryFn: () => generateOutfitReport(formData),
    staleTime: 0,
    retry: 2,
  });

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
              
              setNotification({
                show: true,
                message: "Your outfit has been saved! Share it on Instagram to inspire others."
              });
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <TruckLoader />
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
          <Button onClick={() => window.location.reload()} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition-all duration-300">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 relative" ref={reportRef}>
      {notification.show && (
        <FashionNotification 
          message={notification.message} 
          onClose={() => setNotification({ show: false, message: "" })} 
        />
      )}
      
      {showImagePopup && (
        <OutfitImagePopup 
          prompt={grokPrompt}
          onClose={() => setShowImagePopup(false)}
        />
      )}
      
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">Your Personalized Outfit</h2>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleRetry}
            className="border-purple-200 hover:bg-purple-50 transition-all duration-300"
          >
            <RefreshCcw className="h-4 w-4 mr-2 text-purple-500" />
            Retry
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => shareOnSocial('instagram')}
            className="border-pink-200 hover:bg-pink-50 transition-all duration-300"
          >
            <Download className="h-4 w-4 mr-2 text-pink-500" />
            Save
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handlePrint}
            className="border-indigo-200 hover:bg-indigo-50 transition-all duration-300"
          >
            <Printer className="h-4 w-4 mr-2 text-indigo-500" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <Shirt className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg text-purple-700">Upper Wear</h3>
          </div>
          <p className="text-gray-700">{report?.upperWear}</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Pants className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg text-blue-700">Lower Wear</h3>
          </div>
          <p className="text-gray-700">{report?.lowerWear}</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-teal-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-teal-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
              <Shoe className="h-5 w-5 text-teal-600" />
            </div>
            <h3 className="font-semibold text-lg text-teal-700">Footwear</h3>
          </div>
          <p className="text-gray-700">{report?.footwear}</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-amber-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-amber-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
              <Crown className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="font-semibold text-lg text-amber-700">Headwear</h3>
          </div>
          <p className="text-gray-700">{report?.headwear}</p>
        </Card>
      </div>

      <Card className="p-6 border-l-4 border-l-pink-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-pink-50">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
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
        <Card className="p-6 border-l-4 border-l-indigo-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-indigo-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <Palette className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-lg text-indigo-700">Color Palette</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {report?.colors?.map((color: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm shadow-sm animate-fadeIn"
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

        <Card className="p-6 border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-green-50">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
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

      <Card className="p-6 border-l-4 border-l-rose-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-rose-50">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center mr-3">
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

      <Card className="p-6 border-l-4 border-l-emerald-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-emerald-50">
        <h3 className="font-semibold text-lg text-emerald-700 mb-4 flex items-center">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
            <span className="text-emerald-600 font-bold">$</span>
          </div>
          Budget Options
        </h3>
        <div className="space-y-4">
          {report?.budget && Object.entries(report.budget).map(([key, value]: [string, any]) => (
            <div key={key} className="flex justify-between items-center p-2 rounded-lg hover:bg-emerald-100 transition-colors">
              <span className="capitalize font-medium text-emerald-800">{key}</span>
              <span className="text-emerald-700 font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="p-6 mt-6 border-none shadow-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-fashion opacity-10"></div>
        <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
          <h3 className="font-bold text-2xl">Visualize Your Outfit</h3>
          <Button 
            size="lg"
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-black hover:bg-gray-900 transform hover:scale-105 transition-all duration-300 shadow-lg"
            onClick={() => {
              // Get the formatted prompt
              const prompt = formatOutfitForGrok(report, formData);
              
              // Set the prompt and show the popup
              setGrokPrompt(prompt);
              setShowImagePopup(true);
            }}
          >
            <ImageIcon className="w-5 h-5" />
            Generate Outfit Images
          </Button>
          <p className="text-white/80 text-sm text-center max-w-md">
            Click to generate visual representations of your perfect outfit
          </p>
        </div>
      </Card>
    </div>
  );
}

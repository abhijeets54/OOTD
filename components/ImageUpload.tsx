"use client";

import { useState } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Camera } from 'lucide-react';
import { fashionToast } from '@/lib/toast';

interface ImageUploadProps {
  onImageUpload: (result: {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
  }) => void;
  onImageRemove?: () => void;
  currentImage?: {
    public_id: string;
    secure_url: string;
  };
  disabled?: boolean;
  className?: string;
}

export default function ImageUpload({
  onImageUpload,
  onImageRemove,
  currentImage,
  disabled = false,
  className = ""
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadSuccess = (result: any) => {
    setIsUploading(false);
    onImageUpload({
      public_id: result.info.public_id,
      secure_url: result.info.secure_url,
      width: result.info.width,
      height: result.info.height,
    });
    fashionToast.upload.success();
  };

  const handleUploadError = (error: any) => {
    setIsUploading(false);
    console.error('Upload error:', error);
    fashionToast.upload.error('Please check your Cloudinary configuration.');
  };

  const handleRemoveImage = () => {
    if (onImageRemove) {
      onImageRemove();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {currentImage ? (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="relative group">
              <CldImage
                src={currentImage.public_id}
                alt="Uploaded outfit"
                width={400}
                height={400}
                crop="fill"
                className="w-full h-64 object-cover rounded-lg"
              />
              
              {/* Remove button overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  disabled={disabled}
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
            
            {/* Image info */}
            <div className="mt-3 text-sm text-gray-600">
              <p className="truncate">Image uploaded successfully</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
          <CardContent className="p-8">
            <CldUploadWidget
              uploadPreset="ootd-upload-preset"
              options={{
                folder: 'ootd-outfits',
                sources: ['local', 'camera'],
                multiple: false,
                maxFiles: 1,
                maxFileSize: 10000000, // 10MB
                clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                resourceType: 'image',

                styles: {
                  palette: {
                    window: '#FFFFFF',
                    windowBorder: '#90A0B3',
                    tabIcon: '#0078FF',
                    menuIcons: '#5A616A',
                    textDark: '#000000',
                    textLight: '#FFFFFF',
                    link: '#0078FF',
                    action: '#FF620C',
                    inactiveTabIcon: '#0E2F5A',
                    error: '#F44235',
                    inProgress: '#0078FF',
                    complete: '#20B832',
                    sourceBg: '#E4EBF1'
                  }
                }
              }}
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
              onOpen={() => setIsUploading(true)}
              onClose={() => setIsUploading(false)}
            >
              {({ open }) => (
                <div className="text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-gray-100 rounded-full">
                      {isUploading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      ) : (
                        <Upload className="h-8 w-8 text-gray-600" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Upload Outfit Image
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Upload a photo of your outfit for AI analysis and feedback
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => open()}
                        disabled={disabled || isUploading}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="h-4 w-4" />
                        <span>{isUploading ? 'Uploading...' : 'Choose File'}</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => open()}
                        disabled={disabled || isUploading}
                        className="flex items-center space-x-2"
                      >
                        <Camera className="h-4 w-4" />
                        <span>Take Photo</span>
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      Supports JPG, PNG, WebP up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </CldUploadWidget>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

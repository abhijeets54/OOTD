"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Camera, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { fashionToast } from '@/lib/toast';

interface SimpleImageUploadProps {
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

export default function SimpleImageUpload({
  onImageUpload,
  onImageRemove,
  currentImage,
  disabled = false,
  className = ""
}: SimpleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      fashionToast.upload.invalidFile();
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      fashionToast.upload.fileTooLarge();
      return;
    }

    setIsUploading(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Upload to our API endpoint
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      onImageUpload({
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
      });

      fashionToast.upload.success();
      setPreview(null);
    } catch (error) {
      console.error('Upload error:', error);
      fashionToast.upload.error('Upload failed. Please try again.');
      setPreview(null);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    if (onImageRemove) {
      onImageRemove();
    }
    setPreview(null);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {currentImage || preview ? (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="relative group">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-80 object-cover rounded-lg"
                />
              ) : currentImage ? (
                <Image
                  src={currentImage.secure_url}
                  alt="Uploaded outfit"
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover rounded-lg"
                />
              ) : null}
              
              {/* Loading overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="text-white text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p>Uploading...</p>
                  </div>
                </div>
              )}
              
              {/* Remove button overlay */}
              {!isUploading && (
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
              )}
            </div>
            
            {/* Image info */}
            <div className="mt-3 text-sm text-gray-600">
              <p className="truncate">
                {isUploading ? 'Uploading...' : 'Image uploaded successfully'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload your outfit image
              </h3>
              
              <p className="text-sm text-gray-500 mb-6">
                Drag and drop or click to select an image
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={openFileDialog}
                  disabled={disabled || isUploading}
                  className="flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>{isUploading ? 'Uploading...' : 'Choose File'}</span>
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Supports JPG, PNG, WebP up to 10MB
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

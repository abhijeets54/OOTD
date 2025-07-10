import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

// Helper functions for image operations
export const cloudinaryHelpers = {
  // Upload image to Cloudinary
  async uploadImage(file: File, folder: string = 'ootd-outfits'): Promise<{
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
  }> {
    try {
      // Convert file to base64
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const dataURI = `data:${file.type};base64,${base64}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: folder,
        resource_type: 'image',
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' }, // Limit max size
          { quality: 'auto' }, // Auto quality optimization
          { fetch_format: 'auto' } // Auto format optimization
        ]
      });

      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
      };
    } catch (error) {
      throw new Error('Failed to upload image to Cloudinary');
    }
  },

  // Delete image from Cloudinary
  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error('Failed to delete image from Cloudinary');
    }
  },

  // Generate optimized image URL
  getOptimizedImageUrl(publicId: string, options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  } = {}): string {
    const {
      width = 400,
      height = 400,
      crop = 'fill',
      quality = 'auto',
      format = 'auto'
    } = options;

    return cloudinary.url(publicId, {
      width,
      height,
      crop,
      quality,
      fetch_format: format,
    });
  },

  // Generate thumbnail URL
  getThumbnailUrl(publicId: string): string {
    return this.getOptimizedImageUrl(publicId, {
      width: 200,
      height: 200,
      crop: 'fill'
    });
  },

  // Generate different sizes for responsive images
  getResponsiveImageUrls(publicId: string): {
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
  } {
    return {
      thumbnail: this.getOptimizedImageUrl(publicId, { width: 200, height: 200 }),
      small: this.getOptimizedImageUrl(publicId, { width: 400, height: 400 }),
      medium: this.getOptimizedImageUrl(publicId, { width: 800, height: 800 }),
      large: this.getOptimizedImageUrl(publicId, { width: 1200, height: 1200 }),
    };
  }
};

// Client-side upload configuration for next-cloudinary
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET, // You'll need to create this in Cloudinary dashboard
};

// Upload widget configuration
export const uploadWidgetConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  folder: 'ootd-outfits',
  sources: ['local', 'camera'],
  multiple: false,
  maxFiles: 1,
  maxFileSize: 10000000, // 10MB
  clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
  transformation: [
    { width: 1000, height: 1000, crop: 'limit' },
    { quality: 'auto' },
    { fetch_format: 'auto' }
  ],
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
    },
    fonts: {
      default: null,
      "'Fira Sans', sans-serif": {
        url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
        active: true
      }
    }
  }
};

import { NextResponse } from 'next/server';
import axios from 'axios';

// Tell Next.js this is a dynamic route
export const dynamic = 'force-dynamic';
// Set maximum duration for the API route
export const maxDuration = 300; // 5 minutes

export async function POST(request: Request) {
  try {
    // Get the request body with the prompt
    const requestBody = await request.json();
    
    if (!requestBody.prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      );
    }

    const prompt = requestBody.prompt;
    
    // TODO: Implement actual Grok API integration
    // This is a placeholder. In a real implementation, you would:
    // 1. Call Grok API or other image generation service with the prompt
    // 2. Wait for the generated images
    // 3. Return the image URLs or base64 data
    
    // For now, return mock data
    // Simulate a delay like a real API call would have
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response with placeholder images
    const mockImages = [
      'https://picsum.photos/seed/outfit1/400/600',
      'https://picsum.photos/seed/outfit2/400/600',
      'https://picsum.photos/seed/outfit3/400/600',
      'https://picsum.photos/seed/outfit4/400/600',
    ];
    
    return NextResponse.json({
      success: true,
      images: mockImages,
      prompt: prompt
    });
    
  } catch (error: any) {
    console.error('Image generation API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate images',
        details: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
} 
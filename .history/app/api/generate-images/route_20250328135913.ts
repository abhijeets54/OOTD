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
    
    // For Hugging Face, we'll use a stable diffusion model
    // This uses their free inference API
    try {
      // Using a SD model from Hugging Face (free to use)
      const modelEndpoint = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";
      
      // Make 4 parallel requests to generate 4 images
      const imagePromises = [];
      
      for (let i = 0; i < 4; i++) {
        imagePromises.push(
          axios({
            method: 'post',
            url: modelEndpoint,
            headers: {
              'Authorization': `Bearer hf_dummy_key`, // Replace with your free Hugging Face token
              'Content-Type': 'application/json'
            },
            data: { inputs: prompt },
            responseType: 'arraybuffer'
          })
        );
      }
      
      const responses = await Promise.all(imagePromises);
      
      // Convert the binary data to base64 strings
      const images = responses.map((response, index) => {
        const buffer = Buffer.from(response.data);
        return `data:image/jpeg;base64,${buffer.toString('base64')}`;
      });
      
      return NextResponse.json({
        success: true,
        images,
        prompt
      });
    } catch (error) {
      console.error('Hugging Face API error:', error);
      
      // Fallback to placeholder images if the API fails
      const fallbackImages = [
        'https://picsum.photos/seed/outfit1/400/600',
        'https://picsum.photos/seed/outfit2/400/600',
        'https://picsum.photos/seed/outfit3/400/600',
        'https://picsum.photos/seed/outfit4/400/600',
      ];
      
      return NextResponse.json({
        success: true,
        images: fallbackImages,
        prompt,
        fallback: true
      });
    }
    
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
import { NextResponse } from 'next/server';
import axios from 'axios';
import { config } from '@/lib/config';

// Tell Next.js this is a dynamic route
export const dynamic = 'force-dynamic';
// Set maximum duration for the API route
export const maxDuration = 300; // 5 minutes

// Get API token from environment variable or config file
// You'll need to add HF_API_TOKEN to your .env.local file 
// after creating a free account at huggingface.co
const HF_API_TOKEN = process.env.HF_API_TOKEN || config.huggingFaceApiToken || '';

// Debug logging
console.log("API Route Loaded, token exists:", !!HF_API_TOKEN);
console.log("Token first few chars:", HF_API_TOKEN ? HF_API_TOKEN.substring(0, 3) + "..." : "none");
console.log("All env vars available:", Object.keys(process.env).filter(key => 
  !key.includes("SECRET") && !key.includes("KEY") && key !== "HF_API_TOKEN"
).join(", "));

export async function POST(request: Request) {
  try {
    console.log("Received image generation request");
    
    // Get the request body with the prompt
    const requestBody = await request.json();
    
    if (!requestBody.prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      );
    }

    const prompt = requestBody.prompt;
    console.log("Processing prompt:", prompt.substring(0, 50) + "...");
    
    // For Hugging Face, we'll use a stable diffusion model
    // This uses their free inference API
    try {
      // Check if we have an API token
      if (!HF_API_TOKEN) {
        console.error("HF_API_TOKEN is not set in environment variables");
        throw new Error('Hugging Face API token not configured');
      }
      
      // Use a model that's freely accessible
      // CompVis/stable-diffusion-v1-4 is typically more accessible than runwayml/stable-diffusion-v1-5
      const modelEndpoint = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4";
      console.log("Using model endpoint:", modelEndpoint);
      
      // Simplify prompt for better results with this model
      const simplifiedPrompt = `fashion photography of ${prompt.substring(0, 300)}`;
      
      // Make 4 parallel requests to generate 4 images
      const imagePromises = [];
      
      // Only make 2 requests instead of 4 to reduce likelihood of rate limiting
      for (let i = 0; i < 2; i++) {
        imagePromises.push(
          axios({
            method: 'post',
            url: modelEndpoint,
            headers: {
              'Authorization': `Bearer ${HF_API_TOKEN}`,
              'Content-Type': 'application/json'
            },
            data: { inputs: simplifiedPrompt },
            responseType: 'arraybuffer',
            timeout: 30000 // 30 second timeout
          })
        );
      }
      
      console.log("Sending requests to Hugging Face API...");
      const responses = await Promise.all(imagePromises);
      console.log("Received responses from Hugging Face API");
      
      // Convert the binary data to base64 strings
      const images = responses.map((response, index) => {
        const buffer = Buffer.from(response.data);
        return `data:image/jpeg;base64,${buffer.toString('base64')}`;
      });
      
      // Add 2 placeholder images to have 4 total
      if (images.length < 4) {
        while (images.length < 4) {
          images.push(`https://picsum.photos/seed/outfit${images.length+1}/400/600`);
        }
      }
      
      console.log("Successfully generated some images and added placeholders");
      return NextResponse.json({
        success: true,
        images,
        prompt,
        partialFallback: images.length < 4
      });
    } catch (error: any) {
      console.error('Hugging Face API error:', error);
      console.error('Error details:', error.message);
      
      // Extract more specific error message
      let errorMessage = 'Failed to generate images';
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        
        // Try to parse error message if it's JSON
        if (error.response.data instanceof Buffer) {
          try {
            const responseText = Buffer.from(error.response.data).toString('utf8');
            const responseJson = JSON.parse(responseText);
            if (responseJson.error) {
              errorMessage = responseJson.error;
              console.error('Error message from API:', errorMessage);
            }
          } catch (e) {
            console.error('Error parsing response buffer:', e);
          }
        }
      }
      
      // Fallback to placeholder images if the API fails
      console.log("Falling back to placeholder images");
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
        fallback: true,
        error: errorMessage
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
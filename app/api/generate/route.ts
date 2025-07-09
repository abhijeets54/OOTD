import { NextResponse } from 'next/server';
import { generateWithGemini, type GeminiRequest, type GeminiModelName, AVAILABLE_MODELS } from '../../../lib/gemini-service';

// Tell Next.js this is a dynamic route that shouldn't be statically optimized
export const dynamic = 'force-dynamic';
// Set maximum duration for the API route
export const maxDuration = 300; // 5 minutes, adjust based on your needs

export async function POST(request: Request) {
  try {
    // Get the request body
    const requestBody = await request.json();

    // Validate request body
    if (!requestBody.prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      );
    }

    // Determine which model to use - support both 'model' field and legacy 'llama3' mapping
    let modelName: GeminiModelName = "gemini-2.5-pro"; // default

    if (requestBody.model) {
      if (requestBody.model === "llama3") {
        // Map legacy llama3 requests to gemini-2.5-pro
        modelName = "gemini-2.5-pro";
      } else if (requestBody.model in AVAILABLE_MODELS) {
        modelName = requestBody.model as GeminiModelName;
      }
    }

    // Create the Gemini request
    const geminiRequest: GeminiRequest = {
      prompt: requestBody.prompt,
      temperature: requestBody.temperature || 0.7,
      format: requestBody.format || undefined,
      max_tokens: requestBody.max_tokens || undefined,
      model: modelName
    };

    // Generate response using Gemini
    const response = await generateWithGemini(geminiRequest);

    // Return the response in the same format as the original API
    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Gemini API error:', {
      message: error.message,
      stack: error.stack
    });

    // Handle different types of errors
    if (error.message.includes('GOOGLE_API_KEY')) {
      return NextResponse.json(
        {
          error: 'API configuration error',
          details: 'Google API key is not configured properly'
        },
        { status: 500 }
      );
    }

    if (error.message.includes('Invalid JSON')) {
      return NextResponse.json(
        {
          error: 'Invalid JSON in model response',
          details: 'The model returned a response that could not be parsed as JSON'
        },
        { status: 422 }
      );
    }

    // Handle any other unexpected errors
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}
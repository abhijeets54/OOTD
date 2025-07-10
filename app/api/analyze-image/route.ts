import { NextResponse } from 'next/server';
import { analyzeOutfitImage } from '@/lib/gemini-service';
import { auth } from '@clerk/nextjs/server';

// Helper function to process style score from AI response
function processStyleScore(styleScore: any): number | null {
  if (styleScore === null || styleScore === undefined || styleScore === "N/A") {
    return null;
  }

  // If it's already a number, return it
  if (typeof styleScore === 'number') {
    return Math.max(0, Math.min(10, styleScore)); // Ensure it's between 0-10
  }

  // If it's a string, try to parse it
  if (typeof styleScore === 'string') {
    const parsed = parseFloat(styleScore);
    if (!isNaN(parsed)) {
      return Math.max(0, Math.min(10, parsed)); // Ensure it's between 0-10
    }
  }

  // If we can't parse it, return null
  return null;
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the request body
    const body = await request.json();
    const { imageUrl, context } = body;

    // Validate required fields
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Missing required field: imageUrl' },
        { status: 400 }
      );
    }

    // Validate image URL format
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid image URL format' },
        { status: 400 }
      );
    }

    // Analyze the image using Gemini Vision
    const rawAnalysis = await analyzeOutfitImage(imageUrl, context || {});

    // Process the analysis to ensure proper data types
    const analysis = {
      ...rawAnalysis,
      style_score: processStyleScore(rawAnalysis.style_score)
    };

    return NextResponse.json({
      success: true,
      analysis
    });

  } catch (error: any) {
    // Handle specific error types
    if (error.message.includes('Failed to analyze')) {
      return NextResponse.json(
        {
          error: 'Image analysis failed',
          details: 'Unable to analyze the outfit image. Please try with a clearer image.'
        },
        { status: 422 }
      );
    }

    if (error.message.includes('API key')) {
      return NextResponse.json(
        {
          error: 'Configuration error',
          details: 'AI service is not properly configured'
        },
        { status: 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      );
    }

    // Clean and prepare the prompt for Pollinations.ai
    const cleanPrompt = prompt
      .replace(/[^\w\s,.-]/g, ' ') // Replace special characters with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim()
      .substring(0, 280); // Limit length to avoid URL issues

    // Enhanced prompt for better fashion results
    const finalPrompt = `fashion photography, ${cleanPrompt}, high quality, detailed, professional, studio lighting`;

    // Use the current working Pollinations API format with flux model for better quality
    const encodedPrompt = encodeURIComponent(finalPrompt);
    const seed = Math.floor(Math.random() * 1000000); // Random seed for variety

    // Try flux model first, with turbo as fallback
    const models = ['flux', 'turbo'];
    const selectedModel = models[0]; // Start with flux

    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=512&height=768&seed=${seed}&nologo=true&model=${selectedModel}`;

    // For Pollinations.ai, we'll return the URL directly since it's a reliable service
    // and HEAD requests might fail due to CORS or other restrictions while the actual image works fine
    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      service: 'Pollinations.ai',
      model: selectedModel,
      fallbackUrl: `https://pollinations.ai/p/${encodedPrompt}?width=512&height=768&seed=${seed}&nologo=true&model=turbo`
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Pollinations.ai service failed'
    }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// FASHN.ai API - Fashion-specific image generation
const FASHN_API_KEY = process.env.FASHN_API_KEY;

export async function POST(request: Request) {
  try {
    const { prompt, formData } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      );
    }

    // If no FASHN API key, return error to trigger fallback
    if (!FASHN_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'FASHN.ai API key not configured'
      }, { status: 503 });
    }

    // FASHN.ai API call (this is a placeholder - you'll need to check their actual API documentation)
    const response = await fetch('https://api.fashn.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FASHN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `fashion model wearing ${prompt}`,
        style: 'fashion_photography',
        gender: formData?.gender || 'unisex',
        occasion: formData?.occasion || 'casual',
        width: 512,
        height: 768
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FASHN.ai API error:', response.status, errorText);
      
      return NextResponse.json({
        success: false,
        error: `FASHN.ai API error: ${response.status}`
      }, { status: response.status });
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      imageUrl: data.image_url || data.url,
      service: 'FASHN.ai'
    });

  } catch (error) {
    console.error('FASHN.ai image generation error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'FASHN.ai service failed'
    }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Hugging Face Inference Providers API - Modern API with free tier
const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      );
    }

    // If no HF API key, return error to trigger fallback
    if (!HF_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Hugging Face API key not configured'
      }, { status: 503 });
    }

    // Use modern Hugging Face Inference Providers API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout

    try {
      // Use the new Inference Providers API with FLUX.1-schnell (free model)
      const response = await fetch(
        'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
        {
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          signal: controller.signal,
          body: JSON.stringify({
            inputs: `fashion photography, ${prompt}, high quality, detailed, professional style`,
            parameters: {
              num_inference_steps: 4, // FLUX.1-schnell is optimized for 4 steps
              guidance_scale: 0.0, // FLUX.1-schnell doesn't use guidance
              width: 512,
              height: 768
            }
          }),
        }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        const imageBlob = await response.blob();

        // Convert blob to base64 data URL
        const arrayBuffer = await imageBlob.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        const dataUrl = `data:image/png;base64,${base64}`;

        return NextResponse.json({
          success: true,
          imageUrl: dataUrl,
          service: 'Hugging Face FLUX.1-schnell'
        });
      } else {
        const errorText = await response.text();

        // Check for specific error types
        if (response.status === 503) {
          return NextResponse.json({
            success: false,
            error: 'Model is loading, please try again in a few moments'
          }, { status: 503 });
        }

        if (response.status === 429) {
          return NextResponse.json({
            success: false,
            error: 'Rate limit exceeded, please try again later'
          }, { status: 429 });
        }

        if (response.status === 401) {
          return NextResponse.json({
            success: false,
            error: 'Invalid API key or insufficient permissions'
          }, { status: 401 });
        }

        return NextResponse.json({
          success: false,
          error: `Hugging Face API error: ${response.status} - ${errorText}`
        }, { status: response.status });
      }

    } catch (modelError) {
      clearTimeout(timeoutId);

      // Handle timeout errors
      if (modelError instanceof Error && modelError.name === 'AbortError') {
        return NextResponse.json({
          success: false,
          error: 'Request timeout - Hugging Face service is taking too long'
        }, { status: 408 });
      }

      throw modelError; // Re-throw to be caught by outer catch
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Hugging Face service failed'
    }, { status: 500 });
  }
}

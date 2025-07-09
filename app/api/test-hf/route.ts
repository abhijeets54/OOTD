import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;
  
  if (!HF_API_KEY) {
    return NextResponse.json({
      error: 'No Hugging Face API key configured',
      hasKey: false
    });
  }

  try {
    // Test with FLUX.1-schnell model (free image generation model)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: "test image",
          parameters: {
            num_inference_steps: 4,
            guidance_scale: 0.0,
            width: 256,
            height: 256
          }
        }),
      }
    );

    let responseData = 'Binary image data';
    if (!response.ok) {
      responseData = await response.text();
    }

    return NextResponse.json({
      hasKey: true,
      keyValid: response.ok,
      status: response.status,
      response: response.ok ? 'Image generation successful' : responseData.substring(0, 200),
      model: 'FLUX.1-schnell'
    });

  } catch (error) {
    return NextResponse.json({
      hasKey: true,
      keyValid: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

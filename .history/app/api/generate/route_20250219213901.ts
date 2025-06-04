import { NextResponse } from 'next/server';
import axios from 'axios';

// Tell Next.js this is a dynamic route that shouldn't be statically optimized
export const dynamic = 'force-dynamic';
// Set maximum duration for the API route
export const maxDuration = 300; // 5 minutes, adjust based on your needs

// Create an axios instance with custom config
const ollamaClient = axios.create({
  baseURL: 'http://localhost:11434',
  timeout: 180000, // 3 minutes timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function POST(request: Request) {
  try {
    // Get the request body
    const requestBody = await request.json();
    
    // Validate request body
    if (!requestBody.model || !requestBody.prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: model and prompt' },
        { status: 400 }
      );
    }

    // Normalize the request parameters
    const ollamaRequest = {
      model: requestBody.model,
      prompt: requestBody.prompt,
      stream: false, // Force stream to false for simpler handling
      format: requestBody.format || undefined,
      temperature: requestBody.temperature || 0.7,
      options: requestBody.options || undefined
    };

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() =>
        reject(new Error('TIMEOUT'));
      }, 170000); // Slightly less than axios timeout
    });

    // Make the request to Ollama
    const responsePromise = oll.post('/api/generate', ollamaRequest);
    
    // Race between the request and the timeout
    const response = await Promise.race([responsePromise, timeoutPromise]) as { data: any };

    // Validate the response format
    if (!response.data) {
      return NextResponse.json(
        { 
          error: 'Empty response from Ollama',
          details: 'The model returned an empty response'
        },
        { status: 422 }
      );
    }

    // If format is specified as json, validate JSON structure
    if (requestBody.format === 'json' && typeof response.data.response === 'string') {
      try {
        // Try to parse the response as JSON to validate it
        const cleaned = response.data.response.trim()
          .replace(/```json\s*/g, '')
          .replace(/```\s*/g, '')
          .trim();
        JSON.parse(cleaned);
        
        // Update the response with cleaned JSON string
        response.data.response = cleaned;
      } catch (parseError) {
        return NextResponse.json(
          {
            error: 'Invalid JSON in model response',
            details: 'The model returned a response that could not be parsed as JSON',
            raw: response.data.response
          },
          { status: 422 }
        );
      }
    }
    
    // Return the Ollama response
    return NextResponse.json(response.data);
    
  } catch (error: any) {
    console.error('Ollama API error:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // Handle different types of errors
    if (error.message === 'TIMEOUT') {
      return NextResponse.json(
        { error: 'Request timed out. The model is taking too long to respond.' },
        { status: 504 }
      );
    }

    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { 
          error: 'Cannot connect to Ollama service',
          details: 'Make sure Ollama is running on port 11434'
        },
        { status: 502 }
      );
    }
    
    if (error.response) {
      // Handle Ollama API errors
      return NextResponse.json(
        { 
          error: 'Ollama API error',
          status: error.response.status,
          details: error.response.data 
        },
        { status: error.response.status }
      );
    }

    if (axios.isAxiosError(error)) {
      // Handle other Axios errors
      return NextResponse.json(
        { 
          error: 'Network error',
          details: error.message
        },
        { status: 500 }
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
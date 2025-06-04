import { NextResponse } from 'next/server';
import axios from 'axios';

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

export async function POST(request: Request) {
  try {
    // Get the request body
    const body = await request.json();
    
    // Forward the request to Ollama
    const response = await axios.post(OLLAMA_API_URL, body);
    
    // Return the Ollama response
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error in API route:', error.message);
    
    // Return appropriate error response
    return NextResponse.json(
      { error: 'Failed to process request', details: error.message },
      { status: 500 }
    );
  }
}
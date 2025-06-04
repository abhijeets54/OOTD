// app/api/generate/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

export async function POST(request: Request) {
  try {
    // Get the request body
    const body = await request.json();
    
    console.log("Forwarding request to Ollama:", JSON.stringify(body));
    
    // Forward the request to Ollama
    const response = await axios.post(OLLAMA_API_URL, body);
    
    console.log("Received response from Ollama:", JSON.stringify(response.data).substring(0, 200) + "...");
    
    // Return the Ollama response
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error in API route:', error.message);
    console.error('Full error:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('Cannot connect to Ollama service. Is Ollama running on port 11434?');
      return NextResponse.json(
        { error: 'Cannot connect to Ollama service. Is it running?' },
        { status: 502 }
      );
    }
    
    // Return detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to process request', 
        details: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      },
      { status: 500 }
    );
  }
}
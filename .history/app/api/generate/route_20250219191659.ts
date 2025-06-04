// app/api/generate/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    // Get the request body
    const requestBody = await request.json();
    
    // Make sure we're sending exactly what Ollama expects
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: requestBody.model,
      prompt: requestBody.prompt,
      stream: requestBody.stream || false,
      format: requestBody.format || undefined,
      temperature: requestBody.temperature || 0.7,
      options: requestBody.options || undefined
    }, {
      // Set appropriate timeout for LLM generation
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Return the Ollama response directly
    return NextResponse.json(response.data);
    
  } catch (error: any) {
    console.error('Error communicating with Ollama:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Cannot connect to Ollama. Make sure it is running on port 11434.' },
        { status: 502 }
      );
    }
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return NextResponse.json(
        { 
          error: 'Ollama API error',
          status: error.response.status,
          data: error.response.data 
        },
        { status: error.response.status }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to process request', message: error.message },
      { status: 500 }
    );
  }
}
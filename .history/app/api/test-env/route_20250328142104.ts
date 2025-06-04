import { NextResponse } from 'next/server';

export async function GET() {
  // Check if the environment variable exists
  const hasToken = !!process.env.HF_API_TOKEN;
  
  // Get the first 5 characters of the token (if it exists) for verification
  // without exposing the full token
  const tokenPreview = hasToken ? process.env.HF_API_TOKEN?.substring(0, 5) : 'none';
  
  // Return the result
  return NextResponse.json({
    hasToken,
    tokenPreview,
    envVars: Object.keys(process.env).filter(key => !key.includes('SECRET') && !key.includes('KEY')),
  });
} 
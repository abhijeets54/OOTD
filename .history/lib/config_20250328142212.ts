// This config file provides a fallback method for environment variables
// Ideally, use .env.local, but this serves as a backup method

export const config = {
  // Add your Hugging Face API token here as a fallback if env variable doesn't work
  // Get your free token at: https://huggingface.co/settings/tokens
  // LAST RESORT OPTION: You can hardcode your token below if .env.local isn't working
  // huggingFaceApiToken: 'hf_your_token_here', // ← Uncomment and replace with your token
  huggingFaceApiToken: process.env.HF_API_TOKEN || '',
  
  // Other config values can be added here
  imageGenerationModel: 'runwayml/stable-diffusion-v1-5',
  useImageGeneration: true,
};

// Export a helper function to check if image generation is properly configured
export const isImageGenerationConfigured = () => {
  return !!config.huggingFaceApiToken && config.useImageGeneration;
}; 
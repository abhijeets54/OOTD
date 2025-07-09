import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper functions to process AI response data
function processStyleScore(styleScore: any): number | null {
  if (styleScore === null || styleScore === undefined || styleScore === "N/A") {
    return null;
  }

  if (typeof styleScore === 'number') {
    return Math.max(0, Math.min(10, styleScore));
  }

  if (typeof styleScore === 'string') {
    const parsed = parseFloat(styleScore);
    if (!isNaN(parsed)) {
      return Math.max(0, Math.min(10, parsed));
    }
  }

  return null;
}

function processConfidenceLevel(confidenceLevel: any): number {
  if (typeof confidenceLevel === 'number') {
    return Math.max(1, Math.min(10, confidenceLevel));
  }

  if (typeof confidenceLevel === 'string') {
    const parsed = parseFloat(confidenceLevel);
    if (!isNaN(parsed)) {
      return Math.max(1, Math.min(10, parsed));
    }
  }

  return 1; // Default confidence level
}

// Available Gemini models
export const AVAILABLE_MODELS = {
  "gemini-2.0-flash": "gemini-2.0-flash",
  "gemini-2.5-flash": "gemini-2.5-flash",
  "gemini-2.5-pro": "gemini-2.5-pro",
  // Fallback models
  "gemini-1.5-pro": "gemini-1.5-pro",
  "gemini-1.5-flash": "gemini-1.5-flash"
} as const;

export type GeminiModelName = keyof typeof AVAILABLE_MODELS;

// Initialize the Gemini model with LangChain
const initializeGeminiModel = (modelName: GeminiModelName = "gemini-2.5-pro") => {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY environment variable is not set");
  }

  return new ChatGoogleGenerativeAI({
    model: AVAILABLE_MODELS[modelName],
    temperature: 0.7,
    maxRetries: 2,
    apiKey: apiKey,
  });
};

export interface GeminiResponse {
  response: string;
}

export interface GeminiRequest {
  prompt: string;
  temperature?: number;
  format?: string;
  max_tokens?: number;
  model?: GeminiModelName;
}

export async function generateWithGemini(request: GeminiRequest): Promise<GeminiResponse> {
  try {
    // Use specified model or default to gemini-2.5-pro
    const modelName = request.model || "gemini-2.5-pro";
    const model = initializeGeminiModel(modelName);
    
    // Set temperature if provided
    if (request.temperature !== undefined) {
      model.temperature = request.temperature;
    }

    // Create messages for the chat model
    const messages = [
      new HumanMessage(request.prompt)
    ];

    // If format is JSON, add system instruction for JSON output
    if (request.format === "json") {
      messages.unshift(
        new SystemMessage(
          "You are a helpful assistant that responds only in valid JSON format. " +
          "Do not include any markdown formatting, code blocks, or explanatory text. " +
          "Return only the JSON object as requested."
        )
      );
    }

    // Generate response
    const response = await model.invoke(messages);
    
    let responseText = response.content as string;

    // Clean JSON response if format is specified as json
    if (request.format === "json") {
      responseText = responseText
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();
      
      // Validate JSON
      try {
        JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
    }

    return {
      response: responseText
    };

  } catch (error: any) {
    console.error("Gemini API error:", error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}

// Helper function to generate dynamic questions (equivalent to the original function)
export async function generateDynamicQuestions(
  gender: string,
  religion: string,
  occasion: string,
  timeOfDay: string,
  modelName: GeminiModelName = "gemini-2.5-flash"
): Promise<any> {
  const prompt = `
    You are a fashion consultant AI. Based on the following client profile, generate 3-5 personalized questions to better understand their style preferences and needs.

    Client Profile:
    - Gender: ${gender}
    - Religion: ${religion}
    - Occasion: ${occasion}
    - Time of Day: ${timeOfDay}

    Generate questions that will help create a personalized outfit recommendation. Each question should be relevant to the client's profile and help understand their specific preferences.

    Return your response as a JSON object with this exact structure:
    {
      "questions": [
        {
          "id": "unique_id",
          "type": "select|radio|slider|multiple",
          "question": "Question text",
          "options": ["option1", "option2"] // for select/radio/multiple types
          "min": 1, // for slider type
          "max": 10 // for slider type
        }
      ]
    }

    EXAMPLE VALID QUESTIONS:
    {
      "questions": [
        {
          "id": "stylePreference",
          "type": "select",
          "question": "What is your preferred fashion style?",
          "options": ["Casual", "Formal", "Bohemian", "Minimalist"]
        },
        {
          "id": "comfortPriority",
          "type": "slider",
          "question": "How important is comfort in your clothing choices?",
          "min": 1,
          "max": 10
        }
      ]
    }

    FOCUS AREAS:
    - Style preferences
    - Color choices
    - Fit preferences
    - Comfort priorities
    - Fashion priorities

    ANY DEVIATION FROM THIS SCHEMA WILL BE REJECTED.
  `;

  const response = await generateWithGemini({
    prompt,
    temperature: 0.7,
    format: "json",
    model: modelName,
  });

  try {
    const cleanedResponse = response.response
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    const parsedResponse = JSON.parse(cleanedResponse);
    
    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      throw new Error("Invalid response structure");
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error parsing dynamic questions response:", error);
    // Return fallback questions
    return {
      questions: [
        {
          id: "stylePreference",
          type: "select",
          question: "What is your preferred fashion style?",
          options: ["Casual", "Formal", "Traditional", "Modern", "Bohemian"]
        },
        {
          id: "colorPreference",
          type: "select",
          question: "What colors do you prefer?",
          options: ["Bright colors", "Neutral tones", "Dark colors", "Pastels", "Earth tones"]
        },
        {
          id: "comfortLevel",
          type: "slider",
          question: "How important is comfort in your clothing?",
          min: 1,
          max: 10
        }
      ]
    };
  }
}

// Helper function to generate outfit report (equivalent to the original function)
export async function generateOutfitReportWithGemini(
  formData: any,
  modelName: GeminiModelName = "gemini-2.5-pro"
): Promise<any> {
  try {
    // Create a more detailed context from the responses
    const preferences = formData.dynamicQuestions?.map((question: any) => ({
      question: question.question,
      answer: formData.dynamicResponses[question.id],
      type: question.type,
    }));

    const preferencesText = preferences
      ?.map((pref: any) => `${pref.question}: ${pref.answer}`)
      .join("\n") || "No specific preferences provided";

    const prompt = `
      You are an expert fashion stylist and outfit consultant. Based on the client's profile and preferences, create a comprehensive outfit recommendation.

      CLIENT PROFILE:
      - Gender: ${formData.gender}
      - Religion: ${formData.religion}
      - Occasion: ${formData.occasion}
      - Time of Day: ${formData.timeOfDay}

      CLIENT PREFERENCES:
      ${preferencesText}

      Create a detailed outfit recommendation that includes all the following categories. Return your response as a JSON object with this exact structure:

      {
        "upperWear": "Specific upper wear recommendation",
        "lowerWear": "Specific lower wear recommendation",
        "footwear": "Specific footwear recommendation",
        "headwear": "Specific headwear recommendation (hat, cap, scarf, etc.) or 'None' if not needed",
        "accessories": ["accessory1", "accessory2", "accessory3"],
        "colors": ["color1", "color2", "color3"],
        "stylingTips": ["tip1", "tip2", "tip3"],
        "cultural": ["2-3 cultural considerations relevant to a ${formData.gender} person's outfit"],
        "budget": {
          "premium": "High-end version in INR; STRING ONLY",
          "moderate": "Mid-range version in INR; STRING ONLY",
          "budget": "Affordable version in INR; STRING ONLY"
        }
      }

      Do not return the sample format - generate a unique recommendation based on the client's profile.
      Remember that the client is a ${formData.gender} individual, so all recommendations must be appropriate for this gender.
    `;

    const response = await generateWithGemini({
      prompt,
      temperature: 0.8,
      format: "json",
      model: modelName,
    });

    try {
      // Clean the response before parsing
      const cleanedResponse = response.response
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();

      const parsedResponse = JSON.parse(cleanedResponse);

      // Validate the response has required fields
      const requiredFields = [
        "upperWear",
        "lowerWear",
        "footwear",
        "headwear",
        "accessories",
        "colors",
        "stylingTips",
        "cultural",
        "budget",
      ];
      
      const hasAllFields = requiredFields.every(
        (field) =>
          parsedResponse.hasOwnProperty(field) &&
          parsedResponse[field] !== null &&
          parsedResponse[field] !== undefined &&
          parsedResponse[field] !== "",
      );

      if (!hasAllFields) {
        console.error("Response missing required fields");
        throw new Error("Incomplete response from AI");
      }

      return parsedResponse;
    } catch (parseError) {
      console.error("Error parsing outfit report response:", parseError);
      throw new Error("Failed to parse outfit recommendation");
    }
  } catch (error) {
    console.error("Error generating outfit report:", error);
    throw error;
  }
}

// Image analysis using Gemini Vision
export async function analyzeOutfitImage(
  imageUrl: string,
  context: {
    occasion?: string;
    timeOfDay?: string;
    gender?: string;
    preferences?: any;
  } = {},
  modelName: GeminiModelName = "gemini-2.5-flash"
): Promise<any> {
  try {
    // Initialize the Google Generative AI client directly for vision
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: AVAILABLE_MODELS[modelName] });

    const contextInfo = context.occasion || context.timeOfDay || context.gender
      ? `\nContext: ${context.occasion ? `Occasion: ${context.occasion}` : ''} ${context.timeOfDay ? `Time: ${context.timeOfDay}` : ''} ${context.gender ? `Gender: ${context.gender}` : ''}`
      : '';

    const prompt = `
      You are an expert fashion stylist and image analyst. Analyze this outfit image and provide detailed feedback and suggestions.
      ${contextInfo}

      Please analyze the outfit in the image and provide a comprehensive assessment in JSON format with this exact structure:

      {
        "outfit_description": "Detailed description of what the person is wearing",
        "style_analysis": {
          "overall_style": "Description of the overall style (e.g., casual, formal, bohemian)",
          "fit_assessment": "How well the clothes fit",
          "color_coordination": "Assessment of color choices and coordination",
          "appropriateness": "How appropriate the outfit is for the given context"
        },
        "strengths": ["List of what works well in this outfit"],
        "improvements": ["Specific suggestions for improvement"],
        "styling_tips": ["Practical styling tips"],
        "alternative_suggestions": {
          "upper_wear": "Alternative upper wear suggestion",
          "lower_wear": "Alternative lower wear suggestion",
          "accessories": ["Suggested accessories"],
          "footwear": "Footwear suggestion"
        },
        "occasion_suitability": {
          "current_rating": "Rating out of 10 for current context",
          "best_occasions": ["List of occasions this outfit would be perfect for"],
          "modifications_needed": ["What to change for different occasions"]
        },
        "color_palette": ["Main colors in the outfit"],
        "style_score": 8.5,
        "confidence_level": 9
      }

      Be specific, constructive, and helpful in your analysis. Focus on practical advice that can improve the outfit.

      IMPORTANT:
      - style_score must be a numeric value between 0 and 10 (e.g., 8.5, 7.2, 9.0)
      - confidence_level must be a numeric value between 1 and 10
      - Do not use strings like "N/A" for numeric fields
    `;

    // Fetch the image and convert to base64
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = response.headers.get('content-type') || 'image/jpeg';

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: mimeType
        }
      }
    ]);

    const responseText = result.response.text();

    // Clean and parse the JSON response
    const cleanedResponse = responseText
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    try {
      const rawAnalysis = JSON.parse(cleanedResponse);

      // Process the analysis to ensure proper data types
      const analysis = {
        ...rawAnalysis,
        style_score: processStyleScore(rawAnalysis.style_score),
        confidence_level: processConfidenceLevel(rawAnalysis.confidence_level)
      };

      return analysis;
    } catch (parseError) {
      console.error("Error parsing image analysis response:", parseError);
      // Return a fallback analysis
      return {
        outfit_description: "Unable to analyze outfit details",
        style_analysis: {
          overall_style: "Analysis unavailable",
          fit_assessment: "Unable to assess fit",
          color_coordination: "Unable to assess colors",
          appropriateness: "Unable to assess appropriateness"
        },
        strengths: ["Image uploaded successfully"],
        improvements: ["Please try uploading a clearer image"],
        styling_tips: ["Ensure good lighting for better analysis"],
        alternative_suggestions: {
          upper_wear: "Unable to suggest alternatives",
          lower_wear: "Unable to suggest alternatives",
          accessories: ["Unable to suggest accessories"],
          footwear: "Unable to suggest footwear"
        },
        occasion_suitability: {
          current_rating: "N/A",
          best_occasions: ["Unable to determine"],
          modifications_needed: ["Please upload a clearer image"]
        },
        color_palette: ["Unable to determine"],
        style_score: null,
        confidence_level: 1
      };
    }

  } catch (error) {
    console.error("Error analyzing outfit image:", error);
    throw new Error("Failed to analyze outfit image");
  }
}

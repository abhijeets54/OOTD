import axios from "axios";

const LLAMA_API_URL = "/api/generate";

interface LlamaResponse {
  response: string;
}

export interface DynamicQuestion {
  id: string;
  type: "select" | "radio" | "slider" | "multiple";
  question: string;
  options?: string[];
  min?: number;
  max?: number;
}

const sampleQuestions: DynamicQuestion[] = [
  {
    id: "weather",
    type: "select",
    question: "What's the current weather like?",
    options: ["Sunny", "Rainy", "Cold", "Hot", "Moderate"],
  },
  {
    id: "style",
    type: "radio",
    question: "What's your preferred style?",
    options: ["Classic", "Modern", "Bohemian", "Minimalist", "Trendy"],
  },
  {
    id: "comfort",
    type: "slider",
    question: "How important is comfort to you? (1-5)",
    min: 1,
    max: 5,
  },
  {
    id: "colors",
    type: "multiple",
    question: "Select your preferred colors",
    options: ["Warm", "Cool", "Neutral", "Bright", "Pastel"],
  },
  {
    id: "budget",
    type: "select",
    question: "What's your budget range?",
    options: ["Budget", "Moderate", "Premium", "Luxury"],
  },
];

// Update in llama.ts
export async function generateDynamicQuestions(
  previousAnswers: Record<string, any>,
): Promise<DynamicQuestion[]> {
  try {
    const prompt = `
      You are a fashion advisor API that generates questions about style preferences.
      Previous answers: ${JSON.stringify(previousAnswers)}

      STRICT REQUIREMENTS:
      1. Return EXACTLY 5 fashion-related questions
      2. Response must be a JSON object with a "questions" array
      3. Each question MUST follow the exact schema below
      4. NO additional text or explanations - ONLY the JSON object
      5. Questions must be relevant to fashion, style, and clothing preferences
      6. Each ID must be unique and descriptive (e.g., "stylePreference", "colorChoice")
      7. Options must have 3-5 choices for select/radio/multiple types
      8. Slider min/max values must be between 1-10

      REQUIRED JSON SCHEMA:
      {
        "questions": [
          {
            "id": "string (required, unique)",
            "type": "select" | "radio" | "multiple" | "slider",
            "question": "string (required, must end with ?)",
            "options": ["string"] (required for select/radio/multiple, 3-5 options),
            "min": number (required for slider only),
            "max": number (required for slider only)
          }
        ]
      }

      VALIDATION RULES:
      1. For type "select", "radio", or "multiple":
         - Must include "options" array
         - No "min" or "max" allowed
         - Options must be relevant to fashion

      2. For type "slider":
         - Must include "min" and "max" numbers
         - No "options" array allowed
         - Values must be 1-10 range

      3. All questions must:
         - Be fashion-related
         - End with a question mark
         - Be clearly worded
         - Have unique IDs

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

    const response = await axios.post("/api/generate", {
      model: "llama3",
      prompt,
      stream: false,
      temperature: 0.7,
      format: "json",
    });

    let cleanedResponse = response.data.response
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    try {
      const parsedResponse = JSON.parse(cleanedResponse);

      // Strict validation
      if (
        !parsedResponse.questions ||
        !Array.isArray(parsedResponse.questions)
      ) {
        console.error("Invalid response structure");
        return sampleQuestions;
      }

      // Validate each question
      const validQuestions = parsedResponse.questions.filter((q: any) => {
        // Basic structure validation
        if (!q.id || !q.type || !q.question) return false;

        // Question format validation
        if (!q.question.trim().endsWith("?")) return false;

        // Type validation
        if (!["select", "radio", "multiple", "slider"].includes(q.type))
          return false;

        // Slider validation
        if (q.type === "slider") {
          if (
            typeof q.min !== "number" ||
            typeof q.max !== "number" ||
            q.min < 1 ||
            q.max > 10 ||
            q.min >= q.max ||
            q.options // Slider shouldn't have options
          ) {
            return false;
          }
        }

        // Options validation for non-slider types
        if (q.type !== "slider") {
          if (
            !Array.isArray(q.options) ||
            q.options.length < 3 ||
            q.options.length > 5 ||
            q.min !== undefined || // Non-slider shouldn't have min/max
            q.max !== undefined
          ) {
            return false;
          }
        }

        return true;
      });

      if (validQuestions.length === 5) {
        return validQuestions;
      }

      console.warn("Invalid number of questions or validation failed");
      return sampleQuestions;
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      return sampleQuestions;
    }
  } catch (error) {
    console.error("Error generating questions:", error);
    return sampleQuestions;
  }
}

const sampleReport = {
  upperWear: "A crisp white cotton kurta with intricate embroidery",
  lowerWear: "Traditional silk dhoti pants in beige",
  footwear: "Classic brown leather mojaris",
  headwear: "Optional: A traditional turban in matching beige",
  accessories: [
    "Gold-plated chain necklace",
    "Traditional bracelet",
    "Simple ring",
  ],
  colors: ["White", "Beige", "Gold"],
  stylingTips: [
    "Keep the kurta well-ironed for a sharp look",
    "Fold the dhoti properly for ease of movement",
    "Match accessories with the occasion's formality",
  ],
  cultural: [
    "Appropriate for traditional ceremonies",
    "Respects religious customs",
    "Suitable for formal gatherings",
  ],
  budget: {
    premium: "Designer boutique options",
    moderate: "Local market alternatives",
    budget: "Ready-made selections",
  },
};
export interface FormData {
  gender: string;
  religion: string;
  occasion: string;
  timeOfDay: string;
  dynamicResponses: Record<string, any>;
  dynamicQuestions?: DynamicQuestion[]; // Add this to store the questions
}
export async function generateOutfitReport(formData: FormData) {
  try {
    // Create a more detailed context from the responses
    const preferences = formData.dynamicQuestions?.map((question) => ({
      question: question.question,
      answer: formData.dynamicResponses[question.id],
      type: question.type,
    }));

    const prompt = `
      You are a highly knowledgeable fashion advisor specializing in cultural and religious clothing.

      CLIENT PROFILE:
      - Gender: ${formData.gender}
      - Religion: ${formData.religion}
      - Occasion: ${formData.occasion}
      - Time of Day: ${formData.timeOfDay}

      CLIENT PREFERENCES:
      ${preferences?.map((p) => `- ${p.question}: ${p.answer}`).join("\n")}

      TASK:
      Create a detailed outfit recommendation that specifically:
      1. Matches the religious and cultural context (${formData.religion})
      2. Is appropriate for the occasion (${formData.occasion})
      3. Considers the time of day (${formData.timeOfDay})
      4. Incorporates the client's style preferences
      5. Provides specific, actionable recommendations
      6. CRITICAL: Design an outfit specifically for a ${formData.gender} person - all recommendations MUST be gender-appropriate

      IMPORTANT:
      - Be specific about fabrics, colors, and styles
      - Include exact items rather than general suggestions
      - Consider weather and practicality
      - Respect religious modesty requirements if applicable
      - Suggest both premium and budget-friendly options
      - The outfit MUST be designed specifically for a ${formData.gender} individual

      The response must be a valid JSON object with these exact keys:
      {
        "upperWear": "Detailed description of top/upper body wear appropriate for a ${formData.gender} person",
        "lowerWear": "Detailed description of bottom/lower body wear appropriate for a ${formData.gender} person",
        "footwear": "Specific footwear recommendation appropriate for a ${formData.gender} person",
        "headwear": "Head covering if culturally appropriate for a ${formData.gender} person",
        "accessories": ["List of 3-5 specific accessories appropriate for a ${formData.gender} person"],
        "colors": ["Primary colors used in the outfit"],
        "stylingTips": ["3-5 specific styling suggestions for a ${formData.gender} person"],
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

    const response = await axios.post<LlamaResponse>(LLAMA_API_URL, {
      model: "llama3",
      prompt,
      stream: false,
      temperature: 0.8, // Increased for more variety
      max_tokens: 1000, // Ensure enough tokens for detailed response
      format: "json",
    });

    // Define an interface for the expected response structure
    interface OutfitReportResponse {
      upperWear: string;
      lowerWear: string;
      footwear: string;
      headwear?: string;
      accessories: string[];
      colors: string[];
      stylingTips: string[];
      cultural: string[];
      budget: {
        premium: string;
        moderate: string;
        budget: string;
      };
    }

    let parsedResponse: OutfitReportResponse;
    try {
      // Clean the response before parsing
      const cleanedResponse = response.data.response
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();

      parsedResponse = JSON.parse(cleanedResponse) as OutfitReportResponse;

      // Validate the response has required fields
      const requiredFields = [
        "upperWear",
        "lowerWear",
        "footwear",
        "accessories",
        "colors",
        "stylingTips",
        "cultural",
        "budget",
      ];
      const hasAllFields = requiredFields.every(
        (field) =>
          parsedResponse.hasOwnProperty(field) &&
          parsedResponse[field as keyof OutfitReportResponse] !== null &&
          parsedResponse[field as keyof OutfitReportResponse] !== undefined &&
          parsedResponse[field as keyof OutfitReportResponse] !== "",
      );

      if (!hasAllFields) {
        console.error("Response missing required fields");
        return sampleReport;
      }

      return parsedResponse;
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      console.error("Raw response:", response.data.response);
      return sampleReport;
    }
  } catch (error) {
    console.error("Error generating outfit report:", error);
    return sampleReport;
  }
}

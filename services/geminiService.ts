
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const BASE_SYSTEM_INSTRUCTION = `
You are an AI assistant for Indian citizens named "GovScheme Simplifier".

Your role is to explain Indian government schemes in very simple language so that rural users, students, and first-time applicants can easily understand.

Rules:
- Use short sentences.
- Avoid legal or technical terms.
- Explain in a friendly, supportive tone.
- Format the output using Markdown for better readability.

For every response, strictly follow this structure with these exact headers:
1. **Scheme Name**
2. **Who can apply (Eligibility)**
3. **Benefits**
4. **How to apply (step-by-step)**
5. **Documents required**

If the user describes their situation instead of naming a scheme, suggest the most relevant government scheme and then provide the details above.
`;

export const fetchSchemeDetails = async (userQuery: string, language: Language): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing. Please check your environment configuration.");
    }

    // Initialize GoogleGenAI with the API key from environment
    const ai = new GoogleGenAI({ apiKey });
    
    // Append language instruction dynamically
    const languageInstruction = `
    IMPORTANT LANGUAGE REQUIREMENT:
    The user wants the response in: ${language}.
    Ensure the entire response is in ${language}.
    `;

    const finalSystemInstruction = BASE_SYSTEM_INSTRUCTION + languageInstruction;

    // Use gemini-3-flash-preview for basic text tasks as per developer guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: finalSystemInstruction,
        temperature: 0.5,
      },
    });

    // Access the text property directly from GenerateContentResponse
    if (response.text) {
      return response.text;
    } else {
      throw new Error("No response received from the AI.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

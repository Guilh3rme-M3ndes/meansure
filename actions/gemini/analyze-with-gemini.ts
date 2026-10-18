import { GoogleGenAI } from "@google/genai";
/**
 * Analyzes the prompt and sends it to the Gemini client.
 * Changes the output based on the current mode.
 * @param providerKey - Gemini API key set on the settings sidebar.
 * @param fullPrompt - The prompt built on the handler function.
 * @returns Raw text containing the original text and the extracted and suggested sentences.
 * Needs to be parsed on the handler function
 */
export const analyzeWithGemini = async (
  providerKey: string,
  fullPrompt: string,
) => {
  const client = new GoogleGenAI({ apiKey: providerKey });
  const response = await client.models.generateContent({
    model: "gemini-3.8-flash",
    contents: fullPrompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return response.text;
};

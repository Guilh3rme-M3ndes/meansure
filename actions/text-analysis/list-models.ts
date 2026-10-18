import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

/**
 * Utility function to see which models are available for the API key. Might be used in the future but not now.
 * @param apiKey - The API key being used.
 * @param provider - The selected provider.
 */
export async function checkAvailableModels(apiKey: string, provider: string) {
  if (provider === "gemini") {
    const client = new GoogleGenAI({ apiKey });

    try {
      const models = await client.models.list();
      console.log("=== available models ===");
      for await (const model of models) {
        console.log(`Name: ${model.name}`);
      }
      console.log("===========================");
    } catch (error) {
      console.error("Error listing models:", error);
    }
  }
  if (provider === "openai") {
    const client = new OpenAI({ apiKey: apiKey });
    try {
      const models = await client.models.list();
      console.log("=== available models ===");
      for await (const model of models) {
        console.log(`Name: ${model.id}`);
      }
      console.log("===========================");
    } catch (error) {
      console.error("Error listing models:", error);
    }
  }
}

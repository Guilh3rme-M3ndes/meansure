import { GoogleGenAI } from "@google/genai";

export async function checkAvailableModels(apiKey: string) {
  const client = new GoogleGenAI({ apiKey });

  try {
    const models = await client.models.list();
    console.log("=== available models ===");
    for await (const model of models) {
      console.log(`Nome: ${model.name}`);
    }
    console.log("===========================");
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

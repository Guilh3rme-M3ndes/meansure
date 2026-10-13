"use server";

import { AnalysisResult, ResponseSchema } from "@/types/model-response";
import { createUserPrompt } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

export async function analyzeInput(formData: FormData) {
  const text = formData.get("userText")?.toString();
  const isRudeMode = formData.get("isRudeMode") === "true";
  const providerKey = formData.get("apiKey")?.toString();

  if (!providerKey) {
    throw new Error("API Key is missing!");
  }

  //await checkAvailableModels(providerKey);

  const client = new GoogleGenAI({ apiKey: providerKey });

  const fullPrompt = createUserPrompt(text as string, isRudeMode);
  console.log(`Sending analysis. Rude?: ${isRudeMode}`);

  try {
    const response = await client.models.generateContent({
      model: "gemini-3.8-flash",
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const rawAiText = response.text;
    const jsonParsed = JSON.parse(rawAiText as string);
    const validatedData: AnalysisResult = ResponseSchema.parse(jsonParsed);

    console.log("STARTResponse");
    console.log(validatedData);
    console.log("ENDResponse");

    return validatedData;
  } catch (error) {
    console.error("Request or zod error:");
    console.error(error);
    throw error;
  }
}

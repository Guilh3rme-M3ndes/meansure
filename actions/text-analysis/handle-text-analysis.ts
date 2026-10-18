"use server";
import { AnalysisResult, ResponseSchema } from "@/types/model-response";
import { createUserPrompt } from "@/utils/prompts";
import { ZodError } from "zod";
import { analyzeWithGemini } from "../gemini/analyze-with-gemini";
import { analyzeWithOpenai } from "../openai/analyze-with-openai";
import { PROVIDERS } from "@/constants/providers";
/**
 * Tone checking final result - either an AI response or an error message
 */
type AnalysisResultResponse =
  | AnalysisResult
  | {
      /**
       * User friendly error message.
       */
      error: string;
    };

/**
 * Extracts the user's input, the current mode and the providers information from the
 * formData, builds the prompt and passes it to the corresponding analyzer.
 * @param formData contains the user's input, selected mode, provider and API Key.
 * @returns A promise that resolves to either the validated AnalysisResult or an error object.
 */
export async function analyzeInput(
  formData: FormData,
): Promise<AnalysisResultResponse> {
  const text = formData.get("userText")?.toString();
  const isRudeMode = formData.get("isRudeMode") === "true";
  const provider = formData.get("provider")?.toString();
  const providerKey = formData.get("apiKey")?.toString();

  if (!providerKey) {
    return {
      error:
        "No API Key set. Please set the key and provider on the settings sidebar",
    };
  }

  if (!PROVIDERS.some((p) => p.value === provider)) {
    return {
      error:
        "The selected provider is invalid. Please opt for one of the available ones",
    };
  }
  const fullPrompt = createUserPrompt(text as string, isRudeMode);
  console.log(`Sending analysis. Rude?: ${isRudeMode}`);
  try {
    let jsonParsed;
    if (provider === "gemini") {
      const rawAiText = await analyzeWithGemini(providerKey, fullPrompt);
      jsonParsed = JSON.parse(rawAiText as string);
    } else {
      jsonParsed = await analyzeWithOpenai(providerKey, fullPrompt);
    }
    const validatedData: AnalysisResult = ResponseSchema.parse(jsonParsed);
    console.log(`START${provider}Response`);
    console.log(validatedData);
    console.log(`END${provider}Response`);
    return validatedData;
  } catch (error) {
    console.error("API error:", error);
    if (error instanceof ZodError || error instanceof SyntaxError) {
      return {
        error:
          "The AI returned an invalid format. Please try analyzing the text again.",
      };
    }
    let status: number | undefined;
    let message = "An unknown error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    if (typeof error === "object" && error !== null && "status" in error) {
      status = Number(error.status);
    }
    const isRateLimit = status === 429 || message.includes("429");
    const isUnavailable =
      status === 500 ||
      message.includes("500") ||
      status === 503 ||
      message.includes("503");
    if (isRateLimit) {
      return {
        error: "You've reached the consumption limit for the current key.",
      };
    } else if (isUnavailable) {
      return {
        error:
          "The selected model is currently unavailable. Please wait a few minutes before trying again.",
      };
    }
    return {
      error: "Failed to analyze text. Please check your API key and try again.",
    };
  }
}

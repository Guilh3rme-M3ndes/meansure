import { ResponseSchema } from "@/types/model-response";
import { zodTextFormat } from "openai/helpers/zod";
import OpenAI from "openai";

/**
 * Analyzes the prompt and sends it to the OpenAI client.
 * Changes the output based on the current mode.
 * @param providerKey - OpenAI api key set on the settings sidebar.
 * @param fullPrompt - The prompt built on the handler function.
 * @returns An object containing the original text and the extracted and suggested sentences.
 */
export const analyzeWithOpenai = async (
  providerKey: string,
  fullPrompt: string,
) => {
  const client = new OpenAI({ apiKey: providerKey });
  const response = await client.responses.parse({
    model: "gpt-6-sol",
    input: fullPrompt,
    text: {
      format: zodTextFormat(ResponseSchema, "response"),
    },
  });
  return response.output_parsed;
};

import { z } from "zod";

export const ResponseSchema = z.object({
  originalText: z.string(),
  sentences: z.array(
    z.object({
      index: z.number(),
      originalSentence: z.string(),
      suggestedSentence: z.string().nullable(),
      isModified: z.boolean(),
    }),
  ),
});

export type Sentence = {
  index: number;
  originalSentence: string;
  suggestedSentence: string | null;
  isModified: boolean;
};

export type AnalysisResult = {
  originalText: string;
  sentences: Sentence[];
};

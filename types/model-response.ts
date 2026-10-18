import { z } from "zod";
/**
 * The schema in which the AI Response must be based on.
 */
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

/**
 * A part of the analysis result
 */
export type Sentence = {
  /** The sentence position */
  index: number;
  /** The extracted sentence from the user's text */
  originalSentence: string;
  /** The sentence that might have been suggested. */
  suggestedSentence: string | null;
  /** A flag that tells if the AI has changed anything */
  isModified: boolean;
};

/** The expected result of the AI analysis */
export type AnalysisResult = {
  /** The initial input from the user */
  originalText: string;
  /** An array containing the original and suggested sentences */
  sentences: Sentence[];
};

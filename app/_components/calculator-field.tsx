// app/_components/calculator-field.tsx
"use client";

import { Textarea } from "@/components/ui/textarea";
import { useModeStore } from "../store/useModeStore";
import { useSettingsStore } from "../store/useSettingsStore";
import { AnalysisResult } from "@/types/model-response";
import SentenceBlock from "./sentence-block";
import { cn } from "@/lib/utils";

interface CalculatorFieldProps {
  aiResponse: AnalysisResult | null;
}

export function CalculatorField({ aiResponse = null }: CalculatorFieldProps) {
  const { isRudeMode } = useModeStore();
  const { apiKey, provider } = useSettingsStore();

  return (
    <>
      <input type="hidden" name="isRudeMode" value={isRudeMode.toString()} />
      <input type="hidden" name="apiKey" value={apiKey} />
      <input type="hidden" name="provider" value={provider} />
      <div className="flex flex-col gap-1.5 mb-4">
        <h2 className="text-xl font-bold">
          {aiResponse
            ? "Results and suggestions"
            : isRudeMode
              ? "Spill the beans 😈"
              : "Type your message 😇"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {aiResponse
            ? "Click the blocks to toggle between the original and suggested sentences."
            : isRudeMode
              ? "Enter the text you want to get rude."
              : "Enter the text you want to analyze or transform politely."}
        </p>
      </div>
      {aiResponse ? (
        <div
          className={cn(
            "min-h-[250px] w-full p-4 text-base leading-loose bg-card rounded-md border shadow-sm transition-colors duration-500",
            "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-justify",
          )}
        >
          {aiResponse.sentences.map((s) => (
            <SentenceBlock key={s.index} sentence={s} isRudeMode={isRudeMode} />
          ))}
        </div>
      ) : (
        <>
          <Textarea
            name="userText"
            required
            placeholder={
              isRudeMode
                ? "Could you please turn down your volume? ..."
                : "I think your idea is terrible..."
            }
            className="resize-none h-[250px] w-full p-4 text-base bg-card shadow-sm transition-colors duration-500"
          />
        </>
      )}
    </>
  );
}

// app/_components/analyzer-form.tsx
"use client";
import { useState, useTransition } from "react";
import { analyzeInput } from "@/actions/text-analysis/handle-text-analysis";
import { CalculatorField } from "./calculator-field";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2, Repeat } from "lucide-react";
import { AnalysisResult } from "@/types/model-response";

export function AnalyzerForm() {
  const [aiResponse, setAiResponse] = useState<AnalysisResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await analyzeInput(formData);
        setAiResponse(result);
      } catch (error) {
        console.error("Erro na análise:", error);
      }
    });
  };

  return (
    <form action={handleSubmit} className="w-full max-w-2xl flex flex-col">
      <CalculatorField aiResponse={aiResponse} />
      <div className="flex justify-end mt-2">
        {aiResponse ? (
          <Button type="button" onClick={() => setAiResponse(null)}>
            <Repeat className="w-4 h-4 mr-2" />
            Try another text
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4 mr-2" />
            )}
            {isPending ? "Analyzing..." : "Analyze Tone"}
          </Button>
        )}
      </div>
    </form>
  );
}

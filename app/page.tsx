import { handleAnalyze } from "@/actions/text-analysis/handle-text-analysis";
import { CalculatorField } from "./_components/calculator-field";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center p-4 sm:p-8 transition-colors duration-500">
      <form action={handleAnalyze} className="w-full max-w-2xl flex flex-col">
        <CalculatorField />
        <div className="flex justify-end mt-2">
          <Button type="submit" className="w-full sm:w-auto">
            <Wand2 className="w-4 h-4 mr-2" />
            Analyze Tone
          </Button>
        </div>
      </form>
    </div>
  );
}

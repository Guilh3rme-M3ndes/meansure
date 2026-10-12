"use client";

import { Textarea } from "@/components/ui/textarea";
import { useModeStore } from "../store/useModeStore";
import { useSettingsStore } from "../store/useSettingsStore";

export function CalculatorField() {
  const { isRudeMode } = useModeStore();
  const { apiKey, provider } = useSettingsStore();
  return (
    <>
      <input type="hidden" name="isRudeMode" value={isRudeMode.toString()} />
      <input type="hidden" name="apiKey" value={apiKey.toString()} />
      <input type="hidden" name="provider" value={provider.toString()} />
      <div className="flex flex-col gap-1.5 mb-4">
        <h2 className="text-xl font-bold">
          {isRudeMode ? "Spill the beans 😈" : "Type your message 😇"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isRudeMode
            ? "Enter the text you want to get rude."
            : "Enter the text you want to analyze or transform politely."}
        </p>
      </div>
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
  );
}

import { AnalysisResult } from "@/types/model-response";
import { create } from "zustand";
interface ResponseState {
  AiResponse: AnalysisResult;
  setAiResponse: (result: AnalysisResult) => void;
}
export const useResponseStore = create<ResponseState>((set) => ({
  AiResponse: { originalText: "", sentences: [] },
  setAiResponse: (result) => set({ AiResponse: result }),
}));

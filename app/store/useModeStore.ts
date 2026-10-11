import { create } from "zustand";
interface ModeState {
  isRudeMode: boolean;
  toggleMode: () => void;
}
export const useModeStore = create<ModeState>((set) => ({
  isRudeMode: false,
  toggleMode: () => set((state) => ({ isRudeMode: !state.isRudeMode })),
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";
interface SettingsState {
  apiKey: string;
  provider: string;
  setProvider: (provider: string) => void;
  setApiKey: (apiKey: string) => void;
}
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      apiKey: "",
      provider: "",
      setProvider: (provider) => set({ provider: provider }),
      setApiKey: (key) => set({ apiKey: key }),
    }),
    { name: "byok-settings" },
  ),
);

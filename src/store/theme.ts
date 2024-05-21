import { create } from "zustand";
// .
import { IRecord } from ".";
// utils
import { theme } from "@/utils/data";

interface IThemeStore {
  isDark: boolean;
  toggleIsDark: () => void;
  state: IRecord;
  setState: (newState: IRecord) => void;
}

export const useThemeStore = create<IThemeStore>((set) => ({
  isDark: true,
  toggleIsDark: () => set((_state) => ({ isDark: !_state.isDark })),
  state: theme.dark,
  setState: (newState: IRecord) =>
    set({
      state: newState,
    }),
}));

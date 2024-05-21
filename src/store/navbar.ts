import { create } from "zustand";
// utils
import { screens } from "@/utils/data";
import { IMenuItem } from "@/utils/navbar";

interface IMenuStore {
  state: IMenuItem[];
  setState: (updatedState: IMenuItem[]) => void;
}

export const useMenuStore = create<IMenuStore>((set) => ({
  state: screens.navbar.menu,
  setState: (updatedState: IMenuItem[]) =>
    set({
      state: updatedState,
    }),
}));

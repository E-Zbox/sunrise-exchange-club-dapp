import { create } from "zustand";
// utils
import { screens } from "@/utils/data";

export interface IRecord {
  [name: string]: string;
}

interface ICryptoFactStore {
  factsArray: IRecord[];
  setFactsArray: (newFactsArray: IRecord[]) => void;
  indexCounter: number;
  setIndexCounter: () => void;
}

export const useCryptoFactStore = create<ICryptoFactStore>((set) => ({
  factsArray: screens.home.cryptoFacts,
  setFactsArray: (newFactsArray: IRecord[]) =>
    set({ factsArray: newFactsArray }),
  indexCounter: 0,
  setIndexCounter: () =>
    set((_state) => ({
      indexCounter:
        _state.indexCounter == _state.factsArray.length - 1
          ? 0
          : _state.indexCounter + 1,
    })),
}));

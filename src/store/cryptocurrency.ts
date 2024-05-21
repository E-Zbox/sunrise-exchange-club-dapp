import { create } from "zustand";
// api/interface
import { IAssetPairRecentPrices, IUSDAssetPair } from "@/api/interface";

interface IAssetPairToRecentPrices {
  [name: string]: IAssetPairRecentPrices[];
}

interface IKeyToUSDAssetPair {
  [name: string]: IUSDAssetPair[];
}

interface ICryptocurrencyStore {
  assetPairRecentPriceState: IAssetPairToRecentPrices;
  setAssetPairRecentPriceState: (newState: IAssetPairToRecentPrices) => void;

  pageCounterState: number;
  decreasePageCounterState: () => void;
  increasePageCounterState: () => void;

  usdAssetPairState: IKeyToUSDAssetPair;
  setUSDAssetPairState: (newState: IKeyToUSDAssetPair) => void;
}

export const useCryptocurrencyStore = create<ICryptocurrencyStore>((set) => ({
  assetPairRecentPriceState: {},
  setAssetPairRecentPriceState: (newState: IAssetPairToRecentPrices) =>
    set((prevState) => ({
      assetPairRecentPriceState: {
        ...prevState.assetPairRecentPriceState,
        ...newState,
      },
    })),

  pageCounterState: 1,
  decreasePageCounterState: () =>
    set((prevState) => ({
      pageCounterState:
        prevState.pageCounterState > 1 ? prevState.pageCounterState - 1 : 1,
    })),
  increasePageCounterState: () =>
    set((prevState) => ({
      pageCounterState:
        prevState.pageCounterState < 3 ? prevState.pageCounterState + 1 : 3,
    })),

  usdAssetPairState: {},
  setUSDAssetPairState: (newState: IKeyToUSDAssetPair) =>
    set((prevState) => ({
      usdAssetPairState: { ...prevState.usdAssetPairState, ...newState },
    })),
}));

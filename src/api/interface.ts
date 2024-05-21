interface IGenericResponse<T> {
  data: T;
  error: string;
  success: boolean;
}

export interface IGlobalCryptoMetrics {
  active_cryptocurrencies: {
    text: string;
    isPercent: boolean;
  };
  total_cryptocurrencies: {
    text: string;
    isPercent: boolean;
  };
  defi_volume_24h: {
    text: string;
    isPercent: boolean;
  };
  defi_market_cap: {
    text: string;
    isPercent: boolean;
  };
  defi_24h_percentage_change: {
    text: string;
    isPercent: boolean;
  };
  stablecoin_market_cap: {
    text: string;
    isPercent: boolean;
  };
  derivatives_24h_percentage_change: {
    text: string;
    isPercent: boolean;
  };
  total_market_cap: {
    text: string;
    isPercent: boolean;
  };
  total_market_cap_yesterday_percentage_change: {
    text: string;
    isPercent: boolean;
  };
  total_volume_24h_yesterday_percentage_change: {
    text: string;
    isPercent: boolean;
  };
  altcoin_market_cap: {
    text: string;
    isPercent: boolean;
  };
  altcoin_volume_24h: {
    text: string;
    isPercent: boolean;
  };
}

export interface IGlobalCryptoMetricsResponse
  extends IGenericResponse<IGlobalCryptoMetrics | null> {}

export interface IUSDAssetPair {
  id: string;
  currentPrice: string;
  asset: {
    id: string;
    decimals: string;
    name: string;
    symbol: string;
  };
}

export interface IUSDAssetPairResponse
  extends IGenericResponse<IUSDAssetPair[]> {}

export interface IAssetPairRecentPrices {
  blockTimestamp: number;
  decimals: number;
  name: string;
  price: number;
}

export interface IAssetPairRecentPricesResponse
  extends IGenericResponse<IAssetPairRecentPrices[]> {}

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// interface
import {
  IAssetPairRecentPricesResponse,
  IGlobalCryptoMetricsResponse,
  IUSDAssetPairResponse,
} from "./interface";

// "https://chainlink-crypto-exchange-service.onrender.com";
const coinmarketcapService =
  "https://chainlink-crypto-exchange-service.onrender.com";

const SUBGRAPH_QUERY_API_KEY = process.env.NEXT_PUBLIC_SUBGRAPH_QUERY_API_KEY;

const chainlinkPricesGraphExplorerURL = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_QUERY_API_KEY}/subgraphs/id/4RTrnxLZ4H8EBdpAQTcVc7LQY9kk85WNLyVzg5iXFQCH`;

const chainlinkPriceFeedsGraphExplorerURL = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_QUERY_API_KEY}/subgraphs/id/GrgTonBiM1NgFVmNgVYjTiCB5j8JxcAyjhMYrWcdFjWA`;

const chainlinkPricesClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: chainlinkPricesGraphExplorerURL,
});

const chainlinkPriceFeedsClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: chainlinkPriceFeedsGraphExplorerURL,
});

export const getGlobalCryptoMetrics =
  async (): Promise<IGlobalCryptoMetricsResponse> => {
    let response: IGlobalCryptoMetricsResponse = {
      data: null,
      error: "",
      success: false,
    };

    try {
      const result = await fetch(
        `${coinmarketcapService}/global-metrics/quotes/latest`
      );

      const { data, error, success } = await result.json();

      if (!success) {
        throw error;
      }

      response = {
        data,
        error: "",
        success: true,
      };
    } catch (error) {
      response = {
        ...response,
        error: `${error}`,
      };
    } finally {
      return response;
    }
  };

export const getUSDAssetPairs = async (
  first: number,
  skip?: number
): Promise<IUSDAssetPairResponse> => {
  if (!skip) {
    skip = 0;
  }

  let response: IUSDAssetPairResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const { data } = await chainlinkPricesClient.query({
      query: gql`
        query AssetPairs {
          assetPairs(
            where: {
              and: [
                { asset_: { name_not: "" } }
                { asset_not: null }
                { comparedAsset_: { symbol: "USD" } }
              ]
            }
            skip: ${skip}
            first: ${first}
            orderBy: asset__symbol
            orderDirection: asc
          ) {
            id
            asset {
              symbol
              decimals
              name
            }
            currentPrice
          }
        }
      `,
    });

    response = {
      data: data.assetPairs,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getAssetPairRecentPrices = async (
  assetPair: string
): Promise<IAssetPairRecentPricesResponse> => {
  let response: IAssetPairRecentPricesResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const { data: _data } = await chainlinkPriceFeedsClient.query({
      query: gql`
        query DataFeeds {
          dataPoints(
            where: { 
              feed_: { 
                name_starts_with: \"${assetPair}\"
                name_ends_with: "USD"
              } 
            },
            orderBy: blockTimestamp
            orderDirection: desc
          ) {
            price
            blockTimestamp
            feed {
              name
              asset
              assetAddress
              decimals
            }
          }
        }
        `,
    });

    const data = _data.dataPoints.map(
      ({
        blockTimestamp,
        feed: { decimals, name },
        price,
      }: {
        blockTimestamp: string;
        feed: { decimals: string; name: string };
        price: string;
      }) => ({
        blockTimestamp: Number(blockTimestamp),
        decimals: Number(decimals),
        name,
        price: Number(price) / 10 ** Number(decimals),
      })
    );

    response = {
      data,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
// api
import { getAssetPairRecentPrices } from "@/api";
// store
import { useCryptocurrencyStore } from "@/store/cryptocurrency";
// styles
import {
  CoinImage,
  CoinSymbol,
  HeaderRowText,
  Row,
  RowBox,
  RowText,
} from "../styles/CryptocurrencyPage/ScreenOne.styles";
import { expressInThousands } from "@/utils/transformer";

const LOCAL_STORAGE_CRYPTOCURRENCY_ASSET_PAIR_RECENT_PRICES =
  "cryptocurrencyAssetPairRecentPrices";

const AssetPairRow = ({
  id,
  rank,
  name,
  symbol,
  decimals,
  currentPrice: _currentPrice,
  pageCounterState,
}: {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  decimals: string;
  currentPrice: string;
  pageCounterState: number;
}) => {
  const assetPair = `${symbol} / USD`;

  const coinImageRef = useRef() as MutableRefObject<HTMLImageElement>;

  const [imageLoadedState, setImageLoadedState] = useState(false);

  const [assetPairRecentPriceState, setAssetPairRecentPriceState] =
    useCryptocurrencyStore(
      ({ assetPairRecentPriceState, setAssetPairRecentPriceState }) => [
        assetPairRecentPriceState,
        setAssetPairRecentPriceState,
      ]
    );

  const handleImageLoad = (e: Event) => {
    if (e.type !== "error") {
      setImageLoadedState(true);
    } else {
      setImageLoadedState(false);
    }
  };

  const renderTimeRelatedColumns = () => {
    const targetedPairPricesArray = assetPairRecentPriceState[assetPair];

    if (targetedPairPricesArray?.length > 0) {
      const assetPairRecentPrices = assetPairRecentPriceState[assetPair].map(
        ({ blockTimestamp, price }) => ({ blockTimestamp, price })
      );

      let hrPercentDifference = 0;

      let firstAssetPair = assetPairRecentPrices[0];

      assetPairRecentPrices.slice(1).every(({ blockTimestamp, price }) => {
        let timeDiffWithFirst = firstAssetPair.blockTimestamp - blockTimestamp;
        let timeDiffWithFirstInHrs = Math.round(timeDiffWithFirst / 3600);

        if (timeDiffWithFirstInHrs >= 1) {
          hrPercentDifference = Number(
            (((firstAssetPair.price - price) * 100) / price).toFixed(2)
          );
          return false;
        }

        return true;
      });

      let _24hrPercentDifference = 0;

      assetPairRecentPrices.slice(1).every(({ blockTimestamp, price }) => {
        let timeDiffWithFirst = firstAssetPair.blockTimestamp - blockTimestamp;
        let timeDiffWithFirstIn24Hrs = Math.round(timeDiffWithFirst / 86400);

        if (timeDiffWithFirstIn24Hrs >= 1) {
          _24hrPercentDifference = Number(
            (((firstAssetPair.price - price) * 100) / price).toFixed(2)
          );
          return false;
        }

        return true;
      });

      // chart
      const lastAssetPair =
        targetedPairPricesArray[targetedPairPricesArray.length - 1];

      const isBullish = lastAssetPair.price < firstAssetPair.price;

      const borderColor = isBullish ? "#0efe0e" : "#fe0e0e";

      const backgroundColor = isBullish ? "#0efe0e90" : "#fe0e0e90";

      const data = targetedPairPricesArray.map(({ price }) => price);

      return (
        <>
          <RowBox $width="10%">
            <RowText $isNegative={hrPercentDifference < 0} $isPercent={true}>
              {hrPercentDifference}%
            </RowText>
          </RowBox>
          <RowBox $width="10%">
            <RowText $isNegative={_24hrPercentDifference < 0} $isPercent={true}>
              {_24hrPercentDifference}%
            </RowText>
          </RowBox>
          <RowBox $width="25%">
            <Sparklines data={data} svgHeight={60} svgWidth={200}>
              <SparklinesLine color={borderColor} />
            </Sparklines>
          </RowBox>
        </>
      );
    }
  };

  useEffect(() => {
    coinImageRef.current.addEventListener("error", handleImageLoad);
    coinImageRef.current.addEventListener("load", handleImageLoad);

    // let's load data
    const cryptocurrencyAssetPairRecentPrices = localStorage.getItem(
      LOCAL_STORAGE_CRYPTOCURRENCY_ASSET_PAIR_RECENT_PRICES
    );

    if (cryptocurrencyAssetPairRecentPrices) {
      setAssetPairRecentPriceState(
        JSON.parse(cryptocurrencyAssetPairRecentPrices)
      );
    }

    getAssetPairRecentPrices(symbol).then((res) => {
      const { data, error, success } = res;

      if (success) {
        setAssetPairRecentPriceState({ [assetPair]: data });
      }
    });

    return () => {
      coinImageRef.current?.removeEventListener("error", handleImageLoad);
      coinImageRef.current?.removeEventListener("load", handleImageLoad);
    };
  }, [pageCounterState]);

  useEffect(() => {
    const keys = Object.getOwnPropertyNames(assetPairRecentPriceState);

    if (keys.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_CRYPTOCURRENCY_ASSET_PAIR_RECENT_PRICES,
        JSON.stringify(assetPairRecentPriceState)
      );
    }
  }, [assetPairRecentPriceState]);

  let currentPrice = Number(_currentPrice);

  let price =
    currentPrice > 1 ? expressInThousands(currentPrice) : currentPrice;

  if (currentPrice > 1 && typeof price == "string") {
    price = `${price}.${currentPrice.toFixed(2).split(".")[1]}`;
  }

  return (
    <Row>
      <RowBox $justifyContent="center" $width="10%">
        <RowText>{rank}</RowText>
      </RowBox>
      <RowBox $justifyContent="flex-start" $width="20%">
        <CoinImage
          src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
          $bgImg={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
          $imageLoaded={imageLoadedState}
          ref={coinImageRef}
        />
        <RowText>{name}</RowText>
        <CoinSymbol>{symbol}</CoinSymbol>
      </RowBox>
      <RowBox $justifyContent="center" $width="10%">
        <HeaderRowText>{decimals}</HeaderRowText>
      </RowBox>
      <RowBox $width="15%">
        <RowText>$ {price}</RowText>
      </RowBox>
      {renderTimeRelatedColumns()}
    </Row>
  );
};

export default AssetPairRow;

/**
 {
    "blockTimestamp": "1716202523",
    "feed": {
        "asset": "BTC",
        "assetAddress": "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "name": "BTC / USD"
    },
    "price": "6714748743000"
    },
 */

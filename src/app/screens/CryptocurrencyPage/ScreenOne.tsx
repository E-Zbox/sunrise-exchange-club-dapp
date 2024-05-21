"use client";
import Image from "next/image";
import { useEffect } from "react";
// apis
import { getUSDAssetPairs } from "@/api";
// components
import AssetPairRow from "@/app/components/AssetPairRow";
// store
import { useCryptocurrencyStore } from "@/store/cryptocurrency";
// styles
import {
  HeaderRow,
  HeaderRowText,
  MainScreenOne,
  MainTable,
  MenuItem,
  PaginationButton,
  PaginationText,
  RowBox,
} from "@/app/styles/CryptocurrencyPage/ScreenOne.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";
import { CRYPTOCURRENCIES_HREF } from "@/utils/navbar";
import { HiddenLink } from "@/app/styles/shared/Text.styles";

const LOCAL_STORAGE_CRYPTOCURRENCY_ASSET_PAIR = "cryptocurrencyAssetPair";

const ScreenOne = () => {
  const {
    cryptocurrencyPage: { menuItems },
  } = screens;

  const [
    pageCounterState,
    decreasePageCounterState,
    increasePageCounterState,
    usdAssetPairState,
    setUSDAssetPairState,
  ] = useCryptocurrencyStore(
    ({
      pageCounterState,
      decreasePageCounterState,
      increasePageCounterState,
      usdAssetPairState,
      setUSDAssetPairState,
    }) => [
      pageCounterState,
      decreasePageCounterState,
      increasePageCounterState,
      usdAssetPairState,
      setUSDAssetPairState,
    ]
  );

  const changePageCounterState = (value: number) => {
    switch (value) {
      case -1:
        decreasePageCounterState();
        return;
      case 1:
        increasePageCounterState();
        return;
      default:
        decreasePageCounterState();
        return;
    }
  };

  useEffect(() => {
    const cryptocurrencyAssetPair = localStorage.getItem(
      LOCAL_STORAGE_CRYPTOCURRENCY_ASSET_PAIR
    );

    if (cryptocurrencyAssetPair !== null) {
      setUSDAssetPairState(JSON.parse(cryptocurrencyAssetPair));
    }

    getUSDAssetPairs(50 * pageCounterState).then((res) => {
      const { data, error, success } = res;

      if (success) {
        setUSDAssetPairState({ [`${pageCounterState}`]: data });
      }
    });
  }, []);

  useEffect(() => {
    if (
      usdAssetPairState[pageCounterState] &&
      usdAssetPairState[pageCounterState].length > 0
    ) {
      localStorage.setItem(
        LOCAL_STORAGE_CRYPTOCURRENCY_ASSET_PAIR,
        JSON.stringify(usdAssetPairState)
      );
    }
  }, [usdAssetPairState]);

  useEffect(() => {
    getUSDAssetPairs(50, 50 * (pageCounterState - 1)).then((res) => {
      const { data, error, success } = res;

      if (success) {
        setUSDAssetPairState({ [`${pageCounterState}`]: data });
      }
    });
  }, [pageCounterState]);

  return (
    <MainScreenOne>
      <HiddenLink id={CRYPTOCURRENCIES_HREF}></HiddenLink>
      <FlexContainer $flexDirection="row">
        {menuItems.map(({ icon, selected, title }, index) => (
          <MenuItem key={index} $selected={selected}>
            {icon ? <Image height={24} width={24} src={icon} alt="" /> : <></>}
            <h3>{title}</h3>
          </MenuItem>
        ))}
      </FlexContainer>
      <MainTable>
        <HeaderRow>
          <RowBox $justifyContent="center" $width="10%">
            <HeaderRowText>#</HeaderRowText>
          </RowBox>
          <RowBox $justifyContent="flex-start" $width="20%">
            <HeaderRowText>Coin</HeaderRowText>
          </RowBox>
          <RowBox $justifyContent="center" $width="10%">
            <HeaderRowText>Decimals</HeaderRowText>
          </RowBox>
          <RowBox $width="15%">
            <HeaderRowText>Price</HeaderRowText>
          </RowBox>
          <RowBox $width="10%">
            <HeaderRowText>1h</HeaderRowText>
          </RowBox>
          <RowBox $width="10%">
            <HeaderRowText>24h</HeaderRowText>
          </RowBox>
          <RowBox $width="25%">
            <HeaderRowText>Last 7 days</HeaderRowText>
          </RowBox>
        </HeaderRow>
        {usdAssetPairState[pageCounterState]?.map(
          ({ currentPrice, asset: { id, decimals, name, symbol } }, index) => (
            <AssetPairRow
              key={index}
              id={id}
              rank={index + 1 + (pageCounterState - 1) * 50}
              currentPrice={currentPrice}
              decimals={decimals}
              name={name}
              symbol={symbol}
              pageCounterState={pageCounterState}
            />
          )
        )}
      </MainTable>
      <FlexContainer
        $flexDirection="row"
        $justifyContent="center"
        $alignItems="center"
        $miscellaneous="margin-top: 20px;"
      >
        {pageCounterState > 1 ? (
          <PaginationButton onClick={() => changePageCounterState(-1)}>
            {"<"}
          </PaginationButton>
        ) : (
          <></>
        )}
        <PaginationText>{pageCounterState}</PaginationText>
        {pageCounterState < 3 ? (
          <PaginationButton onClick={() => changePageCounterState(1)}>
            {">"}
          </PaginationButton>
        ) : (
          <></>
        )}
      </FlexContainer>
    </MainScreenOne>
  );
};

export default ScreenOne;

"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
// api
import { getGlobalCryptoMetrics } from "@/api";
import { IGlobalCryptoMetrics } from "@/api/interface";
// store
import { useCryptoFactStore } from "@/store";
// styles
import {
  CardInfo,
  CardInfoSubTitle,
  CardInfoTitle,
  MainScreenOne,
  MainTitle,
  MainScrollableCard,
  StrikeThrough,
  SubTitle,
  MainScrollableTitle,
  Scrollable,
  MainScrollableSubTitle,
  ScrollableTitle,
  ScrollableText,
} from "@/app/styles/HomePage/ScreenOne.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
// utils
import { expressInThousands } from "@/utils/transformer";

const LOCAL_STORAGE_GLOBAL_CRYPTO_METRICS = "globalCryptoMetrics";

const ScreenOne = () => {
  const scrollableRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [scrollerCount, setScrollerCounter] = useState(1);

  const [globalCryptoMetricState, setGlobalCryptoMetricState] =
    useState<IGlobalCryptoMetrics>();

  const [factsArray, setFactsArray, indexCounter, setIndexCounter] =
    useCryptoFactStore(
      ({ factsArray, setFactsArray, indexCounter, setIndexCounter }) => [
        factsArray,
        setFactsArray,
        indexCounter,
        setIndexCounter,
      ]
    );

  const handleScrollClick = () => {
    const target = scrollableRef.current;

    let scrollBy = 0;

    if (target.children[0].children.length == scrollerCount) {
      scrollBy = 0;
      setScrollerCounter(1);
    } else {
      scrollBy = target.clientWidth * scrollerCount;
      setScrollerCounter((prevState) => prevState + 1);
    }

    scrollableRef.current.scrollTo({
      left: scrollBy,
      behavior: "smooth",
    });
  };

  const renderMarketActivities = () => {
    if (globalCryptoMetricState) {
      const {
        active_cryptocurrencies,
        total_cryptocurrencies,
        defi_volume_24h,
        defi_market_cap,
        defi_24h_percentage_change,
        stablecoin_market_cap,
        derivatives_24h_percentage_change,
        total_market_cap,
        total_market_cap_yesterday_percentage_change,
        total_volume_24h_yesterday_percentage_change,
        altcoin_market_cap,
        altcoin_volume_24h,
      } = globalCryptoMetricState;

      return (
        <FlexContainer $flexDirection="row" $miscellaneous="margin-top: 40px;">
          <FlexContainer $width="fit-content" $padding={"20px"}>
            <CardInfo>
              <CardInfoTitle>
                {expressInThousands(Number(active_cryptocurrencies.text))}
              </CardInfoTitle>
              <CardInfoSubTitle>Active Cryptocurrencies</CardInfoSubTitle>
            </CardInfo>
            <CardInfo>
              <CardInfoTitle>
                {expressInThousands(Number(total_cryptocurrencies.text))}
              </CardInfoTitle>
              <CardInfoSubTitle>Total Cryptocurrencies</CardInfoSubTitle>
            </CardInfo>
          </FlexContainer>
          <FlexContainer
            $width="fit-content"
            $miscellaneous="margin-left: 40px;"
          >
            <MainScrollableCard>
              <FlexContainer
                $flexDirection="row"
                $justifyContent="space-between"
                $alignItems="center"
                $padding={"0px 20px"}
                $miscellaneous="margin: 0px 0px 10px"
              >
                <MainScrollableTitle>Market Activities</MainScrollableTitle>
                <MainScrollableSubTitle onClick={handleScrollClick}>
                  {scrollableRef.current?.children[0].children.length ==
                  scrollerCount
                    ? "< View Previous"
                    : "View More >"}
                </MainScrollableSubTitle>
              </FlexContainer>
              <Scrollable ref={scrollableRef}>
                <FlexContainer $flexDirection="row" $width="fit-content">
                  <FlexContainer $width="495px" $padding={"0px 25px"}>
                    <FlexContainer
                      $flexDirection="row"
                      $justifyContent="space-between"
                      $width="100%"
                      $padding={"10px 0px"}
                    >
                      <ScrollableTitle>Total Marketcap</ScrollableTitle>
                      <ScrollableText $isPercent={total_market_cap.isPercent}>
                        $ {expressInThousands(Number(total_market_cap.text))}
                      </ScrollableText>
                    </FlexContainer>
                    <FlexContainer
                      $flexDirection="row"
                      $justifyContent="space-between"
                      $width="100%"
                      $padding={"10px 0px"}
                    >
                      <ScrollableTitle>Total Marketcap change</ScrollableTitle>
                      <ScrollableText
                        $isNegative={
                          Number(
                            total_market_cap_yesterday_percentage_change.text
                          ) < 0
                        }
                        $isPercent={
                          total_market_cap_yesterday_percentage_change.isPercent
                        }
                      >
                        {Math.abs(
                          Number(
                            Number(
                              total_market_cap_yesterday_percentage_change.text
                            ).toFixed(3)
                          )
                        )}{" "}
                        %
                      </ScrollableText>
                    </FlexContainer>
                    <FlexContainer
                      $flexDirection="row"
                      $justifyContent="space-between"
                      $width="100%"
                      $padding={"10px 0px"}
                    >
                      <ScrollableTitle>Total Volume change</ScrollableTitle>
                      <ScrollableText
                        $isNegative={
                          Number(
                            total_volume_24h_yesterday_percentage_change.text
                          ) < 0
                        }
                        $isPercent={
                          total_volume_24h_yesterday_percentage_change.isPercent
                        }
                      >
                        {Math.abs(
                          Number(
                            Number(
                              total_volume_24h_yesterday_percentage_change.text
                            ).toFixed(3)
                          )
                        )}{" "}
                        %
                      </ScrollableText>
                    </FlexContainer>
                    <FlexContainer
                      $flexDirection="row"
                      $justifyContent="space-between"
                      $width="100%"
                      $padding={"10px 0px"}
                    >
                      <ScrollableTitle>Altcoin Marketcap</ScrollableTitle>
                      <ScrollableText $isPercent={altcoin_market_cap.isPercent}>
                        $ {expressInThousands(Number(altcoin_market_cap.text))}
                      </ScrollableText>
                    </FlexContainer>
                    <FlexContainer
                      $flexDirection="row"
                      $justifyContent="space-between"
                      $width="100%"
                      $padding={"10px 0px"}
                    >
                      <ScrollableTitle>Altcoin Volume 24h</ScrollableTitle>
                      <ScrollableText
                        $isNegative={Number(altcoin_volume_24h.text) < 0}
                        $isPercent={altcoin_volume_24h.isPercent}
                      >
                        $ {expressInThousands(Number(altcoin_volume_24h.text))}
                      </ScrollableText>
                    </FlexContainer>
                  </FlexContainer>
                  <FlexContainer $width="495px" $padding={"0px 20px"}>
                    <FlexContainer
                      $flexDirection="row"
                      $justifyContent="space-between"
                      $width="100%"
                      $padding={"10px 0px"}
                    >
                      <ScrollableTitle>DeFi Marketcap</ScrollableTitle>
                      <ScrollableText $isPercent={defi_market_cap.isPercent}>
                        $ {expressInThousands(Number(defi_market_cap.text))}
                      </ScrollableText>
                    </FlexContainer>
                    <FlexContainer
                      $flexDirection="row"
                      $justifyContent="space-between"
                      $width="100%"
                      $padding={"10px 0px"}
                    >
                      <ScrollableTitle>DeFi Marketcap change</ScrollableTitle>
                      <ScrollableText
                        $isNegative={
                          Number(defi_24h_percentage_change.text) < 0
                        }
                        $isPercent={defi_24h_percentage_change.isPercent}
                      >
                        {Math.abs(
                          Number(
                            Number(defi_24h_percentage_change.text).toFixed(3)
                          )
                        )}{" "}
                        %
                      </ScrollableText>
                    </FlexContainer>
                    <FlexContainer
                      $flexDirection="row"
                      $justifyContent="space-between"
                      $width="100%"
                      $padding={"10px 0px"}
                    >
                      <ScrollableTitle>DeFi Volume Last 24h</ScrollableTitle>
                      <ScrollableText $isPercent={defi_volume_24h.isPercent}>
                        $ {expressInThousands(Number(defi_volume_24h.text))}
                      </ScrollableText>
                    </FlexContainer>
                    <FlexContainer
                      $flexDirection="row"
                      $justifyContent="space-between"
                      $width="100%"
                      $padding={"10px 0px"}
                    >
                      <ScrollableTitle>Stablecoin Marketcap</ScrollableTitle>
                      <ScrollableText
                        $isPercent={stablecoin_market_cap.isPercent}
                      >
                        ${" "}
                        {expressInThousands(Number(stablecoin_market_cap.text))}
                      </ScrollableText>
                    </FlexContainer>
                    <FlexContainer
                      $flexDirection="row"
                      $justifyContent="space-between"
                      $width="100%"
                      $padding={"10px 0px"}
                    >
                      <ScrollableTitle>
                        Derivatives Marketcap change
                      </ScrollableTitle>
                      <ScrollableText
                        $isNegative={
                          Number(derivatives_24h_percentage_change.text) < 0
                        }
                        $isPercent={derivatives_24h_percentage_change.isPercent}
                      >
                        {Math.abs(
                          Number(
                            Number(
                              derivatives_24h_percentage_change.text
                            ).toFixed(3)
                          )
                        )}{" "}
                        %
                      </ScrollableText>
                    </FlexContainer>
                  </FlexContainer>
                </FlexContainer>
              </Scrollable>
            </MainScrollableCard>
          </FlexContainer>
        </FlexContainer>
      );
    }
  };

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setIndexCounter();
    }, 10000);

    return () => {
      clearInterval(timeoutId);
    };
  }, [setFactsArray, setIndexCounter]);

  useEffect(() => {
    const globalCryptoMetricsLocalStorage = localStorage.getItem(
      LOCAL_STORAGE_GLOBAL_CRYPTO_METRICS
    );

    if (!globalCryptoMetricsLocalStorage) {
      getGlobalCryptoMetrics().then((res) => {
        const { data, error, success } = res;

        if (success && data) {
          setGlobalCryptoMetricState(data);
        }
      });
    } else {
      setGlobalCryptoMetricState(JSON.parse(globalCryptoMetricsLocalStorage));
    }

    // set time out to refresh after every 2mins
    const intervalId = setInterval(() => {
      getGlobalCryptoMetrics().then((res) => {
        const { data, error, success } = res;

        if (success && data) {
          setGlobalCryptoMetricState(data);
        }
      });
    }, 120_000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (globalCryptoMetricState) {
      localStorage.setItem(
        LOCAL_STORAGE_GLOBAL_CRYPTO_METRICS,
        JSON.stringify(globalCryptoMetricState)
      );
    }
  }, [globalCryptoMetricState]);

  return (
    <MainScreenOne>
      <FlexContainer $padding={"20px 0px"}>
        <FlexContainer $flexDirection="row">
          <MainTitle>Cryptocurrency Prices by</MainTitle>
          <StrikeThrough>Market</StrikeThrough>
          <MainTitle> Subgraph Data</MainTitle>
        </FlexContainer>
        <SubTitle>{factsArray[indexCounter].text}</SubTitle>
      </FlexContainer>
      {renderMarketActivities()}
    </MainScreenOne>
  );
};

export default ScreenOne;

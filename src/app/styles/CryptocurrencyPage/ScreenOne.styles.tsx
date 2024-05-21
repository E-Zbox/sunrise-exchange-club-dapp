import styled from "styled-components";

interface IMenuItem {
  $selected: boolean;
}

interface IRowBox {
  $justifyContent?: string;
  $width: string;
}

interface IRowText {
  $isNegative?: boolean;
  $isPercent?: boolean;
}

interface ICoinImage {
  $bgImg: string;
  $imageLoaded: boolean;
}

export const MainScreenOne = styled.main`
  width: 100%;
  margin: calc(var(--ten-px) * 3) 0px;
  padding: calc(var(--ten-px) * 3) calc(var(--ten-px) * 5);
  border-radius: 3px;
  box-shadow: 1px 0px 3px ${({ theme: { textColor } }) => `${textColor}04`}
    inset;
  border: 1px solid ${({ theme: { textColor } }) => `${textColor}01`};
  overflow: scroll;
`;

export const MenuItem = styled.div<IMenuItem>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  margin-left: calc(var(--ten-px) * 2);
  padding: calc(var(--ten-px) * 1.2);
  background: linear-gradient(
    to bottom right,
    ${({ $selected, theme: { textColor, thatchColor } }) =>
      $selected ? `${textColor}2e, ${thatchColor}67` : "transparent"}
  );
  letter-spacing: ${({ $selected }) => ($selected ? "0px" : "3px")};
  cursor: pointer;

  &:active {
    scale: ${({ $selected }) => !$selected && "0.9"};
  }

  &:hover {
    background-color: ${({ $selected, theme: { textColor } }) =>
      !$selected && `${textColor}08`};
  }

  h3 {
    font-family: Roboto;
    font-size: 1.05rem;
    font-weight: ${({ $selected }) => ($selected ? "bold" : "bolder")};
    color: ${({ $selected, theme: { textColor, thatchColor } }) =>
      $selected ? `${thatchColor}` : `${textColor}`};
  }

  img {
    margin-right: var(--ten-px);
  }
`;

export const MainTable = styled.main`
  width: 100%;
  min-width: 1000px;
  margin-top: calc(var(--ten-px) * 1.2);
`;

export const HeaderRow = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px calc(var(--ten-px) * 1.5) 0px var(--seven-px);
  border: 1px solid ${({ theme: { textColor } }) => `${textColor}0f`};
  border-left: 0px;
  border-right: 0px;
`;

export const Row = styled(HeaderRow)`
  height: 75px;
  border-bottom: 1px solid ${({ theme: { textColor } }) => `${textColor}0f`};

  &:hover {
    background-color: ${({ theme: { textColor } }) => `${textColor}0a`};
  }
`;

export const RowBox = styled.div<IRowBox>`
  position: relative;
  width: ${({ $width }) => $width};
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ $justifyContent }) => $justifyContent || "flex-end"};
`;

export const CoinImage = styled.img<ICoinImage>`
  --size: 22px;
  width: ${({ $imageLoaded }) => ($imageLoaded ? "var(--size)" : "")};
  height: ${({ $imageLoaded }) => ($imageLoaded ? "var(--size)" : "")};
  display: ${({ $imageLoaded }) => ($imageLoaded ? "" : "none")};
  visibility: ${({ $imageLoaded }) => ($imageLoaded ? "visible" : "hidden")};
  margin-right: ${({ $imageLoaded }) => ($imageLoaded ? "var(--ten-px)" : "")};
`;

export const HeaderRowText = styled.h3`
  font-family: Roboto;
  font-size: 0.87rem;
  font-weight: bold;
`;

export const RowText = styled.h3<IRowText>`
  position: relative;
  font-family: Roboto;
  font-size: 0.95rem;
  font-weight: bold;

  &::before {
    content: "";
    --size: 8px;
    position: absolute;
    top: 50%;
    left: -18px;
    transform: translate(0, -50%);
    width: 0px;
    height: 0px;
    border-color: transparent;
    border-top: ${({ $isNegative, $isPercent }) =>
      !$isPercent ? "" : $isNegative ? "var(--size) solid red" : "0px"};
    border-bottom: ${({ $isNegative, $isPercent }) =>
      !$isPercent ? "" : $isNegative ? "0px" : "var(--size) solid green"};
    border-left: calc(var(--size) * 0.7) solid transparent;
    border-right: calc(var(--size) * 0.7) solid transparent;
    border-radius: 2px;
  }
`;

export const CoinSymbol = styled.h3`
  font-family: Roboto;
  font-size: 0.9rem;
  font-weight: bolder;
  margin-left: var(--ten-px);
  color: ${({ theme: { textColor } }) => `${textColor}33`};
`;

export const PaginationButton = styled.button`
  font-family: "Nunito Sans";
  font-size: 0.95rem;
  border-radius: 4px;
  padding: calc(var(--seven-px) * 1.3) calc(var(--ten-px) * 1.5);
  border: none;
  outline: none;
  background-color: ${({ theme: { textColor } }) => `${textColor}00`};

  &:hover {
    background-color: ${({ theme: { textColor } }) => `${textColor}20`};
  }
`;

export const PaginationText = styled.h3`
  font-family: "Nunito Sans";
  font-size: 0.95rem;
  font-weight: bolder;
  margin: 0px calc(var(--seven-px));
  border-radius: 5px;
  padding: calc(var(--seven-px) * 1.2) calc(var(--ten-px) * 2);
  background-color: ${({ theme: { thatchColor } }) => `${thatchColor}ae`};
`;

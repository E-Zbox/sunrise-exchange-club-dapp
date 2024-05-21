import styled from "styled-components";

interface IScrollableText {
  $isNegative?: boolean;
  $isPercent: boolean;
}

export const MainScreenOne = styled.main`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: calc(var(--ten-px) * 1.5);
`;

export const MainTitle = styled.h3`
  font-family: "Nunito Sans";
  font-size: 2.04rem;
  font-weight: bold;
`;

export const StrikeThrough = styled(MainTitle)`
  width: fit-content;
  text-decoration: line-through;
  padding: 0px calc(var(--ten-px) * 0.7);
`;

export const SubTitle = styled.h3`
  font-family: "Nunito Sans";
  font-size: 1.05rem;
  font-weight: 400;
  color: ${({ theme: { textColor } }) => `${textColor}93`};
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 4px;
  margin-bottom: calc(var(--ten-px) * 1.5);
  padding: calc(var(--ten-px) * 2.5) calc(var(--ten-px) * 2.5);
  border-left: 4px solid ${({ theme: { dustyGrayColor } }) => dustyGrayColor};
  background: ${({ theme: { textColor, bgColor } }) =>
    `linear-gradient(to right, ${textColor}0d, ${bgColor}, ${bgColor})`};

  &:nth-of-type(2) {
    border-left: 4px solid ${({ theme: { ferraColor } }) => ferraColor};
  }
`;

export const CardInfoTitle = styled.h3`
  font-family: Roboto;
  font-size: 3rem;
`;

export const CardInfoSubTitle = styled.h3`
  color: ${({ theme: { textColor } }) => `${textColor}93`};
  font-size: 1.2rem;
  font-style: Italic;
  font-weight: bolder;
`;

// scrollable
export const MainScrollableCard = styled.div`
  width: 500px;
  height: fit-content;
  height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: calc(var(--ten-px) * 2) 0px;
  border: 2px solid ${({ theme: { textColor } }) => `${textColor}23`};
  overflow: hidden;
`;

export const MainScrollableTitle = styled.h3`
  font-family: Roboto;
  font-size: 1.3rem;
  font-weight: 500;
`;

export const MainScrollableSubTitle = styled(MainScrollableTitle)`
  color: ${({ theme: { textColor } }) => `${textColor}41`};
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme: { textColor } }) => `${textColor}71`};
  }
`;

export const Scrollable = styled.div`
  flex-wrap: no-wrap;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
`;

export const ScrollableTitle = styled.h3`
  font-family: "Open Sans";
  font-size: 1.1rem;
  font-weight: 400;
  width: fit-content;
`;

export const ScrollableText = styled(ScrollableTitle)<IScrollableText>`
  position: relative;
  font-weight: 600;

  &::before {
    content: "";
    --size: 10px;
    position: absolute;
    top: 50%;
    left: -25px;
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

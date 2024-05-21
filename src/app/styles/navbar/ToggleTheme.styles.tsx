import styled, { keyframes } from "styled-components";

interface IMainToggleTheme {
  $bgImg: string;
  $isDark: boolean;
}

export const MainToggleTheme = styled.main<IMainToggleTheme>`
  width: 70px;
  height: 40px;
  position: relative;
  margin-left: calc(var(--ten-px) * 5);
  border-radius: 30px;
  background: linear-gradient(
      to right,
      ${({ $isDark }) => ($isDark ? "#000b" : "#0002")},
      ${({ $isDark }) => ($isDark ? "#0006" : "#0000")}
    ),
    url(${({ $bgImg }) => $bgImg});
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-color: ${({ theme: { bgColor } }) => bgColor};
  box-shadow: 0px 0px 3px ${({ $isDark }) => ($isDark ? "#fff4" : "#0009")}
    inset;

  &:hover {
    box-shadow: 1px 1px 5px ${({ $isDark }) => ($isDark ? "#fff4" : "#0009")}
      inset;
  }
`;

export const ToggleButton = styled.button<IMainToggleTheme>`
  --size: ${({ $isDark }) => ($isDark ? "32px" : "37px")};
  height: var(--size);
  width: var(--size);
  position: absolute;
  top: 50%;
  left: ${({ $isDark }) => $isDark && "4px"};
  right: ${({ $isDark }) => !$isDark && "1px"};
  transform: translate(0px, -50%);
  background: url(${({ $bgImg }) => $bgImg});
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  border-radius: 30px;
  box-shadow: 1px 1px ${({ $isDark }) => ($isDark ? "5px #fff5" : "3px #0002")};
`;

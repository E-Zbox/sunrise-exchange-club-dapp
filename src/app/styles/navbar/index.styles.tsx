import styled from "styled-components";

interface IMenuText {
  $selected: boolean;
}

export const MainNav = styled.main`
  height: 60px;
  width: 100%;
`;

export const MainTitle = styled.h3`
  font-family: "Nunito Sans";
  font-size: 1.405rem;
  font-weight: bold;
`;

export const MenuText = styled.a<IMenuText>`
  position: relative;
  height: 100%;
  font-size: 1.1rem;
  font-weight: normal;
  letter-spacing: 1px;
  margin: 0px 1px 0px;
  padding: calc(var(--ten-px) * 2) calc(var(--ten-px) * 3.5);
  padding-bottom: 0px;
  cursor: pointer;
  text-decoration: none;
  transition: 350ms linear;

  &:hover {
    background-color: ${({ $selected, theme: { dustyGrayColor } }) =>
      $selected ? "" : `${dustyGrayColor}33`};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    height: ${({ $selected }) => ($selected ? "2px" : "0px")};
    width: ${({ $selected }) => ($selected ? "100%" : "0px")};
    background-color: ${({ $selected, theme: { thatchColor } }) =>
      $selected ? thatchColor : ""};
    border-radius: 5px 5px 0px 0px;
    transition: 350ms linear;
  }
`;

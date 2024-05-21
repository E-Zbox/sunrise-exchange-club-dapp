import styled from "styled-components";

export const MainApp = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${({ theme: { bgColor } }) => bgColor};
`;

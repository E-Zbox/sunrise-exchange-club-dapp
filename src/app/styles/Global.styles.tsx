import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        font-family: Source Sans Pro;
        transition: 350ms linear;
        color: ${({ theme: { textColor } }) => textColor};

        // variables
        --three-px: 3px;
        --seven-px: 7px;
        --ten-px: 10px;
    }
    }
`;

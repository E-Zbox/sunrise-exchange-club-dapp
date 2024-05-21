// .
import cryptocurrencyPage from "./cryptocurrencyPage";
import home from "./homePage";
import navbar from "./navbar";
// assets
import loaderGif from "../../public/loader.gif";
import theGraphImg from "../../public/the-graph.png";

export const devices = {};

export const screens = {
  cryptocurrencyPage,
  default: {
    assets: { theGraphImg, loaderGif },
  },
  home,
  navbar,
};

export const theme = {
  dark: {
    bgColor: "#23262F",
    textColor: "#FFFFFF",
    ferraColor: "#724F60",
    tumbleWeedColor: "#DE9C7E",
    thatchColor: "#BDA19C",
    dustyGrayColor: "#A98E98",
  },
  light: {
    bgColor: "#F7F7F7",
    textColor: "#23262F",
    ferraColor: "#724F60",
    tumbleWeedColor: "#DE9C7E",
    thatchColor: "#BDA19C",
    dustyGrayColor: "#A98E98",
  },
};

import moonImg from "../../public/icons8-moon-phase-80.png";
import nightlyBackgroundImg from "../../public/night-background.svg";
import sunImg from "../../public/icons8-sun-96.png";
import sunnyBackgroundImg from "../../public/sunny-background.svg";

export interface IMenuItem {
  href: string;
  selected: boolean;
  title: string;
}

export const HOME_HREF = "#home";
export const CRYPTOCURRENCIES_HREF = "cryptocurrencies";

const menu: IMenuItem[] = [
  {
    href: HOME_HREF,
    selected: true,
    title: "Home",
  },
  {
    href: CRYPTOCURRENCIES_HREF,
    selected: false,
    title: "Cryptocurrencies",
  },
  {
    href: "",
    selected: false,
    title: "Insight",
  },
];

export default {
  assets: {
    moonImg,
    nightlyBackgroundImg,
    sunImg,
    sunnyBackgroundImg,
  },
  menu,
};

"use client";
import Image from "next/image";
// .
import ToggleTheme from "./ToggleTheme";
// store
import { useMenuStore } from "@/store/navbar";
// styles
import { MainNav, MainTitle, MenuText } from "@/app/styles/navbar/index.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";

const Navbar = () => {
  const [menuState, setMenuState] = useMenuStore((store) => [
    store.state,
    store.setState,
  ]);

  const {
    default: {
      assets: { theGraphImg },
    },
  } = screens;

  const handleMenuSelected = (_href: string) => {
    const updatedMenuState = menuState.map((item) => ({
      ...item,
      selected: item.href === _href,
    }));

    setMenuState(updatedMenuState);
  };
  return (
    <MainNav>
      <FlexContainer
        $height={"100%"}
        $flexDirection="row"
        $alignItems="center"
        $justifyContent="flex-start"
        $padding={"0px 40px 0px 20px"}
        $miscellaneous={"border-bottom: 1px solid #aaa4"}
      >
        <FlexContainer
          $height={"100%"}
          $flexDirection="row"
          $alignItems="center"
          $justifyContent="space-between"
        >
          <FlexContainer
            $flexDirection="row"
            $alignItems="center"
            $width="fit-content"
          >
            <Image
              height={60}
              width={60}
              src={theGraphImg.src}
              alt={theGraphImg.src.substring(0, 11)}
            />
            <MainTitle>Sunrise Club Exchange</MainTitle>
          </FlexContainer>
          <FlexContainer
            $height="100%"
            $flexDirection="row"
            $alignItems="center"
            $justifyContent="flex-start"
            $width="fit-content"
          >
            {menuState.slice(1).map(({ href, selected, title }, index) => (
              <MenuText
                key={index}
                href={`#${href}`}
                $selected={selected}
                onClick={() => handleMenuSelected(href)}
              >
                {title}
              </MenuText>
            ))}
            <ToggleTheme />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </MainNav>
  );
};

export default Navbar;

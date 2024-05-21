import React, { useEffect } from "react";
// store
import { useThemeStore } from "@/store/theme";
// styles
import {
  MainToggleTheme,
  ToggleButton,
} from "@/app/styles/navbar/ToggleTheme.styles";
// utils
import { screens, theme } from "@/utils/data";

const ToggleTheme = () => {
  const [themeIsDark, themeToggleIsDark, setThemeState] = useThemeStore(
    (store) => [store.isDark, store.toggleIsDark, store.setState]
  );

  const {
    navbar: {
      assets: { moonImg, nightlyBackgroundImg, sunImg, sunnyBackgroundImg },
    },
  } = screens;

  useEffect(() => {
    setThemeState(themeIsDark ? theme.dark : theme.light);
  }, [themeIsDark]);

  return (
    <MainToggleTheme
      $bgImg={themeIsDark ? nightlyBackgroundImg.src : sunnyBackgroundImg.src}
      $isDark={themeIsDark}
    >
      <ToggleButton
        $bgImg={themeIsDark ? moonImg.src : sunImg.src}
        $isDark={themeIsDark}
        onClick={themeToggleIsDark}
      ></ToggleButton>
    </MainToggleTheme>
  );
};

export default ToggleTheme;

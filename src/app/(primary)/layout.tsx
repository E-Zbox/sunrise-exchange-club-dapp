"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
// components
import Navbar from "../components/navbar";
// styles
import { MainApp } from "../styles/App.styles";
import { PositionContainer } from "../styles/shared/Container.styles";
import { Loader } from "../styles/Loader.styles";
// utils
import { screens } from "@/utils/data";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  const {
    default: {
      assets: { loaderGif },
    },
  } = screens;

  const { bgColor } = useTheme();

  const loadEventListener = () => {
    console.log("done loading");
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("load", loadEventListener);

    return () => window.removeEventListener("load", loadEventListener);
  }, []);
  return (
    <>
      <MainApp>
        {loading ? (
          <PositionContainer
            $position="absolute"
            $top="0px"
            $left="0px"
            $height="100%"
            $justifyContent="center"
            $alignItems="center"
            $bgColor={`${bgColor}4A`}
          >
            <Loader $size={"120px"} src={loaderGif.src} alt={""} />
          </PositionContainer>
        ) : (
          <>
            <Navbar />
            {children}
          </>
        )}
      </MainApp>
    </>
  );
}

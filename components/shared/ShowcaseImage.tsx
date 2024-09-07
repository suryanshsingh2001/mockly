"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

const ShowcaseImage = () => {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === "light" ? "/showcase-dark.png" : "/showcase-light.png"}
      alt="ScreenCraft Editor Preview "
      layout="fill"
      objectFit="cover"
      className="rounded-sm shadow-2xl transition-all duration-300 group-hover:scale-[1.05] group-hover:shadow-3xl"
    />
  );
};

export default ShowcaseImage;

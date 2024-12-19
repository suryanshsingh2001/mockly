"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect } from "react";

export function PeerlistSpotlight() {
  const { theme } = useTheme();

  let imageUrl = "/peerlist-dark.svg";

  if (theme === "dark") {
    imageUrl = "/peerlist-light.svg";
  }

  return (
    <div className="flex items-center justify-center md:justify-start p-5 md:p-2 bg-transparent rounded-lg shadow-lg">
      <Image
        src={imageUrl}
        alt="Peerlist Spotlight"
        width={200}
        height={200}
        className=""
      />
    </div>
  );
}

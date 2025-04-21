"use client";

import { motion } from "framer-motion";

type BackgroundGradientProps = {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  gridOpacity?: string;
  disableShapes?: boolean; // New prop to disable decorative shapes
};

export function BackgroundGradient({
  className = "",
  primaryColor = "primary",
  secondaryColor = "violet-500",
  accentColor = "fuchsia-500", 
  gridOpacity = "0.03",
  disableShapes = false // Default to false to maintain current behavior
}: BackgroundGradientProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Gradient blobs */}
      <div className={`absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-${primaryColor}/30 via-${secondaryColor}/10 to-${primaryColor}/5 blur-3xl`}></div>
      <div className={`absolute right-0 top-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-${primaryColor}/20 via-${secondaryColor}/10 to-${primaryColor}/5 blur-3xl`}></div>
      <div className={`absolute bottom-0 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-${primaryColor}/10 via-${accentColor}/10 to-${primaryColor}/5 blur-3xl`}></div>

      {/* Decorative shapes - rendered conditionally based on disableShapes prop */}
      {!disableShapes && (
        <>
          <div className={`absolute top-1/4 right-1/4 h-24 w-24 rounded-full border border-${primaryColor}/20 bg-${primaryColor}/5`}></div>
          <div className={`absolute bottom-1/3 left-1/5 h-16 w-16 rounded-full border border-${primaryColor}/20 bg-${primaryColor}/5`}></div>
          <div className={`absolute top-1/3 left-1/4 h-32 w-32 rounded-full border border-${primaryColor}/10 bg-${primaryColor}/5 opacity-30`}></div>
        </>
      )}

      {/* Grid pattern */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(120,119,198,${gridOpacity})_1px,transparent_1px),linear-gradient(to_right,rgba(120,119,198,${gridOpacity})_1px,transparent_1px)] bg-[size:32px_32px]`}></div>
    </div>
  );
}
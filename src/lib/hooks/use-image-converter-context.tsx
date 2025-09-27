"use client";

import { createContext, useContext, ReactNode } from "react";
import { useImageConverter } from "./use-image-converter";

const ImageConverterContext = createContext<ReturnType<typeof useImageConverter> | null>(null);

export function ImageConverterProvider({ children }: { children: ReactNode }) {
  const value = useImageConverter();
  return <ImageConverterContext.Provider value={value}>{children}</ImageConverterContext.Provider>;
}

export function useImageConverterContext() {
  const context = useContext(ImageConverterContext);
  if (!context) {
    throw new Error("useImageConverterContext must be used within an ImageConverterProvider");
  }
  return context;
}

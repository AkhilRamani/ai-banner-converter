"use server";

import { convertImageAspectRatio, ConversionOptions } from "./gemini";

export interface ConversionResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export async function convertImageAction(sourceImageFile: File, options: ConversionOptions): Promise<ConversionResult> {
  try {
    const result = await convertImageAspectRatio(sourceImageFile, options);

    if (result.success && result.imageData) {
      // Convert buffer to base64 for client-side use
      const base64 = result.imageData.toString("base64");
      const imageUrl = `data:image/png;base64,${base64}`;

      return {
        success: true,
        imageUrl,
      };
    }

    return {
      success: false,
      error: result.error || "Conversion failed",
    };
  } catch (error) {
    console.error("Error in convertImageAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Conversion failed",
    };
  }
}

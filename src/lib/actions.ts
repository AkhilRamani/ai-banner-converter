"use server";

import { convertImageAspectRatio, editWithInstruction, ConversionOptions } from "./gemini";

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

export async function editImageWithInstructionAction(
  sourceImageFile: File,
  instruction: string,
  targetWidth?: number,
  targetHeight?: number
): Promise<ConversionResult> {
  try {
    const result = await editWithInstruction(sourceImageFile, instruction, targetWidth, targetHeight);

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
      error: result.error || "Edit failed",
    };
  } catch (error) {
    console.error("Error in editImageWithInstructionAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Edit failed",
    };
  }
}

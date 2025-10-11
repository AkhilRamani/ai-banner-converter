"use server";

import { convertImageAspectRatio, editWithInstruction, ConversionOptions as GeminiConversionOptions } from "./gemini";
import { api } from "../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { withAuth } from "@workos-inc/authkit-nextjs";

export interface ConversionResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export interface ConversionOptions extends GeminiConversionOptions {
  platform: string;
  format: string;
  signedUrl: string;
}

// Helper function to create authenticated Convex client
const createConvexClient = async () => {
  const { accessToken } = await withAuth();
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!, {
    auth: accessToken,
  });
};

// Helper function to fetch and convert image from signed URL
const fetchImageFromSignedUrl = async (signedUrl: string) => {
  const response = await fetch(signedUrl);
  if (!response.ok) throw new Error("Failed to fetch source image");

  const blob = await response.blob();
  return new File([blob], `source_${Date.now()}`, { type: blob.type });
};

export async function convertImageWithConvex(options: ConversionOptions, conversionId: string): Promise<ConversionResult> {
  try {
    const sourceImageFile = await fetchImageFromSignedUrl(options.signedUrl);
    const result = await convertImageAspectRatio(sourceImageFile, options);

    if (!result.success || !result.imageData) {
      return {
        success: false,
        error: result.error || "Conversion failed",
      };
    }

    // Store conversion result with R2 upload
    const storeResult = await storeConversionResult({
      conversionId,
      platform: options.platform,
      format: options.format,
      imageData: result.imageData,
      width: options.targetWidth,
      height: options.targetHeight,
    });

    if (!storeResult.success) {
      return {
        success: false,
        error: storeResult.error || "Failed to store conversion result",
      };
    }

    return {
      success: true,
      imageUrl: `data:image/png;base64,${result.imageData.toString("base64")}`,
    };
  } catch (error) {
    console.error("Error in convertImageWithConvex:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Conversion failed",
    };
  }
}

/**
 * Store conversion result with R2 upload
 * - Creates conversion result record in Convex
 * - Uploads generated image to R2 storage
 * - Updates conversion result with R2 details
 */
export async function storeConversionResult({
  conversionId,
  platform,
  format,
  imageData,
  width,
  height,
}: {
  conversionId: string;
  platform: string;
  format: string;
  imageData: Buffer;
  width?: number;
  height?: number;
}): Promise<{ success: boolean; conversionResultId?: string; error?: string }> {
  const convex = await createConvexClient();

  try {
    // Create conversion result record
    const conversionResultId = await convex.mutation(api.functions.conversionResults.createConversionResult, {
      conversionId: conversionId as any,
      platform: platform.toLowerCase() as any,
      format: format,
    });

    // Generate filename and upload to R2
    const fileName = `conversion_${conversionResultId}_${Date.now()}.png`;
    const uploadData = await convex.mutation(api.r2.generateGenerationUploadUrl, {
      conversionResultId: conversionResultId as any,
      fileName: fileName,
    });

    const uploadResponse = await fetch(uploadData.url, {
      method: "PUT",
      body: Buffer.from(imageData),
      headers: { "Content-Type": "image/png" },
    });

    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload to R2: ${uploadResponse.statusText}`);
    }

    // Update conversion result with status and dimensions
    await convex.mutation(api.functions.conversionResults.updateConversionResult, {
      formatId: conversionResultId as any,
      status: "completed",
      width: width,
      height: height,
    });

    return { success: true, conversionResultId };
  } catch (error) {
    console.error("Error in storeConversionResult:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to store conversion result",
    };
  }
}

export async function editImageWithInstructionAndConvex(options: ConversionOptions & { instruction: string }): Promise<ConversionResult> {
  try {
    const sourceImageFile = await fetchImageFromSignedUrl(options.signedUrl);
    const result = await editWithInstruction(sourceImageFile, options.instruction, options.targetWidth, options.targetHeight);

    if (!result.success || !result.imageData) {
      return {
        success: false,
        error: result.error || "Edit failed",
      };
    }

    return {
      success: true,
      imageUrl: `data:image/png;base64,${result.imageData.toString("base64")}`,
    };
  } catch (error) {
    console.error("Error in editImageWithInstructionAndConvex:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Edit failed",
    };
  }
}

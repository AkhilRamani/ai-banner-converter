// Server-side functions for image conversion using Gemini AI
import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "fs";
import { join } from "path";

const getAI = () => {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Google Gemini API key not configured");
  }
  return new GoogleGenAI({ apiKey });
};

export interface ConversionOptions {
  targetFormat: string;
  targetWidth: number;
  targetHeight: number;
}

export interface ConversionResult {
  success: boolean;
  imageData?: Buffer;
  error?: string;
}

// Function to get target format image from target-formats folder
const getTargetFormatImage = (width: number, height: number): string | null => {
  try {
    // Use process.cwd() to get the project root and construct path from there
    const targetFormatsDir = join(process.cwd(), "src/lib/target-formats");
    const filename = `${width}x${height}.png`;
    const filePath = join(targetFormatsDir, filename);

    const imageBuffer = readFileSync(filePath);
    return imageBuffer.toString("base64");
  } catch (error) {
    console.warn(`Target format image not found for ${width}x${height}:`, error);
    return null;
  }
};

// Server function to convert image aspect ratio using Gemini AI
export const convertImageAspectRatio = async (sourceImageFile: File, options: ConversionOptions): Promise<ConversionResult> => {
  try {
    const sourceBuffer = Buffer.from(await sourceImageFile.arrayBuffer());
    const base64SourceImage = sourceBuffer.toString("base64");

    const base64TargetFormatImage = getTargetFormatImage(options.targetWidth, options.targetHeight);

    // If no target format image is available, don't proceed with conversion
    if (!base64TargetFormatImage) {
      return {
        success: false,
        error: `No target format reference image found for ${options.targetWidth}x${options.targetHeight}px. Cannot proceed with conversion.`,
      };
    }

    // Build prompt with source image, reference image, and instructions
    const prompt = [
      {
        inlineData: {
          mimeType: "image/png",
          data: base64SourceImage,
        },
      },
      {
        inlineData: {
          mimeType: "image/png",
          data: base64TargetFormatImage,
        },
      },
      {
        text: `Can you analyse first marketing cover image and convert that into attached second picture as the reference for final aspect ratio.
Make sure design language remains intact, prefer to avoid blank spaces and feel free to move around objects as needed.
This query is to changing aspect ratio formate of original image as graphics designer would redesign/reorganise it.
If source and target image differs in vertical and horizontal then try to organise objects as target aspect ratio example vertically or horizontally.
Do not repeat texts again. Keep proper spacing around texts from edges for readability, feel free to remove text wraps when needed to fill available space.
Understand the image content composition and try to keep the same feel as original image. Prefer to do not destruct main objects but organise to utilize available space and minimise empty same color areas without repeating.
`,
      },
    ];

    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: prompt,
    });

    const parts = (response as any).candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        return {
          success: true,
          imageData: buffer,
        };
      }
    }

    return {
      success: false,
      error: "No image generated",
    };
  } catch (error) {
    console.error("Error converting image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Conversion failed",
    };
  }
};

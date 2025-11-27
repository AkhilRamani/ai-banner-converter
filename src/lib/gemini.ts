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
  customMessage?: string;
}

export interface EditOptions {
  sourceImageFile: File;
  instruction: string;
  targetWidth?: number;
  targetHeight?: number;
}

interface Result {
  imageData?: Buffer;
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
export const convertImageAspectRatio = async (sourceImageFile: File, options: ConversionOptions): Promise<Result> => {
  const sourceBuffer = Buffer.from(await sourceImageFile.arrayBuffer());
  const base64SourceImage = sourceBuffer.toString("base64");

  const base64TargetFormatImage = getTargetFormatImage(options.targetWidth, options.targetHeight);

  // If no target format image is available, don't proceed with conversion
  if (!base64TargetFormatImage) {
    throw new Error(`No target format reference image found for ${options.targetWidth}x${options.targetHeight}px. Cannot proceed with conversion.`);
  }

  // Build base prompt
  // const basePrompt = `Can you analyse first marketing cover image and convert that into attached second picture as the reference for final aspect ratio. Stictly use second image as a template to fill in.
  // I want to change aspect ratio of original image as graphics designer would design it for ${options.targetFormat}.
  const basePrompt = `Analyse first cover image and convert that into attached second picture as the reference for final aspect ratio. Use second image as a template to fill in. Do not give bigger image than target image.
I want to change aspect ratio of original image as graphics designer would design it.
Design language and feel should remains intact, prefer to avoid blank spaces and feel free to move around objects as needed without breaking original design identity.
If source and target image differs in vertical and horizontal then try to organise objects in target image space, example vertically or horizontally.
Do not duplicate texts. Keep proper consistant spacing around texts for visual balance. Remove text line breaks and extend when needed to fill extra space.
Understand the image content composition and try to keep the same feel as original. Prefer to do not destruct or modify main objects but organise to utilize available space and minimise empty same color areas without repeating.
Never leave large empty spaces and try to organise, expand or shrink objects, elements in such a way that never happens. Prefer not to remove any elements as far as possible.
Keep consistent spacing around edges of image as original depending on availabe space in target image.
`;

  // Add custom message if provided
  const finalPrompt = options.customMessage ? `${basePrompt}\n\nAdditional instructions: ${options.customMessage}` : basePrompt;

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
      text: finalPrompt,
    },
  ];

  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    // model: "gemini-3-pro-image-preview",
    contents: prompt,
    config: {
      responseModalities: ["IMAGE"],
      // imageConfig: {
      //   aspectRatio: options.targetFormat,
      // },
    },
  });

  const parts = (response as any).candidates?.[0]?.content?.parts || [];

  for (const part of parts) {
    if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      return {
        imageData: buffer,
      };
    }
  }

  throw new Error("Error generating image.");
};

// Server function to edit image with custom instructions using Gemini AI
export const editWithInstruction = async (
  sourceImageFile: File,
  instruction: string,
  targetWidth?: number,
  targetHeight?: number
): Promise<Result> => {
  const sourceBuffer = Buffer.from(await sourceImageFile.arrayBuffer());
  const base64SourceImage = sourceBuffer.toString("base64");

  // Get target format image if dimensions are provided
  const base64TargetFormatImage = targetWidth && targetHeight ? getTargetFormatImage(targetWidth, targetHeight) : null;

  // Build base prompt
  let promptText = `Please modify this image according to the following instructions: ${instruction}

Important guidelines:
- Make sure the design language remains intact
- Prefer to avoid blank spaces and utilize available space effectively
- Feel free to move around objects as needed to achieve the desired result
- If making layout changes, try to organize objects to maintain visual balance
- Do not repeat text elements
- Keep proper consistent spacing/padding around text elements from edges for visual balance
- Understand the image content composition and try to keep the same feel as the original image
- Prefer not to destruct main objects but organize them to utilize available space
- Minimize empty same-color areas without repeating elements

Please apply these modifications while maintaining the overall quality and coherence of the original image.`;

  // Add target format instructions if target dimensions are provided
  // Target format reference: ${targetWidth}x${targetHeight}px
  if (targetWidth && targetHeight && base64TargetFormatImage) {
    promptText = `Great! Please modify this image according to the following instructions: ${instruction}
    Keep rest as it is.

Important guidelines:
- Make sure the design language remains intact
- Prefer to avoid blank spaces and utilize available space effectively
- Feel free to move around objects as needed to achieve the desired result
- If making layout changes, try to organize objects to maintain visual balance
- Do not repeat text elements
- Keep proper consistent spacing/padding around text elements from edges for visual balance
- Understand the image content composition and try to keep the same feel as the original image
- Prefer not to destruct main objects but organize them to utilize available space
- Minimize empty same-color areas without repeating elements
- Use the target format reference as a guide for aspect ratio and layout structure

Please apply these modifications while maintaining the overall quality and coherence of the original image and ensuring it fits the target format appropriately.`;
  }

  // Build prompt with source image, optional target format image, and instructions
  const prompt: any[] = [
    {
      inlineData: {
        mimeType: "image/png",
        data: base64SourceImage,
      },
    },
  ];

  // Add target format image if available
  if (base64TargetFormatImage) {
    prompt.push({
      inlineData: {
        mimeType: "image/png",
        data: base64TargetFormatImage,
      },
    });
  }

  // Add the instruction text
  prompt.push({
    text: promptText,
  });

  const ai = getAI();
  const response = await ai.models.generateContent({
    // model: "gemini-2.5-flash-image",
    model: "gemini-3-pro-image-preview",
    contents: prompt,
  });

  const parts = (response as any).candidates?.[0]?.content?.parts || [];

  for (const part of parts) {
    if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      return {
        imageData: buffer,
      };
    }
  }

  throw new Error("Error generating image.");
};

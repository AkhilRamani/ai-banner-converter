"use client";

import React, { useState, useCallback, useEffect } from "react";
import { getFormFactor } from "@/lib/formats";
import { editImageWithInstructionAction, ConversionResult } from "@/lib/actions";
import { convertImageWithConvex } from "@/lib/conversionActions";
import { Doc } from "../../../convex/_generated/dataModel";

// Extended conversion result type that includes signedUrl from the mutation
export type ConversionResultWithSignedUrl = Doc<"conversionResults"> & { signedUrl?: string };

// Extended conversion type that includes signedUrl from the query
export type ConversionWithSignedUrl = Doc<"conversions"> & { signedUrl?: string };

export interface UseImageConverterProps {
  conversion?: ConversionWithSignedUrl;
  conversionResults?: ConversionResultWithSignedUrl[];
  conversionId?: string;
}

export interface ImageConverterState {
  conversionResults: Record<string, ConversionResult>;
  processingFormats: Set<string>;
  selectedFormats: string[];
}

const createInitialState = (): ImageConverterState => ({
  conversionResults: {},
  processingFormats: new Set(),
  selectedFormats: [],
});

export const useImageConverter = ({ conversion, conversionResults, conversionId }: UseImageConverterProps = {}) => {
  const [state, setState] = useState<ImageConverterState>(createInitialState());

  // Initialize state from provided conversion results
  useEffect(() => {
    if (conversionResults && conversionResults.length > 0) {
      const conversionResultsMap: Record<string, ConversionResult> = {};
      const existingFormats = new Set<string>();

      conversionResults.forEach((result) => {
        const formatName = result.format;
        existingFormats.add(formatName);

        if (result.status === "completed") {
          // Use signedUrl if available
          const imageUrl = (result as any).signedUrl;
          if (imageUrl) {
            conversionResultsMap[formatName] = {
              success: true,
              imageUrl,
            };
          }
        } else if (result.status === "failed") {
          conversionResultsMap[formatName] = {
            success: false,
            error: "Conversion failed",
          };
        }
      });

      console.log("🔄 useImageConverter: Updating conversion results:", conversionResultsMap);

      setState((prevState) => ({
        ...prevState,
        conversionResults: conversionResultsMap,
        selectedFormats: Array.from(existingFormats),
      }));
    }
  }, [conversionResults]);

  const updateState = useCallback((updates: Partial<ImageConverterState> | ((prev: ImageConverterState) => Partial<ImageConverterState>)) => {
    setState((prev) => {
      const newUpdates = typeof updates === "function" ? updates(prev) : updates;
      return { ...prev, ...newUpdates };
    });
  }, []);

  const downloadImage = useCallback(
    (formatName: string) => {
      const conversionResult = state.conversionResults[formatName];
      if (conversionResult?.success && conversionResult.imageUrl) {
        const link = document.createElement("a");
        link.href = conversionResult.imageUrl;
        link.download = `${formatName.replace(/\s+/g, "_").toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    [state.conversionResults]
  );

  const convertSingleFormat = useCallback(
    async (formatName: string) => {
      // Use conversionId from props or from conversion data
      const actualConversionId = conversionId || conversion?._id;

      if (!actualConversionId) {
        console.log("❌ convertSingleFormat: Missing conversionId", {
          conversionId,
          conversionIdFromData: conversion?._id,
        });
        return;
      }

      // Get formFactor for proper dimensions and platform detection
      const formFactor = getFormFactor(formatName);

      if (!formFactor) {
        console.error(`No formFactor found for format: ${formatName}`);
        return;
      }

      // Set loading state immediately
      updateState((prevState) => ({
        processingFormats: new Set([...prevState.processingFormats, formatName]),
        conversionResults: { ...prevState.conversionResults },
      }));

      // Remove existing result for this format
      updateState((prevState) => {
        const newConversionResults = { ...prevState.conversionResults };
        delete newConversionResults[formatName];

        return {
          conversionResults: newConversionResults,
        };
      });

      try {
        console.log("🚀 convertSingleFormat: Making API call for", formatName);

        // Use the signed URL from conversion data if available
        const signedUrlToUse = conversion?.signedUrl;

        if (!signedUrlToUse) {
          throw new Error("No signed URL available for conversion");
        }

        const conversionResult = await convertImageWithConvex(
          {
            platform: formFactor.platform,
            format: formatName,
            targetFormat: formatName,
            targetWidth: formFactor.width,
            targetHeight: formFactor.height,
            signedUrl: signedUrlToUse,
          },
          actualConversionId
        );

        console.log("✅ convertSingleFormat: API call completed for", formatName, conversionResult);

        // Update conversion result
        updateState((prevState) => ({
          conversionResults: { ...prevState.conversionResults, [formatName]: conversionResult },
        }));
      } catch (error) {
        console.error("❌ convertSingleFormat: Error converting format:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
        alert(`Error: ${errorMessage}`);
      } finally {
        // Clear loading state
        updateState((prevState) => ({
          processingFormats: new Set([...prevState.processingFormats].filter((f) => f !== formatName)),
        }));
      }
    },
    [conversionId, conversion, updateState]
  );

  const retryConversion = useCallback(
    async (formatName: string) => {
      // Use conversionId from props or from conversion data
      const actualConversionId = conversionId || conversion?._id;

      if (!actualConversionId) return;

      // Get formFactor for proper dimensions and platform detection
      const formFactor = getFormFactor(formatName);

      if (!formFactor) {
        console.error(`No formFactor found for format: ${formatName}`);
        return;
      }

      // Set loading state immediately
      updateState((prevState) => ({
        processingFormats: new Set([...prevState.processingFormats, formatName]),
        conversionResults: { ...prevState.conversionResults },
      }));

      // Remove existing result for this format
      updateState((prevState) => {
        const newConversionResults = { ...prevState.conversionResults };
        delete newConversionResults[formatName];

        return {
          conversionResults: newConversionResults,
        };
      });

      try {
        // Use the signed URL from conversion data if available
        const signedUrlToUse = conversion?.signedUrl;

        if (!signedUrlToUse) {
          throw new Error("No signed URL available for retry");
        }

        const conversionResult = await convertImageWithConvex(
          {
            platform: formFactor.platform,
            format: formatName,
            targetFormat: formatName,
            targetWidth: formFactor.width,
            targetHeight: formFactor.height,
            signedUrl: signedUrlToUse,
          },
          actualConversionId
        );

        // Update conversion result
        updateState((prevState) => ({
          conversionResults: { ...prevState.conversionResults, [formatName]: conversionResult },
        }));
      } catch (error) {
        console.error("Error retrying conversion:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
        alert(`Error: ${errorMessage}`);
      } finally {
        // Clear loading state
        updateState((prevState) => ({
          processingFormats: new Set([...prevState.processingFormats].filter((f) => f !== formatName)),
        }));
      }
    },
    [conversionId, conversion, updateState]
  );

  const retryConversionWithMessage = useCallback(
    async (formatName: string, customMessage: string) => {
      // Get the existing converted image to use as the source for editing
      const existingConversionResult = state.conversionResults[formatName];
      if (!existingConversionResult?.success || !existingConversionResult.imageUrl) {
        console.error("No existing image found for editing");
        return;
      }

      // Set loading state immediately
      updateState((prevState) => ({
        processingFormats: new Set([...prevState.processingFormats, formatName]),
        conversionResults: { ...prevState.conversionResults },
      }));

      // Remove existing result for this format
      updateState((prevState) => {
        const newConversionResults = { ...prevState.conversionResults };
        delete newConversionResults[formatName];

        return {
          conversionResults: newConversionResults,
        };
      });

      try {
        // Get the form factor for target dimensions
        const formFactor = getFormFactor(formatName);
        if (!formFactor) return;

        // For editing with instructions, we need to convert the base64 image back to a File
        const response = await fetch(existingConversionResult.imageUrl);
        const blob = await response.blob();
        const file = new File([blob], "edited-image.png", { type: "image/png" });

        const conversionResult = await editImageWithInstructionAction(file, customMessage.trim(), formFactor.width, formFactor.height);

        // Update conversion result
        updateState((prevState) => ({
          conversionResults: { ...prevState.conversionResults, [formatName]: conversionResult },
        }));
      } catch (error) {
        console.error("Error editing image with custom message:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
        alert(`Error: ${errorMessage}`);
      } finally {
        // Clear loading state
        updateState((prevState) => ({
          processingFormats: new Set([...prevState.processingFormats].filter((f) => f !== formatName)),
        }));
      }
    },
    [state.conversionResults, updateState]
  );

  const toggleFormatSelection = useCallback(
    (formatName: string) => {
      updateState((prevState) => ({
        selectedFormats: prevState.selectedFormats.includes(formatName)
          ? prevState.selectedFormats.filter((name) => name !== formatName)
          : [...prevState.selectedFormats, formatName],
      }));
    },
    [updateState]
  );

  const batchUpdateFormats = useCallback(
    (formatNames: string[]) => {
      updateState({
        selectedFormats: formatNames,
      });
    },
    [updateState]
  );

  return {
    ...state,
    downloadImage,
    retryConversion,
    retryConversionWithMessage,
    convertSingleFormat,
    toggleFormatSelection,
    batchUpdateFormats,
  };
};

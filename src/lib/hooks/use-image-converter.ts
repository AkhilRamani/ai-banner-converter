"use client";

import { useState, useCallback } from "react";
import { getFormFactor } from "@/lib/formats";
import { convertImageAction, ConversionResult } from "@/lib/actions";

export interface ImageConverterState {
  uploadedImage: string;
  uploadedFile: File | null;
  selectedFormats: string[];
  conversionResults: Record<string, ConversionResult>;
  previewImages: Record<string, string | undefined>;
  isProcessing: boolean;
  retryingFormats: Set<string>;
}

const createInitialState = (): ImageConverterState => ({
  uploadedImage: "",
  uploadedFile: null,
  selectedFormats: [],
  conversionResults: {},
  previewImages: {},
  isProcessing: false,
  retryingFormats: new Set(),
});

export const useImageConverter = () => {
  const [state, setState] = useState<ImageConverterState>(createInitialState());

  const updateState = useCallback((updates: Partial<ImageConverterState> | ((prev: ImageConverterState) => Partial<ImageConverterState>)) => {
    setState((prev) => {
      const newUpdates = typeof updates === "function" ? updates(prev) : updates;
      return { ...prev, ...newUpdates };
    });
  }, []);

  const resetState = useCallback(() => {
    setState(createInitialState());
  }, []);

  const setImageUpload = useCallback(
    (file: File, preview: string) => {
      updateState({
        uploadedImage: preview,
        uploadedFile: file,
        selectedFormats: [],
        conversionResults: {},
        previewImages: {},
        retryingFormats: new Set(),
      });
    },
    [updateState]
  );

  const toggleFormatSelection = useCallback(
    (formatName: string) => {
      updateState({
        selectedFormats: state.selectedFormats.includes(formatName)
          ? state.selectedFormats.filter((f) => f !== formatName)
          : [...state.selectedFormats, formatName],
      });
    },
    [state.selectedFormats, updateState]
  );

  const setFormatSelections = useCallback(
    (formatNames: string[]) => {
      updateState({
        selectedFormats: formatNames,
      });
    },
    [updateState]
  );

  const downloadImage = useCallback(
    (formatName: string) => {
      const previewImage = state.previewImages[formatName];
      if (previewImage) {
        const link = document.createElement("a");
        link.href = previewImage;
        link.download = `${formatName.replace(/\s+/g, "_").toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    [state.previewImages]
  );

  const convertSelectedFormats = useCallback(async () => {
    if (!state.uploadedFile || state.selectedFormats.length === 0) return;

    updateState({ isProcessing: true });

    try {
      // Only process unconverted formats
      const unconvertedFormats = state.selectedFormats.filter((formatName) => !state.conversionResults[formatName]);

      for (const formatName of unconvertedFormats) {
        const formFactor = getFormFactor(formatName);
        if (formFactor) {
          const conversionResult = await convertImageAction(state.uploadedFile!, {
            targetFormat: formatName,
            targetWidth: formFactor.width,
            targetHeight: formFactor.height,
          });

          // Update both conversion result and preview image atomically
          updateState((prevState) => ({
            conversionResults: { ...prevState.conversionResults, [formatName]: conversionResult },
            previewImages:
              conversionResult.success && conversionResult.imageUrl
                ? { ...prevState.previewImages, [formatName]: conversionResult.imageUrl }
                : prevState.previewImages,
          }));
        }
      }
    } catch (error) {
      console.error("Error processing images:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
      alert(`Error: ${errorMessage}`);
    } finally {
      updateState({ isProcessing: false });
    }
  }, [state.uploadedFile, state.selectedFormats, updateState]);

  const handleFormatDialogComplete = useCallback(() => {
    if (state.selectedFormats.length > 0) {
      convertSelectedFormats();
    }
  }, [state.selectedFormats, convertSelectedFormats]);

  const retryConversion = useCallback(
    async (formatName: string) => {
      if (!state.uploadedFile) return;

      const formFactor = getFormFactor(formatName);
      if (!formFactor) return;

      // Set loading state immediately
      updateState((prevState) => ({
        retryingFormats: new Set([...prevState.retryingFormats, formatName]),
        conversionResults: { ...prevState.conversionResults },
        previewImages: { ...prevState.previewImages },
      }));

      // Remove existing result and preview for this format
      updateState((prevState) => {
        const newConversionResults = { ...prevState.conversionResults };
        delete newConversionResults[formatName];

        const newPreviewImages = { ...prevState.previewImages };
        delete newPreviewImages[formatName];

        return {
          conversionResults: newConversionResults,
          previewImages: newPreviewImages,
        };
      });

      try {
        const conversionResult = await convertImageAction(state.uploadedFile!, {
          targetFormat: formatName,
          targetWidth: formFactor.width,
          targetHeight: formFactor.height,
        });

        // Update both conversion result and preview image atomically
        updateState((prevState) => ({
          conversionResults: { ...prevState.conversionResults, [formatName]: conversionResult },
          previewImages:
            conversionResult.success && conversionResult.imageUrl
              ? { ...prevState.previewImages, [formatName]: conversionResult.imageUrl }
              : prevState.previewImages,
        }));
      } catch (error) {
        console.error("Error retrying conversion:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
        alert(`Error: ${errorMessage}`);
      } finally {
        // Clear loading state
        updateState((prevState) => ({
          retryingFormats: new Set([...prevState.retryingFormats].filter((f) => f !== formatName)),
        }));
      }
    },
    [state.uploadedFile, updateState]
  );

  const handleAddMoreFormats = useCallback(() => {
    // This function can be used to trigger the format selector dialog
    // The actual dialog opening is handled by the FormatSelectorDialog component
    // For now, we'll just ensure the dialog can be opened
  }, []);

  return {
    // State
    ...state,

    // Actions
    setImageUpload,
    toggleFormatSelection,
    setFormatSelections,
    resetState,
    downloadImage,
    retryConversion,

    // Computed
    hasUploadedImage: !!state.uploadedFile,
    hasSelectedFormats: state.selectedFormats.length > 0,
    unconvertedFormats: state.selectedFormats.filter((formatName) => !state.conversionResults[formatName]),

    // Event handlers
    handleConvertSelected: convertSelectedFormats,
    handleFormatDialogComplete,
    handleAddMoreFormats,
  };
};

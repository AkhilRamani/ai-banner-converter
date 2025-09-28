"use client";

import { useState } from "react";
import { CanvasPlaceholder } from "@/components/canvas-placeholder";
import { ArrowRight } from "lucide-react";
import { FormatSelectorDialog } from "../format-selector-dialog";
import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { useImageConverterContext } from "@/lib/hooks/use-image-converter-context";
import Image from "next/image";

export function MainContent() {
  const {
    selectedFormats,
    conversionResults,
    previewImages,
    isProcessing,
    retryingFormats,
    downloadImage,
    retryConversion,
    retryConversionWithMessage,
    toggleFormatSelection,
    handleFormatDialogComplete,
    setFormatSelections,
    hasUploadedImage,
  } = useImageConverterContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (selectedFormats.length > 0) {
    return (
      <CanvasPlaceholder
        selectedFormats={selectedFormats}
        conversionResults={conversionResults}
        previewImages={previewImages}
        isConverting={isProcessing}
        retryingFormats={retryingFormats}
        onDownload={downloadImage}
        onRetry={retryConversion}
        onRetryWithMessage={retryConversionWithMessage}
        onFormatToggle={toggleFormatSelection}
        onSelectComplete={handleFormatDialogComplete}
        onBatchFormatUpdate={setFormatSelections}
      />
    );
  }

  return (
    <div className="flex items-center justify-center flex-1 h-full">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-2xl shadow-black/5 text-center overflow-hidden">
        <Image src="/imgs/bg-cover.png" alt="Your Image" width={500} height={300} className="h-72 object-cover" />
        <div className="p-8">
          <h3 className="mb-2 text-xl font-medium">Ready to Convert Your Designs</h3>
          <p className="mb-6 text-sm text-gray-600">Upload your design and select formats to convert</p>

          {/* Show when no formats are selected */}
          <FormatSelectorDialog
            selectedFormats={selectedFormats}
            convertedFormats={Object.keys(conversionResults).filter((formatName) => conversionResults[formatName]?.success)}
            onFormatToggle={toggleFormatSelection}
            onSelectComplete={handleFormatDialogComplete}
            onBatchFormatUpdate={setFormatSelections}
            externalOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            trigger={
              <ButtonCustom size="lg" variant="main">
                Select Formats
                <ArrowRight />
              </ButtonCustom>
            }
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { CanvasPlaceholder } from "@/components/canvas-placeholder";
import { Card, CardContent } from "@/components/ui/card";
import { Wand } from "lucide-react";
import { ConversionResult } from "@/lib/actions";
import { FormatSelectorDialog } from "../format-selector-dialog";
import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { useImageConverterContext } from "@/lib/hooks/use-image-converter-context";

export function MainContent() {
  const {
    selectedFormats,
    conversionResults,
    previewImages,
    isProcessing,
    retryingFormats,
    downloadImage,
    retryConversion,
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
        onFormatToggle={toggleFormatSelection}
        onSelectComplete={handleFormatDialogComplete}
        onBatchFormatUpdate={setFormatSelections}
      />
    );
  }

  return (
    <div className="flex items-center justify-center flex-1 h-full">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 text-center">
          <Wand className="mx-auto mb-4 text-muted-foreground/60 size-8" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">Ready to Convert Your Designs</h3>
          <p className="mb-6 text-sm text-gray-600">Upload your design or select formats first</p>

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
                <Wand className="mr-2" />
                Select Formats
              </ButtonCustom>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

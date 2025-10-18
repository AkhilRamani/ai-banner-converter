"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormFactor, FORM_FACTORS_BY_PLATFORM } from "@/lib/formats";
import { cn } from "@/lib/utils";
import { FormatSelectorDialog } from "./format-selector-dialog";
import { SelectFormatsCTA } from "./shared/CTAs/select-formats-cta";
import { useImageConverter, ConversionResultWithSignedUrl } from "@/lib/hooks/use-image-converter";
import { Doc } from "../../convex/_generated/dataModel";
import { PlaceholderBox } from "./placeholder-box";
import { PlatformIcon } from "./shared/platform-icon";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface CanvasProps {
  conversion?: Doc<"conversions"> & { signedUrl?: string };
  conversionResults?: ConversionResultWithSignedUrl[];
}

export function Canvas({ conversion, conversionResults }: CanvasProps = {}) {
  const {
    conversionResults: localConversionResults,
    processingFormats,
    selectedFormats,
    downloadImage,
    retryConversion,
    retryConversionWithMessage,
    convertSingleFormat,
    toggleFormatSelection,
    batchUpdateFormats,
  } = useImageConverter({
    conversion,
    conversionResults,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mutation for deleting conversion results
  const deleteConversionResultMutation = useMutation(api.functions.conversionResults.deleteConversionResult);

  // Format selection handlers
  const handleFormatToggle = useCallback(
    (formatName: string) => {
      console.log("🔄 Format toggled:", formatName);
      toggleFormatSelection(formatName);
    },
    [toggleFormatSelection]
  );

  const handleBatchFormatUpdate = useCallback(
    (formatNames: string[]) => {
      console.log("🔄 Batch format update:", formatNames);
      batchUpdateFormats(formatNames);
      setIsDialogOpen(false);
    },
    [batchUpdateFormats]
  );

  // Get converted formats from context data
  const convertedFormats = Object.keys(localConversionResults).filter((formatName) => localConversionResults[formatName]?.success);

  // Group selected formats by platform
  const formatsByPlatform: Record<string, FormFactor[]> = {};

  selectedFormats.forEach((formatName) => {
    const formFactor = Object.values(FORM_FACTORS_BY_PLATFORM)
      .flat()
      .find((f) => f.name === formatName);

    if (formFactor) {
      if (!formatsByPlatform[formFactor.platform]) {
        formatsByPlatform[formFactor.platform] = [];
      }
      formatsByPlatform[formFactor.platform].push(formFactor);
    }
  });

  // Show empty state when no formats are selected
  if (selectedFormats.length === 0) {
    return (
      <div className="h-full flex">
        <SelectFormatsCTA
          selectedFormats={selectedFormats}
          convertedFormats={convertedFormats}
          onFormatToggle={handleFormatToggle}
          onBatchFormatUpdate={handleBatchFormatUpdate}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative")}>
      <div className="space-y-16 pb-20">
        {Object.entries(formatsByPlatform).map(([platform, formats]) => (
          <div key={platform} className="space-y-8">
            <div className="flex items-center gap-8 py-2 px-4 rounded-lg bg-white border w-full max-w-[38rem] justify-between shadow-3xl shadow-red-900/5">
              <div className="flex items-center gap-2 opacity-70">
                <PlatformIcon platform={platform} />
                <h3 className="text-base font-medium">{platform}</h3>
              </div>
              <div className="flex items-center justify-center text-xs font-semibold pb-[1px] text-white bg-blue-900 rounded-full size-5">
                {formats.length}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {formats.map((formFactor) => {
                const localResult = localConversionResults[formFactor.name];

                return (
                  <PlaceholderBox
                    key={formFactor.name}
                    formFactor={formFactor}
                    conversionResult={localResult}
                    previewImage={localResult?.success ? localResult.imageUrl : undefined}
                    isConverting={processingFormats.has(formFactor.name)}
                    isRetrying={processingFormats.has(formFactor.name)}
                    onDownload={() => downloadImage(formFactor.name)}
                    onRetry={() => retryConversion(formFactor.name)}
                    onRetryWithMessage={(message) => retryConversionWithMessage(formFactor.name, message)}
                    onConvert={() => convertSingleFormat(formFactor.name)}
                    onDelete={async () => {
                      if (localResult?.conversionResultId) {
                        await deleteConversionResultMutation({ formatId: localResult.conversionResultId as any });
                        // Remove format from selectedFormats after successful deletion
                        toggleFormatSelection(formFactor.name);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button - Only show when there are selected formats */}
      {selectedFormats.length > 0 && (
        <Button
          onClick={() => setIsDialogOpen(true)}
          size="lg"
          className="fixed z-50 transition-all duration-200 rounded-full shadow-lg bottom-6 right-6 h-14 w-14 hover:shadow-xl"
          title="Add more formats"
        >
          <Plus className="size-5" />
        </Button>
      )}

      <FormatSelectorDialog
        selectedFormats={selectedFormats}
        convertedFormats={convertedFormats}
        onFormatToggle={handleFormatToggle}
        onSelectComplete={() => {}}
        onBatchFormatUpdate={handleBatchFormatUpdate}
        externalOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        trigger={<div />} // Empty trigger since we're controlling it externally
      />
    </div>
  );
}

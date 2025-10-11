"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Plus, RotateCcw, ArrowRight } from "lucide-react";
import { FormFactor, FORM_FACTORS_BY_PLATFORM } from "@/lib/formats";
import { ConversionResult } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { FormatSelectorDialog } from "./format-selector-dialog";
import { RetryWithMessageDialog } from "./retry-with-message-dialog";
import { ButtonCustom } from "./ui/custom/button-custom";
import Image from "next/image";
import { useImageConverter, ConversionResultWithSignedUrl } from "@/lib/hooks/use-image-converter";
import { Doc } from "../../convex/_generated/dataModel";

const PlatformIcon = ({ platform, className }: { platform: string; className?: string }) => {
  const iconMap: Record<string, string> = {
    Instagram: "/icons/instagram-icon.svg",
    Facebook: "/icons/fb-icon.svg",
    Meta: "/icons/meta-icon.svg",
    "Google Ads": "/icons/google-icon.svg",
    LinkedIn: "/icons/linkedin-icon.svg",
    "Twitter/X": "/icons/x-icon.svg",
    YouTube: "/icons/youtube-icon.svg",
    Pinterest: "/icons/pinterest-icon.svg",
    TikTok: "/icons/tiktok-icon.svg",
    Twitch: "/icons/twitch-icon.svg",
    Email: "/icons/google-icon.svg",
    Website: "/icons/google-icon.svg",
  };

  const iconSrc = iconMap[platform] || "/icons/google-icon.svg";

  return <img src={iconSrc} alt={`${platform} icon`} className={cn("w-4 h-4", className)} />;
};

interface PlaceholderBoxProps {
  formFactor: FormFactor;
  conversionResult?: ConversionResult;
  previewImage?: string;
  isConverting?: boolean;
  isRetrying?: boolean;
  onDownload?: () => void;
  onRetry?: () => void;
  onRetryWithMessage?: (message: string) => void;
  onConvert?: () => void;
  className?: string;
}

const PlaceholderBox = ({
  formFactor,
  conversionResult,
  previewImage,
  isConverting = false,
  isRetrying = false,
  onDownload,
  onRetry,
  onRetryWithMessage,
  onConvert,
  className,
}: PlaceholderBoxProps) => {
  const aspectRatio = formFactor.width / formFactor.height;
  const isVeryWide = aspectRatio > 3;
  const isVeryTall = aspectRatio < 0.5;
  const [isRetryDialogOpen, setIsRetryDialogOpen] = useState(false);

  // Determine the current state
  const hasError = conversionResult && !conversionResult.success && conversionResult.error;
  const hasPreview = !!previewImage;
  const isLoading = isConverting || isRetrying;

  if (hasPreview) {
    return (
      <div className={cn("relative h-fit group", className)}>
        <div className="mb-4 text-sm font-medium text-center">{formFactor.name}</div>
        <div
          className={cn("relative bg-gray-100 group rounded-xl overflow-hidden", hasError && "ring-2 ring-red-500/50 bg-red-50/50")}
          style={{
            aspectRatio: `${formFactor.width}/${formFactor.height}`,
          }}
        >
          <img src={previewImage} alt={formFactor.name} className="object-contain w-full h-full" />

          {/* Error overlay */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
              <div className="text-center text-red-700">
                <div className="text-sm font-medium">Conversion Failed</div>
                <div className="text-xs mt-1 opacity-75">{conversionResult?.error}</div>
              </div>
            </div>
          )}
        </div>

        <div
          className={cn(
            "absolute -bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white rounded-full px-2 py-1 shadow",
            "hidde opacity-0 -mb-2 items-center group-hover:mb-0 group-hover:flex group-hover:opacity-100 ease-out duration-150"
          )}
        >
          <ButtonCustom className={cn("size-8")} variant="ghost" size="icon" onClick={() => setIsRetryDialogOpen(true)}>
            <RotateCcw className="size-3.5" />
          </ButtonCustom>
          {!hasError && (
            <ButtonCustom className={cn("size-8")} variant="ghost" size="icon" onClick={onDownload}>
              <Download className="size-3.5" />
            </ButtonCustom>
          )}
        </div>

        {/* Retry with Message Dialog */}
        <RetryWithMessageDialog
          isOpen={isRetryDialogOpen}
          onOpenChange={setIsRetryDialogOpen}
          lastConvertedImage={previewImage}
          formatName={formFactor.name}
          onRetryWithMessage={(message) => {
            onRetryWithMessage?.(message);
            setIsRetryDialogOpen(false);
          }}
          isRetrying={isRetrying}
          trigger={<div />}
        />
      </div>
    );
  }

  // Placeholder state
  return (
    <div className={cn("overflow-hidden", className, isLoading && "animate-pulse duration-500")}>
      <div className="mb-4 text-sm font-medium text-center">{formFactor.name}</div>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center border rounded-lg transition-colors",
          isLoading
            ? "bg-gradient-to-tr from-blue-50/50 to-blue-100/50 border-blue-200"
            : "bg-gradient-to-tr from-muted-foreground/10 to-muted-foreground/5"
        )}
        style={{
          aspectRatio: `${formFactor.width}/${formFactor.height}`,
        }}
      >
        <div className="flex flex-col items-center gap-2 p-4">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="text-blue-600 animate-spin size-8 stroke-2" />
              <div className="text-center">
                <div className="text-sm font-medium text-blue-700">{isRetrying ? "Retrying..." : "Converting..."}</div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center opacity-70">
                <div className="mb-1 text-xs opacity-85">{formFactor.aspectRatio}</div>
                <div className="text-xs opacity-85">
                  {formFactor.width}×{formFactor.height}
                </div>
              </div>
              {onConvert && (
                <ButtonCustom
                  onClick={() => {
                    console.log("🔘 Convert button clicked for format:", formFactor.name);
                    onConvert();
                  }}
                  size="sm"
                  variant="main"
                  className="mt-2"
                >
                  Convert
                </ButtonCustom>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface CanvasPlaceholderProps {
  conversionId?: string;
  conversion?: Doc<"conversions"> & { signedUrl?: string };
  conversionResults?: ConversionResultWithSignedUrl[];
}

export function CanvasPlaceholder({ conversionId, conversion, conversionResults }: CanvasPlaceholderProps = {}) {
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
    conversionId,
    conversion,
    conversionResults,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      <div className={cn("relative")}>
        <div className="flex items-center justify-center flex-1 h-full">
          <div className="w-full max-w-md bg-white border rounded-2xl shadow-2xl shadow-black/5 text-center overflow-hidden">
            <Image src="/imgs/bg-cover.png" alt="Your Image" width={500} height={300} className="h-72 object-cover" />
            <div className="p-8">
              <h3 className="mb-2 text-xl font-medium">Ready to Convert Your Designs</h3>
              <p className="mb-6 text-sm text-gray-600">Upload your design and select formats to convert</p>

              {/* Show when no formats are selected */}
              <FormatSelectorDialog
                selectedFormats={selectedFormats}
                convertedFormats={convertedFormats}
                onFormatToggle={handleFormatToggle}
                onSelectComplete={() => {}}
                onBatchFormatUpdate={handleBatchFormatUpdate}
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
      </div>
    );
  }

  return (
    <div className={cn("relative")}>
      <div className="space-y-16">
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
              {formats.map((formFactor) => (
                <PlaceholderBox
                  key={formFactor.name}
                  formFactor={formFactor}
                  conversionResult={localConversionResults[formFactor.name]}
                  previewImage={localConversionResults[formFactor.name]?.success ? localConversionResults[formFactor.name]?.imageUrl : undefined}
                  isConverting={processingFormats.has(formFactor.name)}
                  isRetrying={processingFormats.has(formFactor.name)}
                  onDownload={() => downloadImage(formFactor.name)}
                  onRetry={() => retryConversion(formFactor.name)}
                  onRetryWithMessage={(message) => retryConversionWithMessage(formFactor.name, message)}
                  onConvert={() => convertSingleFormat(formFactor.name)}
                />
              ))}
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

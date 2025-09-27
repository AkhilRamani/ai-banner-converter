"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Plus, RotateCcw } from "lucide-react";
import { FormFactor, FORM_FACTORS_BY_PLATFORM } from "@/lib/formats";
import { ConversionResult } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { FormatSelectorDialog } from "./format-selector-dialog";
import { ButtonCustom } from "./ui/custom/button-custom";

interface PlatformIconProps {
  platform: string;
  className?: string;
}

const PlatformIcon = ({ platform, className }: PlatformIconProps) => {
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
  className,
}: PlaceholderBoxProps) => {
  const aspectRatio = formFactor.width / formFactor.height;
  const isVeryWide = aspectRatio > 3;
  const isVeryTall = aspectRatio < 0.5;

  if (previewImage) {
    return (
      <div className={cn("relative h-fit", className)}>
        <div className="mb-4 text-sm font-medium text-center">{formFactor.name}</div>
        <div
          className="relative bg-gray-100 group"
          style={{
            aspectRatio: `${formFactor.width}/${formFactor.height}`,
          }}
        >
          <img src={previewImage} alt={formFactor.name} className="object-contain w-full h-full" />

          {/* Download button overlay */}
          <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
            <Button size="sm" onClick={onDownload} className="text-gray-900 bg-white/90 hover:bg-white">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="absolute right-0 -bottom-9">
          <ButtonCustom className="mt-2 w-7 h-7" variant="secondary" onClick={onRetry} title="Retry conversion">
            <RotateCcw className="size-3.5" />
          </ButtonCustom>
        </div>
      </div>
    );
  }

  // Placeholder state
  return (
    <div className={cn("overflow-hidden", className, (isConverting || isRetrying) && "animate-pulse duration-500")}>
      <div className="mb-4 text-sm font-medium text-center">{formFactor.name}</div>
      <div
        className="relative flex flex-col items-center justify-center border border-red-900/15 bg-white/75"
        style={{
          aspectRatio: `${formFactor.width}/${formFactor.height}`,
        }}
      >
        <div className="flex flex-col items-center gap-2 p-4">
          {isConverting || isRetrying ? (
            <Loader2 className="text-red-950/80 animate-spin size-10 stroke-1 !duration-200" />
          ) : (
            <div className="text-center opacity-70">
              <div className="mb-1 text-xs opacity-85">{formFactor.aspectRatio}</div>
              <div className="text-xs opacity-85">
                {formFactor.width}×{formFactor.height}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface CanvasPlaceholderProps {
  selectedFormats: string[];
  conversionResults: Record<string, ConversionResult>;
  previewImages: Record<string, string | undefined>;
  isConverting: boolean;
  retryingFormats: Set<string>;
  onDownload?: (formatName: string) => void;
  onRetry?: (formatName: string) => void;
  onFormatToggle?: (formatName: string) => void;
  onSelectComplete?: () => void;
  onBatchFormatUpdate?: (formatNames: string[]) => void;
  className?: string;
}

export function CanvasPlaceholder({
  selectedFormats,
  conversionResults,
  previewImages,
  isConverting,
  retryingFormats,
  onDownload,
  onRetry,
  onFormatToggle,
  onSelectComplete,
  onBatchFormatUpdate,
  className,
}: CanvasPlaceholderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  return (
    <div className={cn("relative", className)}>
      <div className="space-y-16">
        {Object.entries(formatsByPlatform).map(([platform, formats]) => (
          <div key={platform} className="space-y-8">
            <div className="flex items-center gap-8 py-2 px-4 rounded-lg bg-white w-full max-w-[38rem] justify-between shadow-3xl shadow-red-900/5">
              <div className="flex items-center gap-2 opacity-70">
                <PlatformIcon platform={platform} />
                <h3 className="text-base font-medium">{platform}</h3>
              </div>
              <div className="flex items-center justify-center text-xs font-semibold pb-[1px] text-white bg-red-900 rounded-full size-5">
                {formats.length}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {formats.map((formFactor) => (
                <PlaceholderBox
                  key={formFactor.name}
                  formFactor={formFactor}
                  conversionResult={conversionResults[formFactor.name]}
                  previewImage={previewImages[formFactor.name]}
                  isConverting={isConverting && !previewImages[formFactor.name]}
                  isRetrying={retryingFormats.has(formFactor.name)}
                  onDownload={() => onDownload?.(formFactor.name)}
                  onRetry={() => onRetry?.(formFactor.name)}
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
          className="fixed z-50 transition-all duration-200 bg-red-900 rounded-full shadow-lg bottom-6 right-6 h-14 w-14 hover:shadow-xl hover:bg-red-950"
          title="Add more formats"
        >
          <Plus className="size-5" />
        </Button>
      )}

      {/* Format Selector Dialog - Only render when there are selected formats */}
      {selectedFormats.length > 0 && (
        <FormatSelectorDialog
          selectedFormats={selectedFormats}
          convertedFormats={Object.keys(conversionResults).filter((formatName) => conversionResults[formatName]?.success)}
          onFormatToggle={onFormatToggle || (() => {})}
          onSelectComplete={onSelectComplete || (() => {})}
          onBatchFormatUpdate={onBatchFormatUpdate}
          externalOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          trigger={<div />} // Empty trigger since we're controlling it externally
        />
      )}
    </div>
  );
}

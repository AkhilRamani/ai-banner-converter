"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, RotateCcw } from "lucide-react";
import { FormFactor } from "@/lib/formats";
import { ConversionResult } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { RetryWithMessageDialog } from "./retry-with-message-dialog";
import { ButtonCustom } from "./ui/custom/button-custom";

export interface PlaceholderBoxProps {
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

export const PlaceholderBox = ({
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

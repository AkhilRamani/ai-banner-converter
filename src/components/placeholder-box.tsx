"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, RotateCcw, Sparkle } from "lucide-react";
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
    <div className={cn("overflow-hidden relative", className, isLoading && "animate-pulse")}>
      <div className="mb-4 text-sm font-medium text-center">{formFactor.name}</div>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center border rounded-lg transition-colors",
          isLoading
            ? "bg-gradient-to-bl from-neutral-100 to-neutral-800/10 border-neutral-300/70"
            : "bg-gradient-to-tr from-muted-foreground/10 to-muted-foreground/5"
        )}
        style={{
          aspectRatio: `${formFactor.width}/${formFactor.height}`,
        }}
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="text-neutral-700/60 animate-spin size-10 stroke-[1.6]" />
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
                className="px-2.5 absolute bottom-2 right-2 bg-primary/5 hover:bg-neutral-300 text-neutral-500 hover:text-neutral-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="-mr-0.5">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12.993.065a.32.32 0 0 0-.5.167l-.348 1.214a1.6 1.6 0 0 1-1.099 1.1l-1.214.346a.32.32 0 0 0 0 .616l1.214.347a1.6 1.6 0 0 1 1.1 1.099l.346 1.214a.32.32 0 0 0 .616 0l.347-1.214a1.6 1.6 0 0 1 1.099-1.1l1.214-.346a.32.32 0 0 0 0-.616l-1.214-.346s-.5-.215-.692-.408a1.6 1.6 0 0 1-.407-.692L13.108.232a.32.32 0 0 0-.115-.167ZM6.785 3.329a.64.64 0 0 0-1 .335L5.09 6.093A3.2 3.2 0 0 1 2.893 8.29l-2.43.694a.64.64 0 0 0 0 1.23l2.43.694a3.2 3.2 0 0 1 2.198 2.199l.694 2.428a.64.64 0 0 0 1.23 0l.694-2.428a3.2 3.2 0 0 1 2.198-2.199l2.43-.694a.64.64 0 0 0 0-1.23l-2.43-.694s-.999-.43-1.384-.814a3.2 3.2 0 0 1-.814-1.384l-.694-2.429a.64.64 0 0 0-.23-.335Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Convert
              </ButtonCustom>
            )}
          </>
        )}
      </div>
    </div>
  );
};

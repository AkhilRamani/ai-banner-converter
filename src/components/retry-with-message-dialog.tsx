"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogContentCustom } from "./ui/custom/dialog-custom";
import { ButtonCustom } from "./ui/custom/button-custom";
import Image from "next/image";

interface RetryWithMessageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lastConvertedImage?: string;
  formatName: string;
  onRetryWithMessage: (message: string) => void;
  isRetrying?: boolean;
  trigger: React.ReactNode;
}

export function RetryWithMessageDialog({
  isOpen,
  onOpenChange,
  lastConvertedImage,
  formatName,
  onRetryWithMessage,
  isRetrying = false,
  trigger,
}: RetryWithMessageDialogProps) {
  const [customMessage, setCustomMessage] = useState("");

  const handleSubmit = () => {
    if (customMessage.trim()) {
      onRetryWithMessage(customMessage.trim());
      setCustomMessage("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setCustomMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContentCustom className="!max-w-[80vw] max-h-[90vh] h-full flex flex-col gap-0" title="Regenerate or edit design">
        <div className="flex gap-6 h-full">
          {/* Last converted image preview */}
          {lastConvertedImage && (
            <div className="flex-1 flex bg-neutral-100 border rounded-lg p-6">
              <Image
                src={lastConvertedImage}
                alt={`Last converted ${formatName}`}
                className="object-contain h-auto- w-full"
                width={400}
                height={400}
              />
            </div>
          )}

          {/* Custom message input */}
          <div className="max-w-[30%] flex flex-col gap-10 justify-between">
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="text-base font-medium text-gray-900">Custom Instructions for {formatName}</h3>
              <p className="text-sm text-muted-foreground">
                Describe how you'd like the AI to modify or improve this image. Be specific about changes, style, or elements you want to adjust.
              </p>
              <Textarea
                value={customMessage}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomMessage(e.target.value)}
                placeholder="e.g., Remove bottom text, replace title text with 'Some new title', move element to corner/center ..."
                className="min-h-[120px] h-full resize-none"
                disabled={isRetrying}
              />
            </div>
            <div className="flex items-center gap-3">
              <ButtonCustom variant="outline" onClick={handleCancel} disabled={isRetrying} className="grow">
                Cancel
              </ButtonCustom>
              <ButtonCustom variant="main" onClick={handleSubmit} disabled={!customMessage.trim() || isRetrying} className="px-4">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry with Instructions
              </ButtonCustom>
            </div>
          </div>
        </div>
      </DialogContentCustom>
    </Dialog>
  );
}

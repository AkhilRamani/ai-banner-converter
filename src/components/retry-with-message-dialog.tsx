"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <DialogContent className="!max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col gap-0 p-0">
        <DialogHeader className="px-6 py-5 border-b">
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Retry Conversion with Custom Instructions
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-6 space-y-6 overflow-auto">
          {/* Last converted image preview */}
          {lastConvertedImage && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Last Converted Image</h3>
              <div className="relative bg-gray-100 border border-gray-300 rounded-lg p-4">
                <img src={lastConvertedImage} alt={`Last converted ${formatName}`} className="object-contain w-full h-auto max-h-64 rounded" />
              </div>
            </div>
          )}

          {/* Custom message input */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Custom Instructions for {formatName}</h3>
            <p className="text-sm text-gray-600">
              Describe how you'd like the AI to modify or improve this conversion. Be specific about changes, style, or elements you want to adjust.
            </p>
            <Textarea
              value={customMessage}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomMessage(e.target.value)}
              placeholder="e.g., Make the background more vibrant, add modern styling, focus on the product details, use a minimalist approach..."
              className="min-h-[120px] resize-none"
              disabled={isRetrying}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="text-sm text-gray-600">
            {customMessage.trim() ? (
              <span className="text-green-600">Ready to retry with custom instructions</span>
            ) : (
              "Enter custom instructions to retry"
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} disabled={isRetrying}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!customMessage.trim() || isRetrying} className="px-4">
              {isRetrying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retry with Instructions
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

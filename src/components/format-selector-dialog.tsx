"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogContentCustom } from "@/components/ui/custom/dialog-custom";
import { Check, Plus } from "lucide-react";
import { FormFactor, FORM_FACTORS_BY_PLATFORM } from "@/lib/formats";
import { cn } from "@/lib/utils";
import { PlatformIcon } from "./shared/platform-icon";
import { ButtonCustom } from "./ui/custom/button-custom";

interface FormatCardProps {
  formFactor: FormFactor;
  isSelected: boolean;
  isConverted: boolean;
  onToggle: () => void;
  className?: string;
}

const FormatCard = ({ formFactor, isSelected, isConverted, onToggle, className }: FormatCardProps) => {
  const aspectRatio = formFactor.width / formFactor.height;
  const isVeryWide = aspectRatio > 3;
  const isVeryTall = aspectRatio < 0.5;
  const isDisabled = isConverted;

  return (
    <div
      className={cn(
        "relative flex flex-col justify-center overflow-hidden bg-gray-100 border border-gray-300 rounded-lg p-2",
        "transition-all duration-200",
        isSelected && !isConverted && "ring-2 ring-blue-500 shadow-lg bg-blue-50 cursor-pointer hover:shadow-md",
        isSelected && isConverted && "ring-2 ring-green-500 bg-green-50",
        isDisabled && "opacity-60 cursor-not-allowed",
        !isSelected && !isDisabled && "cursor-pointer hover:shadow-md",
        className
      )}
      style={{
        aspectRatio: `${formFactor.width}/${formFactor.height}`,
      }}
      onClick={isDisabled ? undefined : onToggle}
    >
      {isSelected && (
        <div className="absolute z-10 top-1 right-1">
          <div className={cn("rounded-full p-0.5", isConverted ? "bg-green-500" : "bg-blue-500")}>
            <Check className="w-2 h-2 text-white" />
          </div>
        </div>
      )}

      {isConverted && (
        <div className="absolute z-10 top-1 left-1">
          <div className="bg-green-500 text-white text-xs px-1 py-0.5 rounded">✓</div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center h-full gap-1">
        <h4 className={cn("font-medium text-center leading-tight", isVeryWide || isVeryTall ? "text-xs" : "text-sm")}>
          <span className="block max-w-full truncate" title={formFactor.name}>
            {formFactor.name}
          </span>
        </h4>

        <div className={cn("text-center opacity-75", isVeryWide || isVeryTall ? "text-xs" : "text-xs")}>
          {isVeryWide || isVeryTall ? (
            <div className="max-w-full truncate" title={`${formFactor.aspectRatio} • ${formFactor.width}×${formFactor.height}`}>
              {formFactor.aspectRatio} • {formFactor.width}×{formFactor.height}
            </div>
          ) : (
            <>
              <div className="font-medium">{formFactor.aspectRatio}</div>
              <div>
                {formFactor.width}×{formFactor.height}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface FormatSelectorDialogProps {
  selectedFormats: string[];
  convertedFormats: string[];
  onFormatToggle: (formatName: string) => void;
  onSelectComplete: () => void;
  onBatchFormatUpdate?: (formatNames: string[]) => void;
  trigger: React.ReactNode;
  externalOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function FormatSelectorDialog({
  selectedFormats,
  convertedFormats,
  onFormatToggle,
  onSelectComplete,
  onBatchFormatUpdate,
  trigger,
  externalOpen,
  onOpenChange,
}: FormatSelectorDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingSelections, setPendingSelections] = useState<string[]>(selectedFormats);
  const platforms = Object.keys(FORM_FACTORS_BY_PLATFORM);

  // Use external control when available, otherwise use internal state
  const isControlled = externalOpen !== undefined && onOpenChange !== undefined;

  // Sync pendingSelections with selectedFormats when dialog is controlled externally
  useEffect(() => {
    if (isControlled) {
      setPendingSelections(selectedFormats);
    }
  }, [selectedFormats, isControlled]);

  const open = isControlled ? externalOpen : isOpen;

  const handleDialogClose = (open: boolean) => {
    if (isControlled) {
      onOpenChange!(open);
    } else {
      setIsOpen(open);
    }

    if (!open) {
      // Reset pending selections when dialog is closed without confirming
      setPendingSelections(selectedFormats);
    }
  };

  const handleFormatToggle = (formatName: string) => {
    setPendingSelections((prev) => (prev.includes(formatName) ? prev.filter((name) => name !== formatName) : [...prev, formatName]));
  };

  const handleDone = () => {
    // Use batch update if available, otherwise fall back to individual toggles
    if (onBatchFormatUpdate) {
      onBatchFormatUpdate(pendingSelections);
    } else {
      // Fallback to individual toggles with proper sequencing
      const currentSelections = [...selectedFormats];

      // Remove formats that are no longer selected
      currentSelections.forEach((formatName) => {
        if (!pendingSelections.includes(formatName)) {
          onFormatToggle(formatName);
        }
      });

      // Add newly selected formats
      pendingSelections.forEach((formatName) => {
        if (!currentSelections.includes(formatName)) {
          onFormatToggle(formatName);
        }
      });
    }

    // Use external control when available
    if (isControlled) {
      onOpenChange!(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContentCustom className="!max-w-4xl max-h-[90vh]" title="Select Formats to Convert">
        <div className="px-6 pb-10 space-y-10 -mx-6 h-min">
          {platforms.map((platform) => {
            const platformFormats = FORM_FACTORS_BY_PLATFORM[platform] || [];
            const selectedCount = platformFormats.filter((f) => selectedFormats.includes(f.name)).length;
            const allSelected = platformFormats.every((f) => selectedFormats.includes(f.name));

            return (
              <div key={platform} className="space-y-6 grow pb-8">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-base font-medium text-gray-900">
                    <PlatformIcon platform={platform} className="opacity-50 size-5" />
                    {platform}
                  </h3>
                  <div className="flex items-center gap-2">
                    {selectedCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {selectedCount} selected
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {platformFormats.map((formFactor) => (
                    <FormatCard
                      key={formFactor.name}
                      formFactor={formFactor}
                      isSelected={pendingSelections.includes(formFactor.name)}
                      isConverted={convertedFormats.includes(formFactor.name)}
                      onToggle={() => handleFormatToggle(formFactor.name)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 pb-6 px-6 pt-6 flex items-center justify-between bg-gradient-to-t from-white from-75% to-transparent">
          <div className="text-sm text-gray-600">
            {pendingSelections.length} format{pendingSelections.length !== 1 ? "s" : ""} selected
          </div>
          <div className="flex gap-3">
            <ButtonCustom variant="outline" className="w-28" onClick={() => handleDialogClose(false)}>
              Cancel
            </ButtonCustom>
            <ButtonCustom variant="main" className="w-28" onClick={handleDone} disabled={pendingSelections.length === 0}>
              <Plus />
              Add
            </ButtonCustom>
          </div>
        </div>
      </DialogContentCustom>
    </Dialog>
  );
}

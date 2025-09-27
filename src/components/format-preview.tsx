"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { FormFactor } from "@/lib/formats";
import { cn } from "@/lib/utils";

interface FormatPreviewProps {
  formFactor: FormFactor;
  previewImage?: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onDownload?: () => void;
  className?: string;
}

export function FormatPreview({ formFactor, previewImage, isSelected = false, onSelect, onDownload, className }: FormatPreviewProps) {
  const aspectRatio = formFactor.width / formFactor.height;
  const previewHeight = 200;
  const previewWidth = previewHeight * aspectRatio;

  return (
    <Card
      className={cn("cursor-pointer transition-all duration-200 hover:shadow-md", isSelected && "ring-2 ring-blue-500 shadow-lg", className)}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{formFactor.name}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {formFactor.platform}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>
            {formFactor.width} × {formFactor.height}
          </span>
          <span>•</span>
          <span>{formFactor.aspectRatio}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Preview Container */}
          <div
            className="relative overflow-hidden border border-gray-300 rounded bg-muted"
            style={{
              width: Math.min(previewWidth, 300),
              height: previewHeight,
              aspectRatio: `${formFactor.width}/${formFactor.height}`,
            }}
          >
            {previewImage && <img src={previewImage} alt={`${formFactor.name} preview`} className="object-cover w-full h-full" />}
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.();
              }}
            >
              <Eye className="w-3 h-3 mr-1" />
              Preview
            </Button>
            {previewImage && onDownload && (
              <Button
                size="sm"
                className="flex-1 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload();
                }}
              >
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface FormatGridProps {
  formFactors: FormFactor[];
  selectedFormat?: string;
  onFormatSelect: (formatName: string) => void;
  previewImages?: Record<string, string>;
  onDownload?: (formatName: string) => void;
  className?: string;
}

export function FormatGrid({ formFactors, selectedFormat, onFormatSelect, previewImages = {}, onDownload, className }: FormatGridProps) {
  const platforms = [...new Set(formFactors.map((f) => f.platform))];

  return (
    <div className={cn("space-y-6", className)}>
      {platforms.map((platform) => {
        const platformFormats = formFactors.filter((f) => f.platform === platform);

        return (
          <div key={platform} className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">{platform}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {platformFormats.map((formFactor) => (
                <FormatPreview
                  key={formFactor.name}
                  formFactor={formFactor}
                  previewImage={previewImages[formFactor.name]}
                  isSelected={selectedFormat === formFactor.name}
                  onSelect={() => onFormatSelect(formFactor.name)}
                  onDownload={() => onDownload?.(formFactor.name)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

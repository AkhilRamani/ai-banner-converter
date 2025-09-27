"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Wand2 } from "lucide-react";
import { FormFactor, FORM_FACTORS_BY_PLATFORM } from "@/lib/formats";
import { cn } from "@/lib/utils";

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

  return <img src={iconSrc} alt={`${platform} icon`} className={cn("w-5 h-5", className)} />;
};

interface FormatSelectorProps {
  formFactors: FormFactor[];
  selectedFormats: string[];
  onFormatToggle: (formatName: string) => void;
  onConvert: () => void;
  isConverting?: boolean;
  className?: string;
}

interface FormatCardProps {
  formFactor: FormFactor;
  isSelected: boolean;
  onToggle: () => void;
  className?: string;
}

const FormatCard = ({ formFactor, isSelected, onToggle, className }: FormatCardProps) => {
  const aspectRatio = formFactor.width / formFactor.height;
  const isVeryWide = aspectRatio > 3; // Very wide formats like banners
  const isVeryTall = aspectRatio < 0.5; // Very tall formats like stories

  return (
    <div
      className={cn(
        "relative flex flex-col justify-center overflow-hidden bg-gray-100 border border-gray-300 rounded-lg p-2",
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-blue-500 shadow-lg bg-blue-50",
        className
      )}
      style={{
        aspectRatio: `${formFactor.width}/${formFactor.height}`,
      }}
      onClick={onToggle}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute z-10 top-1 right-1">
          <div className="bg-blue-500 rounded-full p-0.5">
            <Check className="w-2 h-2 text-white" />
          </div>
        </div>
      )}

      {/* Content container */}
      <div className="flex flex-col items-center justify-center h-full gap-1">
        {/* Format name - with truncation for long names */}
        <h4 className={cn("font-medium text-center leading-tight", isVeryWide || isVeryTall ? "text-xs" : "text-sm")}>
          <span className="block max-w-full truncate" title={formFactor.name}>
            {formFactor.name}
          </span>
        </h4>

        {/* Aspect ratio and resolution - compact layout for small cards */}
        <div className={cn("text-center opacity-75", isVeryWide || isVeryTall ? "text-xs" : "text-xs")}>
          {isVeryWide || isVeryTall ? (
            // Single line for very wide/tall cards
            <div className="max-w-full truncate" title={`${formFactor.aspectRatio} • ${formFactor.width}×${formFactor.height}`}>
              {formFactor.aspectRatio} • {formFactor.width}×{formFactor.height}
            </div>
          ) : (
            // Two lines for normal cards
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

export function FormatSelector({ formFactors, selectedFormats, onFormatToggle, onConvert, isConverting = false, className }: FormatSelectorProps) {
  const platforms = Object.keys(FORM_FACTORS_BY_PLATFORM);

  return (
    <div className={cn("space-y-8", className)}>
      {platforms.map((platform) => {
        const platformFormats = FORM_FACTORS_BY_PLATFORM[platform] || [];
        const selectedCount = platformFormats.filter((f) => selectedFormats.includes(f.name)).length;

        return (
          <div key={platform} className="pb-8 space-y-6 border-b last:border-0 last:pb-0">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-medium text-gray-900">
                <PlatformIcon platform={platform} className="opacity-50 size-5" />
                {platform}
              </h3>
              {selectedCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {selectedCount} selected
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {platformFormats.map((formFactor) => (
                <FormatCard
                  key={formFactor.name}
                  formFactor={formFactor}
                  isSelected={selectedFormats.includes(formFactor.name)}
                  onToggle={() => onFormatToggle(formFactor.name)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {selectedFormats.length > 0 && (
        <div className="sticky bottom-0 pt-4 mt-6 bg-white border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedFormats.length} format{selectedFormats.length !== 1 ? "s" : ""} selected
            </div>
            <Button onClick={onConvert} disabled={isConverting} className="px-6">
              <Wand2 className="w-4 h-4 mr-2" />
              {isConverting ? "Converting..." : "Convert Selected"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

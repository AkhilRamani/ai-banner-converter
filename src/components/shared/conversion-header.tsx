"use client";

import { FormatSelectorDialog } from "@/components/format-selector-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ConversionResult } from "@/lib/actions";

interface ConversionHeaderProps {
  selectedFormats: string[];
  conversionResults: Record<string, ConversionResult>;
  uploadedImage: string;
  onFormatToggle: (formatName: string) => void;
  onSelectComplete: () => void;
}

export function ConversionHeader({ selectedFormats, conversionResults, uploadedImage, onFormatToggle, onSelectComplete }: ConversionHeaderProps) {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="max-w-md mx-auto">
        <FormatSelectorDialog
          selectedFormats={selectedFormats}
          convertedFormats={Object.keys(conversionResults).filter((formatName) => conversionResults[formatName]?.success)}
          onFormatToggle={onFormatToggle}
          onSelectComplete={onSelectComplete}
          trigger={
            <Button disabled={!uploadedImage} className="w-full" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              {selectedFormats.length === 0 ? "Select Formats" : "Select More Formats"}
            </Button>
          }
        />
      </div>
    </div>
  );
}

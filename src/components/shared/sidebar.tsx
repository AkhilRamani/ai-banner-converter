"use client";

import { Wand } from "lucide-react";
import { useImageConverterContext } from "@/lib/hooks/use-image-converter-context";
import { ButtonCustom } from "../ui/custom/button-custom";
import Image from "next/image";
import { Doc } from "../../../convex/_generated/dataModel";

// Extended type for conversion with signed URL
type ConversionWithSignedUrl = Doc<"conversions"> & {
  signedUrl: string;
};

export function Sidebar({ conversion }: { conversion?: ConversionWithSignedUrl | null }) {
  const { uploadedImage, selectedFormats, isProcessing, setImageUpload, resetState, handleConvertSelected } = useImageConverterContext();

  return (
    <div className="h-[calc(100vh-4rem)] w-96">
      <div className="flex flex-col justify-between h-full p-6">
        <div>
          {conversion?.signedUrl && (
            <Image
              src={conversion.signedUrl}
              alt="Uploaded conversion"
              width={500}
              height={300}
              className="object-contain rounded-lg shadow-lg shadow-primary-50"
            />
          )}
        </div>

        {uploadedImage && (
          <div className="space-y-4">
            {selectedFormats.length > 0 && (
              <div className="flex gap-2">
                <ButtonCustom
                  onClick={handleConvertSelected}
                  disabled={isProcessing}
                  className="flex-1"
                  size="lg"
                  variant="main"
                  loading={isProcessing}
                >
                  {`Convert ${selectedFormats.length}`}
                  <Wand />
                </ButtonCustom>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

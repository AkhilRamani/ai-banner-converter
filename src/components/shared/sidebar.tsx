"use client";

import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wand, Wand2 } from "lucide-react";
import { useImageConverterContext } from "@/lib/hooks/use-image-converter-context";
import { ButtonCustom } from "../ui/custom/button-custom";

export function Sidebar() {
  const { uploadedImage, selectedFormats, isProcessing, setImageUpload, resetState, handleConvertSelected } = useImageConverterContext();

  const handleImageUpload = (file: File, preview: string) => {
    setImageUpload(file, preview);
  };

  const handleImageRemove = () => {
    resetState();
  };
  return (
    <div className="fixed top-[4rem] left-0 h-[calc(100vh-4rem)] w-96 bg-white- border-r- border-gray-200 overflow-hidden z-10 bg-gradient-to-tr from-white/ to-white/70">
      <div className="flex flex-col justify-between h-full p-6">
        <div>
          <ImageUpload
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
            uploadedImage={uploadedImage}
            isProcessing={isProcessing}
          />
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

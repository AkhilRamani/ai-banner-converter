"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageUpload: (file: File, preview: string) => void;
  onImageRemove: () => void;
  uploadedImage?: string;
  isProcessing?: boolean;
  className?: string;
}

export function ImageUpload({ onImageUpload, onImageRemove, uploadedImage, isProcessing = false, className }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = e.target?.result as string;
          onImageUpload(file, preview);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const handleRemove = () => {
    onImageRemove();
  };

  if (uploadedImage) {
    return (
      <div className={cn("relative group", className)}>
        <div className="relative w-full border-gray-300 rounded-lg shadow-md bg-gray-50">
          <img src={uploadedImage} alt="Uploaded design" className="object-contain w-full h-full" />
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="flex items-center gap-2 text-white">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Processing image...</span>
              </div>
            </div>
          )}
          <Button
            variant="destructive"
            size="sm"
            className="absolute transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100"
            onClick={handleRemove}
            disabled={isProcessing}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative border  rounded-lg p-8 text-center transition-colors cursor-pointer shadow",
          isDragActive || dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className={cn("p-4 rounded-full", isDragActive || dragActive ? "bg-blue-100" : "bg-gray-100")}>
            {isDragActive || dragActive ? <Upload className="w-8 h-8 text-blue-600" /> : <ImageIcon className="w-8 h-8 text-gray-600" />}
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900">{isDragActive || dragActive ? "Drop your image here" : "Upload your design"}</p>
            <p className="mt-1 text-sm text-gray-600">Drag and drop your Figma design here, or click to browse</p>
            <p className="mt-2 text-xs text-gray-500">Supports PNG, JPG, JPEG, GIF, WebP up to 10MB</p>
          </div>
          <Button type="button" variant="outline" className="mt-2">
            Choose File
          </Button>
        </div>
      </div>
    </div>
  );
}

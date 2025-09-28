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
          "relative group rounded-2xl text-center transition-all duration-500 cursor-pointer",
          "border min-h-[320px] flex flex-col justify-center hover:ring-4 ring-offset-1 ring-blue-500/10 bg-white",
          "backdrop-blur-sm",
          isDragActive || dragActive ? "border-blue-900" : "border-gray-300/60 hover:border-blue-900/50 hover:shadow-xl hover:shadow-gray-200/30",
          "focus:outline-none focus:ring-4 focus:ring-blue-500/10"
        )}
      >
        <input {...getInputProps()} />

        <div className="relative flex flex-col items-center gap-8 px-8">
          {/* Simplified icon with elegant treatment */}
          <div
            className={cn(
              "relative p-4 rounded-xl transition-all duration-500 !bg-gray-100 border",
              isDragActive || dragActive ? "bg-white" : "bg-white group-hover:shadow-lg group-hover:shadow-gray-300/20 group-hover:scale-105"
            )}
          >
            {isDragActive || dragActive ? <Upload className="size-8 opacity-80" /> : <ImageIcon className="size-8 opacity-80" />}
          </div>

          {/* Clean typography hierarchy */}
          <div className="space-y-4 text-center">
            <h3 className={cn("text-xl font-medium tracking-tight transition-colors duration-300")}>
              {isDragActive || dragActive ? "Drop your image here" : "Upload image or image"}
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-md text-base">
              {isDragActive || dragActive ? "Release to upload your design" : "Drag and drop or click to browse"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

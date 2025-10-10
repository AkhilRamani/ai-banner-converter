"use client";

import Image from "next/image";
import { Doc } from "../../../convex/_generated/dataModel";

// Using the conversion type with optional signed URL for displaying original images
type ConversionType = Doc<"conversions"> & { signedUrl?: string };

export function Sidebar({ conversion }: { conversion?: ConversionType }) {
  return (
    <div className="h-[calc(100vh-4rem)] w-96">
      <div className="flex flex-col justify-between h-full p-6">
        <div>
          {conversion?.signedUrl && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Original Image</h3>
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={conversion.signedUrl}
                  alt="Uploaded conversion"
                  width={500}
                  height={300}
                  className="object-contain rounded-lg shadow-lg shadow-primary-50"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

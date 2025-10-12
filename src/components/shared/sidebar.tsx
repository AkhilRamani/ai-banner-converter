"use client";

import Image from "next/image";
import { Doc } from "../../../convex/_generated/dataModel";
import { ButtonCustom } from "../ui/custom/button-custom";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Using the conversion type with optional signed URL for displaying original images
type ConversionType = Doc<"conversions"> & { signedUrl?: string };

export function Sidebar({ conversion }: { conversion?: ConversionType }) {
  return (
    <div className="h-[calc(100vh-4rem)] w-96">
      <div className="flex flex-col justify-between h-full p-6 pt-4">
        <div>
          <Link href="/home">
            <ButtonCustom className="mb-10" variant="outline">
              <ArrowLeft />
              Home
            </ButtonCustom>
          </Link>

          {conversion?.signedUrl && (
            <div className="mb-6">
              <div className="relative w-full">
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

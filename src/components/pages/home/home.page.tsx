"use client";

import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { Plus, Image as ImageIcon, MoreHorizontal } from "lucide-react";
import { NewConversionDialog } from "@/components/shared/new-conversion-dialog";
import { NoConversionCTA } from "@/components/shared/CTAs/no-conversion-cta";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import Image from "next/image";

// Conversion Tile Component
function ConversionTile({ conversion }: { conversion: any }) {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex flex-1- items-center">
        <Link href={`/convert/${conversion._id}`} className="flex-1 hover:shadow-lg shadow-primary/10  transition-shadow rounded-md overflow-hidden">
          {conversion.signedUrl ? (
            <div className="relative w-full flex">
              <Image
                src={conversion.signedUrl}
                alt={conversion.name || conversion.fileName}
                className="object-contain flex-1"
                width={200}
                height={200}
              />
            </div>
          ) : (
            <div className="w-full flex items-center justify-center bg-gray-50">
              <ImageIcon className="w-10 h-10 text-gray-300" />
            </div>
          )}
        </Link>
      </div>
      <div className="flex items-center justify-between pl-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-gray-900 truncate mb-1" title={conversion.name || conversion.fileName}>
            {conversion.name || conversion.fileName}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(conversion.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <ButtonCustom variant="ghost" size="icon" className="">
          <MoreHorizontal className="w-4 h-4" />
        </ButtonCustom>
      </div>
    </div>
  );
}

export function HomePage() {
  const conversions = useQuery(api.functions.conversions.getConversions, {});

  return (
    <div className="relative flex flex-col h-full">
      {/* Create New Conversion Section */}
      <div className="flex items-center justify-between px-20 pt-4 pb-6">
        <h2 className="text-xl font-medium opacity-80">My conversions</h2>
        <NewConversionDialog>
          <ButtonCustom variant="main" className="flex items-center gap-2">
            <Plus />
            New Conversion
          </ButtonCustom>
        </NewConversionDialog>
      </div>

      <div className="flex-1 overflow-auto px-10 mx-9 rounded-t-4xl pt-10 pb-16 bg-white/50">
        {!conversions ? (
          <ConversionsLoadingSkeleton />
        ) : conversions.length === 0 ? (
          <NoConversionCTA />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {conversions.map((conversion) => (
              <ConversionTile key={conversion._id} conversion={conversion} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ConversionsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-4 animate-pulse">
          <div className="aspect-square rounded-md overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-neutral-200/40 to-neutral-200/80"></div>
          </div>

          <div className="flex items-center justify-between pl-2">
            <div className="flex-1 min-w-0">
              <div className="h-10 bg-neutral-200/50 rounded-md mb-1 w-3/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

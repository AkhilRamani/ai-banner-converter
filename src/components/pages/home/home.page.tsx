"use client";

import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { Plus } from "lucide-react";
import { NewConversionDialog } from "@/components/shared/new-conversion-dialog";
import { NoConversionCTA } from "@/components/shared/CTAs/no-conversion-cta";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ConversionTile } from "./conversionTile";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-10">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {Array.from({ length: 4 }).map((_, index) => (
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

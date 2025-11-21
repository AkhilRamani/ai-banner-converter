"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Sidebar } from "@/components/shared/sidebar";
import { MainContent } from "@/components/shared/main-content";

export const ConvertPage = ({ conversionId }: { conversionId: string }) => {
  // Fetch conversion data at page level to eliminate duplicate queries
  const conversion = useQuery(api.functions.conversions.getConversion, conversionId ? { conversionId: conversionId as any } : "skip");

  return (
    <>
      <Sidebar conversion={conversion} />
      <div className="flex-1 flex flex-col p-8 min-h-[90vh] bg-background/60 rounded-tl-2xl overflow-auto">
        <MainContent conversionId={conversionId} conversion={conversion} />
      </div>
    </>
  );
};

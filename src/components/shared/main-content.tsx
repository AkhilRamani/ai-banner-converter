"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { CanvasPlaceholder } from "@/components/canvas-placeholder";
import { Doc } from "../../../convex/_generated/dataModel";
import { ConversionResultWithSignedUrl } from "@/lib/hooks/use-image-converter";

interface MainContentProps {
  conversionId?: string;
  conversion?: Doc<"conversions"> & { signedUrl?: string };
}

export function MainContent({ conversionId, conversion }: MainContentProps = {}) {
  // Use query to get conversion results with signed URLs
  const conversionResults = useQuery(
    api.functions.conversionResults.getConversionResultsWithSignedUrls,
    conversionId ? { conversionId: conversionId as any } : "skip"
  );

  console.log("📊 MainContent: Fetched conversion results:", conversionResults);

  // Simple pass-through - responsibility is just to fetch and pass data
  return <CanvasPlaceholder conversionId={conversionId} conversion={conversion} conversionResults={conversionResults} />;
}

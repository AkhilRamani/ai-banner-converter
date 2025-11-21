"use client";

import { use } from "react";
import { ConvertPage } from "@/components/pages/convert/convert.page";
import { Authenticated, Unauthenticated } from "convex/react";

interface PageProps {
  params: Promise<{
    conversionId: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { conversionId } = use(params);

  return (
    <>
      <Authenticated>
        <ConvertPage conversionId={conversionId} />
      </Authenticated>
      <Unauthenticated>
        <div className="flex items-center justify-center h-full">
          <p className="text-lg">Please log in to access the conversion page.</p>
        </div>
      </Unauthenticated>
    </>
  );
}

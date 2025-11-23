"use client";

import { use } from "react";
import { ConvertPage } from "@/components/pages/convert/convert.page";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{
    conversionId: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { conversionId } = use(params);

  return (
    <>
      <AuthLoading>
        <div className="flex items-center justify-center h-full w-full">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin size-12 stroke-1 text-muted-foreground" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </AuthLoading>
      <Authenticated>
        <ConvertPage conversionId={conversionId} />
      </Authenticated>
      <Unauthenticated>
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-lg">Please log in to access the conversion page.</p>
        </div>
      </Unauthenticated>
    </>
  );
}

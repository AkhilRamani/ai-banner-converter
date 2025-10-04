"use client";

import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { Plus, Image as ImageIcon } from "lucide-react";
import { NewConversionDialog } from "@/components/shared/new-conversion-dialog";

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Create New Conversion Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">My conversions</h2>
        <NewConversionDialog>
          <ButtonCustom variant="main" className="flex items-center gap-2">
            <Plus />
            New Conversion
          </ButtonCustom>
        </NewConversionDialog>
      </div>

      <div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversions yet</h3>
          <p className="text-gray-600 max-w-sm">Once you start converting images, your recent conversions will be displayed here for easy access.</p>
        </div>
      </div>
    </div>
  );
}

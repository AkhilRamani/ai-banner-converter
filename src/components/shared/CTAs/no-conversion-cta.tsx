import { Image as ImageIcon, Plus, Sparkles } from "lucide-react";
import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { NewConversionDialog } from "@/components/shared/new-conversion-dialog";

export function NoConversionCTA() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-12 flex gap-2 items-center *:bg-white *:border *:rounded-md *:shadow-sm *:shadow-primary/5">
        <div className="h-20 w-36" />
        <div className="h-32 w-20" />
        <div className="h-24 w-24" />
        <div className="h-14 w-36" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Your First Conversion</h3>
      <p className="text-gray-600 max-w-md mb-12">
        Transform your images into different formats and sizes. Upload an image and let AI optimize it for your needs.
      </p>
      <NewConversionDialog>
        <ButtonCustom variant="main" size="lg">
          <Plus />
          Create Your First Conversion
        </ButtonCustom>
      </NewConversionDialog>
    </div>
  );
}

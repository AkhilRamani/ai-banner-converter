import { Plus, ArrowRight, Sparkles } from "lucide-react";
import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { FormatSelectorDialog } from "@/components/format-selector-dialog";
import { FormFactor } from "@/lib/formats";

interface SelectFormatsCTAProps {
  selectedFormats: string[];
  convertedFormats: string[];
  onFormatToggle: (formatName: string) => void;
  onBatchFormatUpdate: (formatNames: string[]) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

export function SelectFormatsCTA({
  selectedFormats,
  convertedFormats,
  onFormatToggle,
  onBatchFormatUpdate,
  isDialogOpen,
  setIsDialogOpen,
}: SelectFormatsCTAProps) {
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="w-full max-w-xl text-center overflow-hidden">
        {/* Background Image Section */}
        <div className="py-10 bg-gradient-to-br from-neutral-100 from-70% to-neutral-200/70 border flex items-center justify-center rounded-xl">
          <div className="relative z-10">
            {/* Format boxes illustration */}
            <div className="flex gap-2 items-center justify-center *:bg-white *:border *:rounded-md *:shadow-sm *:shadow-primary/5">
              <div className="h-16 w-28" />
              <div className="h-24 w-16" />
              <div className="h-20 w-20" />
              <div className="h-12 w-28" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <h3 className="mb-3 text-lg font-medium text-gray-900">Choose Your Target Formats</h3>
          <p className="mb-6 text-sm text-gray-600">Select the formats and sizes you want to convert your image to</p>

          {/* Format Selector Dialog */}
          <FormatSelectorDialog
            selectedFormats={selectedFormats}
            convertedFormats={convertedFormats}
            onFormatToggle={onFormatToggle}
            onSelectComplete={() => {}}
            onBatchFormatUpdate={onBatchFormatUpdate}
            externalOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            trigger={
              <ButtonCustom variant="main" size="lg">
                <Plus />
                Select Formats
              </ButtonCustom>
            }
          />
        </div>
      </div>
    </div>
  );
}

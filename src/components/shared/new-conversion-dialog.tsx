import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ButtonCustom } from "../ui/custom/button-custom";
import { Upload } from "lucide-react";
import { ImageUpload } from "../image-upload";
import { useImageConverterContext } from "@/lib/hooks/use-image-converter-context";
import { DialogContentCustom } from "../ui/custom/dialog-custom";

export const NewConversionDialog = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { setImageUpload } = useImageConverterContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageUpload = (file: File, preview: string) => {
    setImageUpload(file, preview);
    setIsDialogOpen(false);

    // Redirect to convert page after uploading
    router.push("/convert");
  };

  const handleImageRemove = () => {
    // No-op for home page
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContentCustom className="sm:max-w-lg" title="Convert to other formats">
        <div className="flex flex-col">
          <div className="flex-1">
            <ImageUpload onImageUpload={handleImageUpload} onImageRemove={handleImageRemove} className="min-h-[280px]" />
          </div>

          <div className="flex gap-2 pt-6 justify-end">
            <ButtonCustom variant="outline" className="w-28" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </ButtonCustom>
            <ButtonCustom variant="main" className="w-28" onClick={() => setIsDialogOpen(false)}>
              <Upload />
              Save
            </ButtonCustom>
          </div>
        </div>
      </DialogContentCustom>
    </Dialog>
  );
};

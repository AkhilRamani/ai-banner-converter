import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ButtonCustom } from "../ui/custom/button-custom";
import { Upload, Loader2 } from "lucide-react";
import { ImageUpload } from "../image-upload";
import { useImageConverterContext } from "@/lib/hooks/use-image-converter-context";
import { DialogContentCustom } from "../ui/custom/dialog-custom";

export const NewConversionDialog = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { setImageUpload } = useImageConverterContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelection = (file: File, preview: string) => {
    setSelectedFile(file);
    setSelectedImage(preview);
  };

  const handleImageRemove = () => {
    setSelectedFile(null);
    setSelectedImage(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedImage) return;

    setIsUploading(true);

    try {
      // Placeholder for upload logic - to be implemented later
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate upload delay

      // Set the image in context after successful upload
      setImageUpload(selectedFile, selectedImage);
      setIsDialogOpen(false);

      // Navigate to convert page after uploading
      router.push("/convert");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContentCustom className="max-h-[85vh] h-full !min-w-[60vw]" title="Convert to other formats">
        <ImageUpload
          onImageUpload={handleImageSelection}
          onImageRemove={handleImageRemove}
          uploadedImage={selectedImage || undefined}
          isProcessing={isUploading}
        />

        <div className="flex gap-2 shrink-0 justify-end">
          <ButtonCustom variant="outline" className="w-28" onClick={() => setIsDialogOpen(false)} disabled={isUploading}>
            Cancel
          </ButtonCustom>
          <ButtonCustom variant="main" className="w-28" onClick={handleUpload} disabled={!selectedImage || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </>
            )}
          </ButtonCustom>
        </div>
        {/* </div> */}
      </DialogContentCustom>
    </Dialog>
  );
};

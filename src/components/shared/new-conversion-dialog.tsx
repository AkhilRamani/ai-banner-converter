import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

import { Dialog, DialogTrigger } from "../ui/dialog";
import { ButtonCustom } from "../ui/custom/button-custom";
import { ImageUpload } from "../image-upload";
import { DialogContentCustom } from "../ui/custom/dialog-custom";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const NewConversionDialog = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const generateUploadUrl = useMutation(api.r2.generateUploadUrl);
  const syncMetadata = useMutation(api.r2.syncMetadata);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelection = (file: File) => {
    setSelectedFile(file);
  };

  const handleImageRemove = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      const uploadData = await generateUploadUrl({ fileName: selectedFile.name });

      // Upload file directly to R2 using the signed URL
      const response = await fetch(uploadData.url, {
        method: "PUT",
        body: selectedFile,
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      // Call syncMetadata to trigger the onUpload callback
      await syncMetadata({
        key: uploadData.key,
      });

      router.push(`/convert/${uploadData.conversionId}`);
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
          uploadedImage={selectedFile ? URL.createObjectURL(selectedFile) : undefined}
          isProcessing={isUploading}
        />

        <div className="flex gap-2 shrink-0 justify-end">
          <ButtonCustom variant="outline" className="w-28" onClick={() => setIsDialogOpen(false)} disabled={isUploading}>
            Cancel
          </ButtonCustom>
          <ButtonCustom variant="main" className="w-28" onClick={handleUpload} disabled={!selectedFile || isUploading} loading={isUploading}>
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </ButtonCustom>
        </div>
      </DialogContentCustom>
    </Dialog>
  );
};

import React, { useState } from "react";
import { DialogContentCustom } from "../ui/custom/dialog-custom";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { ButtonCustom } from "../ui/custom/button-custom";
import { useToggle } from "@/lib/hooks/use-toggle";

interface ConfirmActionDialogProps {
  open?: boolean;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "main";
  onConfirm: () => void | Promise<void>;
}

export const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  open,
  children,
  title = "Confirm Action",
  description = "Are you sure you want to proceed? This action cannot be undone.",
  variant = "main",
  onConfirm,
}) => {
  const { value: isOpen, toggle: toggleIsOpen } = useToggle();

  const handleConfirm = async () => {
    onConfirm();
    toggleIsOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContentCustom title={title}>
        <div className="space-y-5 w-full">
          <p className="text-base text-muted-foreground leading-relaxed">{description}</p>

          <div className="flex justify-end gap-2 pt-4">
            <ButtonCustom variant="outline" onClick={toggleIsOpen} className="w-28">
              Cancel
            </ButtonCustom>
            <ButtonCustom variant={variant} onClick={handleConfirm} className="w-28">
              Confirm
            </ButtonCustom>
          </div>
        </div>
      </DialogContentCustom>
    </Dialog>
  );
};

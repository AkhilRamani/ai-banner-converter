import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { DialogOverlay, DialogPortal } from "../dialog";
import { ButtonCustom } from "./button-custom";

const DialogContentCustom = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {}
>(({ className, children, title, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay className="backdrop-blur-lg bg-black/5 duration-300">
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-6 rounded-3xl border sm:max-w-lg",
            "shadow-sm duration-300",
            "flex flex-col-",
            "overflow-hidden",
            className
          )}
          {...props}
        >
          <div className="fixed top-0 pt-6 pb-6 left-0 right-0 px-6 flex items-center justify-between h-min bg-gradient-to-b from-white to-transparent from-75% z-10">
            <DialogPrimitive.DialogTitle className="text-lg font-medium">{title}</DialogPrimitive.DialogTitle>
            <DialogPrimitive.Close
              className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400"
              asChild
              autoFocus={false}
            >
              <ButtonCustom variant="outline" size="sm" className="rounded-md p-1.5">
                <X className="!size-4.5 text-primary" />
                <span className="sr-only">Close</span>
              </ButtonCustom>
            </DialogPrimitive.Close>
          </div>

          <div className="flex flex-1 overflow-auto px-6 pt-20 pb-6">{children}</div>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
});

DialogContentCustom.displayName = DialogPrimitive.Content.displayName;

export { DialogContentCustom };

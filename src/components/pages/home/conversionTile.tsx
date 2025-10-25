"use client";

import Link from "next/link";
import Image from "next/image";
import { Image as ImageIcon, MoreHorizontal, Trash2 } from "lucide-react";
import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ConfirmActionDialog } from "@/components/shared/confirm-action-dialog";
import { cn } from "@/lib/utils";
import { useToggle } from "@/lib/hooks/use-toggle";

// FIXME: fix prop type later
export function ConversionTile({ conversion }: { conversion: any }) {
  const deleteMutation = useMutation(api.functions.conversions.deleteConversion);
  const { value: isDeleting, toggle: toggleIsDeleting } = useToggle();

  const handleDelete = async () => {
    toggleIsDeleting();
    try {
      await deleteMutation({ conversionId: conversion._id });
    } catch (error) {
      console.error("Failed to delete conversion:", error);
      // Optionally, show a toast or alert here
    }
    toggleIsDeleting();
  };

  return (
    <div className={cn("flex flex-col gap-4 justify-center", isDeleting && "pointer-events-none opacity-60")}>
      <div className="flex flex-1- items-center">
        <Link href={`/convert/${conversion._id}`} className="flex-1 hover:shadow-lg shadow-primary/10  transition-shadow rounded-md overflow-hidden">
          {conversion.signedUrl ? (
            <div className="relative w-full flex">
              <Image
                src={conversion.signedUrl}
                alt={conversion.name || conversion.fileName}
                className="object-contain flex-1"
                width={200}
                height={200}
              />
            </div>
          ) : (
            <div className="w-full flex items-center justify-center bg-gray-50">
              <ImageIcon className="w-10 h-10 text-gray-300" />
            </div>
          )}
        </Link>
      </div>
      <div className="flex items-center justify-between pl-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-gray-900 truncate mb-1" title={conversion.name || conversion.fileName}>
            {conversion.name || conversion.fileName}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(conversion.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ButtonCustom variant="ghost" size="icon" className="">
              <MoreHorizontal className="w-4 h-4" />
            </ButtonCustom>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ConfirmActionDialog
              title="Delete Conversion"
              description="Are you sure you want to delete this? This will delete all its associated conversions."
              variant="destructive"
              onConfirm={handleDelete}
            >
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </ConfirmActionDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

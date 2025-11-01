import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem } from "../dropdown-menu";
import { cn } from "@/lib/utils";

export const DropdownMenuItemCustom = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) => (
  <DropdownMenuItem
    {...props}
    className={cn("py-2 px-3 rounded-lg font-medium text-neutral-800 hover:cursor-pointer gap-3 [&>svg]:stroke-[2.5]", className)}
  />
);

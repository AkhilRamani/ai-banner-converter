import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Custom variants and sizes for the CustomButton
const customButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Inherit all base button variants
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 text-primary",
        secondary: "bg-secondary text-red-950 hover:bg-secondary/80- hover:bg-red-900/10",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        main: "bg-gradient-to-tr from-blue-600 to-blue-500 text-white hover:bg-blue-500 focus-visible:ring-blue-800 shadow-md",
      },
      size: {
        // Inherit all base button sizes
        default: "h-9 px-4 py-2 has-[>svg]:px-3 [&_svg]:!stroke-[2.5px]",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-lg px-6 has-[>svg]:px-4 [&_svg]:!stroke-[2.5px] text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CustomButtonProps extends React.ComponentProps<"button">, VariantProps<typeof customButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <Button
        className={cn(
          customButtonVariants({ variant, size, className }),
          // Override default variant with brand color (red-900)
          variant === "default" && "[&[data-slot='button']]:bg-red-900 [&[data-slot='button']]:text-white [&[data-slot='button']]:hover:bg-red-800",
          "font-semibold"
        )}
        ref={ref}
        disabled={isDisabled}
        asChild={asChild}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <div className="flex items-center justify-center gap-2">
            {loading ? (
              <svg className="animate-spin size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              children
            )}
          </div>
        )}
      </Button>
    );
  }
);

ButtonCustom.displayName = "CustomButton";

export { ButtonCustom, customButtonVariants };

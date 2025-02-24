import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useFormContext } from "react-hook-form";
import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  name?: string;
  disable?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, name, disable = "true", ...props }, ref) => {
    // Cek apakah berada dalam FormProvider
    const formContext = useFormContext();
    const errors = formContext?.formState?.errors ?? {};

    const hasError = name ? errors?.[name] : undefined;
    const Comp = asChild ? Slot : "button";

    const disabled = disable === "";

    return (
      <div className="relative w-full">
        <Comp
          className={cn(
            buttonVariants({ variant, size, className }),
            hasError ? "border-red-500 focus-visible:ring-red-500 pr-10" : ""
          )}
          ref={ref}
          {...props}
          disabled={disabled}
        />
        {hasError && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <AlertTriangle className="text-red-500 h-5 w-5" />
          </div>
        )}
      </div>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

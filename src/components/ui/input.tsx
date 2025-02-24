import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { name: string }>(
  ({ className, type, name, ...props }, ref) => {
    const {
      formState: { errors },
    } = useFormContext();

    return (
      <div className="relative w-full">
        <input
          type={type}
          name={name}
          className={cn(
            "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            errors[name] ? "border-red-500 focus-visible:ring-red-500 pr-10" : "border-input"
          )}
          ref={ref}
          {...props}
        />
        {errors[name] && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <AlertTriangle className="text-red-500 h-5 w-5" />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

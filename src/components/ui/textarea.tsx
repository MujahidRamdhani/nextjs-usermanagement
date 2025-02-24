import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { name: string; placeholder?: string; className?: string }
>(({ className = "", name, placeholder = "", ...props }, ref) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative w-full">
      <textarea
        name={name}
        placeholder={placeholder}
        className={cn(
          "flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          errors[name] ? "border-red-500 focus-visible:ring-red-500 pr-10" : "border-input",
          className
        )}
        ref={ref}
        {...props}
      />
      {errors[name] && (
        <div className="absolute inset-y-0 right-1 flex items-center pr-2">
          <AlertTriangle className="text-red-500 h-5 w-5" />
        </div>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export { Textarea };

import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Check, Command } from "lucide-react";
import React, { useState } from "react";
import locations from "../data/provinces.json";
import { cn } from "@/lib/utils";
import { Control, Controller, FieldValues } from "react-hook-form";

interface Location {
  id: string;
  name: string;
}
interface FormValues {
  email: string;
  name: string;
  studentId: string;
  year: Date;
  password: string;
  confirmPassword: string;
  province: string;
  city: string;
  postal_code: string;
  street: string;
}

interface SelectLocationProps {
  control: Control<FormValues>; // Pastikan ini ada
  name: keyof FormValues;
  selectLocationLabel: string;
  searchPlaceholder: string;
  emptyLocationText: string;
}

const SelectLocation: React.FC<SelectLocationProps> = ({
  control,
  name,
  selectLocationLabel,
  searchPlaceholder,
  emptyLocationText,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selectedLocation = locations.find((loc: Location) => loc.id === field.value);

        return (
          <FormItem>
            <FormLabel>{selectLocationLabel}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  name={name}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedLocation ? selectedLocation.name : selectLocationLabel}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder={searchPlaceholder} />
                  <CommandList>
                    <CommandEmpty>{emptyLocationText}</CommandEmpty>
                    <CommandGroup>
                      {locations.map((location: Location) => (
                        <CommandItem
                          key={location.id}
                          value={location.id}
                          onSelect={() => {
                            field.onChange(location.id);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", field.value === location.id ? "opacity-100" : "opacity-0")}
                          />
                          {location.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default SelectLocation;

"use client";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import provinces from "../data/provinces.json";
import citys from "../data/city.json";
import postalCodes from "../data/postal_codes.json";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { registerSchema } from "../validators/user";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Input = z.infer<typeof registerSchema>;

export default function FormUser() {
  const { id } = useParams();

  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      birthdate: undefined,
      street: "",
      city: "",
      province: "",
      postal_code: "",
    },
  });

  // province
  const [openProvince, setOpenProvince] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const selectProvince = provinces.find((province) => province.name === selectedProvince);

  // city
  const [openCity, setOpenCity] = useState(false);
  const [selectedCity, setSelectedcity] = useState("");
  const filteredCities = citys.filter((city) => city.province_name === selectedProvince);

  // postal code
  const [openPostalCode, setOpenPostalCode] = useState(false);
  const [selectedPostalCode, setSelectedPostalCode] = useState("");
  const filteredPostalCode = postalCodes.filter((postalCode) => postalCode.city_name === selectedCity);

  const router = useRouter();
  const [isFetchingData, setIsFetchingData] = useState(true);

  //apabila province diubah maka city dan postal code di reset
  useEffect(() => {
    if (!isFetchingData) {
      setSelectedcity("");
      form.setValue("city", "", { shouldValidate: false, shouldDirty: true });
      setSelectedPostalCode("");
      form.setValue("postal_code", "", { shouldValidate: false, shouldDirty: true });
    }
  }, [selectedProvince]);

  //apabila city diubah maka postal code di reset
  useEffect(() => {
    if (!isFetchingData) {
      setSelectedPostalCode("");
      form.setValue("postal_code", "", { shouldValidate: false, shouldDirty: true });
    }
  }, [selectedCity]);

  //fetch data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;

      try {
        setIsFetchingData(true);
        const response = await fetch(`/api/users/${id}`);
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message);
          return;
        }

        if (result?.data?.length) {
          const { firstname, lastname, street, province, city, postal_code, birthdate } = result.data[0];

          form.setValue("firstname", firstname || "");
          form.setValue("lastname", lastname || "");
          form.setValue("street", street || "");
          form.setValue("birthdate", new Date(birthdate) || undefined);
          form.setValue("province", province || "");
          form.setValue("city", city || "");
          form.setValue("postal_code", postal_code || "");

          setSelectedProvince(province || "");
          setSelectedcity(city || "");
          setSelectedPostalCode(postal_code || "");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setIsFetchingData(false), 100);
      }
    };

    fetchUserData();
  }, [id, form]);

  const onSubmit = async (data: Input) => {
    try {
      const url = id ? `/api/users/${id}` : "/api/users";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return;
      }
      router.push("/");
      toast.success(result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="md:w-[600px]">
        <CardHeader>
          <CardTitle>{id ? "Form Update User" : "Form Create User"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <motion.div>
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your firstname..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your lastname..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth day</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            name="birthdate"
                            variant="outline"
                            className={cn("w-full justify-start text-left font-normal")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <Popover open={openProvince} onOpenChange={setOpenProvince}>
                        <PopoverTrigger asChild>
                          <Button
                            name="province"
                            variant="outline"
                            role="combobox"
                            aria-expanded={openProvince}
                            className="w-full justify-between"
                          >
                            {selectProvince ? selectProvince.name : "Select province..."}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search province..." />
                            <CommandList>
                              <CommandEmpty>Province not found</CommandEmpty>
                              <CommandGroup>
                                {provinces.map((province) => (
                                  <CommandItem
                                    key={province.name}
                                    value={province.name}
                                    onSelect={(currentId: string) => {
                                      setSelectedProvince(currentId);
                                      field.onChange(currentId);
                                      setOpenProvince(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedProvince === province.name ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {province.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <Popover open={openCity} onOpenChange={setOpenCity}>
                        <PopoverTrigger asChild>
                          <Button
                            name="city"
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCity}
                            className="w-full justify-between"
                            disable={selectedProvince}
                          >
                            {selectedCity ? citys.find((city) => city.name === selectedCity)?.name : "Select city..."}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search city..." />
                            <CommandList>
                              <CommandEmpty>City not found</CommandEmpty>
                              <CommandGroup>
                                {filteredCities.map((city) => (
                                  <CommandItem
                                    key={city.name}
                                    value={city.name}
                                    onSelect={(currentId: string) => {
                                      setSelectedcity(currentId);
                                      field.onChange(currentId);
                                      setOpenCity(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedProvince === city.name ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {city.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <Popover open={openPostalCode} onOpenChange={setOpenPostalCode}>
                        <PopoverTrigger asChild>
                          <Button
                            name="postal_code"
                            variant="outline"
                            role="combobox"
                            aria-expanded={openPostalCode}
                            className="w-full justify-between"
                            disable={selectedCity}
                          >
                            {selectedPostalCode
                              ? postalCodes.find((postalCode) => postalCode.id === selectedPostalCode)?.id
                              : "Select postal code..."}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search postal code..." />
                            <CommandList>
                              <CommandEmpty>Postal code not found</CommandEmpty>
                              <CommandGroup>
                                {filteredPostalCode.map((postalCode) => (
                                  <CommandItem
                                    key={postalCode.id}
                                    value={postalCode.id}
                                    onSelect={(currentId: string) => {
                                      setSelectedPostalCode(currentId);
                                      field.onChange(currentId);
                                      setOpenPostalCode(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedCity === postalCode.id ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {postalCode.id}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Enter your street..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <div className="mt-4">
                <Button type="submit" className="w-full justify-center">
                  {id ? "Update" : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

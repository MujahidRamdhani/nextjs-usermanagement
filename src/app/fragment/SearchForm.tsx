"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserSearchFormProps {
  onSubmit: (data: any) => void;
  handleReset: () => void;
}

const searchSchema = z.object({
  firstname: z.string().min(1, "Firstname is required !"),
});

type Input = z.infer<typeof searchSchema>;

const UserSearchForm: React.FC<UserSearchFormProps> = ({ onSubmit, handleReset }) => {
  const form = useForm<Input>({
    resolver: zodResolver(searchSchema),
    defaultValues: { firstname: "" },
  });

  const router = useRouter();

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <motion.div>
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter firstname..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <div className="flex justify-between w-full gap-x-4">
            <Button type="button" onClick={() => router.push("./user/new")} className="mt-2">
              Create User
            </Button>
            <Button type="button" onClick={handleReset} className="mt-2">
              Reset
            </Button>
            <Button type="submit" className="mt-2">
              Search
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default UserSearchForm;

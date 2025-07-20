"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCallback } from "react";

import { userSchema, UserFormData } from "@/schemas/userSchema";
import { RenderField } from "@/components/form/RenderField";
import Spinner from "@/components/Spinner/Spinner";

const defaultValues: UserFormData = {
  name: "",
  email: "",
  company: "",
};

export default function AddUserPage() {
  const router = useRouter();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (data: UserFormData) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: { name: data.company },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to create user");
      return res.json();
    },
    onSuccess: () => {
      toast.success("User created successfully!");
      router.push("/");
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const onSubmit = useCallback(
    (values: UserFormData) => {
      mutation.mutate(values);
    },
    [mutation]
  );

  return (
    <div className="p-6 max-w-md mx-auto my-5">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <RenderField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter name"
          />
          <RenderField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter email"
          />
          <RenderField
            control={form.control}
            name="company"
            label="Company"
            placeholder="Enter company name"
          />

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full"
          >
            {mutation.isPending ? <Spinner /> : "Add User"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

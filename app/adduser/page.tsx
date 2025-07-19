"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  company: z.string().min(1, "Company is required"),
})

type FormData = z.infer<typeof formSchema>

export default function AddUserPage() {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: { name: data.company },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      if (!res.ok) throw new Error("Failed to create user")
      return res.json()
    },
    onSuccess: () => {
      toast.success("User created successfully!")
      router.push("/")
    },
    onError: () => {
      toast.error("Something went wrong.")
    },
  })

  function onSubmit(values: FormData) {
    mutation.mutate(values)
  }

  return (
    <div className="p-6 max-w-md mx-auto my-5">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Adding..." : "Add User"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

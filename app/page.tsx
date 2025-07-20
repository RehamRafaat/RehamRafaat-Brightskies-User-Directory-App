"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner/Spinner";

import { User } from "@/types/user";

const UsersTable = React.lazy(
  () => import("@/components/users-table/users-table")
);
export default function HomePage() {
  const { isLoading, isError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  return (
    <div className="w-[90%] m-auto mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Link href="/adduser">
          <Button>Add User</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2">
          <Spinner />
        </div>
      ) : isError ? (
        <p className="text-red-500">Failed to load users.</p>
      ) : (
        <UsersTable />
      )}
    </div>
  );
}

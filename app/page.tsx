"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UsersTable from "@/components/users-table/users-table";
import Spinner from "@/components/Spinner/Spinner";

export type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

export default function HomePage() {
  const { isLoading, isError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  /***  conditional rendering */
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center gap-2">
          <Spinner />
        </div>
      );
    }
    if (isError) {
      return <p className="text-red-500">Failed to load users.</p>;
    }
    return <UsersTable />;
  };
  /*** end conditional rendering */

  return (
    <div className="w-[90%] m-auto mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Link href="/adduser">
          <Button>Add User</Button>
        </Link>
      </div>

      {renderContent()}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DeleteButton from "./fragment/DeleteButton";
import { toast } from "sonner";
import UserSearchForm from "./fragment/SearchForm";
import { UserAddress } from "./types/userType";
import { searchSchema } from "./validators/search";

type Input = z.infer<typeof searchSchema>;

export default function UsersTable() {
  const [users, setUsers] = useState<UserAddress[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const router = useRouter();

  // Inisialisasi form pencarian
  const form = useForm<Input>({
    resolver: zodResolver(searchSchema),
    defaultValues: { firstname: "" },
  });

  const fetchUsers = useCallback(
    async (query = "") => {
      try {
        setLoading(true);
        const url = query ? `/api/users/firstname/${query}?page=${page}&limit=5` : `/api/users?page=${page}&limit=5`;

        const response = await fetch(url);
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message);
          return;
        }

        setUsers(result.data.users);
        setTotalPages(result.data.totalPages);
        setTotalUsers(result.data.totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    fetchUsers();
  }, [page, fetchUsers]);

  // Fungsi untuk melakukan pencarian
  const onSubmit = (data: Input) => {
    setPage(1);
    fetchUsers(data.firstname);
  };

  // Fungsi untuk mereset page
  const handleReset = () => {
    form.reset();
    setPage(1);
    fetchUsers();
  };

  // Fungsi untuk menghapus user
  const handleDelete = async (id: number) => {
    try {
      const url = `/api/users/${id}`;
      const method = "DELETE";

      const response = await fetch(url, { method });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      fetchUsers();
      toast.success(result.message);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="w-full mt-8">
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-4xl font-semibold">User list</CardTitle>
        </CardHeader>
        <UserSearchForm onSubmit={onSubmit} handleReset={handleReset} />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Birthdate</TableHead>
              <TableHead>Street</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Postal Code</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : users?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>{new Date(user.birthdate).toLocaleDateString()}</TableCell>
                    <TableCell>{user.street}</TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>{user.province}</TableCell>
                    <TableCell>{user.postal_code}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-amber-400 hover:bg-amber-600"
                        onClick={() => router.push(`./user/${user.id}`)}
                      >
                        Edit
                      </Button>
                      <DeleteButton userId={user.id} handleDelete={handleDelete} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-4">
          <span>Total Users: {totalUsers}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))} disabled={page === 1}>
              Previous
            </button>
            <span className="">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
              disabled={page >= totalPages || totalUsers === 0}
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

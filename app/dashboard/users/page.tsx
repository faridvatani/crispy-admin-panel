"use client";

import { trpc } from "@/server/client";
import { Card, CardContent } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

export default function Users() {
  const users = trpc.users.get.useQuery();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead className="hidden sm:table-cell">Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden sm:table-cell">Username</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.status === "pending" && (
                <TableRow>
                  <TableCell colSpan={5}>Loading...</TableCell>
                </TableRow>
              )}

              {users.status === "error" && (
                <TableRow>
                  <TableCell colSpan={5}>
                    Error: {users.error.message}
                  </TableCell>
                </TableRow>
              )}

              {users.status === "success" && users.data?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>No users found</TableCell>
                </TableRow>
              )}

              {users.data?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {user.id}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {user.name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {user.email}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {user.username}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

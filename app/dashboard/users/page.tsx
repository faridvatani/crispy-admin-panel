"use client";

import { trpc } from "@/server/client";
import {
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui";
import { useSearchParams } from "next/navigation";

const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_ITEMS = 10;

export default function Users() {
  const searchParams = useSearchParams();

  const page = +(searchParams.get("page") ?? DEFAULT_PAGE); // + is a shorthand for parseInt
  const totalItems = +(searchParams.get("totalItems") ?? DEFAULT_TOTAL_ITEMS);

  const users = trpc.users.get.useQuery({
    page: page < 1 ? DEFAULT_PAGE : page,
    totalItems: totalItems < 1 ? DEFAULT_TOTAL_ITEMS : totalItems,
  });

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
                <TableHead className="hidden sm:table-cell">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden sm:table-cell">Username</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.isPending &&
                Array.from({ length: 9 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="hidden sm:table-cell">
                      <Skeleton className="w-full h-6 bg-gray-400/30 rounded-xl max-w-sm" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-6 bg-gray-400/30 rounded-xl" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-6 bg-gray-400/30 rounded-xl" />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Skeleton className="w-full h-6 bg-gray-400/30 rounded-xl" />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Skeleton className="w-full h-6 bg-gray-400/30 rounded-xl" />
                    </TableCell>
                  </TableRow>
                ))}

              {users.isError && (
                <TableRow>
                  <TableCell colSpan={5}>
                    Error: {users.error.message}
                  </TableCell>
                </TableRow>
              )}

              {users.isSuccess && users.data?.totalPages === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>No users found</TableCell>
                </TableRow>
              )}

              {users.data?.items.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="hidden sm:table-cell">
                    <div className="marker:text-sm text-muted-foreground">
                      {user.id}
                    </div>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
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
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`/dashboard/users?page=${
                      page - 1
                    }&totalItems=${totalItems}`}
                  />
                </PaginationItem>
              )}

              {Array.from({ length: users.data?.totalPages ?? 1 }).map(
                (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={`/dashboard/users?page=${
                        index + 1
                      }&totalItems=${totalItems}`}
                      isActive={index + 1 === page}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              {users.data?.totalPages && users.data.totalPages > page && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {users.data?.totalPages !== page && (
                <PaginationItem>
                  <PaginationNext
                    href={`/dashboard/users?page=${
                      page + 1
                    }&totalItems=${totalItems}`}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </main>
  );
}

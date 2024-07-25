import React from "react";

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

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
}

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  isError?: boolean;
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export const UsersTable = ({
  users,
  isLoading,
  isError,
  totalPages,
  currentPage,
  totalItems,
}: UsersTableProps) => {
  return (
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
            {isLoading &&
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

            {isError && (
              <TableRow>
                <TableCell colSpan={5}>
                  Error: Something that happened!
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              users.map((user) => (
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
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/admin/users?page=${
                    currentPage - 1
                  }&totalItems=${totalItems}`}
                />
              </PaginationItem>
            )}
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`/admin/users?page=${
                    index + 1
                  }&totalItems=${totalItems}`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {totalPages !== currentPage && (
              <PaginationItem>
                <PaginationNext
                  href={`/admin/users?page=${
                    currentPage + 1
                  }&totalItems=${totalItems}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

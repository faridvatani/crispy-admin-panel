import React from "react";
import { twMerge } from "tailwind-merge";
import {
  Card,
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
  onPageChange: (page: number) => void;
}

export const UsersTable = ({
  users,
  isLoading,
  isError,
  totalPages,
  currentPage,
  totalItems,
  onPageChange,
}: UsersTableProps) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <Card className="pb-3">
      <Table className="overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden sm:table-cell">Username</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading &&
            Array.from({ length: 7 }).map((_, index) => (
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
              <TableCell colSpan={5}>Error: Something that happened!</TableCell>
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
                <TableCell className="hidden sm:table-cell">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination className={twMerge("mt-3", isLoading && "hidden")}>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                href={`/dashboard/users?page=${
                  currentPage - 1
                }&totalItems=${totalItems}`}
              />
            </PaginationItem>
          )}
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
                href={`/dashboard/users?page=${
                  index + 1
                }&totalItems=${totalItems}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages !== currentPage && totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {totalPages !== currentPage && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                href={`/dashboard/users?page=${
                  currentPage + 1
                }&totalItems=${totalItems}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </Card>
  );
};

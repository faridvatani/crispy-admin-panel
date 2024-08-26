"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { trpc } from "@/server/client";
import { UsersTable } from "@/components/features";
import SearchForm from "@/components/features/globals/SearchForm";

const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_ITEMS = 3;

function UsersContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = +(searchParams.get("page") ?? DEFAULT_PAGE); // + is a shorthand for parseInt
  const totalItems = +(searchParams.get("totalItems") ?? DEFAULT_TOTAL_ITEMS);
  const search = searchParams.get("search");

  const { data, isPending, isError } = trpc.users.get.useQuery({
    page: page < 1 ? DEFAULT_PAGE : page,
    totalItems: totalItems < 1 ? DEFAULT_TOTAL_ITEMS : totalItems,
    search,
  });

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString());
    searchTerm ? params.set("search", searchTerm) : params.delete("search");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <SearchForm
        placeholder="Search by name or email"
        onSearch={handleSearch}
      />
      {search && (
        <div className="text-sm text-gray-500">
          Search results for: <strong>{search}</strong>
        </div>
      )}
      <UsersTable
        users={data?.items ?? []}
        isLoading={isPending}
        isError={isError}
        totalPages={data?.totalPages ?? 1}
        currentPage={page}
        totalItems={totalItems}
      />
    </div>
  );
}

export default UsersContent;

"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { trpc } from "@/server/client";
import { UsersTable } from "@/components/features";
import SearchInput from "@/components/features/globals/SearchInput";
import { parseAsInteger, useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_ITEMS = 7;

function UsersContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [currentSearch, setCurrentSearch] = useQueryState("search", {
    defaultValue: "",
  });

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [totalItems, setTotalItems] = useQueryState(
    "totalItems",
    parseAsInteger.withDefault(0),
  );

  const { data, isPending, isError } = trpc.users.get.useQuery({
    page: page < 1 ? DEFAULT_PAGE : page,
    totalItems: totalItems < 1 ? DEFAULT_TOTAL_ITEMS : totalItems,
    search,
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-3 w-full md:w-72">
          <SearchInput
            currentSearch={currentSearch}
            setCurrentSearch={setCurrentSearch}
          />
        </div>
        <Select onValueChange={(value) => setTotalItems(parseInt(value))}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Total Items" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <UsersTable
        users={data?.items ?? []}
        isLoading={isPending}
        isError={isError}
        totalPages={data?.totalPages ?? 1}
        currentPage={page}
        totalItems={totalItems}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default UsersContent;

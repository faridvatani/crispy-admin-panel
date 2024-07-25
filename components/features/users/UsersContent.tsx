"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { trpc } from "@/server/client";
import { UsersTable } from "@/components/features";

const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_ITEMS = 10;

function UsersContent() {
  const searchParams = useSearchParams();

  const page = +(searchParams.get("page") ?? DEFAULT_PAGE); // + is a shorthand for parseInt
  const totalItems = +(searchParams.get("totalItems") ?? DEFAULT_TOTAL_ITEMS);

  const { data, isPending, isError } = trpc.users.get.useQuery({
    page: page < 1 ? DEFAULT_PAGE : page,
    totalItems: totalItems < 1 ? DEFAULT_TOTAL_ITEMS : totalItems,
  });

  return (
    <UsersTable
      users={data?.items ?? []}
      isLoading={isPending}
      isError={isError}
      totalPages={data?.totalPages ?? 1}
      currentPage={page}
      totalItems={totalItems}
    />
  );
}

export default UsersContent;

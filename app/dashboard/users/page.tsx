"use client";

import React, { Suspense } from "react";
import { UsersContent } from "@/components/features";

export default function Users() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UsersContent />
      </Suspense>
    </main>
  );
}

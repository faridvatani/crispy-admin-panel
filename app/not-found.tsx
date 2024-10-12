import { Button } from "@/components/ui";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-gray-400">
      <h1 className="text-8xl font-extrabold text-gray-600">404</h1>
      <p className="mt-2 text-3xl font-semibold">Page Not Found</p>
      <p className="mt-4 text-lg text-gray-500 max-w-md text-center">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        Let&rsquo;s get you back home and on track!
      </p>
      <Link href="/">
        <Button className="flex items-center gap-2 mt-6">Home</Button>
      </Link>
      <p className="mt-8 text-sm text-gray-400">
        If you believe this is an error, please contact support.
      </p>
    </div>
  );
}

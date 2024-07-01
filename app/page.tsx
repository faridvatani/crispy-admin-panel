"use client";
import { trpc } from "@/server/client";

export default function Home() {
  const users = trpc.users.get.useQuery();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {users.isLoading && <p>Loading...</p>}
        {users.data && (
          <ul>
            {users.data.map((user,index) => (
              <li key={index} className="flex items-center space-x-4">
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        )}
    </main>
  );
}

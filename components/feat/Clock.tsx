"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface props {
  theme?: string;
}

export default function Clock({ theme }: props) {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  return (
    <div
      className={cn(
        "p-3 text-center text-xs bg-popover border rounded-md ",
        theme,
      )}
    >
      {time}
    </div>
  );
}

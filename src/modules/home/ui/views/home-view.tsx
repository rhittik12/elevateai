"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {
    const trpc = useTRPC();
    const {data} = useQuery(trpc.hello.queryOptions({text: "from tRPC"}));

  return (
      <div className="max-w-md mx-auto mt-12 p-6 flex flex-col gap-4">
        {data?.greeting}
      </div>
    );
}

"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
    const router = useRouter();
  const {data: session} = authClient.useSession();

  if(!session) {
    return (
      <p>
        Loading....
      </p>
    );
  }

  return (
      <div className="max-w-md mx-auto mt-12 p-6 flex flex-col gap-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut({fetchOptions: {
            onSuccess: () => router.push("/auth/sign-in"),
        }}
        )}>Sign Out</Button>
      </div>
    );
}

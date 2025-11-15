"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      name,
      email,
      password,
    },{
      onError: () => {
        window.alert("something went wrong");
      },
      onSuccess: () => {
        window.alert("user created successfully");
      }
    });
  }

  const onLogin = () => {
    authClient.signIn.email(
      { email, password },
      {
        onError: () => window.alert("login failed"),
        onSuccess: () => window.alert("login successful")
      }
    );
  };

  if(session){
    return (
      <div className="max-w-md mx-auto mt-12 p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name || session.user?.email}</h1>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Create User</h2>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onSubmit}>create user</Button>
      </div>

      <div className="flex flex-col gap-4 border-t pt-6">
        <h2 className="text-lg font-semibold">Login</h2>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onLogin}>login</Button>
      </div>
    </div>
  );
};

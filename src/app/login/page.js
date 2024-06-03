"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleSignIn from "../components/GoogleSignIn";

export default function Login() {
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("demo123");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="rounded-md p-2 pl-4 min-w-72"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="rounded-md p-2 pl-4 min-w-72"
        />
        <div className="flex justify-end">
          <button type="submit" className="rounded-md p-2 bg-green-600 hover:bg-green-500 transition-all text-white">Login</button>
        </div>
      </form>
      <span className="text-xs text-gray-700 my-3">Ya da</span>
      <div className="my-4">
      <GoogleSignIn />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleSignIn from "../components/GoogleSignIn";
import { signIn } from "next-auth/react";
import useUserStore from "../store/useUserStore";

export default function Login() {
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  
  const router = useRouter();
  const { setToken, setUser } = useUserStore((state) => ({
    setToken: state.setToken,
    setUser: state.setUser,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <button
            type="submit"
            className="rounded-md p-2 bg-green-600 hover:bg-green-500 transition-all text-white"
          >
            Login
          </button>
        </div>
      </form>
      <span className="text-xs text-gray-700 my-3">Ya da</span>
      <div className="my-4">
        <GoogleSignIn />
      </div>
    </div>
  );
}

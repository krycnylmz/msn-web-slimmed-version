"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleSignIn from "../components/GoogleSignIn";
import useUserStore from "../store/useUserStore";
import apiService from "../../lib/apiService";

export default function Login() {
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("demo123");
  const router = useRouter();
  const { setToken, setUser } = useUserStore((state) => ({
    setToken: state.setToken,
    setUser: state.setUser,
  }));


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.login(email, password);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);

      // Kullanıcı bilgisini güncellemek için custom event tetikleyin
      window.dispatchEvent(new Event("userUpdated"));

      router.push("/"); // Login sonrası ana sayfaya yönlendirin
    } catch (error) {
      console.error("Login failed", error);
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

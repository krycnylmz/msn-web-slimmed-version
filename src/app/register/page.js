"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters long, contain at least one digit, and one non-alphabetic character.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, email, password, country, city }),
    });

    if (res.status === 201) {
      router.push("/login");
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div>
      <form
        onSubmit={handleRegister}
        className="flex flex-col justify-center items-center gap-4"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="rounded-md p-2 pl-4 min-w-72"
        />
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Surname"
          required
          className="rounded-md p-2 pl-4 min-w-72"
        />
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="rounded-md p-2 pl-4 min-w-72"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
          className="rounded-md p-2 pl-4 min-w-72"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
          className="rounded-md p-2 pl-4 min-w-72"
        />
        <div className=" min-w-72 flex flex-row justify-end">
          <button
            type="submit"
            className="p-2 px-4 bg-green-600 hover:bg-green-500 transition-all rounded-md text-white"
          >
            Kayıt Ol
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "token",
          data.access_token
        );

        alert("Login Successful");

        window.location.href = "/dashboard";
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error(error);

      alert("Login failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="border p-10 rounded-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6">
          CDI Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border p-3 w-full mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border p-3 w-full mb-6"
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white px-4 py-3 rounded w-full"
        >
          Login
        </button>
      </div>
    </main>
  );
}
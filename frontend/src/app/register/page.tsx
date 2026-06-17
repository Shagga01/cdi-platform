"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/register",
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
        alert("Registration Successful");

        window.location.href = "/login";
      } else {
        alert(data.detail || "Registration failed");
      }
    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="border p-10 rounded-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6">
          CDI Register
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
          onClick={handleRegister}
          className="bg-black text-white px-4 py-3 rounded w-full"
        >
          Register
        </button>
      </div>
    </main>
  );
}
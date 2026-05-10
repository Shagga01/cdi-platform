"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    async function fetchBackend() {
      try {
        const response = await fetch("http://127.0.0.1:8000/");
        const data = await response.json();

        console.log(data);

        setMessage(data.message);
      } catch (error) {
        console.error(error);

        setMessage("Failed to connect to backend");
      }
    }

    fetchBackend();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-6">
        CDI Platform
      </h1>

      <p className="text-2xl mb-8">
        Capability Development Infrastructure
      </p>

      <div className="p-4 border rounded-lg">
        <p className="font-semibold">
          Backend Status:
        </p>

        <p>{message}</p>
      </div>
    </main>
  );
}
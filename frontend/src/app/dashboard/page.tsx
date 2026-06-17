"use client";

import { useEffect, useState } from "react";

interface User {

  id: number;

  email: string;
}

export default function DashboardPage() {

  const [user, setUser] =
    useState<User | null>(null);

  async function fetchUser() {

    const token =
      localStorage.getItem(
        "access_token"
      );

    console.log("TOKEN:", token);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/auth/me",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {

        setUser(data);

      } else {

        alert("Unauthorized");

      }

    } catch (error) {

      console.error(error);

    }
  }

  function logout() {

    localStorage.removeItem(
      "access_token"
    );

    window.location.href =
      "/login";
  }

  useEffect(() => {

    fetchUser();

  }, []);

  return (

    <main className="p-10">

      <h1 className="text-5xl font-bold mb-8">
        CDI Dashboard
      </h1>

      {user && (

        <div className="border p-6 rounded-lg max-w-md">

          <p className="text-xl mb-4">
            Authenticated User
          </p>

          <p>
            {user.email}
          </p>

          <button
            onClick={logout}
            className="mt-6 bg-black text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      )}

    </main>

  );
}
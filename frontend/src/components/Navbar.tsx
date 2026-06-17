"use client";

import Link from "next/link";

export default function Navbar() {

  function logout() {

    localStorage.removeItem(
      "access_token"
    );

    window.location.href =
      "/login";
  }

  return (

    <nav className="border-b p-4 flex justify-between items-center">

      <Link
        href="/"
        className="text-2xl font-bold"
      >
        CDI
      </Link>

      <div className="flex gap-4">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <button
          onClick={logout}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </nav>

  );
}
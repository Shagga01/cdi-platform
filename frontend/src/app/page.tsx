"use client";

import { useEffect, useState } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
}

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function fetchStudents() {
    try {
      const response = await fetch("http://127.0.0.1:8000/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  async function createStudent() {
    try {
      const response = await fetch("http://127.0.0.1:8000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      if (response.ok) {
        setName("");
        setEmail("");
        fetchStudents();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-5xl font-bold mb-4">
        CDI Platform
      </h1>

      <p className="text-xl mb-10">
        Capability Development Infrastructure
      </p>

      <div className="border p-6 rounded-lg w-full max-w-md mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Create Student
        </h2>

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={createStudent}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Student
        </button>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          Students
        </h2>

        {students.map((student) => (
          <div
            key={student.id}
            className="border p-4 rounded mb-4"
          >
            <p>
              <strong>Name:</strong> {student.name}
            </p>

            <p>
              <strong>Email:</strong> {student.email}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
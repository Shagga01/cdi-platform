"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  description: string;
}

export default function CoursesPage() {

  const [courses, setCourses] =
    useState<Course[]>([]);

  async function fetchCourses() {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/courses/"
      );

      const data = await response.json();

      setCourses(data);

    } catch (error) {

      console.error(error);

    }
  }

  useEffect(() => {

    fetchCourses();

  }, []);

  return (

    <main className="p-10">

      <h1 className="text-5xl font-bold mb-8">
        CDI Courses
      </h1>

      <div className="grid gap-6">

        {courses.map((course) => (

          <Link
            href={`/courses/${course.id}`}
            key={course.id}
            className="block"
          >

            <div className="border p-6 rounded-lg hover:bg-gray-100 cursor-pointer transition">

              <h2 className="text-2xl font-semibold mb-2">
                {course.title}
              </h2>

              <p>
                {course.description}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </main>

  );
}
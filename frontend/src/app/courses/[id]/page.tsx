"use client";

import { use, useEffect, useState } from "react";

interface Lesson {

  id: number;

  title: string;

  content: string;
}

interface ProgressResponse {

  progress: number;
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = use(params);

  const [lessons, setLessons] =
    useState<Lesson[]>([]);

  const [progress, setProgress] =
    useState(0);

  const [
    completedLessons,
    setCompletedLessons
  ] = useState<number[]>([]);

  async function fetchLessons() {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/lessons/course/${id}`
      );

      const data = await response.json();

      setLessons(data);

    } catch (error) {

      console.error(error);

    }
  }

  async function fetchProgress() {

    const token =
      localStorage.getItem(
        "access_token"
      );

    console.log("TOKEN:", token);

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/progress/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data: ProgressResponse =
        await response.json();

      setProgress(data.progress);

    } catch (error) {

      console.error(error);

    }
  }

  async function completeLesson(
    lessonId: number
  ) {

    const token =
      localStorage.getItem(
        "access_token"
      );

    console.log("TOKEN:", token);

    try {

      await fetch(
        "http://127.0.0.1:8000/progress/",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            lesson_id: lessonId,
          }),
        }
      );

      setCompletedLessons([
        ...completedLessons,
        lessonId,
      ]);

      fetchProgress();

    } catch (error) {

      console.error(error);

    }
  }

  useEffect(() => {

    fetchLessons();

    fetchProgress();

  }, []);

  return (

    <main className="p-10">

      <h1 className="text-5xl font-bold mb-8">
        Course Lessons
      </h1>

      <div className="mb-8">

        <p className="text-xl font-semibold mb-2">
          Course Progress
        </p>

        <div className="w-full bg-gray-300 rounded-full h-6">

          <div
            className="bg-green-500 h-6 rounded-full"
            style={{
              width: `${progress}%`
            }}
          />

        </div>

        <p className="mt-2">
          {progress}% Complete
        </p>

      </div>

      <div className="grid gap-6">

        {lessons.map((lesson) => (

          <div
            key={lesson.id}
            className="border p-6 rounded-lg"
          >

            <h2 className="text-2xl font-semibold mb-2">
              {lesson.title}
            </h2>

            <p>
              {lesson.content}
            </p>

            <button
              onClick={() =>
                completeLesson(
                  lesson.id
                )
              }
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >

              {completedLessons.includes(
                lesson.id
              )
                ? "Completed"
                : "Complete Lesson"}

            </button>

          </div>

        ))}

      </div>

    </main>

  );
}
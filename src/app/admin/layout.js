"use client";
import ChechCourses from "@/components/ChechCourses";
import Modal from "@/components/modal/Modal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Layout({ children }) {
  const [numCourses, setNumCourses] = useState(-1);
  const [message, setMesssage] = useState("");
  const router = useRouter();
  const goCourseHandler = () => {
    router.refresh();
    router.push("/admin/course");
  };
  const goCourseScheduleHandler = async () => {
    const res = await fetch("/api/courses");
    if (!res.ok) {
      const er = await res.json();
      setMesssage(er.message);
      setNumCourses(er.length);
      console.log(er);
      return;
    }
    // const dataCourse = await res.json();

    router.refresh();
    router.push("/admin/course_schedule");
  };
  return (
    <div>
      <div className="flex font-bold items-center justify-between w-full m-auto  bg-gray-400 text-white px-5 py-7  shadow-2xl">
        <button
          onClick={goCourseScheduleHandler}
          className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
        >
          Add Course Schedule
        </button>
        <button
          onClick={goCourseHandler}
          className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
        >
          Add Course
        </button>
      </div>
      {numCourses === 0 && (
        <ChechCourses message={message} setNumCourses={setNumCourses} />
      )}
      {children}
    </div>
  );
}

export default Layout;

"use client";
import ChechCourses from "@/components/ChechCourses";
import Modal from "@/components/modal/Modal";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Layout({ children }) {
  const url = usePathname();
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

      // console.log(er);
      return;
    }
    const dataCourse = await res.json();
    // console.log(dataCourse);
    if (dataCourse.length === 0) {
      setMesssage(dataCourse.message);
      setNumCourses(dataCourse.length);
    } else {
      router.refresh();
      router.push("/admin/course_schedule");
    }
  };

  const goStudents = () => {
    router.refresh();
    router.push('/admin/view_students')
  };
  const goCoursesSchedule=()=>{
    router.push('/admin/view_schedule')
  }
  const goCourses=()=>{
    router.push('/admin/view_courses')
  }
  return (
    <main className="w-11/12 m-auto mt-5">
      {numCourses === 0 ? (
        <ChechCourses message={message} setNumCourses={setNumCourses} />
      ) : (
        ""
      )}
      <div className="flex gap-3">
        <section className="flex flex-col gap-3 w-[208px] bg-white rounded-xl  p-3 h-max">
          <button
            onClick={goCourseHandler}
            className={
              " inline-flex items-center  justify-center px-3 py-1 rounded-md font-sans font-semibold tracking-wide text-black bg-yellow-600  w-[200px] hover:bg-yellow-800 hover:text-gray-100" 
            }
          >
            Add Course
          </button>
          <button
            onClick={goCourseScheduleHandler}
            className={
              " inline-flex items-center  justify-center py-1 px-3 rounded-md font-sans font-semibold tracking-wide text-black bg-yellow-600  w-[200px] hover:bg-yellow-800 hover:text-gray-100"
            }
          >
            Add Course Schedule
          </button>

          <button
            onClick={goStudents}
            className={
              " inline-flex items-center  justify-center px-3 py-1 rounded-md font-sans font-semibold tracking-wide text-black bg-yellow-600  w-[200px] hover:bg-yellow-800 hover:text-gray-100 "
            }
          >
            Students
          </button>
          <button
            onClick={goCourses}
            className={
              " inline-flex items-center  justify-center px-3 py-1 rounded-md font-sans font-semibold tracking-wide text-black bg-yellow-600  w-[200px] hover:bg-yellow-800 hover:text-gray-100 "
            }
          >
            Courses
          </button>
          <button
            onClick={goCoursesSchedule}
            className={
              " inline-flex items-center  justify-center px-3 py-1 rounded-md font-sans font-semibold tracking-wide text-black bg-yellow-600  w-[200px] hover:bg-yellow-800 hover:text-gray-100 "
            }
          >
            Courses Schedule
          </button>
        </section>
        <div
          className={
            "   w-11/12  min-h-[60vh] mb-5 text-black rounded-xl bg-white"
          }
        >
          {children}
        </div>
      </div>
    </main>
  );
}

export default Layout;

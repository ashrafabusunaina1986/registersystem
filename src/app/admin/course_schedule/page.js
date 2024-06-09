"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import downarrow from "../../../../public/img/downArrow.svg";
import Get from "@/components/Get";
import Schedule from "@/components/Schedule";
import { usePathname, useRouter } from "next/navigation";
import ChechCourses from "@/components/ChechCourses";
import SelectValue from "@/components/SelectValue";

function CourseSchedule() {
  const url = usePathname();
  const router = useRouter();

  const [numCourses, setNumCourses] = useState(-1);
  const [errorss, setErrorss] = useState({});
  const [message, setMessage] = useState({});
  const [courses, setCourses] = useState([]);

  const [hideDay, setHideDay] = useState(false);
  const [hideCourse, setHideCourse] = useState(false);
  const [dayValue, setDayValue] = useState("");
  const [courseValue, setCourseValue] = useState("");

  const addCourseScheduleHandler = async (e) => {
    e.preventDefault();
    let errors = {};
    let m = {};
    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd);
    if (
      values.startTime &&
      values.endTime &&
      values.roomId &&
      values.day &&
      values.course
    ) {
      errors = {
        startTime: "",
        endTime: "",
        roomId: "",
        dayValue: "",
        courseValue: "",
      };
      if (values.startTime < values.endTime) {
        errors.time = "";
        const startTime = values.startTime.toString(),
          endTime = values.endTime.toString(),
          roomId = values.roomId,
          day = values.day,
          course = values.course;

        const res = await fetch("/api/courseschedule", {
          method: "POST",
          body: JSON.stringify({
            startTime,
            endTime,
            roomId,
            day,
            course,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const er = await res.json();
          m.success = er.success;
          m.message = er.message;
          setMessage(m);
          return;
        }
        const result = await res.json();
        m.success = result.success;
        m.message = result.message;
        // console.log(m, result);
        setMessage(m);
        router.push("/admin/view_schedule");
      } else {
        errors.time = "enter start time less than end time";
      }
    } else {
      if (!values.startTime) errors.startTime = "enter start time";
      else errors.startTime = "";
      if (!values.endTime) errors.endTime = "enter end time";
      else errors.endTime = "";
      if (!values.roomId) errors.roomId = "enter roomId";
      else errors.roomId = "";
      if (!values.day) errors.dayValue = "enter day value";
      else errors.dayValue = "";
      if (!values.course) errors.courseValue = "ente course value";
      else errors.courseValue = "";
    }
    setErrorss(errors);
  };
  // after view page
  const getCourses = async () => {
    const res = await fetch("/api/courses");
    if (!res.ok) return;
    const dataCourse = await res.json();
    setCourses(dataCourse.courses);
    setNumCourses(dataCourse.courses.length);
  };
  useEffect(() => {
    getCourses();
  }, [message.success]);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "thursday"];
  return (
    <div>
      {url === "/admin/course_schedule" && numCourses === 0 && (
        <ChechCourses
          message={"not found courses"}
          setNumCourses={setNumCourses}
        />
      )}

      <form
        onSubmit={addCourseScheduleHandler}
        className="w-4/6 m-auto mt-2 mb-10 bg-gray-100   p-10"
      >
        <div className="px-5 py-3 m-auto w-max font-bold shadow-lg mb-10 text-black border-[2px] border-blue-950">
          Courses schedule
        </div>
        {errorss.time ? (
          <div className="shadow-lg bg-red-200 text-red-700  p-2 w-max flex items-center justify-center ml-60 mb-2">
            {errorss.time}
          </div>
        ) : (
          ""
        )}
        {errorss.dayValue ? (
          <div className="shadow-lg bg-red-200 text-red-700  p-2 w-max flex items-center justify-center ml-60 mb-2">
            {errorss.dayValue}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-36  font-bold items-center mb-5">
          <label for="day">Day</label>
          <SelectValue data={days} name="day" />
        </div>
        {errorss.courseValue ? (
          <div className="shadow-lg bg-red-200 text-red-700  p-2 w-max flex items-center justify-center ml-60 mb-2">
            {errorss.courseValue}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-32 font-bold items-center mb-5">
          <label for="course">Course</label>
          <SelectValue data={courses} name="course" />
        </div>
        {errorss.startTime ? (
          <div className="shadow-lg bg-red-200 text-red-700  p-2 w-max flex items-center justify-center ml-60 mb-2">
            {errorss.startTime}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-12 font-bold items-center mb-5">
          <label for="startTime">start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            placeholder="enter startTime"
            className="w-[300px] border border-slate-400  py-3 px-5 outline-none 	bg-transparent"
          />
        </div>
        {errorss.endTime ? (
          <div className="shadow-lg bg-red-200 text-red-700  p-2 w-max flex items-center justify-center ml-60 mb-2">
            {errorss.endTime}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-14 font-bold items-center mb-5">
          <label for="endTime">end Time</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            placeholder="enter endTime"
            className="w-[300px] border border-slate-400  py-3 px-5 outline-none 	bg-transparent"
          />
        </div>
        {errorss.roomId ? (
          <div className="shadow-lg bg-red-200 text-red-700  p-2 w-max flex items-center justify-center ml-60 mb-2">
            {errorss.roomId}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-16 font-bold items-center mb-5">
          <label for="roomId">Room Id</label>
          <input
            type="text"
            id="roomId"
            name="roomId"
            placeholder="enter roomId"
            className="w-[300px] border border-slate-400  py-3 px-5 outline-none 	bg-transparent"
          />
        </div>
        <div className="flex gap-10 font-bold items-center justify-center mb-5">
          <button className="inline-flex items-center justify-center px-3 py-1 font-sans font-semibold tracking-wide text-white bg-blue-500 hover:bg-blue-700 -ml-32 ">
            Add course schedule
          </button>
          {message.success === undefined ? (
            ""
          ) : message.success ? (
            <span className=" border border-slate-700 px-2 py-1 bg-gray-400  text-white">
              {message.message}
            </span>
          ) : (
            <span className=" border border-red-700 p-1 bg-red-400  text-red-950 font-normal">
              {message.message}
            </span>
          )}
        </div>
      </form>
      {/* <Get
        data={coursesSchedule}
        delHandler={delHandler}
        editHandler={editHandler}
      /> */}
    </div>
  );
}

export default CourseSchedule;

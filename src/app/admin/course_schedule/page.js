"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import downarrow from "../../../../public/img/downArrow.svg";
import Get from "@/components/Get";
import Schedule from "@/components/Schedule";
import { usePathname, useRouter } from "next/navigation";
import ChechCourses from "@/components/ChechCourses";
import SelectValue from "@/components/SelectValue";
import { ConvertTimeToNum } from "@/helper/convertTimeToNum";
import Menu from "@/components/Menu";
import { info } from "../page";
import Box from "@/components/Box";

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

      const st = values.startTime,
        et = values.endTime;
      const start = ConvertTimeToNum(st),
        end = ConvertTimeToNum(et);
      // enter time between 8 - 14 time,enter start time less than end time,interval hour and a quarter hour
      if (
        end <= 14 * 60 * 60 &&
        end >= 7 * 60 * 60 &&
        end - start <= 75 * 60 &&
        end - start >= 40 * 60
      ) {
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
          alert(er.message);
          setMessage(m);
          return;
        }
        const result = await res.json();
        m.success = result.success;
        m.message = result.message;
        // console.log( result);
        setMessage(m);
        router.push("/admin/view_schedule");
        router.refresh()
      } else {
        errors.time = `enter time between 7 - 14 time,enter start time less than end time,interval hour and a quarter hour`;
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
  const t = 0;
  useEffect(() => {
    getCourses();
  }, [message.success]);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "thursday"];
  return (
    <div className="w-11/12 flex gap-20 sm:gap-0 md:gap-0">
      <div className="w-3/12 relative block sm:relative sm:hidden md:relative md:hidden ">
        <Menu info={info} d={"h"} />
      </div>
      <div className=" sm:relative sm:block md:relative md:block relative hidden sm:my-5 md:my-5">
        <Box menu={<Menu info={info} d={"h"} />} />
      </div>
      <section className=" w-full sm:w-full md:w-full -mt-5 sm:relative sm:left-0 sm:top-10 md:relative md:left-0 md:top-10">
        {url === "/admin/course_schedule" && numCourses === 0 && (
          <ChechCourses
            message={"not found courses"}
            setNumCourses={setNumCourses}
          />
        )}

        <form
          onSubmit={addCourseScheduleHandler}
          className="w-full sm:w-full md:w-full sm:border-[2px] sm:border-slate-900 md:border-[2px] md:border-slate-900  mt-10 mb-10 bg-white flex flex-col items-center justify-center  px-8 py-5 rounded-md "
        >
          <div className="px-5 py-3 m-auto w-max font-bold shadow-lg mb-10 text-black border-[2px] border-blue-950">
            Courses schedule
          </div>
          {errorss.time ? (
            <div className="shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
              {errorss.time}
            </div>
          ) : (
            ""
          )}
          {errorss.dayValue ? (
            <div className="shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
              {errorss.dayValue}
            </div>
          ) : (
            ""
          )}
          <div className="flex sm:w-full md:w-full w-full sm:flex md:flex font-bold sm:font-semibold md:font-semibold items-center sm:justify-between md:justify-between justify-around mb-5">
            <label for="day">Day</label>
            <SelectValue data={days} name="day" />
          </div>
          {errorss.courseValue ? (
            <div className="shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
              {errorss.courseValue}
            </div>
          ) : (
            ""
          )}
          <div className="flex sm:w-full md:w-full w-full sm:flex md:flex font-bold sm:font-semibold md:font-semibold items-center sm:justify-between md:justify-between justify-around mb-5">
            <label for="course">Course</label>
            <SelectValue data={courses} name="course" />
          </div>
          {errorss.startTime ? (
            <div className="shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
              {errorss.startTime}
            </div>
          ) : (
            ""
          )}
          <div className="flex sm:w-full md:w-full w-full sm:flex md:flex font-bold sm:font-semibold md:font-semibold items-center sm:justify-between md:justify-between justify-around mb-5">
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
            <div className="shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
              {errorss.endTime}
            </div>
          ) : (
            ""
          )}
          <div className="flex sm:w-full md:w-full w-full sm:flex md:flex font-bold sm:font-semibold md:font-semibold items-center sm:justify-between md:justify-between justify-around mb-5">
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
            <div className="shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
              {errorss.roomId}
            </div>
          ) : (
            ""
          )}
          <div className="flex sm:w-full md:w-full w-full sm:flex md:flex font-bold sm:font-semibold md:font-semibold items-center sm:justify-between md:justify-between justify-around mb-5">
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
            <button className="w-[300px] inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-black rounded-md hover:bg-gray-700 hover:text-gray-50">
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
      </section>
    </div>
  );
}

export default CourseSchedule;

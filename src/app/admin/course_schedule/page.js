"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import downarrow from "../../../../public/img/downArrow.svg";
import Get from "@/components/Get";
import Schedule from "@/components/Schedule";
import { usePathname, useRouter } from "next/navigation";
import ChechCourses from "@/components/ChechCourses";

function CourseSchedule() {
  const url = usePathname();
  const router = useRouter();
  const [numCourses,setNumCourses]=useState(-1)
  const [coursesSchedule, setCoursesSchedule] = useState([]);
  const [courseSchedule, setCourseSchedule] = useState([]);
  const [courses, setCourses] = useState([]);

  const [errorss, setErrorss] = useState({});
  const [message, setMessage] = useState({});
  const [isShow, setIsShow] = useState(false);

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
      dayValue &&
      courseValue
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
          roomId = values.roomId;
        const res = await fetch("/api/courseschedule", {
          method: "POST",
          body: JSON.stringify({
            startTime,
            endTime,
            roomId,
            dayValue,
            courseValue,
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
      if (!dayValue) errors.dayValue = "enter day value";
      else errors.dayValue = "";
      if (!courseValue) errors.courseValue = "ente course value";
      else errors.courseValue = "";
    }
    setErrorss(errors);
  };

  const delHandler = async (id) => {
    const del = confirm("Are you sure");
    if (del) {
      const res = await fetch("/api/courseschedule", {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) return console.log(await res.json());
      const dels = await res.json();
      // console.log(dels);
      getCoursesSchedules();
    }
  };

  const editHandler = (id) => {
    const schedule = coursesSchedule.find((schedule) => schedule._id === id);
    setCourseSchedule(schedule);
    // console.log(schedule)
    setIsShow(true);
  };

  const getCourses = async () => {
    const res = await fetch("/api/courses");
    if (!res.ok) return;
    const dataCourse = await res.json();
    setCourses(dataCourse.courses);
    setNumCourses(dataCourse.courses.length)
  };
  const getCoursesSchedules = async () => {
    const res = await fetch("/api/courseschedule");
    if (!res.ok) return;
    const dataCourseSchedule = await res.json();
    setCoursesSchedule(dataCourseSchedule.courseSchedules);
  };
  useEffect(() => {
    getCourses();
    getCoursesSchedules();
  }, [message.success]);
  return (
    <div>
      {url === "/admin/course_schedule" && numCourses===0 && (
        <ChechCourses
          message={"not found courses"}
          setNumCourses={setNumCourses}
        />
      )}
      {isShow && (
        <Schedule
          courseSchedule={courseSchedule}
          setIsShow={setIsShow}
          setMessage={setMessage}
        />
      )}
      <form
        onSubmit={addCourseScheduleHandler}
        className="w-2/4 m-auto mt-10 mb-10  p-5"
      >
        {errorss.time ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.time}
          </div>
        ) : (
          ""
        )}
        {errorss.dayValue ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.dayValue}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-36 font-bold items-center mb-5">
          <label for="day">Day</label>
          <div className=" relative">
            <div
              onClick={() => {
                setHideDay((prev) => !prev);
              }}
              className=" font-semibold border cursor-pointer border-slate-600 px-2 py-1 gap-10 rounded-lg flex justify-between"
            >
              {dayValue ? (
                dayValue
              ) : (
                <div className="font-semibold border cursor-pointer border-slate-600 px-2 py-1 gap-10 rounded-lg flex justify-between">
                  day
                  <Image
                    src={downarrow}
                    alt="Down Arrow"
                    width={15}
                    height={10}
                  />
                </div>
              )}
            </div>
            <div
              onClick={() => setHideDay(false)}
              id="box"
              className={
                hideDay
                  ? "rounded absolute z-30 bg-white w-[300px]   top-[40px] shadow-md border-[1px] border-gray-300"
                  : "hidden"
              }
            >
              <div
                onClick={(e) => setDayValue(e.target.innerText)}
                className="  cursor-pointer hover:bg-gray-500 py-4 px-2"
              >
                Sunday
              </div>
              <div
                onClick={(e) => setDayValue(e.target.innerText)}
                className=" cursor-pointer hover:bg-gray-500 py-4 px-2"
              >
                Monday
              </div>
              <div
                onClick={(e) => setDayValue(e.target.innerText)}
                className=" cursor-pointer hover:bg-gray-500 py-4 px-2"
              >
                Tueday
              </div>
              <div
                onClick={(e) => setDayValue(e.target.innerText)}
                className=" cursor-pointer hover:bg-gray-500 py-4 px-2"
              >
                Wednesday
              </div>
              <div
                onClick={(e) => setDayValue(e.target.innerText)}
                className=" cursor-pointer hover:bg-gray-500 py-4 px-2"
              >
                Thursday
              </div>
            </div>
          </div>
        </div>
        {errorss.courseValue ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.courseValue}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-32 font-bold items-center mb-5">
          <label for="course">Course</label>
          <div className=" relative ">
            <div
              onClick={() => {
                setHideCourse((prev) => !prev);
              }}
              className=" font-semibold border cursor-pointer border-slate-600 px-2 py-1 gap-10 rounded-lg flex justify-between"
            >
              {courseValue ? (
                courseValue
              ) : (
                <div className="font-semibold border cursor-pointer border-slate-600 px-2 py-1 gap-5 rounded-lg flex justify-between">
                  course
                  <Image
                    src={downarrow}
                    alt="Down Arrow"
                    width={15}
                    height={10}
                  />
                </div>
              )}
            </div>
            <div
              onClick={() => setHideCourse(false)}
              id="box"
              className={
                hideCourse
                  ? "rounded absolute  bg-white w-[300px]   top-[40px] shadow-md border-[1px] border-gray-300"
                  : "hidden"
              }
            >
              {courses &&
                courses.map((course) => {
                  return (
                    <div
                      key={course._id}
                      onClick={(e) => setCourseValue(e.target.innerText)}
                      className="  cursor-pointer hover:bg-gray-500 py-4 px-2"
                    >
                      {course.name}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {errorss.startTime ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.startTime}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-24 font-bold items-center mb-5">
          <label for="startTime">start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            placeholder="enter startTime"
            className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          />
        </div>
        {errorss.endTime ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.endTime}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-24 font-bold items-center mb-5">
          <label for="endTime">end Time</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            placeholder="enter endTime"
            className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          />
        </div>
        {errorss.roomId ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.roomId}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-24 font-bold items-center mb-5">
          <label for="roomId">Room Id</label>
          <input
            type="text"
            id="roomId"
            name="roomId"
            placeholder="enter roomId"
            className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          />
        </div>
        <div className="flex gap-10 font-bold items-center justify-center mb-5">
          <button className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 hover:bg-blue-700 rounded-lg h-[60px]">
            Add course schedule
          </button>
          {message.success === undefined ? (
            ""
          ) : message.success ? (
            <span className=" border border-slate-700 px-2 py-1 bg-gray-400 rounded-lg text-white">
              {message.message}
            </span>
          ) : (
            <span className=" border border-red-700 p-1 bg-red-400 rounded-lg text-red-950 font-normal">
              {message.message}
            </span>
          )}
        </div>
      </form>
      <Get
        data={coursesSchedule}
        delHandler={delHandler}
        editHandler={editHandler}
      />
    </div>
  );
}

export default CourseSchedule;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Schedule from "@/components/Schedule";
import SearchValue from "@/components/SearchValue";
import ViewData from "@/components/ViewData";
import Menu from "@/components/Menu";
import { info } from "../page";
import Box from "@/components/Box";
function View_Schedule() {
  const searchRef = useRef(null);
  const [coursesSchedule, setCoursesSchedule] = useState([]);
  const [courseSchedule, setCourseSchedule] = useState([]);
  const [message, setMessage] = useState({});

  const [isShow, setIsShow] = useState(false);

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
      if (!res.ok) {
        const er = await res.json();
        alert(er.message);
        return;
      }
      const dels = await res.json();
      // console.log(dels);
      getCoursesSchedules();
    }
  };

  const editHandler = async (id) => {
    const schedule = coursesSchedule.find((schedule) => schedule._id === id);
    const res = await fetch("/api/check", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const er = await res.json();
      alert(er.message);
      return;
    }
    setCourseSchedule(schedule);
    // console.log(schedule)
    setIsShow(true);
  };

  const getCoursesSchedules = async () => {
    const res = await fetch(
      `/api/courseschedule?schedule=${searchRef.current.value}`
    );
    if (!res.ok) {
      const er = await res.json();
      // console.log(er)
      setMessage({ success: er.success });
      return;
    }
    const dataCourseSchedule = await res.json();
    // console.log(dataCourseSchedule.courseSchedules);
    setCoursesSchedule(dataCourseSchedule.courseSchedules);
  };
  const searchCourseScheduleHandeler = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const search = Object.fromEntries(fd);
    const res = await fetch(`/api/courseschedule?schedule=${search.schedule}`);
    if (!res.ok) {
      const er = await res.json();
      // console.log(er);
      setMessage({ success: er.success });
      return;
    }
    const result = await res.json();
    // console.log(result);
    setCoursesSchedule(result.courseSchedules);
    setMessage({ success: result.success });
  };
  useEffect(() => {
    getCoursesSchedules();
    setMessage({ success: undefined });
  }, [message.success]);
  return (
    <div className="w-11/12 flex gap-20 sm:gap-0 md:gap-0">
     <div className="w-3/12 relative block sm:relative sm:hidden md:relative md:hidden ">
        <Menu info={info} d={"h"} />
      </div>
      <div className=" sm:relative sm:block md:relative md:block relative hidden sm:my-5 md:my-5">
        <Box menu={<Menu info={info} d={"h"} />} />
      </div>
      <section className="w-full sm:w-full md:w-full -mt-5 sm:relative sm:left-0 sm:top-10 md:relative md:left-0 md:top-10">
        <SearchValue
          name={"DAY - COURSE - ROOM ID"}
          id={"schedule"}
          searchHandeler={searchCourseScheduleHandeler}
          searchRef={searchRef}
        />
        <ViewData
          keys={coursesSchedule[0]}
          page={
            <Schedule
              courseSchedule={courseSchedule}
              setIsShow={setIsShow}
              setMessage={setMessage}
            />
          }
          isShow={isShow}
          data={coursesSchedule}
          editHandler={editHandler}
          delHandler={delHandler}
          message="Courses schedule"
        />
      </section>
    </div>
  );
}

export default View_Schedule;

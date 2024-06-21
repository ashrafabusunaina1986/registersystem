"use client";
import Menu from "@/components/Menu";
import SearchValue from "@/components/SearchValue";
import ViewData from "@/components/ViewData";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { info_user } from "../page";

function User_Page() {
  var searchRef = useRef(null);

  const [message, setMessage] = useState({});
  const [Courses, setCourses] = useState([]);

  var searchscheduleHandler = async (e) => {};

  const getCourses = async () => {
    const res = await fetch(
      `/api/users/course?course=${searchRef.current.value}`
    );
    if (!res.ok) {
      const er = await res.json();
      setMessage({ success: er.success });
      console.log(er);
      return;
    }
    const dataCourse = await res.json();
    var courses_students = dataCourse.coursesstudents;
    setCourses(courses_students);

    // console.log(courses_students);
  };
  const searchCourseHandeler = async (e) => {
    // console.log(Object.keys(courses[0])[0]);
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const search = Object.fromEntries(fd);

    const res = await fetch(`/api/users/course?course=${search.course}`);
    if (!res.ok) {
      const er = await res.json();
      // console.log(er);
      setMessage({ success: er.success });
      return;
    }
    const result = await res.json();

    console.log(result.coursesstudents);
    setCourses(result.coursesstudents);
    setMessage({ success: result.success });
  };

  useEffect(() => {
    getCourses();
    // console.log(message.success);
    setMessage({ success: undefined });
  }, [message.success]);
  return (
    <div className="w-11/12 flex gap-3">
      <Menu info={info_user} d={"h"} />
      <section className=" w-full">
        <SearchValue
          name={"code,name,instructor,capacity"}
          id="course"
          searchHandeler={searchCourseHandeler}
          searchRef={searchRef}
        />
        <ViewData keys={Courses[0]} data={Courses} message={"Courses"} />
      </section>
    </div>
  );
}

export default User_Page;

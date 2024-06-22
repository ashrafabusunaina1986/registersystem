"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import Cart from "@/components/cart/Cart";
import SearchValue from "@/components/SearchValue";
import ViewData from "@/components/ViewData";
import Menu from "@/components/Menu";
import { info } from "../page";
import Box from "@/components/Box";

function ViewCourse() {
  const searchRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [scourse, setSCourse] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [message, setMessage] = useState({});

  const delCourseHandler = async (id) => {
    const delCourse = confirm("Are you sure");
    if (delCourse) {
      const res = await fetch("/api/courses", {
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
      const del = await res.json();
      // console.log(del);
      getCourses();
    }
  };
  const editCourseHandler = (id) => {
    const course = courses.find((c) => c._id === id);
    setCourse(course);
    setIsShow(true);
  };
  const getCourses = async () => {
    const res = await fetch(`/api/courses?course=${searchRef.current.value}`);
    if (!res.ok) {
      const er = await res.json();
      setMessage({ success: er.success });
      // console.log(er);
      return;
    }
    const dataCourse = await res.json();
    setCourses(dataCourse.courses);

    // console.log(dataCourse);
  };
  const searchCourseHandeler = async (e) => {
    // console.log(Object.keys(courses[0])[0]);
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const search = Object.fromEntries(fd);

    const res = await fetch(`/api/courses?course=${search.course}`);
    if (!res.ok) {
      const er = await res.json();
      // console.log(er);
      setMessage({ success: er.success });
      return;
    }
    const result = await res.json();
    // console.log(result);
    setCourses(result.courses);
    setMessage({ success: result.success });
  };

  useEffect(() => {
    getCourses();
    // console.log(message.success);
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
          searchRef={searchRef}
          searchHandeler={searchCourseHandeler}
          name={"CODE-NAME-INSTRUCTOR"}
          id={"course"}
        />
        <ViewData
          keys={courses[0]}
          page={
            <Cart
              course={course}
              setIsShow={setIsShow}
              setMessage={setMessage}
            />
          }
          isShow={isShow}
          data={courses}
          editHandler={editCourseHandler}
          delHandler={delCourseHandler}
          message="Courses"
        />
        {courses.length > 0 && (
          <a
            href="/admin/course_schedule"
            className="block ms-2 -mt-10 hover:underline w-max"
          >
            Add course schedule
          </a>
        )}
      </section>
    </div>
  );
}

export default ViewCourse;

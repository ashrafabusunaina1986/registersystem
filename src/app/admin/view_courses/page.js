"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import Cart from "@/components/cart/Cart";
import SearchValue from "@/components/SearchValue";

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
    console.log(result);
    // setCourses(result.courses);
    setMessage({ success: result.success });
  };

  useEffect(() => {
    getCourses();
    // console.log(message.success);
    setMessage({ success: undefined });
  }, [message.success]);
  return (
    <>
      <SearchValue
        searchRef={searchRef}
        searchHandeler={searchCourseHandeler}
        name={"course"}
      />
      {courses.length > 0 ? (
        <div>
          {isShow && (
            <Cart
              course={course}
              setIsShow={setIsShow}
              setMessage={setMessage}
            />
          )}

          <div className=" w-11/12 border border-purple-700 bg-slate-800 m-auto mb-10 mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-50 font-bold uppercase bg-blue-950 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-3 py-5">
                    Code
                  </th>
                  <th scope="col" class="px-3 py-5">
                    Name
                  </th>
                  <th scope="col" class="px-3 py-5">
                    Instructor
                  </th>
                  <th scope="col" class="px-3 py-5">
                    Capacity
                  </th>
                  <th scope="col" class="px-3 py-5">
                    update
                  </th>
                  <th scope="col" class="px-3 py-5">
                    delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses &&
                  courses.length > 0 &&
                  courses.map((course, ind) => {
                    return (
                      <tr
                        key={course._id}
                        className={
                          "even:bg-blue-300 even:text-gray-900 m-auto border-[1px] odd:font-semibold font-bold border-blue-950 bg-white text-black dark:text-black"
                        }
                      >
                        <th
                          scope="row"
                          className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {course.code}
                        </th>
                        <td className="px-3 py-4">{course.name}</td>
                        <td className="px-3 py-4">{course.instructor}</td>
                        <td className="px-3 py-4">{course.capacity}</td>
                        <td className="px-3 py-4">
                          <CiEdit
                            onClick={() => {
                              editCourseHandler(course._id);
                            }}
                          />
                        </td>
                        <td className="px-3 py-4">
                          <MdDelete
                            className="text-blue-600 cursor-pointer"
                            onClick={() => {
                              delCourseHandler(course._id);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className=" w-max bg-slate-300 text-slate-800 border-[2px] shadow-md border-blue-950 px-8 py-5 rounded-md m-auto mt-10">
          Courses not found
        </div>
      )}
    </>
  );
}

export default ViewCourse;

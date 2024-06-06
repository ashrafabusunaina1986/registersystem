"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Modal from "@/components/modal/Modal";
import Cart from "@/components/cart/Cart";
function Courses() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [errorss, setErrorss] = useState({});
  const [message, setMessage] = useState({});
  const [isShow, setIsShow] = useState(false);

  const addCoursehandler = async (e) => {
    let errors = {};
    let m = {},
      er = {};

    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    if (
      data.code &&
      data.name &&
      data.description &&
      data.instructor &&
      data.prerequisites &&
      data.capacity
    ) {
      const res = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        errors = {
          code: "",
          name: "",
          description: "",
          capacity: "",
          instructor: "",
          prerequisites: "",
        };
        const error = await res.json();
        er.success = error.success;
        er.message = error.message;
        er.code = error.error.code;
        er.name = error.error.name;
        console.log(er);
        setMessage(er);
        // setInterval(() => {
        //   setMessage({});
        // }, 1000 * 10);
        setErrorss(errors);
        return;
      }

      const result = await res.json();
      errors = {
        code: "",
        name: "",
        description: "",
        capacity: "",
        instructor: "",
        prerequisites: "",
      };
      m.success = result.success;
      m.message = result.message;
      setMessage(m);
      // window.location.reload();
      // if (res.status !== 400) {
      //   setInterval(() => {
      //     setMessage({});
      //   }, 3000);
      // }
    } else {
      if (!data.code) errors.code = "enter code";
      else errors.code = "";
      if (!data.name) errors.name = "enter name";
      else errors.name = "";
      if (!data.description) errors.description = "enter description";
      else errors.description = "";
      if (!data.instructor) errors.instructor = "enter instructor";
      else errors.instructor = "";
      if (!data.capacity) errors.capacity = "enter capacity";
      else errors.capacity = "";
      if (!data.prerequisites) errors.prerequisites = "enter prerequisites";
      else errors.prerequisites = "";
    }
    setErrorss(errors);
  };
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
    const res = await fetch("/api/courses");
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

  useEffect(() => {
    getCourses();
    setInterval(() => {
      setMessage({success:undefined,message:''})
    }, 5000);
  }, [message.success]);
  return (
    <div>
      {isShow && (
        <Cart course={course} setIsShow={setIsShow} setMessage={setMessage} />
      )}
      <form
        onSubmit={addCoursehandler}
        className="w-2/4 m-auto mt-10 mb-10  p-5"
      >
        {message.code ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {message.code}
          </div>
        ) : (
          ""
        )}
        {errorss.code ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.code}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-32 font-bold items-center mb-5">
          <label for="code">Code</label>
          {message.code ? (
            <input
              type="text"
              id="code"
              name="code"
              placeholder="enter code"
              className="w-[300px] border border-red-700 rounded-lg py-3 px-5 outline-none	bg-transparent"
            />
          ) : (
            <input
              type="text"
              id="code"
              name="code"
              placeholder="enter code"
              className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
            />
          )}
        </div>
        {message.name ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {message.name}
          </div>
        ) : (
          ""
        )}
        {errorss.name ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.name}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-32 font-bold items-center mb-5">
          <label for="name">Name</label>
          {message.name ? (
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter name"
              className="w-[300px] border border-red-700 rounded-lg py-3 px-5 outline-none	bg-transparent"
            />
          ) : (
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter name"
              className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
            />
          )}
        </div>
        {errorss.description ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.description}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-20 font-bold  mb-5">
          <label for="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="enter description"
            className=" resize-none h-32 w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          ></textarea>
        </div>
        {errorss.instructor ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.instructor}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-24 font-bold items-center mb-5">
          <label for="instructor">Instructor</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            placeholder="enter instructor"
            className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          />
        </div>
        {errorss.capacity ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.capacity}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-24 font-bold items-center mb-5">
          <label for="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            placeholder="enter capacity"
            className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          />
        </div>
        {errorss.prerequisites ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.prerequisites}
          </div>
        ) : (
          ""
        )}
        <div className="flex  gap-16 font-bold mb-5">
          <label for="prerequisites">Prerequisites</label>
          <textarea
            type="text"
            id="prerequisites"
            name="prerequisites"
            placeholder="enter prerequisites"
            className=" resize-none h-32 w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          ></textarea>
        </div>
        <div className="flex gap-10 font-bold items-center justify-center mb-5">
          <button className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 hover:bg-blue-700 rounded-lg h-[60px]">
            Add course
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
      <div className=" w-5/6 border border-purple-700 bg-slate-300 m-auto mb-10 mt-10">
        <div className="flex  p-5 font-bold">
          <span className="w-1/4">Code</span>
          <span className="w-1/4">Name</span>
          <span className="w-1/4">Instructor</span>
          <span className="w-1/6">Capacity</span>
          <div className="flex gap-5">
            <span className="">update</span>
            <span className="">del</span>
          </div>
        </div>
        {courses &&
          courses.length > 0 &&
          courses.map((course) => {
            return (
              <div key={course._id} className="flex p-5">
                <div className="w-1/4">{course.code}</div>
                <div className="w-1/4">{course.name}</div>
                <div className="w-1/4">{course.instructor}</div>
                <div className="w-1/6">{course.capacity}</div>
                <div className="flex gap-12">
                  <CiEdit
                    onClick={() => {
                      editCourseHandler(course._id);
                    }}
                  />
                  <MdDelete
                    className="text-blue-600 cursor-pointer"
                    onClick={() => {
                      delCourseHandler(course._id);
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Courses;

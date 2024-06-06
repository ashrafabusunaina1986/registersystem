"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function Courses() {
  const formRef=useRef(null)
  const route=useRouter()
  const [errorss, setErrorss] = useState({});
  const [message, setMessage] = useState({});

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
      // m.success = result.success;
      // m.message = result.message;
      route.push('/admin/view_courses')
      formRef.current.reset()
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
  // after page view course
  

  return (
    <div>
      
      <form ref={formRef}
        onSubmit={addCoursehandler}
        className="w-4/5 m-auto mt-10 mb-10  p-5"
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
      
    </div>
  );
}

export default Courses;

"use client";
import React, { useEffect, useState } from "react";

function Courses() {
  const [errorss, setErrorss] = useState({});
  const addCoursehandler = async (e) => {
    const errors = {};
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
      if (!res.ok) return console.log((await res.json()).message);
      const result = await res.json();
      console.log(result);
    } else {
      if (!data.code) errors.code = "enter code";
      if (!data.name) errors.name = "enter name";
      if (!data.description) errors.description = "enter description";
      if (!data.instructor) errors.instructor = "enter instructor";
      if (!data.capacity) errors.capacity = "enter capacity";
      if (!data.prerequisites) errors.prerequisites = "enter prerequisites";
    }
    setErrorss(errors);
  };
  useEffect(() => {}, []);
  return (
    <div>
      <form
        onSubmit={addCoursehandler}
        className="w-2/4 m-auto mt-10 mb-10  p-5"
      >
        {errorss.code ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.code}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-32 font-bold items-center mb-5">
          <label for="code">Code</label>
          <input
            type="text"
            id="code"
            name="code"
            placeholder="enter code"
            className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          />
        </div>
        {errorss.name ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.name}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-32 font-bold items-center mb-5">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="enter name"
            className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          />
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
          <button className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]">
            Add course
          </button>
        </div>
      </form>
    </div>
  );
}

export default Courses;

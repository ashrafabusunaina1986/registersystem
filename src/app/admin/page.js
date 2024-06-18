"use client";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

function Admin() {
  return (
    <div className="flex w-2/4 m-auto px-5 py-4 border-[1px] shadow-lg mt-10 rounded-t-md">
      <p className=" ">
        {" "}
        Welcome , for add courses{" "}
        <button
          onClick={() => {
            router.push("/admin/course");
          }}
          className="inline-flex bg-blue-400 px-2 py-1 mb-5 rounded-md shadow-md text-white"
        >
          Add course
        </button>{" "}
        or add course schedule{" "}
        <button
          onClick={() => {
            router.push("/admin/course_schedule");
          }}
          className="inline-flex bg-blue-400 px-2 py-1 rounded-md shadow-md text-white"
        >
          add course schedule
        </button>
      </p>
    </div>
  );
}

export default Admin;

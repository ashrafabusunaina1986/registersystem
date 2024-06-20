"use client";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

function Admin() {
  const info = [
    {
      id: 1,
      name: "Add Courses",
      href: "/admin/course",
    },
    {
      id: 2,
      name: "Add Course Schedules",
      href: "/admin/course_schedule",
    },
    {
      id: 3,
      name: "Students",
      href: "/admin/view_students",
    },
    {
      id: 4,
      name: "Courses",
      href: "/admin/view_courses",
    },
    {
      id: 5,
      name: "Courses Schedules",
      href: "/admin/view_schedule",
    },
  ];
  return (
    <div className="flex flex-col gap-5 w-11/12 m-auto px-5 py-4 border-[1px] shadow-lg mt-10 rounded-t-md">
      <ul className=" list-none m-auto flex items-center justify-around w-full">
        {info.map((item) => {
          return (
            <li className="hover:text-gray-600 hover:underline" key={item.id}>
              <a href={item.href}>{item.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Admin;

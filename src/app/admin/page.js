"use client";
import Menu from "@/components/Menu";
import { useRouter } from "next/navigation";
import React, { div, useLayoutEffect } from "react";

export const info = [
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
  {
    id: 6,
    name: "Main Page",
    href: "/",
  },
  {
    id: 7,
    name: "Logout",
    href: "/logout",
  },
];

function Admin() {
  return (
    <div className="w-11/12  m-auto">
      <Menu info={info} d="v" />
    </div>
  );
}

export default Admin;

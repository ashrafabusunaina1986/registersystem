import Menu from "@/components/Menu";
import Link from "next/link";
import React, { Fragment } from "react";
export const info_user = [
  {
    id: 1,
    name: "Courses schedules",
    href: "/users/courses",
  },
  {
    id: 2,
    name: "Register Courses Schedules",
    href: "/users/register_course",
  },
  {
    id: 3,
    name: "Logout",
    href: "/logout",
  },
];
function Users() {
  return (
    <Fragment>
      <Menu info={info_user} d="v" />
    </Fragment>
  );
}

export default Users;

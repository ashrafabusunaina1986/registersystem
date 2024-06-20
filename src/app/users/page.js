import Menu from "@/components/Menu";
import Link from "next/link";
import React, { Fragment } from "react";

function Users() {
  const info = [
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
  ];
  return (
    <Fragment>
      <Menu info={info} d="v" />
    </Fragment>
  );
}

export default Users;

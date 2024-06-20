import Link from "next/link";
import React from "react";

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
    <div className="flex flex-col gap-5 w-11/12 m-auto px-5 py-4 border-[1px] shadow-lg mt-10 rounded-t-md">
      <ul className="list-none m-auto flex items-center justify-around w-full">
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

export default Users;

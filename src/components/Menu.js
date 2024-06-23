import React, { Fragment } from "react";
import PropTypes from "prop-types";

function Menu({ info, d }) {
  return (
    <div
      className={
        (d === "v" &&
          "w-11/12 sm:w-5/12  md:w-6/12 m-auto px-5 py-4 border-[1px] shadow-lg mt-20 sm:rounded-lg md:rounded-lg rounded-full") ||
        (d === "h" &&
          "flex flex-col ms-5  sm:bg-gray-400 sm:absolute md:bg-gray-400 md:absolute gap-5 h-max w-full sm:w-[250px] md:w-[250px]  px-5 py-4 border-[1px] shadow-lg mt-5 rounded-lg")
      }
    >
      <ul
        className={
          (d === "v" &&
            "list-none m-auto flex sm:flex sm:flex-col md:flex-col md:gap-5 sm:gap-5 items-center justify-around sm:w-full") ||
          (d === "h" &&
            "list-none  flex flex-col items-center justify-center w-full")
        }
      >
        {info &&
          info.map((item) => {
            return (
              <li
                className={
                  (d === "v" &&
                    "hover:text-gray-600 sm:text-sm sm:font-medium sm:w-full sm:hover:text-gray-400 md:text-sm md:font-medium md:w-full md:hover:text-gray-400 hover:underline font-semibold") ||
                  (d === "h" &&
                    "text-gray-50 bg-slate-800 hover:shadow-lg hover:bg-slate-400 hover:text-slate-900 w-full mb-2 px-5 py-1 font-semibold text-sm rounded-md")
                }
                key={item.id}
              >
                <a href={item.href}>{item.name}</a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Menu;

import React, { Fragment } from "react";
import PropTypes from "prop-types";

function Menu({ info, d }) {
  return (
      <div
        className={
          (d === "v" &&
            "w-11/12 m-auto px-5 py-4 border-[1px] shadow-lg mt-20 rounded-full") ||
          (d === "h" &&
            "flex flex-col ms-5  gap-5 h-max w-2/6 px-5 py-4 border-[1px] shadow-lg mt-5 rounded-lg")
        }
      >
        <ul
          className={
            (d === "v" &&
              "list-none m-auto flex items-center justify-around w-full") ||
            (d === "h" &&
              "list-none  flex flex-col items-center justify-center w-full")
          }
        >
          {info &&
            info.map((item) => {
              return (
                <li
                  className={
                    (d === "v" && "hover:text-gray-600 hover:underline font-semibold") ||
                    (d === "h" &&"text-gray-50 bg-slate-800 hover:shadow-lg hover:bg-slate-400 hover:text-slate-900 w-full mb-2 px-5 py-1 font-semibold text-sm rounded-md")
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

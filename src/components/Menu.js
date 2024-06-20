import React, { Fragment } from "react";
import PropTypes from "prop-types";

function Menu({ info, d }) {
  return (
    <Fragment>
      <div
        className={
          (d === "v" &&
            "flex ms-5 gap-5 w-1/5 h-max px-5 py-4 border-[1px] shadow-lg mt-5 rounded-t-md") ||
          (d === "h" &&
            "flex flex-col ms-5 gap-5 h-max w-1/5 px-5 py-4 border-[1px] shadow-lg mt-5 rounded-t-md")
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
                    (d === "h" && "hover:text-gray-600 hover:border-gray-400  border-[2px] border-blue-950 w-[220px] mb-2 px-5 py-1 font-semibold text-sm rounded-md")
                  }
                  key={item.id}
                >
                  <a href={item.href}>{item.name}</a>
                </li>
              );
            })}
        </ul>
      </div>
    </Fragment>
  );
}

export default Menu;

import React from "react";

function SelectValue({ data, name }) {
  return (
    <select
      id={name}
      name={name}
      className="w-[300px]  bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-950 focus:border-blue-500 block  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="">{name}</option>
      {data && typeof Object.values(data)[0] === "string"
        ? data.map((value, ind) => {
            return (
              <option
                className="bg-blue-950 text-white font-bold"
                key={ind}
                value={value}
              >
                {value}
              </option>
            );
          })
        : data.map((value) => {
            return (
              <option
                key={value._id}
                value={value.name}
                className="bg-blue-950 text-white font-bold"
              >
                {value.name}
              </option>
            );
          })}
    </select>
  );
}

export default SelectValue;

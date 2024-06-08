import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function ViewData({ data,keys, page, isShow }) {
  return data.length > 0 ? (
    <div className="">
      {isShow && page}(
      <div className=" w-11/12 border border-purple-700 bg-slate-800 m-auto mb-10 mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-50 font-bold uppercase bg-blue-950 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {Object.keys(keys).map((v, ind) => {
                if (v === 0 && v === data.length - 1) {
                } else
                  return (
                    <th key={ind} scope="col" class="px-3 py-5">
                      {data[v]}
                    </th>
                  );
              })}
              {/* <th scope="col" class="px-3 py-5">
                    course
                  </th> */}
              {/* <th scope="col" class="px-3 py-5">
                    day
                  </th>
                  <th scope="col" class="px-3 py-5">
                    start Time
                  </th>
                  <th scope="col" class="px-3 py-5">
                    end Time
                  </th>
                  <th scope="col" class="px-3 py-5">
                    room Id
                  </th> */}
              <th scope="col" class="px-3 py-5">
                update
              </th>
              <th scope="col" class="px-3 py-5">
                delete
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, ind) => {
              return (
                <tr
                  key={value._id}
                  className={
                    "even:bg-blue-300 even:text-gray-900 m-auto border-[1px] odd:font-semibold font-bold border-blue-950 bg-white text-black dark:text-black"
                  }
                >
                  <th
                    scope="row"
                    className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {value.courseId}
                  </th>
                  <td className="px-3 py-4">{value.day}</td>
                  <td className="px-3 py-4">{value.startTime}</td>
                  <td className="px-3 py-4">{value.endTime}</td>
                  <td className="px-3 py-4">{value.roomId}</td>
                  <td className="px-3 py-4">
                    <CiEdit
                      onClick={() => {
                        editHandler(value._id);
                      }}
                    />
                  </td>
                  <td className="px-3 py-4">
                    <MdDelete
                      className="text-blue-600 cursor-pointer"
                      onClick={() => {
                        delHandler(value._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      )
    </div>
  ) : (
    <div className=" w-max bg-slate-300 text-slate-800 border-[2px] shadow-md border-blue-950 px-8 py-5 rounded-md m-auto mt-10 mb-10">
      Courses Schedule not found
    </div>
  );
}

export default ViewData;

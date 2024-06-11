import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function ViewData({
  data,
  keys,
  page,
  isShow,
  editHandler,
  delHandler,
  message,
}) {
  const [newCs, setNewCs] = useState([]);
  const goCoureDetials = (name) => {
    console.log(name);
  };
  const count = () => {
    let c = 0;
    keys &&
      Object.keys(keys).map((v) => {
        if (v === "cs") c += 1;
      });

    return c;
  };
  useEffect(() => {}, [data]);
  return data && data.length > 0 ? (
    <div className="">
      {isShow && page}
      <div className=" w-11/12 border border-purple-700 bg-slate-800 m-auto mb-10 mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-50 font-bold uppercase bg-blue-950 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {keys &&
                Object.keys(keys).map((v, ind, arr) => {
                  if (
                    ind === 0 ||
                    v === "description" ||
                    v === "prerequisites" ||
                    v === "password" ||
                    v === "__v" ||
                    v === "cs"
                  ) {
                  } else
                    return (
                      <th key={ind} scope="col" class="px-3 py-5">
                        {arr[ind]}
                      </th>
                    );
                })}
              {keys && Object.keys(keys)[8] === "cs" ? (
                ""
              ) : (
                <>
                  <th scope="col" class="px-3 py-5">
                    update
                  </th>
                  <th scope="col" class="px-3 py-5">
                    delete
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.values(data).map((value) => {
                return (
                  <tr
                    key={value._id} onClick={()=>goCoureDetials(value.name)}
                    className={
                      count() === 1
                        ? "even:bg-blue-200 hover:even:bg-blue-400 even:text-gray-900 m-auto odd:bg-gray-200 hover:odd:bg-gray-400 border-[1px] odd:font-semibold font-bold border-blue-950 text-black dark:text-black cursor-pointer"
                        : "even:bg-blue-200 hover:even:bg-blue-400 even:text-gray-900 m-auto odd:bg-gray-200 hover:odd:bg-gray-400 border-[1px] odd:font-semibold font-bold border-blue-950 text-black dark:text-black"
                    }
                  >
                    {/* {console.log(Object.values(value))} */}
                    {Object.values(value).map((v, ind, arr) => {
                      if (
                        Object.keys(value)[ind] === "cs" ||
                        Object.keys(value)[ind] === "_id" ||
                        Object.keys(value)[ind] === "description" ||
                        Object.keys(value)[ind] === "prerequisites" ||
                        Object.keys(value)[ind] === "password" ||
                        Object.keys(value)[ind] === "__v"
                      ) {
                      } else {
                        return (
                          <td key={ind} className="px-3 py-4">
                            {v}
                          </td>
                        );
                      }
                    })}
                    {keys && Object.keys(keys)[8] === "cs" ? (
                      ""
                    ) : (
                      <>
                        <td className="px-3 py-4">
                          <CiEdit
                            className="text-blue-600 cursor-pointer"
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
                      </>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className=" w-max bg-slate-200 text-slate-900 border-[2px] shadow-md border-blue-950 px-8 py-5  m-auto mt-10 mb-10">
      {message} not found
    </div>
  );
}

export default ViewData;

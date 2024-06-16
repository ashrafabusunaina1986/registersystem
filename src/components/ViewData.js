import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdRadio } from "react-icons/md";

function ViewData({
  data,
  keys,
  page,
  isShow,
  editHandler,
  delHandler,
  message,
}) {
  const route = useRouter();
  const [newCs, setNewCs] = useState([]);
  const goCoureDetials = (name) => {
    route.push(`/users/course_details?course=${name}`);
  };
  const count = () => {
    let c = 0;
    keys &&
      Object.keys(keys).map((v) => {
        if (v === "cs") c += 1;
      });

    return c;
  };

  const [token, setToken] = useState("");
  const [info, setInfo] = useState({});

  const register_scheduleHandler = async (id) => {
    if (id) {
      const res = await fetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify({ courseid: id, studentId: info }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!res.ok){
          const er=await res.json()
          alert(er.message)
          console.error(er)
          return
      }
      const result=await res.json()
      console.log(result,id)
      // return route.push('/users/register_course')
    }
  };
  const me = async () => {
    const res = await fetch("/api/users/me");
    const infologin = await res.json();
    // console.log(infologin);
    setInfo(infologin.data.email);
  };
  useEffect(() => {
    me();
    const newcs =
      data &&
      Object.values(data).filter((co) =>
        co.cs === undefined ? co.cs === undefined : co.cs.length > 0
      );
    // console.log(data, newcs);
    setNewCs(newcs);
  }, [data]);
  return data && data.length > 0 ? (
    <div className="">
      {isShow && page}
      {message ? (
        <span className="block w-max m-auto mt-5 -mb-5 border-[1px] border-blue-950 font-semibold px-2 py-1 rounded-sm">
          {message + ":" + newCs.length}
        </span>
      ) : (
        ""
      )}
      <div className="w-11/12 m-auto mt-10 mb-10 border border-purple-700 bg-slate-800">
        <table className="w-full  text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs  font-bold uppercase text-gray-50 bg-blue-950 dark:bg-gray-700 dark:text-gray-400">
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
              ) : message ? (
                <>
                  <th scope="col" class="px-3 py-5">
                    update
                  </th>
                  <th scope="col" class="px-3 py-5">
                    delete
                  </th>
                </>
              ) : (
                <th scope="col" class="px-3 py-5">
                  Choice
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {Object.values(newCs).map((value) => {
              return (
                <tr
                  key={value._id}
                  onClick={() =>
                    count() === 1 ? goCoureDetials(value.name) : ""
                  }
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
                  ) : message ? (
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
                        <div />
                        <MdDelete
                          className="text-blue-600 cursor-pointer"
                          onClick={() => {
                            delHandler(value._id);
                          }}
                        />
                      </td>
                    </>
                  ) : (
                    <td className="px-3 py-4">
                      <input
                        type="checkbox"
                        onClick={(e) =>
                          register_scheduleHandler(
                            e.target.checked ? value._id: ""
                          )
                        }
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="rounded-lg w-max bg-slate-200 text-slate-900 border-[2px] shadow-md border-blue-950 px-8 py-5  m-auto mt-10 mb-10">
      {message} not found
    </div>
  );
}

export default ViewData;

import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
  complete,
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

  const [tokens, setTokens] = useState({ token: "", token_admin: "" });
  const [info, setInfo] = useState({});
  const [id, setId] = useState("");
  const [m, setM] = useState({});
  const [countt, setCountt] = useState(0);
  const register_scheduleHandler = async (id) => {
    const email = info && info.data && info.data.email;
    alert(email);
    if (id && email) {
      const res = await fetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify({
          courseid: id,
          studentId: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const er = await res.json();
        alert(er.message);
        setId("");
        console.error(er);
        return;
      }
      const result = await res.json();
      setId(id);
      // console.log(result, id);
      // return route.push('/users/register_course')
    }
  };

  const getToken = async () => {
    const res = await fetch("/api");
    if (!res.ok) {
      const er = await res.json();
      console.log(er);
      return;
    }
    const token = await res.json();
    // console.log(token);
    setCountt(1);
    setTokens({ token: token.token, token_admin: token.token_admin });
  };

  useEffect(() => {
    console.log(data, countt, info);
    if (countt === 0) getToken();
    if (countt === 1) {
      const me_admin = async () => {
        let res;
        res = await fetch("/api/me_admin");
        // if (tokens.token_admin) res = await fetch("/api/me_admin");
        if (!res.ok) {
          const er = await res.json();
          console.log(er);
          setM({ message: er.message, success: er.success });
          return;
        }
        const infologin = await res.json();
        // console.log(infologin);
        setM({ success: infologin.success });
        setInfo(infologin);
      };
      const me = async () => {
        let res;
        res = await fetch("/api/users/me");
        // if (tokens.token_admin) res = await fetch("/api/me_admin");
        if (!res.ok) {
          const er = await res.json();
          console.log(er);
          setM({ message: er.message, success: er.success });
          return;
        }
        const infologin = await res.json();
        // console.log(infologin);
        setM({ success: infologin.success });
        setInfo(infologin);
      };
      tokens.token && me();
      tokens.token_admin && me_admin();

      if (countt === 1) {
        setCountt(-1);
        return;
      }
    }
    const newcs =
      data &&
      Object.values(data).filter((co) =>
        co.cs === undefined ? co.cs === undefined : co.cs.length > 0
      );

    setNewCs(newcs);
  }, [data, countt, tokens, info]);
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
      <div className="w-full m-auto mt-10 mb-10 ">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
          <thead className="text-xs font-bold uppercase text-gray-50 bg-slate-800">
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
                  {complete === undefined && (
                    <>
                      <th scope="col" class="px-3 py-5">
                        update
                      </th>
                      <th scope="col" class="px-3 py-5">
                        delete
                      </th>
                    </>
                  )}
                  {complete === true && (
                    <th scope="col" class="px-3 py-5">
                      case
                    </th>
                  )}
                  {complete === false && (
                    <>
                      <th scope="col" class="px-3 py-5">
                        case
                      </th>
                    </>
                  )}
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
                      ? "even:bg-blue-200 hover:even:bg-gray-100 even:text-slate-900  m-auto odd:bg-purple-300 hover:odd:bg-purple-100 border-[1px] odd:font-semibold font-bold border-slate-950 text-black cursor-pointer"
                      : "even:bg-blue-200 hover:even:bg-gray-100 even:text-slate-900  m-auto odd:bg-purple-300 hover:odd:bg-purple-100 border-[1px] odd:font-semibold font-bold border-slate-950 text-black"
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
                      {complete === undefined && (
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
                      )}
                      {complete === true && (
                        <td className="px-3 py-4">Final</td>
                      )}
                      {complete === false && (
                        <>
                          <td className="px-3 py-4">primitively</td>
                        </>
                      )}
                    </>
                  ) : (
                    <td className="px-3 py-4">
                      <input
                        checked={value._id === id ? true : false}
                        type="checkbox"
                        onClick={(e) =>
                          register_scheduleHandler(
                            e.currentTarget.checked ? value._id : ""
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
      {complete === false && (
        <span className="flex items-center justify-center w-max m-auto text-red-800">
          See administration
        </span>
      )}
    </div>
  ) : (
    <div className="rounded-lg w-max bg-slate-200 text-slate-900 border-[2px] shadow-md border-blue-950 px-8 py-5  m-auto mt-10 mb-10">
      {message} not found
    </div>
  );
}

export default ViewData;

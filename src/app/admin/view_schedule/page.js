"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Schedule from "@/components/Schedule";
import SearchValue from "@/components/SearchValue";
function View_Schedule() {
  const searchRef = useRef(null);
  const [coursesSchedule, setCoursesSchedule] = useState([]);
  const [courseSchedule, setCourseSchedule] = useState([]);
  const [message, setMessage] = useState({});

  const [isShow, setIsShow] = useState(false);

  const delHandler = async (id) => {
    const del = confirm("Are you sure");
    if (del) {
      const res = await fetch("/api/courseschedule", {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) return console.log(await res.json());
      const dels = await res.json();
      // console.log(dels);
      getCoursesSchedules();
    }
  };

  const editHandler = (id) => {
    const schedule = coursesSchedule.find((schedule) => schedule._id === id);
    setCourseSchedule(schedule);
    // console.log(schedule)
    setIsShow(true);
  };

  const getCoursesSchedules = async () => {
    const res = await fetch(
      `/api/courseschedule?schedule=${searchRef.current.value}`
    );
    if (!res.ok) {
      const er = await res.json();
      // console.log(er)
      setMessage({ success: er.success });
      return;
    }
    const dataCourseSchedule = await res.json();
    // console.log(dataCourseSchedule)
    setCoursesSchedule(dataCourseSchedule.courseSchedules);
  };
  const searchCourseScheduleHandeler = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const search = Object.fromEntries(fd);

    const res = await fetch(`/api/courseschedule?schedule=${search.schedule}`);
    if (!res.ok) {
      const er = await res.json();
      // console.log(er);
      setMessage({ success: er.success });
      return;
    }
    const result = await res.json();
    // console.log(result);
    setCoursesSchedule(result.courseSchedules);
    setMessage({ success: result.success });
    searchRef.reset();
  };
  useEffect(() => {
    getCoursesSchedules();
    setMessage({ success: undefined });
  }, [message.success]);
  return (
    <>
      <SearchValue
        name={"schedule"}
        searchHandeler={searchCourseScheduleHandeler}
        searchRef={searchRef}
      />
      {coursesSchedule.length > 0 ? (
        <div className="">
          {isShow && (
            <Schedule
              courseSchedule={courseSchedule}
              setIsShow={setIsShow}
              setMessage={setMessage}
            />
          )}
          (
          <div className=" w-11/12 border border-purple-700 bg-slate-800 m-auto mb-10 mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-50 font-bold uppercase bg-blue-950 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-3 py-5">
                    course
                  </th>
                  <th scope="col" class="px-3 py-5">
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
                  </th>
                  <th scope="col" class="px-3 py-5">
                    update
                  </th>
                  <th scope="col" class="px-3 py-5">
                    delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {coursesSchedule.map((courseschedule, ind) => {
                  return (
                    <tr
                      key={courseschedule._id}
                      className={
                        "even:bg-blue-300 even:text-gray-900 m-auto border-[1px] odd:font-semibold font-bold border-blue-950 bg-white text-black dark:text-black"
                      }
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {courseschedule.courseId}
                      </th>
                      <td className="px-3 py-4">{courseschedule.day}</td>
                      <td className="px-3 py-4">{courseschedule.startTime}</td>
                      <td className="px-3 py-4">{courseschedule.endTime}</td>
                      <td className="px-3 py-4">{courseschedule.roomId}</td>
                      <td className="px-3 py-4">
                        <CiEdit
                          onClick={() => {
                            editHandler(courseschedule._id);
                          }}
                        />
                      </td>
                      <td className="px-3 py-4">
                        <MdDelete
                          className="text-blue-600 cursor-pointer"
                          onClick={() => {
                            delHandler(courseschedule._id);
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
      )}
    </>
  );
}

export default View_Schedule;

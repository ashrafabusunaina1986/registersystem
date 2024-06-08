import React, { useState } from "react";
import Modal from "./modal/Modal";
import Image from "next/image";
import downarrow from "../../public/img/downArrow.svg";
import { useRouter } from "next/navigation";

function Schedule({ courseSchedule, setIsShow, setMessage }) {
  const route=useRouter()
  const [coursesSchedule, setCoursesSchedule] = useState([]);
  const [courses, setCourses] = useState([]);

  const [errorss, setErrorss] = useState({});

  const [hideDay, setHideDay] = useState(false);
  const [dayValue, setDayValue] = useState("");

  const editCourseScheduleHandler = async (e) => {
    e.preventDefault();
    let errors = {};
    let m = {};
    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd);
    if (values.startTime && values.endTime && values.roomId && dayValue) {
      errors = {
        startTime: "",
        endTime: "",
        roomId: "",
        dayValue: "",
      };
      if (values.startTime < values.endTime) {
        errors.time = "";
        const startTime = values.startTime.toString(),
          endTime = values.endTime.toString(),
          roomId = values.roomId,
          id = values.id;

        const res = await fetch("/api/courseschedule", {
          method: "PUT",
          body: JSON.stringify({
            id,
            startTime,
            endTime,
            roomId,
            dayValue,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const er = await res.json();
          m.success = er.success;
          m.message = er.message;
          console.log(er);
          setMessage(m);
          return;
        }
        const result = await res.json();
        m.success = result.success;
        m.message = result.message;

        // console.log(m, result);
        setMessage(m);
        setIsShow(false);
        route.push('/admin/view_schedule')
      } else {
        errors.time = "enter start time less than end time";
      }
    } else {
      if (!values.startTime) errors.startTime = "enter start time";
      else errors.startTime = "";
      if (!values.endTime) errors.endTime = "enter end time";
      else errors.endTime = "";
      if (!values.roomId) errors.roomId = "enter roomId";
      else errors.roomId = "";
      if (!dayValue) errors.dayValue = "enter day value";
      else errors.dayValue = "";
    }
    setErrorss(errors);
  };
  return (
    <Modal>
      <div className="flex w-max items-center justify-center border-[1px] border-blue-600 bg-gray-700 text-white font-bold shadow-xl m-auto mt-5 rounded-lg px-2 py-1">
        Course Schedule
      </div>
      <form
        onSubmit={editCourseScheduleHandler}
        className="w-full m-auto text-black mt-10 mb-10  p-5"
      >
        {errorss.time ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.time}
          </div>
        ) : (
          ""
        )}
        {errorss.dayValue ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.dayValue}
          </div>
        ) : (
          ""
        )}
        <input type="hidden" name="id" id="id" value={courseSchedule._id} />
        <div className="flex gap-36 font-bold items-center mb-5">
          <label for="day">Day</label>
          <div className=" relative text-black">
            <div
              onClick={() => {
                setHideDay((prev) => !prev);
              }}
              className=" font-semibold border cursor-pointer border-slate-600 px-2 py-1 gap-5 w-[150px] rounded-lg flex justify-between"
            >
              {dayValue ? (
                dayValue
              ) : (
                <div className="font-semibold border cursor-pointer w-[150px] border-slate-600 px-2 py-1 gap-10 rounded-lg flex justify-between">
                  day
                  <Image
                    src={downarrow}
                    alt="Down Arrow"
                    width={15}
                    height={10}
                  />
                </div>
              )}
            </div>
            <div
              onClick={() => setHideDay(false)}
              id="box"
              className={
                hideDay
                  ? "rounded absolute z-30 bg-white w-[300px]   top-[40px] shadow-md border-[1px] border-gray-300"
                  : "hidden"
              }
            >
              <div
                onClick={(e) => setDayValue(e.target.innerText)}
                className="  cursor-pointer hover:bg-gray-500 py-4 px-2"
              >
                Sunday
              </div>
              <div
                onClick={(e) => setDayValue(e.target.innerText)}
                className=" cursor-pointer hover:bg-gray-500 py-4 px-2"
              >
                Monday
              </div>
              <div
                onClick={(e) => setDayValue(e.target.innerText)}
                className=" cursor-pointer hover:bg-gray-500 py-4 px-2"
              >
                Tueday
              </div>
              <div
                onClick={(e) => setDayValue(e.target.innerText)}
                className=" cursor-pointer hover:bg-gray-500 py-4 px-2"
              >
                Wednesday
              </div>
              <div
                onClick={(e) => setDayValue(e.target.innerText)}
                className=" cursor-pointer hover:bg-gray-500 py-4 px-2"
              >
                Thursday
              </div>
            </div>
          </div>
        </div>
        {errorss.startTime ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.startTime}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-24 font-bold items-center mb-5">
          <label for="startTime">start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            placeholder="enter startTime"
            className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          />
        </div>
        {errorss.endTime ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.endTime}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-24 font-bold items-center mb-5">
          <label for="endTime">end Time</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            placeholder="enter endTime"
            className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          />
        </div>
        {errorss.roomId ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.roomId}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-24 font-bold items-center mb-5">
          <label for="roomId">Room Id</label>
          <input
            type="text"
            id="roomId"
            name="roomId"
            placeholder="enter roomId"
            className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          />
        </div>
        <div className="flex gap-10 font-bold items-center justify-center mb-5">
          <button className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 hover:bg-blue-700 rounded-lg h-[60px]">
            Edit course schedule
          </button>
          {/* {message.success === undefined ? (
            ""
          ) : message.success ? (
            <span className=" border border-slate-700 px-2 py-1 bg-gray-400 rounded-lg text-white">
              {message.message}
            </span>
          ) : (
            <span className=" border border-red-700 p-1 bg-red-400 rounded-lg text-red-950 font-normal">
              {message.message}
            </span>
          )} */}
        </div>
      </form>
    </Modal>
  );
}

export default Schedule;

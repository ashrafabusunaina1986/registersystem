import React, { useState } from "react";
import Modal from "./modal/Modal";
import Image from "next/image";
import downarrow from "../../public/img/downArrow.svg";
import { useRouter } from "next/navigation";
import SelectValue from "./SelectValue";
import { ConvertTimeToNum } from "@/helper/convertTimeToNum";

function Schedule({ courseSchedule, setIsShow, setMessage }) {
  const route = useRouter();
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
    // console.log(values)
    if (values.startTime && values.endTime && values.roomId && values.day) {
      errors = {
        startTime: "",
        endTime: "",
        roomId: "",
        dayValue: "",
      };
      const st = values.startTime,
        et = values.endTime;
      const start = ConvertTimeToNum(st),
        end = ConvertTimeToNum(et);
      // enter time between 7 - 14 time,enter start time less than end time,interval hour and a quarter hour
      if (
        end <= 14 * 60 * 60 &&
        end >= 7 * 60 * 60 &&
        end - start <= 75 * 60 &&
        end - start >= 40 * 60
      ) {
        errors.time = "";
        const startTime = values.startTime.toString(),
          endTime = values.endTime.toString(),
          roomId = values.roomId,
          id = values.id,
          day = values.day;

        const res = await fetch("/api/courseschedule", {
          method: "PUT",
          body: JSON.stringify({
            id,
            startTime,
            endTime,
            roomId,
            day,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const er = await res.json();
          m.success = er.success;
          m.message = er.message;
          alert(er.message);
          setMessage(m);
          return;
        }
        const result = await res.json();
        m.success = result.success;
        m.message = result.message;

        // console.log(m, result);
        setMessage(m);
        setIsShow(false);
        route.push("/admin/view_schedule");
      } else {
        errors.time =
          "enter time between 7 - 14 time,enter start time less than end time,interval hour and a quarter hour";
      }
    } else {
      if (!values.startTime) errors.startTime = "enter start time";
      else errors.startTime = "";
      if (!values.endTime) errors.endTime = "enter end time";
      else errors.endTime = "";
      if (!values.roomId) errors.roomId = "enter roomId";
      else errors.roomId = "";
      if (!values.day) errors.dayValue = "enter day value";
      else errors.dayValue = "";
    }
    setErrorss(errors);
  };
  const onHide = () => {
    setIsShow(false);
  };
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "thursday"];
  return (
    <Modal onhide={onHide}>
      <div className="flex w-max items-center justify-center border-[1px] border-blue-600 bg-gray-700 text-white font-bold shadow-xl m-auto mt-5 rounded-lg px-2 py-1">
        Course Schedule
      </div>
      <form
        onSubmit={editCourseScheduleHandler}
        className="w-full m-auto text-black mt-10 mb-10 bg-white flex flex-col items-center justify-center  px-8 py-5"
      >
        {errorss.time ? (
          <div className="hadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
            {errorss.time}
          </div>
        ) : (
          ""
        )}
        {errorss.dayValue ? (
          <div className="hadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
            {errorss.dayValue}
          </div>
        ) : (
          ""
        )}
        <input type="hidden" name="id" id="id" value={courseSchedule._id} />
        <div className="flex gap-36 font-bold items-center mb-5">
          <label for="day">Day</label>
          <SelectValue data={days} name="day" />
        </div>
        {errorss.startTime ? (
          <div className="hadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
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
          <div className="hadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
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
          <div className="hadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
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
          <button className="w-[300px] inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-black rounded-md hover:bg-gray-700 hover:text-gray-50">
            Edit course schedule
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default Schedule;

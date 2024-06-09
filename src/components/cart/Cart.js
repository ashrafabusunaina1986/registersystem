import React, { useState } from "react";
import Modal from "../modal/Modal";
import { useRouter } from "next/navigation";

function Cart({ course, setIsShow, setMessage }) {
  const route=useRouter()
  const [errorss, setErrorss] = useState({});
  // const [message, setMessage] = useState({});
  const editCourseHandler = async (e) => {
    e.preventDefault();
    let errors = {};
    let m = {};
    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd);
    if (values.capacity && values.prerequisites && values.description) {
      const res = await fetch("/api/courses", {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        errors = { prerequisites: "", capacity: "", description: "" };
        setErrorss(errors);
        const er = await res.json();
        m.success = er.success;
        m.message = er.message;
        setMessage(m);

        return;
      }
      errors = { prerequisites: "", capacity: "", description: "" };
      const result = await res.json();
      // console.log(result);
      m.success = result.success;
      m.message = result.message;
      setMessage(m);
      setIsShow(false);
      route.push('/admin/view_courses')
    } else {
      if (!values.capacity) errors.capacity = "enter capacity";
      else errors.capacity = "";
      if (!values.description) errors.description = "enter description";
      else errors.description = "";
      if (!values.prerequisites) errors.prerequisites = "enter prerequisites";
      else errors.prerequisites = "";
    }
    setErrorss(errors);
  };
  const onHide=()=>{
    setIsShow(false)
  }
  return (
    <Modal onhide={onHide}>
      <form
        onSubmit={editCourseHandler}
        className="w-full m-auto mt-10 mb-10 text-black  p-5"
      >
        <div className="font-bold flex justify-center m-auto py-2 px-4 -mt-10 mb-5 border border-slate-950 bg-gray-500 text-white w-max">
          Edit Course
        </div>

        <input type="hidden" name="id" id="id" value={course._id} />
        {errorss.description ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.description}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-20 font-bold  mb-5">
          <label for="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="enter description"
            className=" resize-none h-32 w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          ></textarea>
        </div>

        {errorss.capacity ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.capacity}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-24 font-bold items-center mb-5">
          <label for="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            placeholder="enter capacity"
            className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          />
        </div>
        {errorss.prerequisites ? (
          <div className="shadow-lg bg-red-300 rounded-lg p-2 w-[250px] flex items-center justify-center ml-28 mb-2">
            {errorss.prerequisites}
          </div>
        ) : (
          ""
        )}
        <div className="flex  gap-16 font-bold mb-5">
          <label for="prerequisites">Prerequisites</label>
          <textarea
            type="text"
            id="prerequisites"
            name="prerequisites"
            placeholder="enter prerequisites"
            className=" resize-none h-32 w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
          ></textarea>
        </div>
        <div className="flex gap-10 font-bold items-center justify-center mb-5">
          <button className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 hover:bg-blue-700 rounded-lg h-[60px]">
            Edit Course
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

export default Cart;

import React from "react";
import Modal from "./modal/Modal";

export default function Student({ student, setIsShow, setMessage }) {
  const onHide = () => {
    setIsShow(false);
  };
  const editHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const comp = Object.fromEntries(fd);
    if (comp.complete && comp.studentId) {
      alert(comp.studentId);
      const res = await fetch("/api/students", {
        method: "PUT",
        body: JSON.stringify(comp),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const er = await res.json();
        setMessage({ message: er.message, success: er.success });
        return;
      }
      const result = await res.json();
      setIsShow(false);
    } else {
    }
  };
  return (
    <Modal
      onhide={onHide}
      className="fixed top-10 left-1/4 w-2/5 px-8 py-5  rounded-lg overflow-y-auto bg-gray-100 z-50 shadow-xl backdrop:bg-blue-700"
    >
      <form onSubmit={editHandler} className="flex gap-10 mt-10">
        <div className="flex items-center gap-5">
          <input
            type="hidden"
            name="studentId"
            value={student && student.email}
          />
          <label htmlFor="complete">Complete</label>
          <input type="checkbox" id="complete" name="complete" className="" />
        </div>
        <button className="inline-flex font-semibold text-white hover:text-black bg-black hover:bg-slate-200 rounded-lg shadow-lg px-3 py-1">
          comlete
        </button>
      </form>
    </Modal>
  );
}

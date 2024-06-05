import React from "react";
import Modal from "./modal/Modal";

function ChechCourses({ message ,setNumCourses}) {
  return (
    <Modal>
      <div className="">{message}</div>
      <button onClick={()=>setNumCourses(-1)} className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]">
        Back
      </button>
    </Modal>
  );
}

export default ChechCourses;

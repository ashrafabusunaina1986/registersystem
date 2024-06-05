import React from "react";
import Modal from "./modal/Modal";
import { useRouter } from "next/navigation";

function ChechCourses({ message, setNumCourses }) {
  const router = useRouter();
  return (
    <Modal>
      <div className="m-auto flex w-full border-[1px] border-slate-950 bg-gray-500 text-white font-bold px-5 py-3 rounded-2xl shadow-xl mt-10  mb-10 items-center justify-center">
        {message}
      </div>

      <div className="">
        <p>
          {" "}
          first must enter courses{" "}
          <button
            onClick={() => {
              setNumCourses(-1);
              router.push("/admin/course");
            }}
            className="inline-flex bg-blue-400 px-2 py-1 rounded-md shadow-md text-white"
          >
            Add course
          </button>{" "}
          or{" "}
          <button
            onClick={() => {
              setNumCourses(-1);
              router.push("/admin");
            }}
            className="inline-flex bg-blue-400 px-2 py-1 rounded-md shadow-md text-white"
          >
            Back
          </button>
        </p>
      </div>
    </Modal>
  );
}

export default ChechCourses;

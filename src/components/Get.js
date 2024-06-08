import React from "react";

function Get({ editHandler, delHandler, data }) {
  return (
    <div className=" w-5/6 border border-purple-700 bg-slate-300 m-auto mb-10 mt-10">

      {/* <div className="flex  p-5 font-bold">
        <span className="w-1/4">Course</span>
        <span className="w-1/4">Day</span>
        <span className="w-1/4">Start Time</span>
        <span className="w-1/4">End Time</span>
        <span className="w-1/6">roomId</span>
        <div className="flex gap-5">
          <span className="">update</span>
          <span className="">del</span>
        </div>
      </div>
      {data &&
        data.map((item) => {
          return (
            <div key={item._id} className="flex p-5">
              <div className="w-1/4">{item.courseId}</div>
              <div className="w-1/4">{item.day}</div>
              <div className="w-1/4">{item.startTime}</div>
              <div className="w-1/4">{item.endTime}</div>
              <div className="w-1/6">{item.roomId}</div>
              <div className="flex gap-12">
                <CiEdit
                  onClick={() => {
                    editHandler(item._id);
                  }}
                />
                <MdDelete
                  className="text-blue-600 cursor-pointer"
                  onClick={() => {
                    delHandler(item._id);
                  }}
                />
              </div>
            </div>
          );
        })} */}
    </div>
  );
}

export default Get;

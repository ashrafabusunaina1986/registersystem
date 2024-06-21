"use client";
import Menu from "@/components/Menu";
import ViewData from "@/components/ViewData";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { info_user } from "../page";

function Course_details(params) {
  const course = useSearchParams().get("course");
  const [Courses, setCourses] = useState([]);
  const [message, setMessage] = useState({});

  useEffect(() => {
    const getCourses = async () => {
      const res = await fetch(`/api/course_details?course=${course}`);
      if (!res.ok) {
        const er = await res.json();
        setMessage({ success: er.success });
        // console.log(er);
        return;
      }
      const dataCourse = await res.json();
      setCourses(dataCourse.coursesstudents);
      setMessage({ success: dataCourse.success });
      // console.log(dataCourse);
    };
    getCourses();
  }, [course]);
  return (
    <div className="w-11/12 flex gap-3">
      <Menu info={info_user} d={"h"} />
      <section className=" w-full">
        {Courses && Courses.length === 1 ? (
          <div className="w-full flex flex-col mt-16 gap-5 font-bold px-5 py-3">
            <span className=" w-max m-auto  border-[2px] border-blue-950 bg-slate-200 text-blue-950 px-5 py-3 ">
              Course details
            </span>
            <div className="flex justify-around">
              <h4 className="">Code:{Courses[0].code}</h4>
              <h4 className="">Instructor:{Courses[0].instructor}</h4>
              <h4 className="">Capacity:{Courses[0].capacity}</h4>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <h2 className="">Description</h2>
                <p className=" indent-7 ms-7 text-justify text-wrap font-normal text-gray-900">
                  {Courses[0].description}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="">Prerequisites</h2>
                <p className=" indent-7 ms-7 text-justify text-wrap font-normal text-gray-900">
                  {Courses[0].prerequisites}
                </p>
              </div>
            </div>
            <ViewData data={Courses[0].cs} keys={Courses[0].cs[0]} />
          </div>
        ) : (
          <div className=""></div>
        )}
      </section>
    </div>
  );
}

export default Course_details;

"use client";
import ViewData from "@/components/ViewData";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Course_details() {
  const course = useSearchParams().get("course");
  const [Courses, setCourses] = useState([]);
  const [message, setMessage] = useState({});

  useEffect(() => {
    const getCourses = async () => {
      const res = await fetch(`/api/course_details?course=${course}`);
      if (!res.ok) {
        const er = await res.json();
        setMessage({ success: er.success });
        console.log(er);
        return;
      }
      const dataCourse = await res.json();
      setCourses(dataCourse.coursesstudents);
      setMessage({ success: dataCourse.success });
      console.log(dataCourse);
    };
    getCourses();
  }, [course]);
  return <div>
    <ViewData keys={Courses[0]} data={Courses} message={'course student'}/>
  </div>;
}

export default Course_details;

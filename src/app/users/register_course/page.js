"use client";
import ViewData from "@/components/ViewData";
import React, { useEffect, useState } from "react";

function Registe_Course() {
  const [csr, setCsr] = useState([]);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const getCsr = async () => {
      const res = await fetch("/api/users/register");
      if (!res.ok) {
        const er = await res.json();
        alert(er.message);
        return;
      }
      const csr = (await res.json()).csr;
      let arr = [],
        ac = [];

      if (csr && csr.length > 0) {
        csr.map((c, ind) => {
          arr[ind] = JSON.parse(c.courseId);
          if (!c.complete) ac[ind] = false;
          else ac[ind] = true;
        });
      }
      setCsr(arr);

      let f = true;
      ac.map((c) => {
        f &&= c;
        return f;
      });
      setComplete(f);
      console.log(arr, ac,csr, f);
    };
    getCsr();
  }, []);
  return (
    <div>
      <ViewData
        data={csr}
        keys={csr[0]}
        message={
          "course schedules "+(complete ? "Final" : "primitively")
        }
        complete={complete}
      />
    </div>
  );
}

export default Registe_Course;

"use client";
import Menu from "@/components/Menu";
import ViewData from "@/components/ViewData";
import React, { useEffect, useState } from "react";
import { info_user } from "../page";
import Box from "@/components/Box";

function Registe_Course() {
  const [csr, setCsr] = useState([]);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const getCsr = async () => {
      const res = await fetch("/api/register");
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
      // console.log(csr);
    };
    getCsr();
  }, []);
  return (
    <div className="w-11/12 flex gap-20 sm:gap-0 md:gap-0">
      <div className="w-3/12 relative block sm:relative sm:hidden md:relative md:hidden ">
        <Menu info={info_user} d={"h"} />
      </div>
      <div className=" sm:relative sm:block md:relative md:block relative hidden sm:my-5 md:my-5">
        <Box menu={<Menu info={info_user} d={"h"} />} />
      </div>
      <section className=" w-full sm:w-full md:w-full mt-20 sm:relative sm:left-0 sm:top-10 md:relative md:left-0 md:top-10 ">
        <ViewData
          data={csr}
          keys={csr[0]}
          message={"course schedules " + (complete ? "Final" : "primitively")}
          complete={complete}
        />
      </section>
    </div>
  );
}

export default Registe_Course;

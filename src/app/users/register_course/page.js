"use client";
import ViewData from "@/components/ViewData";
import React, { useEffect, useState } from "react";

function Registe_Course() {
  const [csr,setCsr]=useState([])
  useEffect(() => {
    const getCsr = async () => {
      const res = await fetch("/api/users/register");
      if (!res.ok){
        const er=await res.json()
        alert(er.message)
        return
      }
      const csr=(await res.json()).csr
      let arr=[]
      if(csr && csr.length>0){
        
        csr.map((c,ind)=>{
          arr[ind]=JSON.parse(c.courseId)
        })
      }
      setCsr(arr)
      console.log(arr)
      
    };
    getCsr()

  }, []);
  return <div>
    <ViewData data={csr} keys={csr[0]} message={'course schedules'}/>
  </div>;
}

export default Registe_Course;

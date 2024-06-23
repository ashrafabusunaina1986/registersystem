"use client";
import { ToggleContextt } from "@/context/ToggleProvider";
import React, { useContext, useState } from "react";

function Box({ menu }) {
  const {t,setT}=useContext(ToggleContextt)
  return (
    <div className="relative z-20 ">
      <span onClick={() => setT(!t)} className="relative left-5 cursor-pointer">
        {"..."}
      </span>
      <div className={(t && "block absolute") || (!t && "hidden absolute")}>
        {menu}
      </div>
    </div>
  );
}

export default Box;

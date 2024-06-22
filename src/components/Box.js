"use client";
import React, { useState } from "react";

function Box({menu}) {
  const [t, setT] = useState(false);
  return (
    <div className="relative z-20 ">
      <span onClick={() => setT(!t)} className="relative left-5">{"..."}</span>
      <div className={(t && "block absolute") || (!t && "hidden absolute")}>
        {menu}
      </div>
    </div>
  );
}

export default Box;

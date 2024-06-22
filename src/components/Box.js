"use client";
import React, { useState } from "react";

function Box({menu}) {
  const [t, setT] = useState(false);
  return (
    <div className="relative ">
      <span onClick={() => setT(!t)}>{"..."}</span>
      <div className={(t && "block absolute") || (!t && "hidden absolute")}>
        {menu}
      </div>
    </div>
  );
}

export default Box;

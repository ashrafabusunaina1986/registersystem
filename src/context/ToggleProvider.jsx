"use client";
import React, { createContext, useState } from "react";

export const ToggleContextt = createContext(false);
function ToggleProvider({ children }) {
  const [t, setT] = useState(false);
  return (
    <ToggleContextt.Provider value={{t,setT}}>
      {children}
    </ToggleContextt.Provider>
  );
}

export default ToggleProvider;

"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Logout() {
  const route = useRouter();
  useEffect(() => {
    const logout = async () => {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      if (!res) {
        const er = await res.json();
        alert(er.message);
        return;
      }
      const data = await res.json();
      // console.log(data)
      route.push("/");
    };
    logout();
  }, [route]);
  return;
}

export default Logout;

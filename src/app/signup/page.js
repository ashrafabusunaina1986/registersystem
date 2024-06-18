"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [errorss, setErrorss] = useState({});
  const router = useRouter();
  const signupHandler = async (e) => {
    const errors = {};
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    if (data.name && data.email && data.password) {
      const res = await fetch("/api/users/signup", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res) {
        throw new Error("wrong went something");
      }
      const info = await res.json();
      if (info.message && !info.success) errors.message = info.message;
      else {
        router.push("/");
        router.refresh();
      }
    } else {
      if (!data.name) errors.name = "please enter name.";
      if (!data.password) errors.password = "please enter password.";
      if (!data.email) errors.email = "please enter email.";
    }
    setErrorss(errors);
  };
  return (
    <div>
      <form onSubmit={signupHandler} className="w-2/5 m-auto mt-10 mb-10 bg-white flex flex-col items-center justify-center  px-8 py-5 rounded-md border-[1px] border-black">
        {errorss.message ? (
          <div className=" shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
            {errorss.message}
          </div>
        ) : (
          ""
        )}
        {errorss.name ? (
          <div className=" shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
            {errorss.name}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-20 font-bold items-center mb-5 ">
          
          <input
            type="text"
            id="name"
            name="name"
            placeholder="enter name"
            className="w-[300px] border-b border-b-blue-950 py-3 px-5 outline-none bg-transparent"
          />
        </div>
        {errorss.email ? (
          <div className="shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
            {errorss.email}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-20 font-bold items-center mb-5">
          
          <input
            type="email"
            id="email"
            name="email"
            placeholder="enter email"
            className="w-[300px] border-b border-b-blue-950 py-3 px-5 outline-none bg-transparent"
          />
        </div>
        {errorss.password ? (
          <div className="shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
            {errorss.password}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-11 font-bold items-center mb-5 ">
          
          <input
            type="password"
            id="password"
            name="password"
            placeholder="enter password"
            className="w-[300px] border-b border-b-blue-950 py-3 px-5 outline-none bg-transparent"
          />
        </div>
        <div className="mt-5">
          <button className="w-[300px] inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-black rounded-md hover:bg-gray-700 hover:text-gray-50">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

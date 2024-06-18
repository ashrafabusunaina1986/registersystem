"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
  const [errorss, setErrorss] = useState({});
  const router = useRouter();
  const loginHandler = async (e) => {
    const errors = {};
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    if (data.email && data.password) {
      const res = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res) throw new Error("wrong went something");
      const result = await res.json();
      if (res.status == 401) {
        errors.message = result.message;
      } else {
        router.push("/");
        router.refresh();
      }
    } else {
      if (!data.email) {
        errors.email = "enter email";
      }
      if (!data.password) {
        errors.password = "enter password";
      }
    }
    setErrorss(errors);
  };
  return (
    <div>
      <form onSubmit={loginHandler} className="w-2/5 m-auto mt-10 mb-10 bg-white flex flex-col items-center justify-center  px-8 py-5 rounded-md border-[1px] border-black">
        {errorss.message ? (
          <div className="  shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
            {errorss.message}
          </div>
        ) : (
          ""
        )}
        {errorss.email ? (
          <div className="shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
            {errorss.email}
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-20 font-bold items-center jus mb-5">
          
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
          <button className="w-[300px] inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-black rounded-md hover:bg-gray-700 hover:text-gray-50 ">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

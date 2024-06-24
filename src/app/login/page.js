"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getToken } from "../page";

function Login() {
  const [errorss, setErrorss] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const loginHandler = async (e) => {
    const errors = {};
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    if (data.email && data.password) {
      setLoading(
        <span className=" animate-ping ms-10  text-red-600">
          {"Loading".toUpperCase()}
        </span>
      );
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res) throw new Error("wrong went something");
      const result = await res.json();
      if (res.status == 401) {
        setLoading("");
        errors.message = result.message;
      } else {
        setLoading("");
        const t = await getToken();
        router.push("/");
        router.refresh();
      }
    } else {
      setLoading("");
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
      <form
        onSubmit={loginHandler}
        className={
          "m-auto w-2/5 sm:w-4/5 md:w-3/5 mt-10 mb-10 bg-white flex flex-col items-center justify-center  px-8 py-5 rounded-md border-[1px] border-black"
        }
      >
        <span className=" w-max m-auto bg-transparent text-blue-950 font-bold px-5 py-3 mb-5 text-3xl ">
          LOGIN
        </span>
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
        <div className="w-full flex justify-center font-bold items-center  mb-5">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="enter email"
            className="w-[300px] sm:w-4/5 md:w-[250px] border-b border-b-blue-950 py-3 px-5 outline-none bg-transparent"
          />
        </div>
        {errorss.password ? (
          <div className="shadow-lg bg-red-200 rounded-md px-1 py-0 w-max flex items-center justify-center ml-10 mb-2">
            {errorss.password}
          </div>
        ) : (
          ""
        )}
        <div className="w-full flex justify-center font-bold items-center mb-5 ">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="enter password"
            className="w-[300px] sm:w-4/5 md:w-[250px] border-b border-b-blue-950 py-3 px-5 outline-none bg-transparent"
          />
        </div>
        <div className="mt-5 w-full flex justify-center">
          <button className="w-[300px] sm:w-4/5 md:w-[250px] inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-black rounded-md hover:bg-gray-700 hover:text-gray-50 ">
            Login
          </button>
          {loading ? loading : ""}
        </div>
      </form>
      <p className="w-2/5 sm:w-4/5 md:w-3/5 m-auto -mt-10 text-justify font-sm">
        to create account{" "}
        <a
          href="/signup"
          className=" hover:underline hover:text-slate-600 w-max"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}

export default Login;

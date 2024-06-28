"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../page";
import Password from "@/components/Password";
import Cyrcle from "@/shaps/Cyrcle";

export default function Signup() {
  const [loading, setLoading] = useState("");
  const [errorss, setErrorss] = useState({});
  const router = useRouter();
  const signupHandler = async (e) => {
    const errors = {};
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    if (data.name && data.email && data.password) {
      setLoading(<Cyrcle />);
      const res = await fetch("/api/signup", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res) return;

      const info = await res.json();
      if (info.message && !info.success) {
        setLoading("");
        errors.message = info.message;
      } else {
        setLoading("");
        const t = await getToken();
        t.token && router.push("/users");
        t.token_admin && router.push("/admin");
        router.refresh();
      }
    } else {
      setLoading("");
      if (!data.name) errors.name = "please enter name.";
      if (!data.password) errors.password = "please enter password.";
      if (!data.email) errors.email = "please enter email.";
    }
    setErrorss(errors);
  };
  return (
    <div>
      <form
        onSubmit={signupHandler}
        className="m-auto w-2/5 sm:w-4/5 md:w-3/5 mt-10 mb-10 bg-white flex flex-col items-center justify-center  px-8 py-5 rounded-md border-[1px] border-black"
      >
        <span className=" w-max m-auto bg-transparent text-blue-950 font-bold px-5 py-3 mb-5 text-3xl ">
          {"sign up".toUpperCase()}
        </span>
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
        <div className="w-full flex justify-center font-bold items-center  mb-5">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="enter name"
            className="w-[300px] sm:w-4/5 md:w-[250px] border-b border-b-blue-950 py-3 px-5 outline-none bg-transparent"
          />
        </div>
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
        <div className="w-full flex justify-center font-bold items-center  mb-5">
          <Password
            className={
              "w-[300px] sm:w-4/5 md:w-[250px] border-b border-b-blue-950 py-3 px-5 outline-none bg-transparent"
            }
          />
        </div>
        <div className="mt-5 w-full flex justify-center">
          <button className="w-[300px] inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-black rounded-md hover:bg-gray-700 hover:text-gray-50">
            Sign up
          </button>
          {loading ? loading : ""}
        </div>
      </form>
      <p className="w-2/5 sm:w-4/5 md:w-3/5 m-auto -mt-10 text-justify font-sm">
        Your account is ready{" "}
        <a
          href="/login"
          className=" hover:underline hover:text-slate-600 w-max"
        >
          login
        </a>
      </p>
    </div>
  );
}

"use client";
import useFetch from "@/custem-hook/useFetch";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Error_Page() {
  const [tokens, setTokens] = useState({});
  const getToken = async () => {
    const res = await fetch("/api");
    if (!res.ok) {
      const er = await res.json();
      console.log(er);
      return;
    }
    const token = await res.json();
    // console.log(token);
    setTokens({ token: token.token, token_admin: token.token_admin });
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <div className="flex items-center justify-center w-3/4  h-[150px]  m-auto mt-40 ">
      <div className=" flex items-center justify-center w-1/5 border-e-[2px]  border-e-blue-950 h-full">
        404
      </div>
           <div className="px-10">
        <p className=" indent-5 text-gray-800 text-justify font-semibold mb-5">
          Do not open the login or account creation page if the administrator or
          user account is open
        </p>
        <p className=" indent-5 text-gray-800 text-justify font-semibold mb-5">
          To return to the opened account{" "}
          <a
            className="hover:text-gray-500 hover:underline text-red-800"
            href={
              (tokens.token && "/users") || (tokens.token_admin && "/admin")
            }
          >
            {(tokens.token && "Users") || (tokens.token_admin && "Admin")}
          </a>
        </p>
        
      </div>
    </div>
  );
}

export default Error_Page;

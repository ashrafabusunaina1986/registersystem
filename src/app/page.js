"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState();
  const getToken = async () => {
    const res = await fetch("/api");
    if (!res.ok) {
      const er = await res.json();
      console.log(er.message);
      return;
    }
    const token = await res.json();
    console.log(token);
    token.token && setToken(token.token);
    token.token_admin && setToken(token.token_admin);
  };
  useEffect(() => {
    getToken();
  }, []);
  // const [info, setInfo] = useState({});
  // const path = useRouter();
  // const goSignup = () => {
  //   path.push("/auth/signup");
  //   path.refresh();
  // };
  // const goLogin = () => {
  //   path.push("/auth/login");
  //   path.refresh();
  // };

  // const getToken = async () => {
  //   const res = await fetch("api");
  //   const token = await res.json();
  //   // console.log(token);
  //   setToken(token.token);
  // };
  // const me = async () => {
  //   const res = await fetch("api/users/me");
  //   const infologin = await res.json();
  //   // console.log(infologin);
  //   setInfo(infologin)
  // };
  // useEffect(() => {
  //   getToken();
  //   me();
  // }, [token]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header token={token} />
      {/* <div>
        {!token ? (
          <div className="flex gap-5">
            <button
              onClick={goSignup}
              className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
            >
              signup
            </button>
            <button
              onClick={goLogin}
              className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="flex gap-5">
            <button
              className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
              onClick={logout}
            >
              logout
            </button>
          </div>
        )}
      </div> */}
      {/* {info && info.success ?<div className="flex gap-8">
        <span className="">Name:{info.data.name}</span>
        <span className="">Email:{info.data.email}</span>
      </div>:''} */}
    </main>
  );
}

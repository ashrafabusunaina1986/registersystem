"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Header({ token }) {
  return (
    <header className="flex sm:flex-col-reverse gap-4 flex-row-reverse items-center justify-between w-full px-8 py-5 bg-gray-600 shadow-md shadow-gray-400">
      <ul className="flex items-center gap-5 w-max list-none">
        {!token ? (
          <>
            <li>
              <Link
                href={"/signup"}
                className="inline-flex items-center justify-center  px-5 py-3 sm:px-3 sm:py-1 sm:text-xs font-semibold text-slate-300  rounded-3xl hover:bg-gray-300 hover:text-gray-950 bg-zinc-400"
              >
                Sign up
              </Link>
            </li>
            <li>
              <Link
                href={"/login"}
                className="inline-flex items-center justify-center  px-5 py-3 sm:px-3 sm:py-1 sm:text-xs font-semibold text-slate-300  rounded-3xl hover:bg-gray-300 hover:text-gray-950 bg-zinc-400"              >
                Log in
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href={"/logout"}
                className="inline-flex items-center justify-center px-5 py-3 font-semibold text-slate-400 rounded-sm hover:bg-gray-500 hover:text-gray-50"
              >
                Log out
              </Link>
            </li>
          </>
        )}
      </ul>
      <Image src={"/img/teschlogo.jpeg"} alt="teach" width={200} height={100} />
    </header>
  );
}

export default Header;

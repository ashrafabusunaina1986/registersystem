'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Header({token}) {
  // const [token, setToken] = useState("");
  // const logout = async () => {
  //   const res = await fetch("api/logout", {
  //     method: "POST",
  //   });
  //   if (!res) return;
  //   const data = await res.json();
  //   console.log(data);
  //   setToken(data.token);
  // };
  return (
    <header className="flex flex-row-reverse items-center justify-between w-full px-8 py-5 bg-gray-200">
      <ul className="flex items-center gap-5 w-max list-none">
        {!token ? (
          <>
            <li>
              <Link
                href={"/signup"}
                className="inline-flex items-center justify-center  px-5 py-3  font-semibold text-white bg-black rounded-md hover:bg-gray-700 hover:text-gray-50"
              >
                Sign up
              </Link>
            </li>
            <li>
              <Link
                href={"/login"}
                className="inline-flex items-center justify-center px-5 py-3 font-semibold text-white bg-black rounded-md hover:bg-gray-700 hover:text-gray-50"
              >
                Log in
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link 
                href={"/logout"}
                className="inline-flex items-center justify-center px-5 py-3 font-semibold text-white bg-black rounded-md hover:bg-gray-700 hover:text-gray-50"
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

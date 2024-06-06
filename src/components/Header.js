import React from "react";
import logo from "../../public/img/teschlogo.jpeg";
import Image from "next/image";

function Header() {
  return (
    <header className="flex items-center justify-between bg-slate-800 px-3 py-4 mt-5 w-11/12 m-auto rounded-md">
      <Image src={logo} alt="teaching logo" height={150} width={150}/>
      <div className="">
        <button className="inline-flex items-center justify-center px-2 py-1  font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg ">
          logout
        </button>
      </div>
    </header>
  );
}

export default Header;

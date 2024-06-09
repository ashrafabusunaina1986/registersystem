import React from "react";
import logo from "../../public/img/teschlogo.jpeg";
import Image from "next/image";

function Header() {
  return (
    <header className="flex items-center justify-between bg-slate-200 mt-5 w-11/12 m-auto border-[2px] border-blue-950">
      <Image src={logo} alt="teaching logo" className=" object-fill h-[150px] w-[150]"/>
      <div className="mr-5">
        <button className="inline-flex items-center justify-center px-2 py-1  font-sans font-semibold tracking-wide text-white bg-blue-500  ">
          logout
        </button>
      </div>
    </header>
  );
}

export default Header;

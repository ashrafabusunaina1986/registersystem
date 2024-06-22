import React from "react";
import { FaSearch } from "react-icons/fa";
function SearchValue({searchRef,searchHandeler,name,id}) {
  return (
    <div className="flex w-max  m-auto items-center justify-center mt-16 ">
      <form className="  flex shadow-lg bg-inherit bg-none" onSubmit={searchHandeler}>
        <input
          type="search"
          id={id}
          name={id}
          ref={searchRef}
          placeholder={"Search "+name}
          className=" text-black w-[300px] sm:w-[200px] md:w-[250px] rounded-s-full border-[2px] border-slate-700 border-e-none  py-3 px-5 sm:py-1 md:px-3 sm:px-3 md:py-2 outline-none	bg-transparent font-bold"
        />
        <button className=" rounded-e-full flex items-center justify-center py-3 px-5 font-sans font-semibold tracking-wide  text-black border-[2px]  border-slate-700  ">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchValue;

import React from "react";
import { FaSearch } from "react-icons/fa";
function SearchValue({searchRef,searchHandeler,name}) {
  return (
    <div className="flex w-max border-[1px] m-auto items-center justify-center mt-10 rounded-md shadow-lg bg-white">
      <form className="  flex" onSubmit={searchHandeler}>
        <input
          type="search"
          id={name}
          name={name}
          ref={searchRef}
          placeholder={"Search "+name+" name"}
          className=" text-black w-[300px] border-[2px] border-blue-950 border-e-white rounded-s-2xl py-3 px-5 outline-none	bg-transparent font-bold"
        />
        <button className="flex items-center justify-center py-3 px-5 font-sans font-semibold tracking-wide  text-black border-[2px]  border-blue-950 rounded-e-2xl ">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchValue;

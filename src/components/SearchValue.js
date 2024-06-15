import React from "react";
import { FaSearch } from "react-icons/fa";
function SearchValue({searchRef,searchHandeler,name,id}) {
  return (
    <div className="flex w-max  m-auto items-center justify-center mt-10 ">
      <form className="  flex shadow-xl bg-none" onSubmit={searchHandeler}>
        <input
          type="search"
          id={id}
          name={id}
          ref={searchRef}
          placeholder={"Search "+name}
          className=" text-black w-[300px] rounded-s-full border-[1px] border-blue-400 border-e-white  py-3 px-5 outline-none	bg-transparent font-bold"
        />
        <button className=" rounded-e-full flex items-center justify-center py-3 px-5 font-sans font-semibold tracking-wide  text-black border-[1px]  border-blue-400  ">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchValue;

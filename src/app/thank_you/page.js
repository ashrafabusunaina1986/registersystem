"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Thank() {
  const route = useRouter();
  return (
    <div className="flex flex-col items-center justify-center mt-20 mb-20 border-2 bg-transparent w-11/12 m-auto p-5 rounded-full">
      <p>
        Thank you for registered to process{" "}
        <Link className="hover:underline" href={"/users"}>
          Users
        </Link>{" "}
      </p>
    </div>
  );
}

export default Thank;

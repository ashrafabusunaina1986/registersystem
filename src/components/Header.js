import React from "react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex flex-row-reverse items-center justify-between w-full px-8 py-5 bg-gray-200">
      <ul className="flex items-center gap-5 w-max list-none">
        <li1>
          <Link
            href={"/signup"}
            className="inline-flex items-center justify-center bg-yellow-400 px-5 py-3 rounded-full font-semibold hover:bg-yellow-300"
          >
            Sign up
          </Link>
        </li1>
        <li2>
          <Link
            href={"/login"}
            className="inline-flex items-center justify-center bg-yellow-400 px-5 py-3 rounded-full font-semibold hover:bg-yellow-300"
          >
            Log in
          </Link>
        </li2>
      </ul>
      <Image src={'/img/teschlogo.jpeg'} alt="teach" width={200} height={100} />
    </header>
  );
}

export default Header;

import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex p-4 border-b border-gray-200 items-center">
      <Link href={"/"} aria-label={"Main page"}>
        <h1 className="cursor-pointer text-blue-500">Foodie</h1>
      </Link>
    </header>
  );
};

export default Header;

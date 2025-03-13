import { IButtonProps } from "@/interfaces/Button";
import React, { FC } from "react";

const Button: FC<IButtonProps> = ({ clickHandler, children, type }) => {
  return (
    <button
      className="bg-blue-500 text-gray-100 p-2 rounded w-40 cursor-pointer hover:tracking-wider hover:bg-blue-600 duration-200"
      onClick={clickHandler}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

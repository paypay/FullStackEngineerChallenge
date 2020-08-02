import classNames from "classnames";
import React, { ButtonHTMLAttributes, FC } from "react";

export interface ButtonProps {
  variant?: "primary" | "black" | "default" | "gray" | "underline";
  size?: "md" | "sm";
}

export const variants = {
  primary: "bg-red-500 text-white hover:bg-red-700",
  default:
    "bg-white font-medium text-gray-700 border border-gray-300  hover:text-gray-500",
  gray: "bg-gray-300 text-gray-800 hover:bg-gray-400",
  black: "bg-black text-white hover:bg-gray700",
  underline: "text-red-500 hover:text-red-200 underline",
};

export const sizes = {
  md: "text-md p-3 rounded",
  sm: "leading-6 sm:leading-5 px-8 py-2",
};

export const Button: FC<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, variant = "primary", size = "md", className, ...props }) => {
  const classes = classNames(
    "focus:outline-none rounded-md text-bold text-center no-underline pointer whitespace-no-wrap text-base leading-6 transition ease-in-out duration-150",
    variants[variant],
    sizes[size],
    {
      "opacity-50 pointer-events-none": props.disabled,
      "w-full": !className?.includes("w-"),
    },
    className
  );

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};

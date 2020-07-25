import classNames from "classnames";
import React, { ButtonHTMLAttributes, FC } from "react";

export interface ButtonProps {
  variant?: "primary";
  size?: "md";
}

export const Button: FC<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, variant = "primary", size = "md", className, ...props }) => {
  const classes = classNames(
    "w-full text-bold text-center no-underline pointer whitespace-no-wrap",
    {
      // variants
      "bg-red-500 text-white hover:bg-red-700": variant == "primary",
      // sizes
      "text-md p-3 rounded": size === "md",
      // states
      "opacity-50": props.disabled,
    },
    className
  );

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};

import classNames from "classnames";
import React, { FC, HTMLProps, Ref } from "react";

type InputProps = HTMLProps<HTMLInputElement>;

export const Input: FC<InputProps> = React.forwardRef(
  ({ className = "", ...props }, ref: Ref<HTMLInputElement>) => {
    const classes = classNames(
      "p-3 rounded bg-white border border-gray-400 outline-none",
      className,
      {
        "w-full": !className.includes("w-"),
        "opacity-50 bg-gray-200": props.disabled,
      }
    );
    return <input {...props} className={classes} ref={ref} />;
  }
);

import classNames from "classnames";
import React, { FC, HTMLProps, Ref } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  rounded?: boolean;
  icon?: JSX.Element;
}

export const Input: FC<InputProps> = React.forwardRef(
  ({ className = "", rounded, icon, ...props }, ref: Ref<HTMLInputElement>) => {
    const classes = classNames(
      "p-3 rounded bg-white border border-gray-400 outline-none",
      {
        "w-full": !className.includes("w-"),
        "rounded-full": rounded,
        "pl-12": !!icon,
        "opacity-50 bg-gray-200": props.disabled,
      },
      className
    );
    const wrapperClasses = classNames("inline-block relative", {
      "w-full": !className.includes("w-"),
      "rounded-full": !!rounded,
    });
    return (
      <div className={wrapperClasses}>
        <input {...props} className={classes} ref={ref} />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-2xl text-gray-600">
          {icon}
        </div>
      </div>
    );
  }
);

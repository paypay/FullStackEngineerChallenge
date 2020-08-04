import classNames from "classnames";
import React, { FC } from "react";

interface AlertProps {
  icon?: JSX.Element;
  variant?: "error" | "success";
  className?: string;
}

export const Alert: FC<AlertProps> = ({
  variant = "success",
  icon,
  className,
  children,
  ...props
}) => {
  const classes = classNames(
    "p-5 py-4 flex w-full text-gray-700 rounded-md",
    {
      "bg-red-300": variant === "error",
      "bg-green-300": variant === "success",
    },
    className
  );
  return (
    <div {...props} role="alert" className={classes}>
      {icon && <span className="mr-4">{icon}</span>}
      {children}
    </div>
  );
};

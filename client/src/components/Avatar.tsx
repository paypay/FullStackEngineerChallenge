import classNames from "classnames";
import React, { FC } from "react";

import { colorByText } from "../helpers/colorByText";

interface AvatarProps {
  size?: "md" | "sm" | "xs";
  src?: string;
  alt?: string;
  className?: string;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  size = "md",
  alt,
  className,
  ...props
}) => {
  const bgColor = !src && colorByText(alt || "");
  const classes = classNames(
    "block rounded-full object-cover text-xs outline-none",
    { "w-12 h-12 text-3xl": size === "md" },
    { "w-10 h-10 text-xl": size === "sm" },
    { "w-8 h-8 text-xl": size === "xs" },

    bgColor,
    className
  );

  const innerClasses = classNames("items-center justify-center text-white", {
    "flex block": !src,
  });

  return (
    <div className={classes}>
      <div className={innerClasses}>
        {src && <img src={src} alt={alt} className={classes} />}
        {!src && alt && <span>{alt[0]}</span>}
      </div>
    </div>
  );
};

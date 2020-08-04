import classNames from "classnames";
import React, { FC } from "react";

export interface ContainerProps {
  className?: string;
  flexible?: boolean;
}

export const Container: FC<ContainerProps> = ({
  className,
  children,
  flexible,
}) => {
  const classes = classNames(
    "max-w-screen-xl mx-auto px-4 md:px-8",
    { "w-full flex items-end justify-between": flexible },
    className
  );

  return <div className={classes}>{children}</div>;
};

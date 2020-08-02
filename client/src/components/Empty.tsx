import { Trans } from "@lingui/macro";
import classNames from "classnames";
import React, { FC } from "react";

interface EmptyProps {
  className?: string;
}

export const Empty: FC<EmptyProps> = ({ children, className }) => {
  const classes = classNames(
    "w-full p-10 border-4 border-dashed border-gray-400 text-center my-10 rounded",
    className
  );
  return (
    <div className={classes}>
      <p className="text-gray-600 text-lg md:text-xl">
        <Trans id="empty.generic">There is no data to show</Trans>
      </p>
    </div>
  );
};

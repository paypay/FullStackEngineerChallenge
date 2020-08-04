import classNames from "classnames";
import React, { FC } from "react";

import { Avatar } from ".";
import { User } from "../graphql/types";
import { Trans } from "@lingui/macro";

export interface AvatarInfoProps {
  data: Partial<User>;
  size?: "sm" | "md";
  className?: string;
}

const sizes = {
  md: "text-lg",
};
export const AvatarInfo: FC<AvatarInfoProps> = ({
  className,
  data,
  size = "md",
}) => {
  const classes = classNames("flex items-center", sizes[size], className);
  return (
    <div className={classes}>
      <Avatar size={size} src={data.avatar} alt={data.lastName} />
      <div className="ml-4 truncate">
        <div className="font-medium -mb-1">
          {data.firstName} {data.lastName}
        </div>
        <span className="text-gray-600 text-base">
          <Trans id="generic.position">Backend Developer</Trans>
        </span>
      </div>
    </div>
  );
};

import { Trans } from "@lingui/macro";
import React, { FC } from "react";

import { User } from "../graphql/types";

interface ReviewProgressProps {
  stats: User["assignmentStats"];
}

export const ReviewProgress: FC<ReviewProgressProps> = ({ stats }) => {
  if (stats.total === 0) {
    return null;
  }
  return (
    <div className="w-full bg-gray-400 text-center rounded relative">
      <div
        style={{ width: `${stats.progress}%` }}
        className="rounded absolute h-full bg-red-500"
      ></div>
      <span className="relative text-white text-bold text-shadow px-2">
        <Trans id="admin.employee.reviewStat">
          Completed reviews {stats.completed}/{stats.total}
        </Trans>
      </span>
    </div>
  );
};

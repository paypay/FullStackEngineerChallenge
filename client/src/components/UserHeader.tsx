import { Trans } from "@lingui/macro";
import StarIcon from "@material-ui/icons/Star";
import React, { FC } from "react";

import { User } from "../graphql/types";

export interface UserHeader {
  user?: Partial<Omit<User, "reviewsSummary">>;
  rating?: number;
}

export const UserHeader: FC<UserHeader> = ({ user, rating }) => {
  return (
    <div>
      <div className="flex md:items-end justify-between">
        <div className="md:flex items-center">
          <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0 flex-grow-0 w-32 h-32 bg-gray-400 rounded text-6xl text-gray-700">
            <div className="w-full h-full flex items-center justify-center">
              {user?.avatar && (
                <img
                  className="w-full h-full object-fit rounded"
                  src={user?.avatar}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between h-32 text-sm">
            <div className=" flex flex-col">
              <div className="font-bold">
                {user?.firstName} {user?.lastName}
              </div>
              <span>
                <Trans id="generic.position">Backend Developer</Trans>
              </span>
              <span>
                <Trans id="generic.department">IT Department</Trans>
              </span>
            </div>
            <div>
              <div className="font-bold">
                <Trans id="auth.review.modal.manager">Manager</Trans>
              </div>
              <span>John Smith</span>
            </div>
          </div>
        </div>

        {!!rating && (
          <div className="text-center text-gray-600 mr-5">
            <span className="text-red-500 text-4xl">
              <StarIcon fontSize="inherit" />
            </span>
            <div className="text-4xl text-gray-700 font-medium -mt-2">
              {rating}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import { Trans } from "@lingui/macro";
import SearchIcon from "@material-ui/icons/Search";
import classNames from "classnames";
import React, { FC, HTMLAttributes } from "react";

export const EmptySearchResults: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const classes = classNames("w-full text-center", className);
  return (
    <div className={classes}>
      <span className="text-5xl text-gray-700">
        <SearchIcon fontSize="inherit" />
      </span>
      <div className="font-medium text-gray-800 text-xl mt-1">
        <Trans id="searchResults.generic.title">No results found</Trans>
      </div>
      <div className="text-gray-600 mt-2 text-lg mb-5">
        <Trans id="searchResults.generic.description">
          No results match the search criteria.
        </Trans>
      </div>
    </div>
  );
};

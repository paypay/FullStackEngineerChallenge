import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import React, { FC, Fragment } from "react";

import { PageInfo } from "../graphql/types";
import { getRoutePath } from "../helpers/getRoutePath";
import { Button } from "./";

export interface PaginationProps {
  pageInfo?: Partial<PageInfo> | null;
  onPaginate?: (direction?: string | null) => void;
}
export const Pagination: FC<PaginationProps> = ({ pageInfo, onPaginate }) => {
  const router = useRouter();

  if (!pageInfo) {
    return <Fragment />;
  }

  const query = { ...router.query };
  // remove previous after param
  delete query["after"];
  const searchParams = new URLSearchParams(query as Record<string, string>);
  return (
    <ul className="text-red-500 flex items-center justify-center text-center w-full py-8 font-medium">
      <li className="underline">
        <Button
          variant="underline"
          disabled={!pageInfo.previousCursor}
          onClick={() => {
            if (onPaginate) {
              onPaginate(pageInfo.previousCursor);
              return;
            }
            router.push(
              `${router.pathname}?${searchParams}&after=${pageInfo.previousCursor}`,
              `${getRoutePath(router.pathname)}?&after=${
                pageInfo.previousCursor
              }`
            );
          }}
        >
          <Trans id="pagination.previous">{"< "} Previous</Trans>
        </Button>
      </li>
      <li className="px-2"></li>
      <li className="underline">
        <Button
          variant="underline"
          disabled={!pageInfo.hasNextPage}
          onClick={() => {
            if (onPaginate) {
              onPaginate(pageInfo.lastCursor);
              return;
            }
            router.push(
              `${router.pathname}?${searchParams}&after=${pageInfo.lastCursor}`,
              `${getRoutePath(router.pathname)}?&after=${pageInfo.lastCursor}`
            );
          }}
        >
          <Trans id="pagination.next">Next{" >"}</Trans>
        </Button>
      </li>
    </ul>
  );
};

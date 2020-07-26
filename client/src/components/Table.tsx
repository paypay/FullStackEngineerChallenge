import React, { FC, TableHTMLAttributes } from "react";

import { Pagination, Loading, Empty, EmptySearchResults } from ".";
import { PageInfo } from "../graphql/types";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  loading?: boolean;
  isEmpty?: boolean;
  search?: string | null;
  pageInfo?: Partial<PageInfo> | null;
}

export const Table: FC<TableProps> = ({
  children,
  loading,
  isEmpty,
  search,
  pageInfo,
}) => {
  const noSearchResults = search && isEmpty;

  return (
    <div className="overflow-x-scroll w-full mt-8">
      {loading && <Loading />}
      {noSearchResults && <EmptySearchResults className="mt-8" />}
      {isEmpty && !search && <Empty className="mt-8" />}

      {!isEmpty && (
        <>
          <table className="w-full transition ease-in-out duration-150">
            {children}
          </table>
          <Pagination pageInfo={pageInfo} />
        </>
      )}
    </div>
  );
};

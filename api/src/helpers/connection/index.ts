import { QueryBuilder } from "knex";

import { base64Decode } from "../base64";
import { getCollectionIds } from "./getCollectionIds";
import { getEdges } from "./getEdges";
import { getPageInfo } from "./getPageInfo";

type Cursor = string | number | undefined | null;

const connection = async <T>(
  query: QueryBuilder,
  after: Cursor,
  transformer: Function
) => {
  const orderByStatement = query._statements.find(
    (statement) => statement.grouping === "order"
  );

  const table = query._single.table;

  if (!orderByStatement) {
    query.orderBy(`${table}.id`, "DESC");
  }

  const cursorId = after ? base64Decode(after) : undefined;

  const nodes = await getCollectionIds(query);
  const edges = await getEdges<T>(query, cursorId, transformer);
  const limit = Number(query._single.limit);

  return {
    edges,
    pageInfo: await getPageInfo(nodes, cursorId, limit),
    totalCount: nodes.length,
  };
};

export default connection;

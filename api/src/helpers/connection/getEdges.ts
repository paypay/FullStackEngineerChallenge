import { QueryBuilder } from "knex";

import { base64Encode } from "../base64";

export const getEdges = async <T>(
  baseQuery: QueryBuilder,
  cursorId: string | undefined,
  transformer: Function
) => {
  const query = baseQuery.clone();
  const table = query._single.table;

  const orderByStatement = baseQuery._statements.find(
    (statement) => statement.grouping === "order"
  );
  const { direction } = orderByStatement!;
  const operator = direction === "ASC" ? ">" : "<";

  if (cursorId) {
    query.where(`${table}.id`, operator, cursorId);
  }

  const nodes = await query;

  return nodes.map((node: T) => ({
    node: transformer(node),
    cursor: base64Encode(node["id"]),
  }));
};

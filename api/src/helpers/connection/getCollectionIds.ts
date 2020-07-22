import { QueryBuilder } from "knex";

export interface Node {
  id: number;
}

export const getCollectionIds = async (baseQuery: QueryBuilder) => {
  const table = baseQuery._single.table;
  const query = baseQuery
    .clone()
    .clearSelect()

    .select<Node[]>(`${table}.id`);

  // Remove query limit to get all results
  query._single.limit = undefined;

  const cursors = (await query).map((node) => {
    return node.id;
  });

  return cursors;
};

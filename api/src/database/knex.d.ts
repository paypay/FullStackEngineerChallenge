import * as knex from "knex";

declare module "knex" {
  export interface ColumnBuilder {
    first(): knex.AlterColumnBuilder;
    after(columnName: string): knex.AlterColumnBuilder;
  }

  interface QueryBuilder {
    orderBy(columnName: string | Raw, order: string): void;
    _single: { table: string; limit?: number };
    _statements: { grouping: string; direction: "ASC" | "DESC" }[];
  }
}

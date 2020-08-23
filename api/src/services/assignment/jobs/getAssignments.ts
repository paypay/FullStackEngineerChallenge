import db from "../../../database";
import {
  AssignmentFiltersInput,
  AssignmentOrderByInput,
} from "../../../graphql/types";
import { FIELDS, ORDER_MAP } from "../AssignmentModel";

const getAssignments = (
  limit = 10,
  filters?: AssignmentFiltersInput | null,
  orderBy?: AssignmentOrderByInput | null
) => {
  const query = db("assignment").select(FIELDS).limit(limit);

  if (filters) {
    if (filters.SEARCH) {
      query.leftJoin("user", "assignment.revieweeId", "user.id");
      query.whereRaw(
        `CONCAT("user"."firstName", ' ', "user"."lastName") ILIKE '%${filters.SEARCH}%'`
      );
    }
    if (filters.USER_ID) {
      query.where("assignment.userId", filters.USER_ID);
    }
    if (filters.REVIEWEE_ID) {
      query.where("assignment.revieweeId", filters.REVIEWEE_ID);
    }
    if (filters.STATUS) {
      query.where("assignment.status", filters.STATUS);
    }
  }

  if (orderBy) {
    const { field, sort } = ORDER_MAP[orderBy];
    query.orderBy(field, sort);
  }

  return query;
};

export default getAssignments;

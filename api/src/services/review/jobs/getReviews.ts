import db from "../../../database";
import { ReviewFiltersInput, ReviewOrderByInput } from "../../../graphql/types";
import { FIELDS, FILTER_MAP, ORDER_MAP } from "../ReviewModel";

const getReviews = (
  limit = 10,
  filters: ReviewFiltersInput | undefined | null,
  orderBy: ReviewOrderByInput | undefined | null
) => {
  const query = db("review")
    .select(FIELDS)
    .innerJoin("assignment", "assignment.id", "review.assignmentId")

    .limit(limit);

  if (filters) {
    Object.entries(filters).map(([key, value]) => {
      query.where(FILTER_MAP[key], value!);
    });
  }

  if (orderBy) {
    const { field, sort } = ORDER_MAP[orderBy];
    query.orderBy(field, sort);
  }

  return query;
};

export default getReviews;

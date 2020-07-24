import db from "../../../database";
import { ReviewOrderByInput } from "../../../graphql/types";
import { FIELDS, ORDER_MAP } from "../ReviewModel";

const getReviews = (limit = 10, orderBy?: ReviewOrderByInput | null) => {
  const query = db("review").select(FIELDS).limit(limit);

  if (orderBy) {
    const { field, sort } = ORDER_MAP[orderBy];
    query.orderBy(field, sort);
  }

  return query;
};

export default getReviews;

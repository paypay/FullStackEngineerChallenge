import { QueryResolvers, Review } from "../../../graphql/types";
import connection from "../../../helpers/connection";
import getReviews from "../jobs/getReviews";
import transformer from "../ReviewTransformer";

const userReviews: QueryResolvers<{}, { id: number }>["reviews"] = async (
  { id },
  { first = 10, after, filters, orderBy }
) => {
  const query = getReviews(first!, { ...filters, USER_ID: id }, orderBy);

  return connection<Review>(query, after, transformer);
};

export default userReviews;

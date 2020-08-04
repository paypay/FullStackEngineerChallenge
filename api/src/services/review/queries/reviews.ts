import { QueryResolvers, Review } from "../../../graphql/types";
import connection from "../../../helpers/connection";
import getReviews from "../jobs/getReviews";
import transformer from "../ReviewTransformer";

const reviews: QueryResolvers["reviews"] = async (
  _,
  { first = 10, after, orderBy, filters }
) => {
  const query = getReviews(first!, filters, orderBy);

  return connection<Review>(query, after, transformer);
};

export default reviews;

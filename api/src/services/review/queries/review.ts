import { QueryResolvers } from "../../../graphql/types";
import getReviewBy from "../jobs/getReview";
import transformer from "../ReviewTransformer";

const review: QueryResolvers["review"] = async (_, { id }) => {
  return transformer(await getReviewBy(id));
};

export default review;

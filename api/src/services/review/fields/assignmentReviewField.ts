import { Resolver } from "../../../graphql/types";
import getReviewByAssignment from "../jobs/getReviewByAssignment";
import transformer, { Review } from "../ReviewTransformer";

type FieldResolver = Resolver<Review | null, { id: number }>;

const assignmentReviewField: FieldResolver = async ({ id }) => {
  const review = await getReviewByAssignment(id);
  if (!review) {
    return null;
  }
  return transformer(review);
};

export default assignmentReviewField;

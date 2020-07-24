import review from "./queries/review";
import reviews from "./queries/reviews";

export const ReviewResolvers = {
  Query: {
    reviews,
    review,
  },
};

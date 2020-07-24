import assignmentReviewField from "./fields/assignmentReviewField";
import ratingField from "./fields/ratingField";
import review from "./queries/review";
import reviews from "./queries/reviews";

export const ReviewResolvers = {
  Query: {
    reviews,
    review,
  },
  Mutation: {
    CreateReview,
  },
  Assignment: {
    review: assignmentReviewField,
  },
  User: {
    rating: ratingField,
  },
};

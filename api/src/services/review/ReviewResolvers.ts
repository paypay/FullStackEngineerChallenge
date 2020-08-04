import assignmentReviewField from "./fields/assignmentReviewField";
import ratingField from "./fields/ratingField";
import reviewsFromUsersField from "./fields/reviewsFromUsersField";
import userAssignmentStatsField from "./fields/userAssignmentStatsField";
import userReviewsField from "./fields/userReviewsField";
import userReviewsSummaryField from "./fields/userReviewsSummaryField";
import CreateReview from "./mutations/CreateReview";
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
    reviews: userReviewsField,
    reviewsSummary: userReviewsSummaryField,

    reviewsFromUsers: reviewsFromUsersField,
    assignmentStats: userAssignmentStatsField,
  },
};

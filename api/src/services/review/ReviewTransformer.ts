import { assignment, review as reviewDB } from "../../database/types";
import { Review as ReviewGraphQL } from "../../graphql/types";
import { getRating } from "./ReviewModel";

export type UsersId = Pick<assignment, "userId" | "revieweeId"> & {
  assignmentId: number;
};

export type Review = Omit<ReviewGraphQL, "user" | "assignment" | "reviewee"> &
  UsersId;

const transformer = (review: reviewDB & UsersId): Review => ({
  id: review.id,
  userId: review.userId,
  revieweeId: review.revieweeId,
  assignmentId: review.assignmentId,
  comment: review.comment || "",
  attitude: review.attitude,
  communication: review.communication,
  growth: review.growth,
  dependability: review.dependability,
  productivity: review.productivity,
  initiative: review.initiative,
  innovation: review.innovation,
  createdAt: review.createdAt,
  rating: getRating(review),
});

export default transformer;

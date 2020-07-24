import * as yup from "yup";

import db from "../../database";
import { review } from "../../database/types";
import { ReviewOrderByInput } from "../../graphql/types";

export const FIELDS = [
  "review.id",
  "assignment.userId",
  "assignment.revieweeId",
  "review.assignmentId",
  "review.comment",
  "review.attitude",
  "review.communication",
  "review.growth",
  "review.dependability",
  "review.productivity",
  "review.initiative",
  "review.innovation",
];

const ratingField = db.raw(
  "(review.attitude + review.communication + review.dependability + review.growth + review.initiative + review.innovation + review.productivity)"
);

export const ORDER_MAP = {
  [ReviewOrderByInput.IdDesc]: {
    field: "review.id",
    sort: "DESC",
  },
  [ReviewOrderByInput.IdAsc]: {
    field: "review.id",
    sort: "ASC",
  },

  [ReviewOrderByInput.RatingDesc]: {
    field: ratingField,
    sort: "DESC",
  },
  [ReviewOrderByInput.RatingAsc]: {
    field: ratingField,
    sort: "DESC",
  },
};

const rating = yup.number().min(1).max(5);

export const validations = {
  comment: yup.string().min(5).max(255),
  assignmentId: yup.number().required(),
  attitude: rating,
  communication: rating,
  growth: rating,
  dependability: rating,
  productivity: rating,
  initiative: rating,
  innovation: rating,
};

export const getRating = (
  review: Omit<review, "id" | "createdAt" | "updatedAt">
) => {
  const total =
    review.attitude +
    review.communication +
    review.dependability +
    review.growth +
    review.initiative +
    review.innovation +
    review.productivity;

  return Math.round(total / 7);
};

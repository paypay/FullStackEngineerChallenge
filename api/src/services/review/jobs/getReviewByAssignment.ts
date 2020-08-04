import db from "../../../database";
import { review as reviewDB } from "../../../database/types";
import { FIELDS } from "../ReviewModel";
import { UsersId } from "../ReviewTransformer";

const getReviewByAssignment = async (id: number) => {
  const review = await db("review")
    .select<reviewDB & UsersId>(FIELDS)
    .where("review.assignmentId", "=", id)
    .innerJoin("assignment", "assignment.id", "review.assignmentId")
    .first();
  if (!review) {
    return null;
  }

  return review;
};

export default getReviewByAssignment;

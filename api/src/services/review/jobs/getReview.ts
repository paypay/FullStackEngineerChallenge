import db from "../../../database";
import { review as reviewDB } from "../../../database/types";
import { FIELDS } from "../ReviewModel";
import { UsersId } from "../ReviewTransformer";

const getReview = async (id: number) => {
  const review = await db("review")
    .select<reviewDB & UsersId>(FIELDS)
    .innerJoin("assignment", "assignment.id", "review.assignmentId")
    .where("review.id", "=", id)
    .first();

  if (!review) {
    throw new Error(`Review by id: ${id} could not be found`);
  }

  return review;
};

export default getReview;

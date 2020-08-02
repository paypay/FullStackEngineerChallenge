import db from "../../../database";
import { AssignmentStatus, CreateReviewInput } from "../../../graphql/types";
import validateSchema from "../../../helpers/validateSchema";
import { validations } from "../ReviewModel";
import getReviewBy from "./getReview";

const createReview = async (input: CreateReviewInput) => {
  await validateSchema(validations, input);
  const id: number = await db("review").insert(input);

  await db("assignment")
    .where("assignment.id", input.assignmentId)
    .update({ status: AssignmentStatus.Completed });

  return getReviewBy(id);
};

export default createReview;

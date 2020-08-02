import db from "../../../database";

import { CreateAssignmentInput } from "../../../graphql/types";
import validateSchema from "../../../helpers/validateSchema";
import { validations } from "../AssignmentModel";
import getAssignmentBy from "./getAssignment";

const createAssignment = async (input: CreateAssignmentInput) => {
  await validateSchema(validations, input);

  const ids = await db("assignment")
    .select("userId")
    .whereIn("userId", input.reviewerIds)
    .where("status", "PENDING")
    .where("revieweeId", input.revieweeId)
    .pluck("userId");

  const removeDuplicates = input.reviewerIds.filter((id) => !ids.includes(id));

  const assignments = Promise.all(
    removeDuplicates.map(async (reviewerId) => {
      const id: number = await db("assignment").insert({
        userId: reviewerId,
        revieweeId: input.revieweeId,
      });

      return await getAssignmentBy(id);
    })
  );

  return assignments;
};

export default createAssignment;

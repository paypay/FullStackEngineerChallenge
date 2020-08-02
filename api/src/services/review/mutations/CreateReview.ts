import { AuthenticationError, ForbiddenError } from "apollo-server-micro";

import { Context } from "../../../graphql/context";
import { MutationResolvers } from "../../../graphql/types";
import getAssignment from "../../assignment/jobs/getAssignment";
import createReview from "../jobs/createReview";
import transformer from "../ReviewTransformer";

const CreateReview: MutationResolvers["CreateReview"] = async (
  _,
  { input },
  { auth }: Context
) => {
  if (!auth) {
    throw new AuthenticationError("You need to sign in");
  }

  const assignment = await getAssignment(input.assignmentId);

  if (assignment.userId !== auth.id) {
    throw new ForbiddenError("You don't have access to this resource.");
  }

  if (assignment.status === "COMPLETED") {
    throw new Error("There's already a review for this assignment");
  }

  return {
    review: transformer(await createReview(input)),
  };
};

export default CreateReview;

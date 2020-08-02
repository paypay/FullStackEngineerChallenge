import { AuthenticationError } from "apollo-server-micro";

import { Context } from "../../../graphql/context";
import { MutationResolvers } from "../../../graphql/types";
import transformer from "../AssignmentTransformer";
import createAssignment from "../jobs/createAssignment";

const CreateAssignment: MutationResolvers["CreateAssignment"] = async (
  _,
  { input },
  { auth }: Context
) => {
  if (!auth) {
    throw new AuthenticationError("You need to sign in");
  }

  const assignments = await createAssignment(input);

  return {
    assignments: assignments.map((assignment) => transformer(assignment)),
  };
};

export default CreateAssignment;

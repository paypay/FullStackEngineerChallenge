import { Resolver, Assignment } from "../../../graphql/types";
import getAssignmentBy from "../jobs/getAssignment";
import transformer from "../AssignmentTransformer";

type FieldResolver = Resolver<Partial<Assignment>, { assignmentId: number }>;

const assignmentField: FieldResolver = async ({ assignmentId }) => {
  return transformer(await getAssignmentBy(assignmentId));
};

export default assignmentField;

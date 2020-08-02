import { QueryResolvers } from "../../../graphql/types";
import getAssignmentBy from "../jobs/getAssignment";
import transformer from "../AssignmentTransformer";

const assignment: QueryResolvers["assignment"] = async (_, { id }) => {
  return transformer(await getAssignmentBy(id));
};

export default assignment;

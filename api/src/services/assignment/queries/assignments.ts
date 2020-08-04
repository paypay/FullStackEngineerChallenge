import { QueryResolvers, Assignment } from "../../../graphql/types";
import connection from "../../../helpers/connection";
import getAssignments from "../jobs/getAssignments";
import transformer from "../AssignmentTransformer";

const assignments: QueryResolvers["assignments"] = async (
  _,
  { first = 10, after, orderBy, filters }
) => {
  const query = getAssignments(first!, filters, orderBy);

  return connection<Assignment>(query, after, transformer);
};

export default assignments;

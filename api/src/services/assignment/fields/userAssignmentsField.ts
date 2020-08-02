import { Context } from "../../../graphql/context";
import { QueryResolvers, Review } from "../../../graphql/types";
import connection from "../../../helpers/connection";
import transformer from "../AssignmentTransformer";
import getAssignments from "../jobs/getAssignments";

const userAssignmentsField: QueryResolvers<
  {},
  { id: number }
>["assignments"] = async (
  _,
  { first = 10, after, filters, orderBy },
  { auth }: Context
) => {
  if (!auth) {
    throw new Error("You need to sign in");
  }

  const query = getAssignments(
    first!,
    { ...filters, USER_ID: auth.id },
    orderBy
  );

  return connection<Review>(query, after, transformer);
};

export default userAssignmentsField;

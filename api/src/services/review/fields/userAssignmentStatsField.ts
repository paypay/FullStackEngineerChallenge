import { Resolver, User } from "../../../graphql/types";
import getAssignmentStats from "../jobs/getUserAssignmentStats";

type FieldResolver = Resolver<User["assignmentStats"], { id: number }>;

const userAssignmentStatsField: FieldResolver = async ({ id }) => {
  return getAssignmentStats(id);
};

export default userAssignmentStatsField;

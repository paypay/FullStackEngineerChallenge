import { assignment } from "../../database/types";
import { Assignment as AssignmentGraphQL } from "../../graphql/types";

export type UsersId = Pick<assignment, "userId" | "revieweeId">;
export type Assignment = Omit<AssignmentGraphQL, "user" | "reviewee"> & UsersId;

const transformer = (assignment: assignment): Assignment => ({
  id: assignment.id,
  userId: assignment.userId,
  revieweeId: assignment.revieweeId,
  status: assignment.status as AssignmentGraphQL["status"],
  createdAt: assignment.createdAt,
});

export default transformer;

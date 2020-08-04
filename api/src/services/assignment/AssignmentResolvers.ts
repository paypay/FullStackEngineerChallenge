import assignmentField from "./fields/assignmentField";
import userAssignmentsField from "./fields/userAssignmentsField";
import CreateAssignment from "./mutations/CreateAssignment";
import assignment from "./queries/assignment";
import assignments from "./queries/assignments";

export const AssignmentResolvers = {
  Query: {
    assignments,
    assignment,
  },
  Mutation: {
    CreateAssignment,
  },
  User: {
    assignments: userAssignmentsField,
  },
  Review: {
    assignment: assignmentField,
  },
};

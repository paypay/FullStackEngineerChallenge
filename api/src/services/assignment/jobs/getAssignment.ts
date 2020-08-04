import db from "../../../database";
import { assignment as assignmentDB } from "../../../database/types";
import { FIELDS } from "../AssignmentModel";

const getAssignment = async (id: number) => {
  const assignment = await db("assignment")
    .select<assignmentDB>(FIELDS)
    .where("assignment.id", "=", id)
    .first();

  if (!assignment) {
    throw new Error(`Assignment by id: ${id} could not be found`);
  }

  return assignment;
};

export default getAssignment;

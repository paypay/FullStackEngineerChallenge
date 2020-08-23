import db from "../../../database";

const getUserAssignmentStats = async (id: number) => {
  const review = await db("assignment")
    .select<{ pending: number; completed: number }>(
      db.raw(
        `
        SUM(CASE "assignment"."status" WHEN 'PENDING' THEN 1 ELSE 0 END)::INTEGER as pending, 
        SUM(CASE "assignment"."status" WHEN 'COMPLETED' THEN 1 ELSE 0 END)::INTEGER as completed
        `
      )
    )
    .where("assignment.revieweeId", id)
    .first();

  if (!review) {
    return {
      progress: 0,
      pending: 0,
      completed: 0,
      total: 0,
    };
  }

  const { completed, pending } = review;
  const total = pending + completed;

  const progress = !!total ? Math.round((completed / total) * 100) : 0;

  return {
    progress,
    pending,
    completed,
    total,
  };
};

export default getUserAssignmentStats;

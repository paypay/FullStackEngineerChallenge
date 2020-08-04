import db from "../../../database";

const getUserAssignmentStats = async (id: number) => {
  const review = await db("assignment")
    .select<{ pending: number; completed: number }>(
      db.raw(
        `
        SUM(if(assignment.status = 'PENDING', 1, 0)) as pending, 
        SUM(if(assignment.status = 'COMPLETED', 1, 0)) as completed
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

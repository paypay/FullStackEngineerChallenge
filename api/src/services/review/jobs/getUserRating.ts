import db from "../../../database";

const getUserRating = async (id: number) => {
  const rate =
    '("review"."attitude" + "review"."communication" + "review"."dependability" + "review"."growth" + "review"."initiative" + "review"."innovation" + "review"."productivity") /7';

  const review = await db("review")
    .select<{ total: number; rate: number }>(
      db.raw(`SUM(${rate}) as rate, COUNT(*) as total`)
    )
    .innerJoin("assignment", "assignment.id", "review.assignmentId")
    .where("assignment.revieweeId", id)
    .first();

  if (!review || review.total == 0) {
    return 0;
  }

  const res = review.rate / review.total;

  // Number.EPSILON for rounding purpose
  return Math.round((res + Number.EPSILON) * 100) / 100;
};

export default getUserRating;

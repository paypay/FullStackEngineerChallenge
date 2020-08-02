import db from "../../../database";
import { ReviewSSummary } from "../../../graphql/types";

const getUserSummary = async (id: number) => {
  const review = await db("review")
    .select<ReviewSSummary & { total: number }>(
      db.raw(`SUM(review.attitude) as attitude,
       SUM(review.communication) as communication,
       SUM(review.dependability) as dependability,
       SUM(review.growth) as growth,
       SUM(review.initiative) as initiative,
       SUM(review.innovation) as innovation,
       SUM(review.productivity) as productivity,
       COUNT(*) as total`)
    )
    .innerJoin("assignment", "assignment.id", "review.assignmentId")
    .where("assignment.revieweeId", id)
    .first();

  if (!review || review.total === 0) {
    return {
      rating: 0,
      attitude: 0,
      communication: 0,
      dependability: 0,
      growth: 0,
      initiative: 0,
      innovation: 0,
      productivity: 0,
    };
  }
  const total =
    (review.attitude +
      review.communication +
      review.dependability +
      review.growth +
      review.initiative +
      review.innovation +
      review.productivity) /
    review.total;

  return {
    rating: Math.round((total / 7 + Number.EPSILON) * 100) / 100,
    attitude: review.attitude / review.total,
    communication: review.communication / review.total,
    dependability: review.dependability / review.total,
    growth: review.growth / review.total,
    initiative: review.initiative / review.total,
    innovation: review.innovation / review.total,
    productivity: review.productivity / review.total,
  };
};

export default getUserSummary;

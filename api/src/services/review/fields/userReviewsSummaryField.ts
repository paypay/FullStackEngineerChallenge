import { Resolver, ReviewsSummary } from "../../../graphql/types";
import getUserSummary from "../jobs/getUserSummary";

type SummaryResolver = Resolver<ReviewsSummary, { id: number }>;

const userReviewsSummaryField: SummaryResolver = async ({ id }) => {
  return getUserSummary(id);
};

export default userReviewsSummaryField;

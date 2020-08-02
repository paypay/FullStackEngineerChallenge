import { Resolver, ReviewSSummary } from "../../../graphql/types";
import getUserSummary from "../jobs/getUserSummary";

type SummaryResolver = Resolver<ReviewSSummary, { id: number }>;

const userReviewsSummaryField: SummaryResolver = async ({ id }) => {
  return getUserSummary(id);
};

export default userReviewsSummaryField;

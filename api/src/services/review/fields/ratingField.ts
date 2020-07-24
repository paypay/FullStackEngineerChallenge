import { Resolver, User } from "../../../graphql/types";
import getUserRating from "../jobs/getUserRating";

type FieldResolver = Resolver<User["rating"], { id: number }>;

const ratingField: FieldResolver = async ({ id }) => {
  return getUserRating(id);
};

export default ratingField;

import { Resolver, User } from "../../../graphql/types";
import getUserBy from "../jobs/getUser";
import transformer from "../UserTransformer";

type FieldResolver = Resolver<Partial<User>, { revieweeId: number }>;

const revieweeField: FieldResolver = async ({ revieweeId }) => {
  return transformer(await getUserBy(revieweeId));
};

export default revieweeField;

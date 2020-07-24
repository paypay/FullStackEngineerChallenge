import { Resolver, User } from "../../../graphql/types";
import getUserBy from "../jobs/getUser";
import transformer from "../UserTransformer";

type FieldResolver = Resolver<Partial<User>, { userId: number }>;

const userField: FieldResolver = async ({ userId }) => {
  return transformer(await getUserBy(userId));
};

export default userField;

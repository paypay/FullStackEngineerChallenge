import { QueryResolvers } from "../../../graphql/types";
import getUserBy from "../jobs/getUser";
import transformer from "../UserTransformer";

const UserByIdQuery: QueryResolvers["user"] = async (_, { id }) => {
  return transformer(await getUserBy(id));
};

export default UserByIdQuery;

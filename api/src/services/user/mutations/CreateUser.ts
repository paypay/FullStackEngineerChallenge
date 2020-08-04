import { MutationResolvers } from "../../../graphql/types";
import createUser from "../jobs/createUser";
import transformer from "../UserTransformer";

const CreateUser: MutationResolvers["CreateUser"] = async (_, { input }) => {
  const user = await createUser(input);

  return {
    user: transformer(user),
  };
};

export default CreateUser;

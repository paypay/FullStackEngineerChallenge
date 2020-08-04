import { MutationResolvers } from "../../../graphql/types";
import authenticateUser from "../jobs/authenticateUser";

const AuthenticateMutation: MutationResolvers["Authenticate"] = async (
  _,
  { input }
) => {
  return authenticateUser(input);
};

export default AuthenticateMutation;

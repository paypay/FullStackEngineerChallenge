import db from "../../../database";
import { FIELDS } from "../UserModel";
import { user as userDB } from "../../../database/types";

const getUser = async (id: number) => {
  const user = await db("user")
    .select<userDB>(FIELDS)
    .where("id", "=", id)
    .first();

  if (!user) {
    throw new Error(`User by id: ${id} could not be found`);
  }

  return user;
};

export default getUser;

import db from "../../../database";
import getUser from "./getUser";

const deleteUser = async (id: number) => {
  const user = await getUser(id);

  await db("user").where("user.id", id).del();

  return user;
};

export default deleteUser;

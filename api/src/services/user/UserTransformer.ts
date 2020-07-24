import { user as userDB } from "../../database/types";
import { User as UserGraphQL } from "../../graphql/types";

const transformer = (user: userDB): Omit<UserGraphQL, "rating"> => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  avatar: user.avatar || "",
  userType: user.userType as UserGraphQL["userType"],
  address: user.address || "",
  phone: user.phone || "",
  mobilePhone: user.mobilePhone || "",
  birthday: user.birthday,
  createdAt: user.createdAt,
});

export default transformer;

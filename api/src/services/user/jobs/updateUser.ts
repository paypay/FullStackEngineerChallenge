import db from "../../../database";
import { UpdateUserInput } from "../../../graphql/types";
import validateSchema from "../../../helpers/validateSchema";
import { validations } from "../UserModel";
import getUserBy from "./getUser";

const validationSchema = (userId: number) => ({
  ...validations,
  email: validations.email.test(
    "email-unique",
    "This email address is already being used",
    (value) =>
      value === undefined ||
      db("user")
        .select(db.raw("1"))
        .where("email", value)
        .where("user.id", "<>", userId)
        .first()
        .then((user) => user === undefined)
  ),
});

const updateUser = async (userId: number, input: UpdateUserInput) => {
  await validateSchema(validationSchema(userId), input);

  await db("user").update(input).where("user.id", userId);

  return getUserBy(userId);
};

export default updateUser;

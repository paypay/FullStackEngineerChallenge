import bcrypt from "bcrypt";

export const hashPassword = async (text: string) => {
  return bcrypt.hash(text, process.env.HASH_SALT!);
};

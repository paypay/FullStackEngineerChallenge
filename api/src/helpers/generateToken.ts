import jwt from "jsonwebtoken";

const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET!, {
    expiresIn: "7 days",
  });
};

export { generateToken as default };

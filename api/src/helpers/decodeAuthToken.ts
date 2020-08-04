import jwt from "jsonwebtoken";

interface AuthorizationPayload {
  userId?: number;
  role: string;
}

const decodeAuthToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!) as AuthorizationPayload;
};

export default decodeAuthToken;

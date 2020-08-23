import { IncomingMessage, ServerResponse } from "http";

import decodeAuthToken from "../helpers/decodeAuthToken";

export interface Context {
  auth?: {
    id: number;
    role: string;
  };
}

interface Request {
  req: IncomingMessage;
  res: ServerResponse;
}

const context = ({ req }: Request): Context => {
  const authToken = req.headers && req.headers["authorization"];

  let auth;

  if (authToken) {
    try {
      const data = decodeAuthToken(authToken);

      if (data.userId) {
        auth = {
          id: data.userId,
          role: data.role,
        };
      }
    } catch (error) {}
  }

  return {
    auth,
  };
};

export default context;

import { IncomingMessage } from "http";

import decodeAuthToken from "../helpers/decodeAuthToken";

export interface Context {
  auth?: {
    id: number;
    role: string;
  };
}

const context = (request: IncomingMessage): Context => {
  const authToken = request.headers && request.headers["authorization"];

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

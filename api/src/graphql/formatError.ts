import { GraphQLError } from "graphql";

const formatError = (error: GraphQLError) => {
  if (error.message === "VALIDATION_FAILED") {
    return {
      message: "VALIDATION_FAILED",
      fields: error.extensions && error.extensions.errors,
    };
  }

  return error;
};

export default formatError;

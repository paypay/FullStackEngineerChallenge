import { GraphQLError } from "graphql";
import { UseFormMethods } from "react-hook-form";

interface FieldError {
  [key: string]: string;
}

interface GraphQLErrors extends GraphQLError {
  fields?: FieldError;
}

export const formatApiErrors = (
  [error]: readonly GraphQLErrors[],
  setError: UseFormMethods["setError"]
) => {
  if (error.message !== "VALIDATION_FAILED") {
    return;
  }

  if (error.fields) {
    Object.entries(error.fields).forEach(([field, message]) => {
      setError(field, { type: "API_ERROR", message });
    });
  }
};

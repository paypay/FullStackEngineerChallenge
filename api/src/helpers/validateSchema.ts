import { ApolloError } from "apollo-server-micro";
import * as yup from "yup";

export interface ErrorFormat {
  [x: string]: string;
}

export class ValidationError extends ApolloError {
  constructor(fieldsErrors: ErrorFormat) {
    super("VALIDATION_FAILED", "BAD_USER_INPUT", { errors: fieldsErrors });
    Object.defineProperty(this, "name", { value: "UserInputError" });
  }
}

const formatYupError = ({ inner: errors }: yup.ValidationError) =>
  errors.reduce((acc, current) => {
    acc[current.path] = current.message;
    return acc;
  }, {});

const validateSchema = async <T extends object, U extends object>(
  object: yup.ObjectSchemaDefinition<U>,
  data: T | null | undefined
) => {
  const schema = yup.object().shape(object);

  try {
    return await schema.validate(data, { abortEarly: false });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new ValidationError(formatYupError(error));
    } else {
      throw error;
    }
  }
};

export default validateSchema;

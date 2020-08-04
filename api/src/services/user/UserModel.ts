import * as yup from "yup";

import { UserOrderByInput } from "../../graphql/types";

export const FIELDS = [
  "user.id",
  "user.email",
  "user.firstName",
  "user.lastName",
  "user.userType",
  "user.avatar",
  "user.address",
  "user.phone",
  "user.mobilePhone",
  "user.birthday",
  "user.createdAt",
];

export const ORDER_MAP = {
  [UserOrderByInput.IdDesc]: {
    field: "id",
    sort: "DESC",
  },
  [UserOrderByInput.IdAsc]: {
    field: "id",
    sort: "ASC",
  },
};

export const validations = {
  firstName: yup.string().min(3).max(255),
  lastName: yup.string().min(3).max(255),
  password: yup.string().min(3).max(255),
  email: yup.string().email().lowercase(),
  avatar: yup.string(),
  address: yup.string().min(3).max(255),
  phone: yup.string().min(4).max(20),
  mobilePhone: yup.string().min(4).max(20),
  birthday: yup.date().transform((_, originalValue) => {
    return new Date(originalValue);
  }),
};

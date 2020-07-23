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

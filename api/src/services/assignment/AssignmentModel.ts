import * as yup from "yup";

import { AssignmentOrderByInput } from "../../graphql/types";

export const FIELDS = [
  "assignment.id",
  "assignment.userId",
  "assignment.revieweeId",
  "assignment.status",
  "assignment.createdAt",
];

export const ORDER_MAP = {
  [AssignmentOrderByInput.IdDesc]: {
    field: "assignment.id",
    sort: "DESC",
  },
  [AssignmentOrderByInput.IdAsc]: {
    field: "assignment.id",
    sort: "ASC",
  },
  [AssignmentOrderByInput.StatusDesc]: {
    field: "assignment.status",
    sort: "DESC",
  },
  [AssignmentOrderByInput.StatusAsc]: {
    field: "assignment.status",
    sort: "ASC",
  },
};

export const FILTER_MAP = {
  STATUS: "assignment.status",
  USER_ID: "assignment.userId",
  REVIEWEE_ID: "assignment.revieweeId",
};

export const validations = {
  firstName: yup.string().min(3).max(255),
  lastName: yup.string().min(3).max(255),
  password: yup.string().min(3).max(255),
};

import db from "../../../database";
import { UserFiltersInput, UserOrderByInput } from "../../../graphql/types";
import { FIELDS, ORDER_MAP } from "../UserModel";

const getUsers = (
  limit = 10,
  filters?: UserFiltersInput | null,
  orderBy?: UserOrderByInput | null
) => {
  const query = db("user").select(FIELDS).limit(limit);

  if (filters) {
    if (filters.SEARCH) {
      query.where((query) => {
        query.orWhere(
          db.raw("CONCAT(user.firstName, ' ', user.lastName)"),
          "LIKE",
          `%${filters.SEARCH}%`
        );
        query.orWhere("user.email", "LIKE", `%${filters.SEARCH}%`);
      });
    }
    if (filters.USER_TYPE) {
      query.where("user.userType", filters.USER_TYPE);
    }
  }

  if (orderBy) {
    const { field, sort } = ORDER_MAP[orderBy];
    query.orderBy(field, sort);
  }

  return query;
};

export default getUsers;

// server side typings;

export type ReviewType = {
  id: string;
  content: string;
  employeeId: string;
  ownerId: string;
};

export type EmployeeType = {
  id?: string;
  name: string;
  photoUrl: string;
  rating: number;
  department: string;
  password: string;
  email: string;
  reviews: ReviewType[];
};

export type AssetsType = {
  employees: EmployeeType[];
  reviews: ReviewType[];
};

export type ApiAssetsReturnType<T extends keyof AssetsType> = {
  page: number;
  perPage: number;
  prePage: number | null;
  nextPage: number | null;
  total: number;
  totalPages: number;
  data: AssetsType[T];
};

export type AssetsQueriesType = {
  delay?: number;
  page?: number;
  perPage?: number;
  onlyIds?: boolean;
};

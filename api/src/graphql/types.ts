import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { DeepPartial } from "utility-types";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Query = {
  __typename?: "Query";
  _?: Maybe<Scalars["Boolean"]>;
  reviews: ReviewConnection;
  user: User;
  users: UserConnection;
};

export type QueryReviewsArgs = {
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["ID"]>;
  orderBy?: Maybe<ReviewOrderByInput>;
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

export type QueryUsersArgs = {
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["ID"]>;
  orderBy?: Maybe<UserOrderByInput>;
};

export enum ReviewOrderByInput {
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  RatingAsc = "RATING_ASC",
  RatingDesc = "RATING_DESC",
}

export type Review = {
  __typename?: "Review";
  id: Scalars["Int"];
  rating: Scalars["Int"];
  comment: Scalars["String"];
  attitude: Scalars["Int"];
  communication: Scalars["Int"];
  growth: Scalars["Int"];
  dependability: Scalars["Int"];
  productivity: Scalars["Int"];
  initiative: Scalars["Int"];
  innovation: Scalars["Int"];
  createdAt: Scalars["Date"];
};

export type ReviewEdge = {
  __typename?: "ReviewEdge";
  node: Review;
  cursor: Scalars["ID"];
};

export type ReviewConnection = {
  __typename?: "ReviewConnection";
  edges: Array<ReviewEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  _?: Maybe<Scalars["Boolean"]>;
};

export type CreateReviewPayload = {
  __typename?: "CreateReviewPayload";
  review: Review;
};

export type ReviewFiltersInput = {
  USER_ID?: Maybe<Scalars["Int"]>;
  REVIEWEE_ID?: Maybe<Scalars["Int"]>;
};

export enum ReviewOrderByInput {
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  RatingAsc = "RATING_ASC",
  RatingDesc = "RATING_DESC",
}

export type ReviewEdge = {
  __typename?: "ReviewEdge";
  node: Review;
  cursor: Scalars["ID"];
};

export type MutationUpdateUserArgs = {
  id: Scalars["Int"];
  input: UpdateUserInput;
};

export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  firstCursor?: Maybe<Scalars["ID"]>;
  lastCursor?: Maybe<Scalars["ID"]>;
};

export type DeleteUserPayload = {
  __typename?: "DeleteUserPayload";
  user: User;
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  avatar?: Maybe<Scalars["String"]>;
};

export type UpdateUserPayload = {
  __typename?: "UpdateUserPayload";
  user: User;
};

export type CreateUserInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
  avatar?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  mobilePhone?: Maybe<Scalars["String"]>;
  birthday?: Maybe<Scalars["Date"]>;
};

export type CreateUserPayload = {
  __typename?: "CreateUserPayload";
  user: User;
};

export type AuthenticateInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type AuthenticatePayload = {
  __typename?: "AuthenticatePayload";
  user: User;
  token: Scalars["String"];
};

export enum UserType {
  Admin = "ADMIN",
  Employee = "EMPLOYEE",
}

export enum UserOrderByInput {
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
}

export type User = {
  __typename?: "User";
  id: Scalars["Int"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  userType: UserType;
  avatar?: Maybe<Scalars["String"]>;
  createdAt: Scalars["Date"];
};

export type UserEdge = {
  __typename?: "UserEdge";
  node: User;
  cursor: Scalars["ID"];
};

export type UserConnection = {
  __typename?: "UserConnection";
  edges: Array<UserEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars["Boolean"]>>;
  Int: ResolverTypeWrapper<DeepPartial<Scalars["Int"]>>;
  ID: ResolverTypeWrapper<DeepPartial<Scalars["ID"]>>;
  ReviewOrderByInput: ResolverTypeWrapper<DeepPartial<ReviewOrderByInput>>;
  Review: ResolverTypeWrapper<DeepPartial<Review>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars["String"]>>;
  ReviewEdge: ResolverTypeWrapper<DeepPartial<ReviewEdge>>;
  ReviewConnection: ResolverTypeWrapper<DeepPartial<ReviewConnection>>;
  Date: ResolverTypeWrapper<DeepPartial<Scalars["Date"]>>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<DeepPartial<PageInfo>>;
  DeleteUserPayload: ResolverTypeWrapper<DeepPartial<DeleteUserPayload>>;
  UpdateUserInput: ResolverTypeWrapper<DeepPartial<UpdateUserInput>>;
  UpdateUserPayload: ResolverTypeWrapper<DeepPartial<UpdateUserPayload>>;
  CreateUserInput: ResolverTypeWrapper<DeepPartial<CreateUserInput>>;
  CreateUserPayload: ResolverTypeWrapper<DeepPartial<CreateUserPayload>>;
  AuthenticateInput: ResolverTypeWrapper<DeepPartial<AuthenticateInput>>;
  AuthenticatePayload: ResolverTypeWrapper<DeepPartial<AuthenticatePayload>>;
  UserType: ResolverTypeWrapper<DeepPartial<UserType>>;
  UserOrderByInput: ResolverTypeWrapper<DeepPartial<UserOrderByInput>>;
  UserEdge: ResolverTypeWrapper<DeepPartial<UserEdge>>;
  UserConnection: ResolverTypeWrapper<DeepPartial<UserConnection>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Boolean: DeepPartial<Scalars["Boolean"]>;
  Int: DeepPartial<Scalars["Int"]>;
  ID: DeepPartial<Scalars["ID"]>;
  Review: DeepPartial<Review>;
  String: DeepPartial<Scalars["String"]>;
  ReviewEdge: DeepPartial<ReviewEdge>;
  ReviewConnection: DeepPartial<ReviewConnection>;
  Date: DeepPartial<Scalars["Date"]>;
  Mutation: {};
  String: DeepPartial<Scalars["String"]>;
  DeleteAssignmentPayload: DeepPartial<DeleteAssignmentPayload>;
  CreateAssignmentInput: DeepPartial<CreateAssignmentInput>;
  CreateAssignmentPayload: DeepPartial<CreateAssignmentPayload>;
  Assignment: DeepPartial<Assignment>;
  AssignmentEdge: DeepPartial<AssignmentEdge>;
  AssignmentConnection: DeepPartial<AssignmentConnection>;
  User: DeepPartial<User>;
  Float: DeepPartial<Scalars["Float"]>;
  Review: DeepPartial<Review>;
  CreateReviewInput: DeepPartial<CreateReviewInput>;
  CreateReviewPayload: DeepPartial<CreateReviewPayload>;
  ReviewFiltersInput: DeepPartial<ReviewFiltersInput>;
  ReviewEdge: DeepPartial<ReviewEdge>;
  ReviewConnection: DeepPartial<ReviewConnection>;
  AssignmentStats: DeepPartial<AssignmentStats>;
  ReviewSSummary: DeepPartial<ReviewSSummary>;
  Date: DeepPartial<Scalars["Date"]>;
  PageInfo: DeepPartial<PageInfo>;
  UserFiltersInput: DeepPartial<UserFiltersInput>;
  DeleteUserPayload: DeepPartial<DeleteUserPayload>;
  UpdateUserInput: DeepPartial<UpdateUserInput>;
  UpdateUserPayload: DeepPartial<UpdateUserPayload>;
  CreateUserInput: DeepPartial<CreateUserInput>;
  CreateUserPayload: DeepPartial<CreateUserPayload>;
  AuthenticateInput: DeepPartial<AuthenticateInput>;
  AuthenticatePayload: DeepPartial<AuthenticatePayload>;
  UserEdge: DeepPartial<UserEdge>;
  UserConnection: DeepPartial<UserConnection>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  reviews?: Resolver<
    ResolversTypes["ReviewConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryReviewsArgs, never>
  >;
  user?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
  users?: Resolver<
    ResolversTypes["UserConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, never>
  >;
}>;

export type ReviewResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Review"] = ResolversParentTypes["Review"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  attitude?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  communication?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  growth?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  dependability?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  productivity?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  initiative?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  innovation?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ReviewEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ReviewEdge"] = ResolversParentTypes["ReviewEdge"]
> = ResolversObject<{
  node?: Resolver<ResolversTypes["Review"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ReviewConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ReviewConnection"] = ResolversParentTypes["ReviewConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["ReviewEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
  totalCount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  Authenticate?: Resolver<
    ResolversTypes["AuthenticatePayload"],
    ParentType,
    ContextType,
    RequireFields<MutationAuthenticateArgs, "input">
  >;
  CreateUser?: Resolver<
    ResolversTypes["CreateUserPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, "input">
  >;
  DeleteUser?: Resolver<
    ResolversTypes["DeleteUserPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, "id">
  >;
  UpdateUser?: Resolver<
    ResolversTypes["UpdateUserPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "id" | "input">
  >;
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
}>;

export type ReviewEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ReviewEdge"] = ResolversParentTypes["ReviewEdge"]
> = ResolversObject<{
  node?: Resolver<ResolversTypes["Review"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ReviewConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ReviewConnection"] = ResolversParentTypes["ReviewConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["ReviewEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
  totalCount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  reviews?: Resolver<
    ResolversTypes["ReviewConnection"],
    ParentType,
    ContextType,
    RequireFields<UserReviewsArgs, never>
  >;
  reviewsFromUsers?: Resolver<
    ResolversTypes["ReviewConnection"],
    ParentType,
    ContextType,
    RequireFields<UserReviewsFromUsersArgs, never>
  >;
  userType?: Resolver<ResolversTypes["UserType"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
}>;

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  firstCursor?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  lastCursor?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  userType?: Resolver<ResolversTypes["UserType"], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserEdge"] = ResolversParentTypes["UserEdge"]
> = ResolversObject<{
  node?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserConnection"] = ResolversParentTypes["UserConnection"]
> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes["UserEdge"]>, ParentType, ContextType>;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
  totalCount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  DeleteAssignmentPayload?: DeleteAssignmentPayloadResolvers<ContextType>;
  CreateAssignmentPayload?: CreateAssignmentPayloadResolvers<ContextType>;
  Assignment?: AssignmentResolvers<ContextType>;
  AssignmentEdge?: AssignmentEdgeResolvers<ContextType>;
  AssignmentConnection?: AssignmentConnectionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  CreateReviewPayload?: CreateReviewPayloadResolvers<ContextType>;
  ReviewEdge?: ReviewEdgeResolvers<ContextType>;
  ReviewConnection?: ReviewConnectionResolvers<ContextType>;
  AssignmentStats?: AssignmentStatsResolvers<ContextType>;
  ReviewSSummary?: ReviewSSummaryResolvers<ContextType>;
  Date?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  DeleteUserPayload?: DeleteUserPayloadResolvers<ContextType>;
  UpdateUserPayload?: UpdateUserPayloadResolvers<ContextType>;
  CreateUserPayload?: CreateUserPayloadResolvers<ContextType>;
  AuthenticatePayload?: AuthenticatePayloadResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

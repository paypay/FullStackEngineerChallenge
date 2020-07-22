import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { DeepPartial } from "utility-types";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
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
};

export type Mutation = {
  __typename?: "Mutation";
  _?: Maybe<Scalars["Boolean"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  firstCursor?: Maybe<Scalars["ID"]>;
  lastCursor?: Maybe<Scalars["ID"]>;
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
  Date: ResolverTypeWrapper<DeepPartial<Scalars["Date"]>>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars["Boolean"]>>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<DeepPartial<Scalars["String"]>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Date: DeepPartial<Scalars["Date"]>;
  Query: {};
  Boolean: DeepPartial<Scalars["Boolean"]>;
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

export type HasRoleDirectiveArgs = { role?: Maybe<Array<Maybe<Role>>> };

export type HasRoleDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = HasRoleDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  review?: Resolver<
    ResolversTypes["Review"],
    ParentType,
    ContextType,
    RequireFields<QueryReviewArgs, "id">
  >;
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
  attitude?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  communication?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  dependability?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  growth?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  initiative?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  innovation?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  productivity?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  reviewee?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = ResolversObject<{
  Date?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

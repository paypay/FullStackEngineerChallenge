import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { DeepPartial } from 'utility-types';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  assignment: Assignment;
  assignments: AssignmentConnection;
  me?: Maybe<User>;
  review: Review;
  reviews: ReviewConnection;
  user: User;
  users: UserConnection;
};


export type QueryAssignmentArgs = {
  id: Scalars['Int'];
};


export type QueryAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<AssignmentFiltersInput>;
  orderBy?: Maybe<AssignmentOrderByInput>;
};


export type QueryReviewArgs = {
  id: Scalars['Int'];
};


export type QueryReviewsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<ReviewFiltersInput>;
  orderBy?: Maybe<ReviewOrderByInput>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<UserFiltersInput>;
  orderBy?: Maybe<UserOrderByInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  Authenticate: AuthenticatePayload;
  CreateAssignment: CreateAssignmentPayload;
  CreateReview?: Maybe<CreateReviewPayload>;
  CreateUser: CreateUserPayload;
  DeleteUser: DeleteUserPayload;
  UpdateUser: UpdateUserPayload;
  _?: Maybe<Scalars['Boolean']>;
};


export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


export type MutationCreateAssignmentArgs = {
  input: CreateAssignmentInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  input: UpdateUserInput;
};

export type AssignmentFiltersInput = {
  SEARCH?: Maybe<Scalars['String']>;
  STATUS?: Maybe<AssignmentStatus>;
  USER_ID?: Maybe<Scalars['Int']>;
  REVIEWEE_ID?: Maybe<Scalars['Int']>;
};

export type DeleteAssignmentPayload = {
  __typename?: 'DeleteAssignmentPayload';
  assignment: Assignment;
};

export type CreateAssignmentInput = {
  revieweeId: Scalars['Int'];
  reviewerIds: Array<Scalars['Int']>;
};

export type CreateAssignmentPayload = {
  __typename?: 'CreateAssignmentPayload';
  assignments: Array<Assignment>;
};

export enum AssignmentStatus {
  Pending = 'PENDING',
  Completed = 'COMPLETED'
}

export enum AssignmentOrderByInput {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC'
}

export type Assignment = {
  __typename?: 'Assignment';
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  review?: Maybe<Review>;
  reviewee: User;
  status: AssignmentStatus;
  user: User;
};

export type AssignmentEdge = {
  __typename?: 'AssignmentEdge';
  node: Assignment;
  cursor: Scalars['ID'];
};

export type AssignmentConnection = {
  __typename?: 'AssignmentConnection';
  edges: Array<AssignmentEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  assignmentStats: AssignmentStats;
  assignments: AssignmentConnection;
  avatar: Scalars['String'];
  birthday?: Maybe<Scalars['Date']>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  mobilePhone: Scalars['String'];
  phone: Scalars['String'];
  reviews: ReviewConnection;
  reviewsFromUsers: ReviewConnection;
  reviewsSummary: ReviewsSummary;
  userType: UserType;
};


export type UserAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<AssignmentFiltersInput>;
  orderBy?: Maybe<AssignmentOrderByInput>;
};


export type UserReviewsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<ReviewFiltersInput>;
  orderBy?: Maybe<ReviewOrderByInput>;
};


export type UserReviewsFromUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<ReviewFiltersInput>;
  orderBy?: Maybe<ReviewOrderByInput>;
};

export type Review = {
  __typename?: 'Review';
  assignment: Assignment;
  attitude: Scalars['Int'];
  comment: Scalars['String'];
  communication: Scalars['Int'];
  createdAt: Scalars['Date'];
  dependability: Scalars['Int'];
  growth: Scalars['Int'];
  id: Scalars['Int'];
  initiative: Scalars['Int'];
  innovation: Scalars['Int'];
  productivity: Scalars['Int'];
  rating: Scalars['Float'];
  reviewee: User;
  user: User;
};

export type CreateReviewInput = {
  assignmentId: Scalars['Int'];
  comment: Scalars['String'];
  attitude: Scalars['Int'];
  communication: Scalars['Int'];
  growth: Scalars['Int'];
  dependability: Scalars['Int'];
  productivity: Scalars['Int'];
  initiative: Scalars['Int'];
  innovation: Scalars['Int'];
};

export type CreateReviewPayload = {
  __typename?: 'CreateReviewPayload';
  review: Review;
};

export type ReviewFiltersInput = {
  USER_ID?: Maybe<Scalars['Int']>;
  REVIEWEE_ID?: Maybe<Scalars['Int']>;
};

export enum ReviewOrderByInput {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  RatingAsc = 'RATING_ASC',
  RatingDesc = 'RATING_DESC'
}

export type ReviewEdge = {
  __typename?: 'ReviewEdge';
  node: Review;
  cursor: Scalars['ID'];
};

export type ReviewConnection = {
  __typename?: 'ReviewConnection';
  edges: Array<ReviewEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type AssignmentStats = {
  __typename?: 'AssignmentStats';
  progress?: Maybe<Scalars['Int']>;
  pending?: Maybe<Scalars['Int']>;
  completed?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type ReviewsSummary = {
  __typename?: 'ReviewsSummary';
  rating: Scalars['Float'];
  attitude: Scalars['Float'];
  communication: Scalars['Float'];
  growth: Scalars['Float'];
  dependability: Scalars['Float'];
  productivity: Scalars['Float'];
  initiative: Scalars['Float'];
  innovation: Scalars['Float'];
};


export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  firstCursor?: Maybe<Scalars['ID']>;
  lastCursor?: Maybe<Scalars['ID']>;
  previousCursor?: Maybe<Scalars['ID']>;
};

export type UserFiltersInput = {
  SEARCH?: Maybe<Scalars['String']>;
  USER_TYPE?: Maybe<UserType>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  user: User;
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  user: User;
};

export type CreateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  user: User;
};

export type AuthenticateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthenticatePayload = {
  __typename?: 'AuthenticatePayload';
  user: User;
  token: Scalars['String'];
};

export enum UserType {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE'
}

export enum UserOrderByInput {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC'
}

export type UserEdge = {
  __typename?: 'UserEdge';
  node: User;
  cursor: Scalars['ID'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']>>;
  Int: ResolverTypeWrapper<DeepPartial<Scalars['Int']>>;
  ID: ResolverTypeWrapper<DeepPartial<Scalars['ID']>>;
  Mutation: ResolverTypeWrapper<{}>;
  AssignmentFiltersInput: ResolverTypeWrapper<DeepPartial<AssignmentFiltersInput>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']>>;
  DeleteAssignmentPayload: ResolverTypeWrapper<DeepPartial<DeleteAssignmentPayload>>;
  CreateAssignmentInput: ResolverTypeWrapper<DeepPartial<CreateAssignmentInput>>;
  CreateAssignmentPayload: ResolverTypeWrapper<DeepPartial<CreateAssignmentPayload>>;
  AssignmentStatus: ResolverTypeWrapper<DeepPartial<AssignmentStatus>>;
  AssignmentOrderByInput: ResolverTypeWrapper<DeepPartial<AssignmentOrderByInput>>;
  Assignment: ResolverTypeWrapper<DeepPartial<Assignment>>;
  AssignmentEdge: ResolverTypeWrapper<DeepPartial<AssignmentEdge>>;
  AssignmentConnection: ResolverTypeWrapper<DeepPartial<AssignmentConnection>>;
  User: ResolverTypeWrapper<DeepPartial<User>>;
  Review: ResolverTypeWrapper<DeepPartial<Review>>;
  Float: ResolverTypeWrapper<DeepPartial<Scalars['Float']>>;
  CreateReviewInput: ResolverTypeWrapper<DeepPartial<CreateReviewInput>>;
  CreateReviewPayload: ResolverTypeWrapper<DeepPartial<CreateReviewPayload>>;
  ReviewFiltersInput: ResolverTypeWrapper<DeepPartial<ReviewFiltersInput>>;
  ReviewOrderByInput: ResolverTypeWrapper<DeepPartial<ReviewOrderByInput>>;
  ReviewEdge: ResolverTypeWrapper<DeepPartial<ReviewEdge>>;
  ReviewConnection: ResolverTypeWrapper<DeepPartial<ReviewConnection>>;
  AssignmentStats: ResolverTypeWrapper<DeepPartial<AssignmentStats>>;
  ReviewsSummary: ResolverTypeWrapper<DeepPartial<ReviewsSummary>>;
  Date: ResolverTypeWrapper<DeepPartial<Scalars['Date']>>;
  PageInfo: ResolverTypeWrapper<DeepPartial<PageInfo>>;
  UserFiltersInput: ResolverTypeWrapper<DeepPartial<UserFiltersInput>>;
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
  Boolean: DeepPartial<Scalars['Boolean']>;
  Int: DeepPartial<Scalars['Int']>;
  ID: DeepPartial<Scalars['ID']>;
  Mutation: {};
  AssignmentFiltersInput: DeepPartial<AssignmentFiltersInput>;
  String: DeepPartial<Scalars['String']>;
  DeleteAssignmentPayload: DeepPartial<DeleteAssignmentPayload>;
  CreateAssignmentInput: DeepPartial<CreateAssignmentInput>;
  CreateAssignmentPayload: DeepPartial<CreateAssignmentPayload>;
  Assignment: DeepPartial<Assignment>;
  AssignmentEdge: DeepPartial<AssignmentEdge>;
  AssignmentConnection: DeepPartial<AssignmentConnection>;
  User: DeepPartial<User>;
  Review: DeepPartial<Review>;
  Float: DeepPartial<Scalars['Float']>;
  CreateReviewInput: DeepPartial<CreateReviewInput>;
  CreateReviewPayload: DeepPartial<CreateReviewPayload>;
  ReviewFiltersInput: DeepPartial<ReviewFiltersInput>;
  ReviewEdge: DeepPartial<ReviewEdge>;
  ReviewConnection: DeepPartial<ReviewConnection>;
  AssignmentStats: DeepPartial<AssignmentStats>;
  ReviewsSummary: DeepPartial<ReviewsSummary>;
  Date: DeepPartial<Scalars['Date']>;
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

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  assignment?: Resolver<ResolversTypes['Assignment'], ParentType, ContextType, RequireFields<QueryAssignmentArgs, 'id'>>;
  assignments?: Resolver<ResolversTypes['AssignmentConnection'], ParentType, ContextType, RequireFields<QueryAssignmentsArgs, never>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  review?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<QueryReviewArgs, 'id'>>;
  reviews?: Resolver<ResolversTypes['ReviewConnection'], ParentType, ContextType, RequireFields<QueryReviewsArgs, never>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  Authenticate?: Resolver<ResolversTypes['AuthenticatePayload'], ParentType, ContextType, RequireFields<MutationAuthenticateArgs, 'input'>>;
  CreateAssignment?: Resolver<ResolversTypes['CreateAssignmentPayload'], ParentType, ContextType, RequireFields<MutationCreateAssignmentArgs, 'input'>>;
  CreateReview?: Resolver<Maybe<ResolversTypes['CreateReviewPayload']>, ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'input'>>;
  CreateUser?: Resolver<ResolversTypes['CreateUserPayload'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  DeleteUser?: Resolver<ResolversTypes['DeleteUserPayload'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  UpdateUser?: Resolver<ResolversTypes['UpdateUserPayload'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type DeleteAssignmentPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteAssignmentPayload'] = ResolversParentTypes['DeleteAssignmentPayload']> = ResolversObject<{
  assignment?: Resolver<ResolversTypes['Assignment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CreateAssignmentPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateAssignmentPayload'] = ResolversParentTypes['CreateAssignmentPayload']> = ResolversObject<{
  assignments?: Resolver<Array<ResolversTypes['Assignment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AssignmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Assignment'] = ResolversParentTypes['Assignment']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  review?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType>;
  reviewee?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['AssignmentStatus'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AssignmentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssignmentEdge'] = ResolversParentTypes['AssignmentEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Assignment'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AssignmentConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssignmentConnection'] = ResolversParentTypes['AssignmentConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['AssignmentEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  assignmentStats?: Resolver<ResolversTypes['AssignmentStats'], ParentType, ContextType>;
  assignments?: Resolver<ResolversTypes['AssignmentConnection'], ParentType, ContextType, RequireFields<UserAssignmentsArgs, never>>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mobilePhone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reviews?: Resolver<ResolversTypes['ReviewConnection'], ParentType, ContextType, RequireFields<UserReviewsArgs, never>>;
  reviewsFromUsers?: Resolver<ResolversTypes['ReviewConnection'], ParentType, ContextType, RequireFields<UserReviewsFromUsersArgs, never>>;
  reviewsSummary?: Resolver<ResolversTypes['ReviewsSummary'], ParentType, ContextType>;
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  assignment?: Resolver<ResolversTypes['Assignment'], ParentType, ContextType>;
  attitude?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  communication?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  dependability?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  growth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  initiative?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  innovation?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  productivity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reviewee?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CreateReviewPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateReviewPayload'] = ResolversParentTypes['CreateReviewPayload']> = ResolversObject<{
  review?: Resolver<ResolversTypes['Review'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ReviewEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewEdge'] = ResolversParentTypes['ReviewEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Review'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ReviewConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewConnection'] = ResolversParentTypes['ReviewConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['ReviewEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AssignmentStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssignmentStats'] = ResolversParentTypes['AssignmentStats']> = ResolversObject<{
  progress?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pending?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  completed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ReviewsSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewsSummary'] = ResolversParentTypes['ReviewsSummary']> = ResolversObject<{
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  attitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  communication?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  growth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  dependability?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  productivity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  initiative?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  innovation?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  firstCursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lastCursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  previousCursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type DeleteUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserPayload'] = ResolversParentTypes['DeleteUserPayload']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UpdateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserPayload'] = ResolversParentTypes['UpdateUserPayload']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CreateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserPayload'] = ResolversParentTypes['CreateUserPayload']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AuthenticatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthenticatePayload'] = ResolversParentTypes['AuthenticatePayload']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  ReviewsSummary?: ReviewsSummaryResolvers<ContextType>;
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


import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  me?: Maybe<User>;
  user: User;
  users: UserConnection;
  review: Review;
  reviews: ReviewConnection;
  assignment: Assignment;
  assignments: AssignmentConnection;
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


export type QueryReviewArgs = {
  id: Scalars['Int'];
};


export type QueryReviewsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<ReviewFiltersInput>;
  orderBy?: Maybe<ReviewOrderByInput>;
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

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  Authenticate: AuthenticatePayload;
  CreateUser: CreateUserPayload;
  UpdateUser: UpdateUserPayload;
  DeleteUser: DeleteUserPayload;
  CreateReview?: Maybe<CreateReviewPayload>;
  CreateAssignment: CreateAssignmentPayload;
};


export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  input: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationCreateAssignmentArgs = {
  input: CreateAssignmentInput;
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

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  userType: UserType;
  avatar: Scalars['String'];
  address: Scalars['String'];
  phone: Scalars['String'];
  mobilePhone: Scalars['String'];
  birthday?: Maybe<Scalars['Date']>;
  createdAt: Scalars['Date'];
  rating: Scalars['Float'];
  assignmentStats: AssignmentStats;
  reviews: ReviewConnection;
  reviewsFromUsers: ReviewConnection;
  reviewsSummary: ReviewSSummary;
  assignments: AssignmentConnection;
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


export type UserAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<AssignmentFiltersInput>;
  orderBy?: Maybe<AssignmentOrderByInput>;
};

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

export type Review = {
  __typename?: 'Review';
  user: User;
  reviewee: User;
  id: Scalars['Int'];
  rating: Scalars['Int'];
  comment: Scalars['String'];
  attitude: Scalars['Int'];
  communication: Scalars['Int'];
  growth: Scalars['Int'];
  dependability: Scalars['Int'];
  productivity: Scalars['Int'];
  initiative: Scalars['Int'];
  innovation: Scalars['Int'];
  createdAt: Scalars['Date'];
  assignment: Assignment;
};

export type Assignment = {
  __typename?: 'Assignment';
  user: User;
  reviewee: User;
  review?: Maybe<Review>;
  id: Scalars['Int'];
  status: AssignmentStatus;
  createdAt: Scalars['Date'];
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

export type ReviewSSummary = {
  __typename?: 'ReviewSSummary';
  rating: Scalars['Float'];
  attitude: Scalars['Float'];
  communication: Scalars['Float'];
  growth: Scalars['Float'];
  dependability: Scalars['Float'];
  productivity: Scalars['Float'];
  initiative: Scalars['Float'];
  innovation: Scalars['Float'];
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

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type AssignReviewersMutationVariables = Exact<{
  input: CreateAssignmentInput;
}>;


export type AssignReviewersMutation = (
  { __typename?: 'Mutation' }
  & { CreateAssignment: (
    { __typename?: 'CreateAssignmentPayload' }
    & { assignments: Array<(
      { __typename?: 'Assignment' }
      & Pick<Assignment, 'id'>
      & { reviewee: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
        & { assignmentStats: (
          { __typename?: 'AssignmentStats' }
          & Pick<AssignmentStats, 'progress' | 'completed' | 'total'>
        ) }
      ) }
    )> }
  ) }
);

export type AssignmentQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AssignmentQuery = (
  { __typename?: 'Query' }
  & { assignment: (
    { __typename?: 'Assignment' }
    & Pick<Assignment, 'id' | 'status'>
    & { review?: Maybe<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'attitude' | 'communication' | 'growth' | 'dependability' | 'productivity' | 'initiative' | 'innovation' | 'comment' | 'rating'>
    )>, reviewee: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar'>
      & { reviewsSummary: (
        { __typename?: 'ReviewSSummary' }
        & Pick<ReviewSSummary, 'rating'>
      ) }
    ) }
  ) }
);

export type CreateReviewMutationVariables = Exact<{
  input: CreateReviewInput;
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & { CreateReview?: Maybe<(
    { __typename?: 'CreateReviewPayload' }
    & { review: (
      { __typename?: 'Review' }
      & Pick<Review, 'id'>
      & { assignment: (
        { __typename?: 'Assignment' }
        & Pick<Assignment, 'id' | 'status'>
        & { reviewee: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar' | 'rating'>
        ) }
      ) }
    ) }
  )> }
);

export type ReviewsCommentsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<ReviewFiltersInput>;
}>;


export type ReviewsCommentsQuery = (
  { __typename?: 'Query' }
  & { reviews: (
    { __typename?: 'ReviewConnection' }
    & { pageInfo?: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'previousCursor' | 'firstCursor' | 'lastCursor'>
    )>, edges: Array<(
      { __typename?: 'ReviewEdge' }
      & { node: (
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'comment'>
        & { user: (
          { __typename?: 'User' }
          & UserFragment
        ) }
      ) }
    )> }
  ) }
);

export type AuthenticateMutationVariables = Exact<{
  input: AuthenticateInput;
}>;


export type AuthenticateMutation = (
  { __typename?: 'Mutation' }
  & { Authenticate: (
    { __typename?: 'AuthenticatePayload' }
    & Pick<AuthenticatePayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'userType'>
      & UserFragment
    ) }
  ) }
);

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { CreateUser: (
    { __typename?: 'CreateUserPayload' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'userType' | 'birthday' | 'address' | 'phone' | 'mobilePhone'>
      & UserFragment
    ) }
  ) }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { DeleteUser: (
    { __typename?: 'DeleteUserPayload' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userType'>
    & UserFragment
  )> }
);

export type MeAssignmentsQueryVariables = Exact<{
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<AssignmentFiltersInput>;
}>;


export type MeAssignmentsQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { assignments: (
      { __typename?: 'AssignmentConnection' }
      & Pick<AssignmentConnection, 'totalCount'>
      & { edges: Array<(
        { __typename?: 'AssignmentEdge' }
        & { node: (
          { __typename?: 'Assignment' }
          & Pick<Assignment, 'id' | 'status'>
          & { reviewee: (
            { __typename?: 'User' }
            & Pick<User, 'rating'>
            & UserFragment
          ) }
        ) }
      )>, pageInfo?: Maybe<(
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'previousCursor' | 'firstCursor' | 'lastCursor'>
      )> }
    ) }
  )> }
);

export type SearchUserQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<UserFiltersInput>;
  orderBy?: Maybe<UserOrderByInput>;
}>;


export type SearchUserQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UserConnection' }
    & { edges: Array<(
      { __typename?: 'UserEdge' }
      & { node: (
        { __typename?: 'User' }
        & UserFragment
      ) }
    )> }
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { UpdateUser: (
    { __typename?: 'UpdateUserPayload' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'birthday' | 'address' | 'phone' | 'mobilePhone'>
      & UserFragment
    ) }
  ) }
);

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'birthday' | 'address' | 'phone' | 'mobilePhone'>
    & UserFragment
  ) }
);

export type UserReportQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserReportQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & { reviewsSummary: (
      { __typename?: 'ReviewSSummary' }
      & Pick<ReviewSSummary, 'rating' | 'attitude' | 'communication' | 'growth' | 'dependability' | 'productivity' | 'initiative' | 'innovation'>
    ) }
    & UserFragment
  ) }
);

export type UsersQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  filters?: Maybe<UserFiltersInput>;
  orderBy?: Maybe<UserOrderByInput>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UserConnection' }
    & Pick<UserConnection, 'totalCount'>
    & { edges: Array<(
      { __typename?: 'UserEdge' }
      & Pick<UserEdge, 'cursor'>
      & { node: (
        { __typename?: 'User' }
        & Pick<User, 'rating'>
        & { assignmentStats: (
          { __typename?: 'AssignmentStats' }
          & Pick<AssignmentStats, 'progress' | 'completed' | 'total'>
        ) }
        & UserFragment
      ) }
    )>, pageInfo?: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'previousCursor' | 'firstCursor' | 'lastCursor'>
    )> }
  ) }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'avatar'>
);

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  firstName
  lastName
  email
  avatar
}
    `;
export const AssignReviewersDocument = gql`
    mutation AssignReviewers($input: CreateAssignmentInput!) {
  CreateAssignment(input: $input) {
    assignments {
      id
      reviewee {
        id
        assignmentStats {
          progress
          completed
          total
        }
      }
    }
  }
}
    `;
export type AssignReviewersMutationFn = ApolloReactCommon.MutationFunction<AssignReviewersMutation, AssignReviewersMutationVariables>;

/**
 * __useAssignReviewersMutation__
 *
 * To run a mutation, you first call `useAssignReviewersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignReviewersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignReviewersMutation, { data, loading, error }] = useAssignReviewersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignReviewersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssignReviewersMutation, AssignReviewersMutationVariables>) {
        return ApolloReactHooks.useMutation<AssignReviewersMutation, AssignReviewersMutationVariables>(AssignReviewersDocument, baseOptions);
      }
export type AssignReviewersMutationHookResult = ReturnType<typeof useAssignReviewersMutation>;
export type AssignReviewersMutationResult = ApolloReactCommon.MutationResult<AssignReviewersMutation>;
export type AssignReviewersMutationOptions = ApolloReactCommon.BaseMutationOptions<AssignReviewersMutation, AssignReviewersMutationVariables>;
export const AssignmentDocument = gql`
    query Assignment($id: Int!) {
  assignment(id: $id) {
    id
    status
    review {
      id
      attitude
      communication
      growth
      dependability
      productivity
      initiative
      innovation
      comment
      rating
    }
    reviewee {
      id
      firstName
      lastName
      avatar
      reviewsSummary {
        rating
      }
    }
  }
}
    `;

/**
 * __useAssignmentQuery__
 *
 * To run a query within a React component, call `useAssignmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAssignmentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AssignmentQuery, AssignmentQueryVariables>) {
        return ApolloReactHooks.useQuery<AssignmentQuery, AssignmentQueryVariables>(AssignmentDocument, baseOptions);
      }
export function useAssignmentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AssignmentQuery, AssignmentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AssignmentQuery, AssignmentQueryVariables>(AssignmentDocument, baseOptions);
        }
export type AssignmentQueryHookResult = ReturnType<typeof useAssignmentQuery>;
export type AssignmentLazyQueryHookResult = ReturnType<typeof useAssignmentLazyQuery>;
export type AssignmentQueryResult = ApolloReactCommon.QueryResult<AssignmentQuery, AssignmentQueryVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($input: CreateReviewInput!) {
  CreateReview(input: $input) {
    review {
      id
      assignment {
        id
        status
        reviewee {
          id
          firstName
          lastName
          avatar
          rating
        }
      }
    }
  }
}
    `;
export type CreateReviewMutationFn = ApolloReactCommon.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, baseOptions);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = ApolloReactCommon.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const ReviewsCommentsDocument = gql`
    query ReviewsComments($first: Int, $after: ID, $filters: ReviewFiltersInput) {
  reviews(first: $first, after: $after, filters: $filters) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      previousCursor
      firstCursor
      lastCursor
    }
    edges {
      node {
        id
        comment
        user {
          ...User
        }
      }
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useReviewsCommentsQuery__
 *
 * To run a query within a React component, call `useReviewsCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsCommentsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useReviewsCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReviewsCommentsQuery, ReviewsCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<ReviewsCommentsQuery, ReviewsCommentsQueryVariables>(ReviewsCommentsDocument, baseOptions);
      }
export function useReviewsCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReviewsCommentsQuery, ReviewsCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ReviewsCommentsQuery, ReviewsCommentsQueryVariables>(ReviewsCommentsDocument, baseOptions);
        }
export type ReviewsCommentsQueryHookResult = ReturnType<typeof useReviewsCommentsQuery>;
export type ReviewsCommentsLazyQueryHookResult = ReturnType<typeof useReviewsCommentsLazyQuery>;
export type ReviewsCommentsQueryResult = ApolloReactCommon.QueryResult<ReviewsCommentsQuery, ReviewsCommentsQueryVariables>;
export const AuthenticateDocument = gql`
    mutation Authenticate($input: AuthenticateInput!) {
  Authenticate(input: $input) {
    user {
      ...User
      userType
    }
    token
  }
}
    ${UserFragmentDoc}`;
export type AuthenticateMutationFn = ApolloReactCommon.MutationFunction<AuthenticateMutation, AuthenticateMutationVariables>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthenticateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthenticateMutation, AuthenticateMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument, baseOptions);
      }
export type AuthenticateMutationHookResult = ReturnType<typeof useAuthenticateMutation>;
export type AuthenticateMutationResult = ApolloReactCommon.MutationResult<AuthenticateMutation>;
export type AuthenticateMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  CreateUser(input: $input) {
    user {
      ...User
      userType
      birthday
      address
      phone
      mobilePhone
    }
  }
}
    ${UserFragmentDoc}`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: Int!) {
  DeleteUser(id: $id) {
    user {
      id
    }
  }
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
    userType
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const MeAssignmentsDocument = gql`
    query MeAssignments($after: ID, $filters: AssignmentFiltersInput) {
  me {
    id
    assignments(after: $after, filters: $filters) {
      edges {
        node {
          id
          status
          reviewee {
            ...User
            rating
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        previousCursor
        firstCursor
        lastCursor
      }
      totalCount
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeAssignmentsQuery__
 *
 * To run a query within a React component, call `useMeAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeAssignmentsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useMeAssignmentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeAssignmentsQuery, MeAssignmentsQueryVariables>) {
        return ApolloReactHooks.useQuery<MeAssignmentsQuery, MeAssignmentsQueryVariables>(MeAssignmentsDocument, baseOptions);
      }
export function useMeAssignmentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeAssignmentsQuery, MeAssignmentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeAssignmentsQuery, MeAssignmentsQueryVariables>(MeAssignmentsDocument, baseOptions);
        }
export type MeAssignmentsQueryHookResult = ReturnType<typeof useMeAssignmentsQuery>;
export type MeAssignmentsLazyQueryHookResult = ReturnType<typeof useMeAssignmentsLazyQuery>;
export type MeAssignmentsQueryResult = ApolloReactCommon.QueryResult<MeAssignmentsQuery, MeAssignmentsQueryVariables>;
export const SearchUserDocument = gql`
    query SearchUser($first: Int, $after: ID, $filters: UserFiltersInput, $orderBy: UserOrderByInput) {
  users(first: $first, after: $after, filters: $filters, orderBy: $orderBy) {
    edges {
      node {
        ...User
      }
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filters: // value for 'filters'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useSearchUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, baseOptions);
      }
export function useSearchUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, baseOptions);
        }
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserQueryResult = ApolloReactCommon.QueryResult<SearchUserQuery, SearchUserQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: Int!, $input: UpdateUserInput!) {
  UpdateUser(id: $id, input: $input) {
    user {
      ...User
      birthday
      address
      phone
      mobilePhone
    }
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserByIdDocument = gql`
    query UserById($id: Int!) {
  user(id: $id) {
    ...User
    birthday
    address
    phone
    mobilePhone
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
      }
export function useUserByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = ApolloReactCommon.QueryResult<UserByIdQuery, UserByIdQueryVariables>;
export const UserReportDocument = gql`
    query UserReport($id: Int!) {
  user(id: $id) {
    ...User
    reviewsSummary {
      rating
      attitude
      communication
      growth
      dependability
      productivity
      initiative
      innovation
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserReportQuery__
 *
 * To run a query within a React component, call `useUserReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserReportQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserReportQuery, UserReportQueryVariables>) {
        return ApolloReactHooks.useQuery<UserReportQuery, UserReportQueryVariables>(UserReportDocument, baseOptions);
      }
export function useUserReportLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserReportQuery, UserReportQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserReportQuery, UserReportQueryVariables>(UserReportDocument, baseOptions);
        }
export type UserReportQueryHookResult = ReturnType<typeof useUserReportQuery>;
export type UserReportLazyQueryHookResult = ReturnType<typeof useUserReportLazyQuery>;
export type UserReportQueryResult = ApolloReactCommon.QueryResult<UserReportQuery, UserReportQueryVariables>;
export const UsersDocument = gql`
    query Users($first: Int, $after: ID, $filters: UserFiltersInput, $orderBy: UserOrderByInput) {
  users(first: $first, after: $after, filters: $filters, orderBy: $orderBy) {
    edges {
      node {
        ...User
        rating
        assignmentStats {
          progress
          completed
          total
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      previousCursor
      firstCursor
      lastCursor
    }
    totalCount
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filters: // value for 'filters'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
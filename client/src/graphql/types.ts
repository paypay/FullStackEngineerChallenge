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
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  Authenticate: AuthenticatePayload;
  CreateUser: CreateUserPayload;
  UpdateUser: UpdateUserPayload;
  DeleteUser: DeleteUserPayload;
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

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  firstCursor?: Maybe<Scalars['ID']>;
  lastCursor?: Maybe<Scalars['ID']>;
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
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  rating: Scalars['Float'];
  reviews: ReviewConnection;
  reviewsFromUsers: ReviewConnection;
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

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


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
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar' | 'userType'>
    ) }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar' | 'userType'>
  )> }
);


export const AuthenticateDocument = gql`
    mutation Authenticate($input: AuthenticateInput!) {
  Authenticate(input: $input) {
    user {
      id
      firstName
      lastName
      avatar
      userType
    }
    token
  }
}
    `;
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
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    avatar
    userType
  }
}
    `;

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
import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";

export type Maybe<T> = T | null;

export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  me?: Maybe<User>;
  workout?: Maybe<Workout>;
  aUsersWorkouts: PaginatedWorkouts;
  allPublicWorkouts: PaginatedWorkouts;
};

export type QueryWorkoutArgs = {
  id: Scalars["Int"];
};

export type QueryAUsersWorkoutsArgs = {
  creatorId: Scalars["Int"];
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryAllPublicWorkoutsArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  username: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Workout = {
  __typename?: "Workout";
  id: Scalars["Float"];
  title: Scalars["String"];
  body: Scalars["String"];
  distance: Scalars["String"];
  private: Scalars["Boolean"];
  notes: Scalars["String"];
  creatorId: Scalars["Float"];
  creator: User;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type PaginatedWorkouts = {
  __typename?: "PaginatedWorkouts";
  workouts: Array<Workout>;
  hasMore: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: UserResponse;
  forgotPassword: Scalars["Boolean"];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
  createWorkout: Workout;
  addNotes?: Maybe<Workout>;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type MutationCreateWorkoutArgs = {
  input: WorkoutInput;
};

export type MutationAddNotesArgs = {
  notes: Scalars["String"];
  id: Scalars["Int"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type UsernamePasswordInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
};

export type WorkoutInput = {
  title: Scalars["String"];
  body: Scalars["String"];
  distance: Scalars["String"];
  private: Scalars["Boolean"];
  notes: Scalars["String"];
};

export type RegularErrorFragment = { __typename?: "FieldError" } & Pick<
  FieldError,
  "field" | "message"
>;

export type RegularUserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username"
>;

export type RegularUserResponseFragment = { __typename?: "UserResponse" } & {
  errors?: Maybe<Array<{ __typename?: "FieldError" } & RegularErrorFragment>>;
  user?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
};

export type WorkoutSnippetFragment = { __typename?: "Workout" } & Pick<
  Workout,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "title"
  | "body"
  | "private"
  | "distance"
  | "notes"
> & { creator: { __typename?: "User" } & Pick<User, "username" | "id"> };

export type AddNotesMutationVariables = Exact<{
  id: Scalars["Int"];
  notes: Scalars["String"];
}>;

export type AddNotesMutation = { __typename?: "Mutation" } & {
  addNotes?: Maybe<{ __typename?: "Workout" } & WorkoutSnippetFragment>;
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = { __typename?: "Mutation" } & {
  changePassword: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type CreateWorkoutMutationVariables = Exact<{
  input: WorkoutInput;
}>;

export type CreateWorkoutMutation = { __typename?: "Mutation" } & {
  createWorkout: { __typename?: "Workout" } & WorkoutSnippetFragment;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>;

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type AUsersWorkoutsQueryVariables = Exact<{
  creatorId: Scalars["Int"];
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
}>;

export type AUsersWorkoutsQuery = { __typename?: "Query" } & {
  aUsersWorkouts: { __typename?: "PaginatedWorkouts" } & Pick<
    PaginatedWorkouts,
    "hasMore"
  > & { workouts: Array<{ __typename?: "Workout" } & WorkoutSnippetFragment> };
};

export type AllPublicWorkoutsQueryVariables = Exact<{
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
}>;

export type AllPublicWorkoutsQuery = { __typename?: "Query" } & {
  allPublicWorkouts: { __typename?: "PaginatedWorkouts" } & Pick<
    PaginatedWorkouts,
    "hasMore"
  > & { workouts: Array<{ __typename?: "Workout" } & WorkoutSnippetFragment> };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
};

export type WorkoutQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type WorkoutQuery = { __typename?: "Query" } & {
  workout?: Maybe<{ __typename?: "Workout" } & WorkoutSnippetFragment>;
};

export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const WorkoutSnippetFragmentDoc = gql`
  fragment WorkoutSnippet on Workout {
    id
    createdAt
    updatedAt
    title
    body
    private
    distance
    notes
    creator {
      username
      id
    }
  }
`;
export const AddNotesDocument = gql`
  mutation AddNotes($id: Int!, $notes: String!) {
    addNotes(id: $id, notes: $notes) {
      ...WorkoutSnippet
    }
  }
  ${WorkoutSnippetFragmentDoc}
`;
export type AddNotesMutationFn = Apollo.MutationFunction<
  AddNotesMutation,
  AddNotesMutationVariables
>;

/**
 * __useAddNotesMutation__
 *
 * To run a mutation, you first call `useAddNotesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNotesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNotesMutation, { data, loading, error }] = useAddNotesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useAddNotesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddNotesMutation,
    AddNotesMutationVariables
  >
) {
  return Apollo.useMutation<AddNotesMutation, AddNotesMutationVariables>(
    AddNotesDocument,
    baseOptions
  );
}
export type AddNotesMutationHookResult = ReturnType<typeof useAddNotesMutation>;
export type AddNotesMutationResult = Apollo.MutationResult<AddNotesMutation>;
export type AddNotesMutationOptions = Apollo.BaseMutationOptions<
  AddNotesMutation,
  AddNotesMutationVariables
>;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, baseOptions);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult = Apollo.MutationResult<
  ChangePasswordMutation
>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const CreateWorkoutDocument = gql`
  mutation CreateWorkout($input: WorkoutInput!) {
    createWorkout(input: $input) {
      ...WorkoutSnippet
    }
  }
  ${WorkoutSnippetFragmentDoc}
`;
export type CreateWorkoutMutationFn = Apollo.MutationFunction<
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables
>;

/**
 * __useCreateWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutMutation, { data, loading, error }] = useCreateWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWorkoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateWorkoutMutation,
    CreateWorkoutMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateWorkoutMutation,
    CreateWorkoutMutationVariables
  >(CreateWorkoutDocument, baseOptions);
}
export type CreateWorkoutMutationHookResult = ReturnType<
  typeof useCreateWorkoutMutation
>;
export type CreateWorkoutMutationResult = Apollo.MutationResult<
  CreateWorkoutMutation
>;
export type CreateWorkoutMutationOptions = Apollo.BaseMutationOptions<
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
) {
  return Apollo.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, baseOptions);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<
  ForgotPasswordMutation
>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($options: UsernamePasswordInput!) {
    login(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const AUsersWorkoutsDocument = gql`
  query aUsersWorkouts($creatorId: Int!, $cursor: String, $limit: Int!) {
    aUsersWorkouts(creatorId: $creatorId, cursor: $cursor, limit: $limit) {
      workouts {
        ...WorkoutSnippet
      }
      hasMore
    }
  }
  ${WorkoutSnippetFragmentDoc}
`;

/**
 * __useAUsersWorkoutsQuery__
 *
 * To run a query within a React component, call `useAUsersWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAUsersWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAUsersWorkoutsQuery({
 *   variables: {
 *      creatorId: // value for 'creatorId'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAUsersWorkoutsQuery(
  baseOptions: Apollo.QueryHookOptions<
    AUsersWorkoutsQuery,
    AUsersWorkoutsQueryVariables
  >
) {
  return Apollo.useQuery<AUsersWorkoutsQuery, AUsersWorkoutsQueryVariables>(
    AUsersWorkoutsDocument,
    baseOptions
  );
}
export function useAUsersWorkoutsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AUsersWorkoutsQuery,
    AUsersWorkoutsQueryVariables
  >
) {
  return Apollo.useLazyQuery<AUsersWorkoutsQuery, AUsersWorkoutsQueryVariables>(
    AUsersWorkoutsDocument,
    baseOptions
  );
}
export type AUsersWorkoutsQueryHookResult = ReturnType<
  typeof useAUsersWorkoutsQuery
>;
export type AUsersWorkoutsLazyQueryHookResult = ReturnType<
  typeof useAUsersWorkoutsLazyQuery
>;
export type AUsersWorkoutsQueryResult = Apollo.QueryResult<
  AUsersWorkoutsQuery,
  AUsersWorkoutsQueryVariables
>;
export const AllPublicWorkoutsDocument = gql`
  query allPublicWorkouts($cursor: String, $limit: Int!) {
    allPublicWorkouts(cursor: $cursor, limit: $limit) {
      workouts {
        ...WorkoutSnippet
      }
      hasMore
    }
  }
  ${WorkoutSnippetFragmentDoc}
`;

/**
 * __useAllPublicWorkoutsQuery__
 *
 * To run a query within a React component, call `useAllPublicWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPublicWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPublicWorkoutsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAllPublicWorkoutsQuery(
  baseOptions: Apollo.QueryHookOptions<
    AllPublicWorkoutsQuery,
    AllPublicWorkoutsQueryVariables
  >
) {
  return Apollo.useQuery<
    AllPublicWorkoutsQuery,
    AllPublicWorkoutsQueryVariables
  >(AllPublicWorkoutsDocument, baseOptions);
}
export function useAllPublicWorkoutsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllPublicWorkoutsQuery,
    AllPublicWorkoutsQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    AllPublicWorkoutsQuery,
    AllPublicWorkoutsQueryVariables
  >(AllPublicWorkoutsDocument, baseOptions);
}
export type AllPublicWorkoutsQueryHookResult = ReturnType<
  typeof useAllPublicWorkoutsQuery
>;
export type AllPublicWorkoutsLazyQueryHookResult = ReturnType<
  typeof useAllPublicWorkoutsLazyQuery
>;
export type AllPublicWorkoutsQueryResult = Apollo.QueryResult<
  AllPublicWorkoutsQuery,
  AllPublicWorkoutsQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
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
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const WorkoutDocument = gql`
  query Workout($id: Int!) {
    workout(id: $id) {
      ...WorkoutSnippet
    }
  }
  ${WorkoutSnippetFragmentDoc}
`;

/**
 * __useWorkoutQuery__
 *
 * To run a query within a React component, call `useWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWorkoutQuery(
  baseOptions: Apollo.QueryHookOptions<WorkoutQuery, WorkoutQueryVariables>
) {
  return Apollo.useQuery<WorkoutQuery, WorkoutQueryVariables>(
    WorkoutDocument,
    baseOptions
  );
}
export function useWorkoutLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WorkoutQuery, WorkoutQueryVariables>
) {
  return Apollo.useLazyQuery<WorkoutQuery, WorkoutQueryVariables>(
    WorkoutDocument,
    baseOptions
  );
}
export type WorkoutQueryHookResult = ReturnType<typeof useWorkoutQuery>;
export type WorkoutLazyQueryHookResult = ReturnType<typeof useWorkoutLazyQuery>;
export type WorkoutQueryResult = Apollo.QueryResult<
  WorkoutQuery,
  WorkoutQueryVariables
>;

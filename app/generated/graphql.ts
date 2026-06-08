import type { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `DateTime` scalar type represents a date and time in the UTC
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string, including UTC timezone ("Z"). The parsed date and time string will
   * be converted to UTC if there is an offset.
   */
  DateTime: { input: string; output: string; }
};

export type Activity = {
  __typename?: 'Activity';
  /** Number of active members, from the trigger-maintained attendee_count column. */
  attendanceCount: Scalars['Int']['output'];
  creator?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  maxAttendees: Scalars['Int']['output'];
  /** The registered members (active attendances), loaded in a batch via Dataloader. */
  participants: Array<User>;
  /** Remaining free seats (max_attendees - attendee_count, never negative). */
  remainingSpots: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  startsAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  /** Whether the current viewer has an active registration. False when not signed in. */
  viewerIsRegistered: Scalars['Boolean']['output'];
};

export type ActivityAttendance = {
  __typename?: 'ActivityAttendance';
  activity: Activity;
  id: Scalars['ID']['output'];
};

export type RegisterToActivityInput = {
  activityId: Scalars['ID']['input'];
};

export type RegisterToActivityPayload = {
  __typename?: 'RegisterToActivityPayload';
  attendance?: Maybe<ActivityAttendance>;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  /** Register the current member to an activity. */
  registerToActivity?: Maybe<RegisterToActivityPayload>;
  /** Unregister the current member from an activity (frees a seat). */
  unregisterFromActivity?: Maybe<RegisterToActivityPayload>;
};


export type RootMutationTypeRegisterToActivityArgs = {
  input: RegisterToActivityInput;
};


export type RootMutationTypeUnregisterFromActivityArgs = {
  input: RegisterToActivityInput;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  /** List published, non-archived activities. */
  activities: Array<Activity>;
  /** Fetch a single published, non-archived activity by slug (null if not visible). */
  activity?: Maybe<Activity>;
};


export type RootQueryTypeActivityArgs = {
  slug: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type ActivitiesQuery = { __typename?: 'RootQueryType', activities: Array<{ __typename?: 'Activity', id: string, title: string, slug: string, startsAt: string, maxAttendees: number, attendanceCount: number, viewerIsRegistered: boolean, creator?: { __typename?: 'User', id: string, name: string } | null }> };

export type ActivityQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ActivityQuery = { __typename?: 'RootQueryType', activity?: { __typename?: 'Activity', id: string, title: string, slug: string, description?: string | null, startsAt: string, maxAttendees: number, attendanceCount: number, viewerIsRegistered: boolean, creator?: { __typename?: 'User', id: string, name: string } | null, participants: Array<{ __typename?: 'User', id: string, name: string }> } | null };

export type RegisterToActivityMutationVariables = Exact<{
  activityId: Scalars['ID']['input'];
}>;


export type RegisterToActivityMutation = { __typename?: 'RootMutationType', registerToActivity?: { __typename?: 'RegisterToActivityPayload', attendance?: { __typename?: 'ActivityAttendance', id: string } | null } | null };

export type UnregisterFromActivityMutationVariables = Exact<{
  activityId: Scalars['ID']['input'];
}>;


export type UnregisterFromActivityMutation = { __typename?: 'RootMutationType', unregisterFromActivity?: { __typename?: 'RegisterToActivityPayload', attendance?: { __typename?: 'ActivityAttendance', id: string } | null } | null };


export const ActivitiesDocument = gql`
    query Activities {
  activities {
    id
    title
    slug
    startsAt
    maxAttendees
    attendanceCount
    viewerIsRegistered
    creator {
      id
      name
    }
  }
}
    `;
export const ActivityDocument = gql`
    query Activity($slug: String!) {
  activity(slug: $slug) {
    id
    title
    slug
    description
    startsAt
    maxAttendees
    attendanceCount
    viewerIsRegistered
    creator {
      id
      name
    }
    participants {
      id
      name
    }
  }
}
    `;
export const RegisterToActivityDocument = gql`
    mutation RegisterToActivity($activityId: ID!) {
  registerToActivity(input: {activityId: $activityId}) {
    attendance {
      id
    }
  }
}
    `;
export const UnregisterFromActivityDocument = gql`
    mutation UnregisterFromActivity($activityId: ID!) {
  unregisterFromActivity(input: {activityId: $activityId}) {
    attendance {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Activities(variables?: ActivitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ActivitiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ActivitiesQuery>({ document: ActivitiesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Activities', 'query', variables);
    },
    Activity(variables: ActivityQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ActivityQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ActivityQuery>({ document: ActivityDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Activity', 'query', variables);
    },
    RegisterToActivity(variables: RegisterToActivityMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RegisterToActivityMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterToActivityMutation>({ document: RegisterToActivityDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RegisterToActivity', 'mutation', variables);
    },
    UnregisterFromActivity(variables: UnregisterFromActivityMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UnregisterFromActivityMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnregisterFromActivityMutation>({ document: UnregisterFromActivityDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UnregisterFromActivity', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
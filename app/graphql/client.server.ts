import { GraphQLClient } from "graphql-request";
import { getSdk } from "~/generated/graphql";

const endpoint = process.env.API_URL ?? "http://localhost:4000/api";

/**
 * Returns the typed GraphQL SDK, optionally authenticated as a user.
 * For this exercise the bearer token is the user id (no JWT).
 */
export function apiSdk(token?: string) {
  const client = new GraphQLClient(endpoint, {
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });

  return getSdk(client);
}

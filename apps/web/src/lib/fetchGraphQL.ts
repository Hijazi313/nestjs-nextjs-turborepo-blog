import { API_URL } from "../constants/api";
import { getSession } from "./session";

/**
 * Fetch GraphQL API
 * @param query - GraphQL query
 * @param variables - Variables for the query
 * @returns Data from the GraphQL API
 */
export const fetchGraphQL = async (query: string, variables = {}) => {
  const res = await fetch(`${API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const result = await res.json();
  if (result.errors) {
    console.error({ GraphqlError: result.errors });
    throw new Error("Failed to fetch GraphQL API data ");
  }

  return result.data;
};

/**
 * Fetch GraphQL API with authentication
 * @param query - GraphQL query
 * @param variables - Variables for the query
 * @returns Data from the GraphQL API
 */
export const authFetchGraphQL = async (query: string, variables = {}) => {
  const session = await getSession();
  const res = await fetch(`${API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const result = await res.json();
  if (result.errors) {
    console.error({ GraphqlError: result.errors });
    throw new Error("Failed to fetch GraphQL API data ");
  }

  return result.data;
};

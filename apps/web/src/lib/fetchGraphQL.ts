import { API_URL } from "../constants/api";

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

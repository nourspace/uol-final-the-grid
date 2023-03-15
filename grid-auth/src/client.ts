import { GraphQLClient } from "graphql-request";

const graphQLEndpoint = process.env.HASURA_GRAPHQL_ENDPOINT || "";
const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET || "";

export const client = new GraphQLClient(graphQLEndpoint, {
  headers: { "x-hasura-admin-secret": adminSecret },
});

/// <reference types="vite/client" />

// Todo: type Any allows named imports while the DocumentNode doesn't
// Check how to export types
// https://the-guild.dev/graphql/codegen
// https://www.apollographql.com/docs/react/development-testing/static-typing/

declare module '*.gql';
// declare module '*.gql' {
//   import { DocumentNode } from 'graphql'
//   const Schema: DocumentNode
//   export = Schema
// }

declare module '*.graphql';
// declare module '*.graphql' {
//   import { DocumentNode } from 'graphql'
//   const Schema: DocumentNode
//   export = Schema
// }

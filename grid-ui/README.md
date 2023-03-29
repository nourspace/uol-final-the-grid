# Grid-UI

Web frontend component of The Grid.

Vue.js static single-page application that communicates with Grid-Database.

## Technology

- [Vue.js](https://vuejs.org)
  An approachable, performant and versatile framework for building web user interfaces.
- [Vuetify](https://vuetifyjs.com)
  Vue Component Framework
- [Vue Apollo](https://v4.apollo.vuejs.org)
  🚀 Integrate GraphQL in your Vue.js apps!

## Public Demo

Visit a Grid demo instance at https://grid.nour.space.

> Note that this is a public Grid instance, allowing anyone to register and contribute content.
> As a result, I cannot be held responsible for the content created by users.

## Requirements

- [Node.js](https://nodejs.org) (Tested on `18.15.0 LTS`)

## Setup

> This is a detailed setup for ui component. For quick and complete installation of The Grid refer
> to [`How to run a Grid instance locally`](../README.md#how-to-run-a-grid-instance-locally)

```sh
npm install
```

### Configuration

We need `.env` file with some settings. Check [.env.example](./.env.example).

```shell
# In ui directory, clone .env.example and update settings
cp env.example .env
```

The project has other technical configurations as well. Unless necessary, these should sparingly be changed.

- [Vite Configuration Reference](https://vitejs.dev/config/).
- [Vitest Configuration Reference](https://vitest.dev/config/).
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig).

### Compile and Hot-Reload for Development

```sh
npm run dev
```

- UI will be accessible on: `http://localhost:3000/`

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run in production

Serve `dist` directory with any http server.
[nginx.conf](nginx.conf) is used inside Docker setup. We copy contents of `dist` to `/usr/share/nginx/html`.

### Run with Docker

Use docker compose to build and run `ui` service.

> Modifying .env requires rebuilding the image as these values are baked in the build

```shell
# In parent project root (where docker-compose.yaml exists)
docker compose build ui
docker compose up ui
```

### Tests

Run unit tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint & Format

Lint with [ESLint](https://eslint.org/). Format with [Prettier](https://prettier.io/).

```sh
npm run lint
npm run format
```

## Resources

### Vue

- [Vue 3 documentation](https://vuejs.org/guide/introduction.html)
- [Vue:<script setup>](https://vuejs.org/api/sfc-script-setup.html)
- [Vue:Using Vue with TypeScript](https://vuejs.org/guide/typescript/overview.html)
- [Vue:Slots](https://vuejs.org/guide/components/slots.html)
- [Vue:Testing](https://vuejs.org/guide/scaling-up/testing.html)
- [Vite:Env Variables and Modes](https://vitejs.dev/guide/env-and-mode.html)
- [Vuetify:Treeshaking](https://vuetifyjs.com/en/features/treeshaking/)
- [Vuetify:Data tables](https://vuetifyjs.com/en/components/data-tables/basics/)
- [Pinia:Store Concepts](https://pinia.vuejs.org/core-concepts/)
- [Pinia:Testing](https://pinia.vuejs.org/cookbook/testing.html)
- [Vitest:Feature](https://vitest.dev/guide/features.html)
- [Vitest:Mocking](https://vitest.dev/guide/mocking.html)
- [Vue Testing Library](https://testing-library.com/docs/vue-testing-library/cheatsheet)
- [Testing v-model](https://test-utils.vuejs.org/guide/advanced/v-model.html#a-simple-example)

### GraphQL

- [Export the Hasura GraphQL Schema](https://hasura.io/docs/latest/schema/common-patterns/export-graphql-schema/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Postgres: Filter Query Results / Search Queries](https://hasura.io/docs/latest/queries/postgres/query-filters/)
- [Fragments](https://relay.dev/docs/tutorial/fragments-1/)
- [Apollo:Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/)
- [Hasura:Subscriptions](https://hasura.io/docs/latest/subscriptions/overview/)
- [graphql-ws](https://www.npmjs.com/package/graphql-ws)

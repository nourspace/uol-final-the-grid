# Grid-Auth

JWT authentication component of The Grid.

Standalone Express server that authenticates users. It connects to the GraphQL engine using admin secret. Exposes two
endpoints to register and login. Both endpoints accept user credentials and return JWT Bearer tokens.

## Technology

- [Express](https://expressjs.com)
  Fast, unopinionated, minimalist web framework for Node.js
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  An implementation of JSON Web Tokens

## Requirements

- [Node.js](https://nodejs.org) (Tested on `18.15.0 LTS`)

## Setup

> This is a detailed setup for auth component. For quick and complete installation of The Grid refer
> to [`How to run a Grid instance locally`](../README.md#how-to-run-a-grid-instance-locally)

```sh
npm install
```

### Configuration

We need `.env` file with some settings. Check [.env.example](./.env.example).

```shell
# In auth directory, clone .env.example and update settings
cp env.example .env
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

- Auth will be accessible on: `http://localhost:5050/` (or whatever `PORT` is set to)

### Build for production

```sh
npm run build
```

### Run in production

```sh
npm start
```

### Run with Docker

Use docker compose to build and run `auth` service.

```shell
# In parent project root (where docker-compose.yaml exists)
docker compose build auth
docker compose up auth
```

### Tests

Run unit tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## Resources

- [hasura-authentication > Node.js Express](https://hasura.io/learn/graphql/hasura-authentication/integrations/nodejs-express/)
- [Authentication and Authorization](https://hasura.io/docs/latest/auth/index/)
- [Authentication with Hasura GraphQL](https://hasura.io/learn/graphql/hasura-authentication/introduction/)
- [Authorization Patterns with Hasura](https://hasura.io/learn/graphql/hasura-auth-slack/introduction/)
- https://www.codeconcisely.com/posts/how-to-handle-errors-in-express-with-typescript
- [Testing express apps](https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/)

# grid

This template should help get you started developing with Vue 3 in Vite.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Ports

- 3000 Grid-ui
- 5050 Grid-auth
- 5432 Database
- 8080 GraphQL
- 9090 Hasura Console

## Run with Docker

Use docker-compose to build and run `ui` service. We also need `.env` file with some settings.

Check [.env.example](.env.example)

> Modifying .env requires rebuilding the image as these values are baked in the build

```shell
# In ui directory, clone .env.example and update settings
cp env.example .env
# In parent project root (where docker-compose.yaml exists)
docker-compose build ui
docker-compose up ui
```

- UI will be accessible on: `http://localhost/` (or whatever `BASE_URL` is set to)

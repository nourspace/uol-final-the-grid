# Grid-UI

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Build for production

```sh
npm run build
```

### Run in production

```sh
npm start
```

## Run with Docker

Use docker-compose to build and run `auth` service. We also need `.env` file with some settings.

Check [.env.example](.env.example) 

```shell
# In auth directory, clone .env.example and update settings
cp env.example .env
# In parent project root (where docker-compose.yaml exists)
docker-compose build auth
docker-compose up auth
```

- Auth will be accessible on: `http://localhost:5050/` (or whatever `PORT` is set to)

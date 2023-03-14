# Grid-Database

## Setup

- Install Docker and Docker-Compose
  https://docs.docker.com/get-docker/

- [Optional] Install Hasura CLI
  https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/

### Run Database and GraphQL Engine

Use docker-compose to run `postgres` and `graphql-engine` services. We also need `.env` file with some settings.

```shell
# In database directory, clone .env.example and update settings
cp env.example .env
# In parent project root (where docker-compose.yaml exists)
docker-compose up postgres graphql-engine
```

- Postgres database will be accessible on: `localhost:5432`
- GraphQL engine will be accessible on: `http://localhost:8080/v1/graphql`

### Run Hasura Console

```
hasura --console-port 9090
```

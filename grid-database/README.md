# Grid-Database

Storage and GraphQL component of The Grid.

Postgres relational database to persist data and Hasura engine to expose GraphQL endpoint.
An extra authentication component, [grid-auth](../grid-auth/README.md), is needed to authenticate and authorise
requests.

## Technology

- [PostgreSQL](https://www.postgresql.org/)
  The World's Most Advanced Open Source Relational Database
- [Hasura GraphQL Engine](https://hasura.io/)
  Makes data instantly accessible over a GraphQL

## Setup

> This is a detailed setup for database component. For quick and complete installation of The Grid refer
> to [`How to run a Grid instance locally`](../README.md#how-to-run-a-grid-instance-locally)

- Install Docker and Docker-Compose
  https://docs.docker.com/get-docker/

- Install Hasura CLI
  https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/

### Configuration

We need `.env` file with some settings. Check [.env.example](./.env.example).

```shell
# In database directory, clone .env.example and update settings
cp env.example .env
```

### Run Database and GraphQL Engine

Use docker compose to run `postgres` and `graphql-engine` services.

```shell
# In parent project root (where docker-compose.yaml exists)
docker compose up postgres graphql-engine
```

- GraphQL engine will be accessible on: `http://localhost:8080/v1/graphql`
- Postgres database will be accessible on: `localhost:5432`

### Run Hasura Console

```shell
hasura --console-port 9090
```

- Hasura console will be accessible on: `http://localhost:9090`

### Metadata, Migrations, Seeds

On a fresh database installation, we need to add some information for Hasura engine to work.

These are:

- **Metadata**: connections, permissions, relations, and other information on how Hasura generates GraphQL schema
- **Migrations**: database setup instructions to create the tables, relations, and other SQL entities
- **Seeds**: initial rows to be added to different tables

```shell
# Check metadata difference
hasura metadata diff
# Apply local metadata to the database (this overwrites the database!) 
# [on first run it will show inconsistencies, that's okay.]
hasura metadata apply

# Check migrations status
hasura --database-name default migrate status
# Apply migrations to database
hasura --database-name default migrate apply

# Seed database (order is important!)
hasura --database-name default seed apply --file 1678399001253_users.sql
hasura --database-name default seed apply --file 1678393485908_assets.sql
hasura --database-name default seed apply --file 1678407536594_activities.sql
hasura --database-name default seed apply --file 1679339231541_articles.sql
hasura --database-name default seed apply --file 1678408293369_tasks.sql
```

## Resources

### Tutorials

- [Hasura Basics](https://hasura.io/learn/graphql/hasura/introduction/)
- [Advanced: Migrations and Metadata](https://hasura.io/learn/graphql/hasura-advanced/introduction/)
- [Concepts of PostgreSQL](https://hasura.io/learn/database/postgresql/introduction/)
- [Introduction to GraphQL](https://hasura.io/learn/graphql/intro-graphql/introduction/)

### Documentation

- [Postgres: Schema](https://hasura.io/docs/latest/schema/postgres/index/)
- [Postgres: GraphQL Queries](https://hasura.io/docs/latest/queries/postgres/index/)
- [Postgres: GraphQL Mutations](https://hasura.io/docs/latest/mutations/postgres/index/)
- [Postgres: GraphQL Subscriptions](https://hasura.io/docs/latest/subscriptions/postgres/index/)
- [Migrations & Metadata Introduction](https://hasura.io/docs/latest/migrations-metadata-seeds/index/)
- https://hasura.io/docs/latest/schema/postgres/enums/#pg-reference-table-enum
- https://hasura.io/docs/latest/schema/postgres/default-values/column-presets
- https://hasura.io/docs/latest/migrations-metadata-seeds/manage-seeds/

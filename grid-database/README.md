# Grid-Database

## Setup

- Install Docker and Docker-Compose
  https://docs.docker.com/get-docker/

- Install Hasura CLI
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

### Metadata, Migrations, Seeds

On a fresh database installation, we need to add some information for Hasura engine to work.
These are

- Metadata: connections, permissions, relations, and other information on how Hasura generates GraphQL schema
- Migrations: database setup instructions to create the tables, relations, and other SQL entities
- Seeds: initial rows to be added to different tables

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
hasura --database-name default seed apply --file 1679339231541_articles.sql
hasura --database-name default seed apply --file 1678408293369_tasks.sql
hasura --database-name default seed apply --file 1678407536594_activities.sql
```

### Run Hasura Console

```
hasura --console-port 9090
```

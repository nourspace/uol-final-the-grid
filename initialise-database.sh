#!/bin/bash
# Script to initialise database (metadata and migrations) and populate it with data.

# Apply local metadata to the database (this overwrites the database!)
docker compose run --rm console hasura metadata apply

# Apply migrations to database
docker compose run --rm console hasura --database-name default migrate apply

# Apply metadata after migrations to resolve inconsistencies
docker compose run --rm console hasura metadata apply

# Seed database (order is important!)
docker compose run --rm console hasura --database-name default seed apply --file 1678393485908_assets.sql
docker compose run --rm console hasura --database-name default seed apply --file 1679339231541_articles.sql
docker compose run --rm console hasura --database-name default seed apply --file 1678408293369_tasks.sql
docker compose run --rm console hasura --database-name default seed apply --file 1678407536594_activities.sql
docker compose run --rm console hasura --database-name default seed apply --file 1678399001253_users.sql

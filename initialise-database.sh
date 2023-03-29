#!/bin/bash
# Script to initialise database (metadata and migrations) and populate it with data.

# Enable expand_aliases option
shopt -s expand_aliases
alias dockerhasura="docker compose run --rm console hasura --skip-update-check"

# Apply local metadata to the database (this overwrites the database!)
dockerhasura metadata apply

# Apply migrations to database
dockerhasura --database-name default migrate apply

# Apply metadata after migrations to resolve inconsistencies
dockerhasura metadata apply

# Seed database (order is important!)
dockerhasura --database-name default seed apply --file 1678399001253_users.sql
dockerhasura --database-name default seed apply --file 1678393485908_assets.sql
dockerhasura --database-name default seed apply --file 1678407536594_activities.sql
dockerhasura --database-name default seed apply --file 1678408293369_tasks.sql
dockerhasura --database-name default seed apply --file 1679339231541_articles.sql

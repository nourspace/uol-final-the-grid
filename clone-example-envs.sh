#!/bin/bash
# Script to copy .env.example files to .env if the latter does not exist.

# List of directories containing .env files
dirs=( "grid-auth" "grid-database" "grid-ui" )

# Loop over the directories
for dir in "${dirs[@]}"
do
  # Check if .env file exists
  if [ ! -f ./$dir/.env ]; then
    # Copy .env.example file to .env
    cp ./$dir/.env.example ./$dir/.env
    echo "Copied ./$dir/.env.example to ./$dir/.env"
  else
    # .env file already exists
    echo "./$dir/.env already exists, skipping copy."
  fi
done

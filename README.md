# The Grid

Journalism/Research Collaboration Platform.

## Components

1. grid-database
2. grid-auth
3. grid-ui

## How to run a Grid instance locally

Using Docker and Docker-Compose The Grid can be launched

### Requirements

- Docker
- Docker Compose

### Setup

```shell
# clone .env.example files
./clone-example-envs.sh

# Build images
docker compose build

# Start the services
docker compose up -d

# Initialise database
./initialise-database.sh
```

Access the components

- UI: http://localhost:3000
- Console: http://localhost:9090

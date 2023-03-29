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
# Clone the repo
git clone https://github.com/nourspace/uol-final-the-grid.git grid
cd grid

# clone .env.example files
./clone-example-envs.sh

# Build images
docker compose build

# Start the services
docker compose up -d

# Check everything is running
docker compose ps

# Initialise database
./initialise-database.sh
```

Access the components

- UI: http://localhost:3000
- Console: http://localhost:9090

### Tear down

```shell
docker compose down --volumes
find . -name .env -delete
```

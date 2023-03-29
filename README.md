# The Grid

Data Collection Platform.

The Grid helps individuals and small teams collaborate on the process of data collection, data curation, and
authoring. The main audience are science and journalism students and independent professionals.

## Concepts

To generalise data collection, the Grid offers the following entities that users interact with.

- **Topics**: Broad topics or specific subjects that activities and articles revolve around
- **Activities**: User actions associated with one or more topics
- **Tasks**: Progress tracking for article and research paper development
- **Articles**: The final output, such as reports, summaries, blog articles, or research papers
- **Comments**: [not implemented] Text communication on topics, activities, tasks, and other entities

## Features

The Grid focuses on these core features.

- Structured information storage
- Effortless information retrieval
- Streamlined task management

## Components

The Grid is a set of components that are meant to be installed and accessed locally as an internal tool.
One team member can set up a Grid instance and share UI url with other team members. Alternatively, a Grid instance can
be hosted on a team-accessible online server.

1. [grid-database](./grid-database/README.md)
   Postgres database stores relational data, and Hasura GraphQL engine exposes graph endpoint
2. [grid-auth](./grid-auth/README.md)
   Express.js server provides JWT authentication
3. [grid-ui](./grid-ui/README.md)
   Vue.js static frontend application interacts with Grid entities

## How to run a Grid instance locally

We use Docker and Docker-Compose to launch a Grid instance.

### Requirements

- [Docker](https://docs.docker.com/get-docker/) (Tested on `20.10.23`)
- [Docker Compose](https://docs.docker.com/compose/) (Tested on `v2.15.1`)

### Setup

```shell
# Clone this repo into `grid` directory
git clone https://github.com/nourspace/uol-final-the-grid.git grid
cd grid

# clone .env.example files (uses sensible defaults)
./clone-example-envs.sh

# Build docker images
docker compose build

# Start compose services in the background
docker compose up -d

# Check all services is running
docker compose ps
# Maybe tail logs
docker compose logs -f

# Initialise database (apply migrations, metadata, and seeds)
./initialise-database.sh
```

### Access Components

Mostly, we want to access the UI on http://localhost:3000.

Other components

- GraphQL: http://localhost:8080
- Hasura Console: http://localhost:9090
- Auth: http://localhost:5050
- Database: http://localhost:5432

### Teardown

Run the following commands to completely destroy a Grid instance, its data, and custom settings.

```shell
# Inside the folder used to launch a Grid instance
docker compose down --volumes
find . -name .env -delete
```

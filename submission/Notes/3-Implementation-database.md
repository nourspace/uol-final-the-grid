# 4. Implementation (Database)
>this should describe the implementation of the project. This should follow the style of the topic 6 peer review (but greatly expanded to cover the entire implementation), describing the major algorithms/techniques used, explanation of the most important parts of the code and a visual representation of the results (e.g. screenshots or graphs). 
>**(max 3 pages)**

---
## Database

Will be using Postgres database to persist data and Hasura engine to expose GraphQL endpoint.
An extra authentication component is needed to authenticate and authorise requests.

### Database Components
- Database
- GraphQL engine
- Authenticator
  > I will customize this express.js app. Must add the role functionality as not all users would have the `user` role.
  > We will have `manager` and `admin`.
  > https://hasura.io/learn/graphql/hasura-authentication/integrations/nodejs-express/

### Tasks
- [x] Take Hasura tutorials, mainly: Basics
	- [x] Maybe other tutorials as well?
	      Migrations, Authentication, Postgres
- [x] Define tables for system entities and their relationships
	- [x] Core: users, assets, activities, tasks
	- [x] Others: articles,
- [x] Add some rows to core models, users, assets, activities, tasks
- [x] Make sure whatever is in migrations folder represent the database
      Starting from a clean database should replicate current state
- [x] Version control tables and metadata
- [x] Find out about migrations
      [Migrations & Metadata Introduction](https://hasura.io/docs/latest/migrations-metadata-seeds/index/)
For later
- [ ] Permissions https://hasura.io/learn/graphql/hasura-auth-slack/thinking-in-roles/
- [ ] Security https://hasura.io/learn/graphql/hasura-advanced/security/
- [ ] Performance https://hasura.io/learn/graphql/hasura-advanced/performance/

### Questions
- [x] Are there migrations? Yes
- [x] Where is metadata persisted? DB or Hasura?
      Hasura needs two dbs. It can be the same, with two schemas
      `hdb_catalog` for Hasura metadata
      `public` for data
      https://hasura.io/learn/graphql/hasura-advanced/migrations-metadata/
- [ ] How to consolidate all migrations into a single one?
      https://hasura.io/docs/latest/migrations-metadata-seeds/resetting-migrations-metadata/
Schema-related
- [x] Simpler way to add `created_at` without a trigger?
      Nope, this is the simplest way; built in the db directly.
      https://hasura.io/docs/latest/schema/postgres/default-values/created-updated-timestamps/
- [x] Table for categories? or tags?
      Enums are tables
- [x] How to have enums for types?
      https://hasura.io/docs/latest/schema/postgres/enums/#pg-reference-table-enum
- [x] Do we need M2M between
      We don't.
	- `task_asset`? can be indirect from task_activity
	- `article_activity`?
	- `article_asset`

### Notes
- Subscriptions queries work out of the box. Changes to db are sent to the subscribers over websockets.
	- We can create views and subscribe to them as well.
	- We can create relations on views.
- To create relations, we need to
	- Create the DB constraints (to ensure consistency)
	- Create the relation on Hasura console (saved in the meta data)
- Each database connected to Hasura engine has a row in `hdb_metadata` table.
  The row has information on how to connect to the db. Also info on the tables and their relations.
- Setting permissions is pretty involving, but we would have total control of what a role can do.
	- It is possible to set permissions on tables and on views.
	- Permissions are set for: select, insert, update, and delete actions. Also per column.
	- Custom checks are possible with column values and session variables; like `X-Hasura-User-Id`
	- It is possible to set static values for columns from session variables; like setting the user id

- Actions can be added to Hasura to handle various use cases such as data validation, data enrichment from external sources and any other complex business logic
	- `Query Action` - If you are querying some data from an external API or doing some validations / transformations before sending back the data, you can use a Query Action.
	  Must be REST API. We will need to define our Action, the type of action, and the response type of the action.
	- `Mutation Action` - If you want to perform data validations or do some custom logic before manipulating the database, you can use a Mutation Action.
- Hasura can extend its schema from remote GraphQL servers. API should return GraphQL.
- Event triggers can make API calls to remote servers on insert, update, or delete operations.
- I don't think I'm necessarily interested in custom logic, event triggers, or remote schemas as of now.

- Migration files are generated automatically by the Console UI when served through the CLI.
	  https://hasura.io/learn/graphql/hasura-advanced/migrations-metadata/2-migration-files/
	- Same thing goes for adding/updating metadata
	  https://hasura.io/learn/graphql/hasura-advanced/migrations-metadata/3-metadata/
- We can squash migrations
  ```
  hasura migrate squash --name "squashed-migration" --from 123 --database-name default 
  ```

- I will use JWT mode for authentication
  https://hasura.io/learn/graphql/hasura-authentication/authentication-modes/
  JWT mode seems easier as clients would login, acquire JWT token from auth server and attach it in subsequent GraphQL calls. Hasura decodes the JWT headers to identify the user id and their role.
	- When on JWT auth mode we can't simply set `Hasura-User-Id`, it must be set with an `Authorization: Bearer {TOKEN}` header.

### Actions
- Installed `hasura cli`
  https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/
- Moved old GraphQL server code to poc folder
- Created Hasura project inside database folder which also contains docker-compose.yaml of two services: postgres and hasura engine
- Created JWT auth server that allows registering and login. It returns JWT tokens that should be passed by the client when communicating with GraphQL engine.

### Models

- Using column-preset to define default `user_id` for activities, tasks, assets
  https://hasura.io/docs/latest/schema/postgres/default-values/column-presets/
- Using check constraints to make sure name is not empty or null
- Trim strings on client

- Users
	- [x] table, permissions, seed
	- [x] Enum: user_role
	- [ ] relations: 
- Assets
	- [x] table, permissions, seed
	- [x] Enum: asset_category
	- [x] relations: 
		- [x] activity_assets
- Activities
	- [x] table, permissions
	- [x] seed
	- [x] Enum: activity_type
	- [x] relations: 
		- [x] activity_assets; user is able to select all, create/delete for his activity, no update
		- [x] task_activities
- Tasks
	- [x] table, permissions
	- [x] seed
	- [x] Enum: task_status
	- [ ] relations:
		- [x] task_activities; user is able to select all, create/delete for his task, no update
		- [ ] article_tasks

- No need for transitive relations; for example from task to assets
  We list task.task_activities.activity.activity_assets.asset and normalise in the client
- [ ] skipping activity_seen, task_collaborators, ... and relevant permissions

### Seeding with data

https://hasura.io/docs/latest/migrations-metadata-seeds/manage-seeds/

```sh
hasura seed create assets-seeds --from-table assets --database-name default
hasura seed apply --file 1678393485908_assets-seeds.sql --database-name default
```

---

## JWT Auth Server

Standalone Express server that authenticates users. It connects to the GraphQL engine using admin secret. Exposes two endpoints to register and login. Both endpoints accept user credentials and return JWT Bearer tokens.

Currently living under `/auth`

### Notes
- This can not be part of the frontend because it has to have secrets. Once these are known to clients they can basically control the database directly.

### Tasks
- [x] Keep under auth?
      Yes, new folder structure grid-auth, ...
- [x] Cleanup, add eslint, prettier, tsconfig
- [x] Allow passing secrets from envs; jwt secret, hasura admin
- [ ] Check role functionality
- [x] Maybe disable registration, and only allow admins to create new users on the UI
      registration endpoint has to stay for now. I won't be doing an organisations model. Single org for everyone, users can register, admin approves by enabling them. Even that can be done later. Allow registration to anyone basically. The entire system is made for a local group so the registration is merely to create identities.
- [x] Validation
      https://express-validator.github.io/docs/
- [x] Exception handling
- [ ] Proper error responses

This guide on the spot for setting up Express with TypeScript
https://www.codeconcisely.com/posts/how-to-handle-errors-in-express-with-typescript/
Example code
https://github.com/CodeConcisely/express-error-handling-with-graceful-shutdown

`import "express-async-errors"; // Important to import on top` this was missing to catch async errors.

Authentication and permission examples
- [ ] https://hasura.io/docs/latest/auth/authorization/common-roles-auth-examples/

Can't use port 6000
https://medium.com/@msinha2801/why-are-some-ports-considered-unsafe-restricted-c3c22d0596c0
Using 5050

- Added CORS
  https://www.twilio.com/blog/add-cors-support-express-typescript-api

---

### Resources
Tutorials
- [Hasura Basics](https://hasura.io/learn/graphql/hasura/introduction/)
- [Authentication with Hasura GraphQL](https://hasura.io/learn/graphql/hasura-authentication/introduction/)
- [Authorization Patterns with Hasura](https://hasura.io/learn/graphql/hasura-auth-slack/introduction/)
- [Advanced: Migrations and Metadata](https://hasura.io/learn/graphql/hasura-advanced/introduction/)
- [Concepts of PostgreSQL](https://hasura.io/learn/database/postgresql/introduction/)
- [Introduction to GraphQL](https://hasura.io/learn/graphql/intro-graphql/introduction/)
Docs
- [Postgres: Schema](https://hasura.io/docs/latest/schema/postgres/index/)
- [Postgres: GraphQL Queries](https://hasura.io/docs/latest/queries/postgres/index/)
- [Postgres: GraphQL Mutations](https://hasura.io/docs/latest/mutations/postgres/index/)
- [Postgres: GraphQL Subscriptions](https://hasura.io/docs/latest/subscriptions/postgres/index/)
- [Authentication and Authorization](https://hasura.io/docs/latest/auth/index/)

---

## Testing
- [x] Add requests to test
      using `auth.http` client; has register and login calls with simple testing
- [x] Create simple unit testing
      The above does it well, but would be nice to have using jest for example


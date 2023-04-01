# 3. Design
> this is a revised version of the document that you submit for your third peer review
> **(max 4 pages)**

## Tasks

- [x] Revise and polish on doc
- [x] Add sketches
- [x] Add userflow diagram

---

## Requirements

### User Requirements
As a user I would like to
- persist different kinds of activities such as: reading a blog post or a news article, watching video or documentary, listening to an official announcement, attending a conference.
- add more contextual information to the activities; notes, date, attachments, categories.
- define arbitrary topics or assets like: politics, economy, environment, and certain currency — issued by a government or digitally mined.
- link the activities to one or more topics.
- comment on activities.
- do simple task management to produce articles from activities.
- retrieve activities, tasks, and articles related to a topic.

### System Requirements

- is modular and adhere to separation of concerns where for example the database is usable even without a frontend.
- its components have a minimal set of external libraries and dependencies.
- its backend exposes GraphQL endpoint allowing frontend clients to query and mutate all system entities as necessary.
	- [Extra] Clients can subscribe to system events.
- its frontend is usable from a web browser without installing any extra software.
- requires no internet connection to run the system.
- is easy to deploy and self-host; a containerized solution.

---

## Structure

###  Core Components
- Database
  Relational storage for data and GraphQL engine.
- Backend
  JWT authentication service.
- Frontend
  Universal rendering web UI.

### System Entities
- Users
  Representation of any person that uses the system.
  Two types for now
  - Admin: can create and modify all system entities.
  - User: can create and modify own activities, add comments, add attachments.
- Assets
  Topics or particular assets that activities and articles would be about.
- Activities
  Something that the users did and is related to one or more assets.
- Tasks
  To track work on articles.
- Articles
  Final product; a report, summary, or blog article.
- Comments
  Text communication on other entities.
- Attachments
  Files and images related to other entities

### UML
https://dbdiagram.io/d
![[UML.png]]

---

## UI / UX

https://github.com/excalidraw/excalidraw

### Pages
All pages except Login requires a logged-in user
- Login; Login form
- Homepage; Some stats about last activities, tasks, articles
- Admin; Dashboard for admins to manage: users, assets, activities, tasks, categories, ...
- [Core] Assets; List of assets
- [Core] Activities; List of users' activities
- [Core] Tasks; Kanban view of tasks
- Articles; List of articles

### Modals
- Asset; add or update an asset
- Activity; add or update an activity
- Task; add or update a task

### Sketches
- Edit 
  ![[EditEntityDialog.png|500]]
- Edit Extras
  ![[EditEntityDialogExtras.png|500]]
- Entities
  ![[EntitiesView.png|500]]
- Home
  ![[HomeView.png|500]]
- Login
  ![[LoginView.png|500]]
- New Entity
  ![[NewEntityDialog.png|500]]

### User Flows
- User visits app URL
	- If not logged in; redirected to Login
	- Else; requested page is rendered
- User visits Homepage; sees its content
	- Navigates to Activities, Tasks, or Articles
	- Searches across entities
- User visits Assets
	- Searches and filters assets
	- Adds new asset
- User opens Asset modal
	- Suggests modifications to asset
	- Adds new comments
- User visits Activities
	- Searches and filters activities
	- Adds new activity
	- Updates own existing activity
- User opens Activity modal
	- Fills in fields
	- Adds new attachments
	- Adds new comment
- User visits Tasks
	- Searches and filters tasks
- User opens Task modal
	- Adds new attachments
	- Adds new comments
- User visits Articles
	- Searches and filters articles
	- Updates assigned articles
- Admin visits Dashboard
	- Modifies categories
	- Adds, updates, deletes users
	- Creates tasks and assign to users
	- Approves assets modifications
	- Creates articles
	- Publishes articles

### UserFlow Diagram
![[UserFlow.png]]

---

## System Components

### Database
Stores raw data, relations, permissions
- [x] SQL vs NoSQL
      SQL using Postgres. Our entities are better represented in relations.

### Backend
> Won't be needed. Hasura Engine will be used as backend
- ~~Has the business logic; links between entities, permissions~~
- Exposes GraphQL endpoint
- ~~Language: JS~~
	- [x] Python vs. JS

### Frontend
- Web app that consumes the GraphQL endpoint
- Language: JS
- Framework: Nuxt.js v3
- [x] GraphQL client:
  Comparison between Apollo, Relay, and URQL
  https://hasura.io/blog/exploring-graphql-clients-apollo-client-vs-relay-vs-urql/

### Notes
- Seems I can't use Prisma.js as it has its own ORM. It is possible to integrate it inside Apollo resolvers, but that adds many moving parts to the backend.
	- Follow up 02.08: It actually doesn't look like a very bad idea to use Prisma with Apollo-Server.
	  https://www.digitalocean.com/community/tutorials/how-to-build-a-graphql-api-with-prisma-and-deploy-to-digitalocean-s-app-platform
- It looks like regardless of which way I go with implementing a backend; Python or JS, implementing a GraphQL server requires having two components in the backend
	- ORM library to communicate with a database. Can be also low level db client like SQL or MongoDB.
	- GraphQL server that exposes the endpoint and allows writing resolvers and mutators.
	In both cases I will most likely have to manually write the resolvers and mutators.
- There are database-centric solutions that translate the DB schema into a GraphQL one, generating the the associated resolvers, type definitions, and mutations.
  Examples are: [PostGraphile](https://github.com/graphile/postgraphile) and [Hasura](https://hasura.io/).
- PostGraphile seems fine and is open source however Hasura seems a better option
	- Lacks extensive documentation
	- Hard to setup and has more requirements
	  https://www.graphile.org/postgraphile/required-knowledge/
	- Does not have a console to manage the database and permissions
	- In general, is low level

---

## Frameworks

### Apollo
- Server
	- won't be needed
- Client
  https://www.apollographql.com/docs/react/
	- Used through Vue Apollo
	  https://v4.apollo.vuejs.org/
	- Pagination seems to be pretty involving
	  https://www.apollographql.com/docs/react/pagination/overview

### Hasura
- Easy to setup, `docker compose up`
	- 2 containers are needed: hasura-engine and the db itself
- Has console to create tables, relations, permissions, and debug queries
- Permissions works nicely even on the Console. Simply set `x-hasura-role` and see the actions change to match what a user can do
- Has regular and relay style GraphQL endpoints
- Great tutorials for GraphQL, Hasura, even Vue
  https://hasura.io/learn/graphql/hasura/authorization/1-todos-table-permissions/
  https://hasura.io/learn/graphql/vue/apollo-client/

### Questions
### Nuxt
- [x] Version? 3
- [x] SSR vs static vs universal?
      Will decide after taking the course and starting the frontend
      09.03: static build using Vue

- [x] Do we need backend?
	- [x] Hasura and co vs. Prisma and Apollo

- [x] How to query GraphQL from Nuxt?
      Simply using [Nuxt Apollo](https://apollo.nuxtjs.org/)
      Tutorial: https://www.youtube.com/watch?v=1NEOQ2uVHXo

~~- [ ] Backend
	- [ ] How to authenticate requests?
	- [ ] How to paginate?~~
Seems I will not be using a backend

- [x] No Backend
	- [x] How to authenticate against DB directly?
	      In Hasura, access control or authorization is based on **roles**
	      https://hasura.io/docs/latest/auth/index/
	      It also offers row and column permissions
	      https://hasura.io/docs/latest/auth/authorization/permission-rules/#row-level-permissions
	      This requires building an Auth service (in FastAPI or Nuxt) to issue JWT tokens with user and role information.
	      There is a `X-Hasura-Admin-Secret` which allows passing all authentication. This can be used in the auth service to manage users. Or maybe an admin user is first created and his token is passed in the header.
	    - [x] figure out how to authenticate if wanting to use Hasura
	- [x] How to create schema?
	      The Hasura GraphQL Engine automatically generates your GraphQL schema and resolvers based on your tables/views in Postgres. It has console to develop the tables.
	      https://hasura.io/docs/latest/schema/postgres/index/
	- [x] How to query?
	      Hasura has all kinds of querying cababilities: nested, aggregations, filtering, sorting, pagination, arguments.
	      https://hasura.io/docs/latest/queries/index/


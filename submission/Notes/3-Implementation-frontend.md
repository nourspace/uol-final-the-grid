# 4. Implementation (Frontend)
>this should describe the implementation of the project. This should follow the style of the topic 6 peer review (but greatly expanded to cover the entire implementation), describing the major algorithms/techniques used, explanation of the most important parts of the code and a visual representation of the results (e.g. screenshots or graphs). 
>**(max 3 pages)**

---

## Tasks
- Decisions
	- [x] TypeScript or not?
	      Seems to have great support by all the other tech I will be using
	- [x] Nuxt? just to confirm
	      ~~Yes, defaults, layouts, plugins~~
	      03.03 -> No; too many deps, complex setup, no tests, too much magic
	- [x] CSS framework? Bulma, confirm
	      Vuetify!
	- [x] Pinia for store, not Vuex
	      Simpler, framework-independent
- [x] Setup project
	- [x] Typescript
	- [x] Linting
	- [x] CSS and components
	- [x] Store
	- [x] Testing
	- [x] GraphQL
- [x] Core Views
	- [x] AssetsView
	- [x] ActivitiesView
	- [x] TasksView
	- [x] Articles
- [x] Components
	- [x] DataTable
		- [x] Search
		- [x] Create
		- [x] Update
		- [x] Delete
	- [x] CRUDDialog
	- [x] DeleteDialog
	- [x] ItemList
- [x] Authentication
	- [x] Login
	- [x] Register
	- [x] Extras; auto login/logout, errors, navigation guards
- [x] Global views: Home, About
- [x] Extras
	- [x] M2M relations
		- [x] Activity assets
		- [x] Task activities [mock]
		- [x] Comments [mock]
	- [x] Validation; simple
- [ ] Testing
	- [x] Setup
	- [x] Smoke tests; App, Home, Login
	- [x] Component test; CRUDDialog, DataTable, ItemsList
	- [ ] [Super Extra]
	      Not sure how to achieve this for now and whether there is time for it
		- [ ] GraphQL query; anyone
		- [ ] GraphQL mutation; anyone
		- [ ] Core view with GraphQL query
- [ ] Deployment
	- [x] Polish Dockerfile's and docker-compose
	- [x] Make it possible to deploy entire stack with `docker-compose up` in root directory
	      Only Docker dependency, no other actions are needed
	- [x] Test fresh new local deployment
- [x] Final touches
	- [x] Update README's

---

## Tips
- Use `<script setup>` to simplify setup composition

---
## Technology 

TypeScript: language
> Vue is written in TypeScript itself and provides first-class TypeScript support. All official Vue packages come with bundled type declarations that should work out-of-the-box
https://vuejs.org/guide/typescript/overview.html

Vue: framework
https://vuejs.org/
> is a JavaScript framework for building user interfaces

Pinia: state management
https://pinia.vuejs.org/
https://pinia.vuejs.org/ssr/nuxt.html

Vitest: testing framework
https://vitest.dev/

Vite: tooling
https://vitejs.dev/

Vuetify: UI framework

---

## Progress

### Project setup with Nuxt

Initialising the project
Followed this guide for installing ESLint and Prettier
https://itnext.io/nuxt-3-first-steps-c23d142405c4
This seems a better 2023 guide
https://dev.to/tao/adding-eslint-and-prettier-to-nuxt-3-2023-5bg

```
# TypeScript support
npm install -D @types/node vue-tsc typescript

# ESLint
npm install -D eslint eslint-plugin-vue

# Prettier
npm install -D prettier eslint-config-prettier eslint-plugin-prettier

# ESLint Typescript and Nuxt config
npm install -D @nuxtjs/eslint-config-typescript
```
Vue rules
https://eslint.vuejs.org/rules/

#### Setting up store
https://dev.to/tao/adding-pinia-to-nuxt-3-2023-3l77
```
npm install pinia @pinia/nuxt
```
possible to use composition style
https://pinia.vuejs.org/core-concepts/#setup-stores

#### Vitest
```
# From Vuejs
npm install -D vitest happy-dom @testing-library/vue
```

Configuring tests with Nuxt was pretty hard and I didn't get it to work preoprly. There are many guides and ways to configure testing in general. Which runner (Jest, Vitest), which environment (JSDom, happy-dom), which matchers (Jest-dom), and others

https://vitest.dev/config/
https://github.com/capricorn86/happy-dom
https://github.com/testing-library/jest-dom
https://github.com/testing-library/vue-testing-library
https://vuejs.org/guide/scaling-up/testing.html#unit-testing
https://nuxt.com/docs/getting-started/testing#testing
https://dev.to/tao/adding-vitest-to-nuxt-3-2023-lpa

> Not working with Nuxt3

There is a WIP plugin that allows testing https://github.com/danielroe/nuxt-vitest
But when I used it, it is wrapping the component with app and layout components. This renders the unit-testing useless. I anticipate larger issues as my app grows.

> [!error] Having issues with Nuxt
> I decided to use Nuxt as it makes the development much easier by doing some magic on
> routing, imports, configs, etc.
> 
> What I'm seeing however is that, for Nuxt, I'm having to make many exceptions to the point that I needed to import things from Vue, Vitest, etc.
> 
> The major red flag now is testing. I'm unable to easily test individual components without having the Nuxt context. I really need to make a pro/con list and decide whether I need to keep using Nuxt or simply drop in favour of using base Vue3.
> 
> 

### Vue vs. Nuxt / Keeping Nuxt!?
- [x] Start new Vue project
- [x] Add TS, store, vitest
- [x] Test app and example component
      I love testing library, vitest, and vue integration. Both Vue test tools and the testing library worked well.
- [x] Hot reloading
- [x] [SSR](https://vuejs.org/guide/scaling-up/ssr.html)
  We don't need it. The Grid should be installed by as simply as copy/paste a folder and open index.html. Serving is much easier and requires no servers. The only server we need is the GraphQL.
  We are not interested in SEO and super fast loading of pages.
- [x] Think about pages and components
	- I will have to define own routes, params, login guards etc
	- How does layout work
- [x] Can it communicate with GraphQL

### Setting up Vue
- Was very simple using `npm init vue@latest` which created and configured everything.
- Vue, pinia, and router are root deps while vite, vitest, typescript, eslint, etc are dev deps.

> [!success] Testing and type-checking work perfectly
> 
> `npm install -D vitest happy-dom @testing-library/vue @testing-library/jest-dom`
> 
> vitest: runner
> happy-dom: dom
> testing-lib/vue: utils
> testing-lib/jest-dom: extra matchers
 
This was needed
- `tests.setup.ts` that `import '@testing-library/jest-dom'`
- `vitest.config.ts` whose test has
	- `globals: true`
	- `environment: 'happy-dom'`
	- `setupFiles: ['./src/tests.setup.ts']`
- In the tests, `import { describe, expect, it, test } from 'vitest'`

The above makes sure, happy-dom is used and both ESLint and Vitest see the Jest-Dom extra matchers.

### Project is ready!

Created `feature/frontend` branch

Reading env vars
https://jasonwatmore.com/post/2022/05/28/vue-3-vite-access-environment-variables-from-dotenv-env

---
## GraphQL

Will be using Apollo client and vue integration.

```
npm install graphql graphql-tag @apollo/client @vue/apollo-composable
```

Using this plugin to load graphql files
https://www.npmjs.com/package/@rollup/plugin-graphql

Exporting schema from Hasura
- Either using tools
  https://hasura.io/docs/latest/schema/common-patterns/export-graphql-schema/
- Or, PyCharm has a plugin that can be managed with `.graphqlconfig`
  It downloads the schema and helps the IDE autocompletes inside `gqp` tags, also to run any `.graphql` fie

- `import { ApolloClient } from '@apollo/client/core'`
  https://github.com/apollographql/apollo-client/issues/7318

- can't properly import from graphql files
  https://stackoverflow.com/questions/52101534/how-to-declare-a-module-to-do-named-imports

- [ ] Check if I want to generate types
      https://the-guild.dev/graphql/codegen
      https://www.apollographql.com/docs/react/development-testing/static-typing/
      For now I'm using Any type in `env.d.ts`

Filtering queries is pretty powerful. We can 
https://hasura.io/docs/latest/queries/postgres/query-filters/
- filter the returned nested objects themselves (where on the nested object)
- or on the nested objects (where on the root)
- [ ] How to filter on enum types

When mounting the app, we fetch all enums and place them in the store.

Allowing `user` role to select all enum tables

11.03
- Started using Fragments
- Learning how to use subscriptions
  https://www.apollographql.com/docs/react/data/subscriptions
  https://www.npmjs.com/package/graphql-ws
- Hasura has tow types of subscriptions; live queries and streaming
  https://hasura.io/docs/latest/subscriptions/index/
	- I will use streaming so I only receive latest objects not the entire table
	- Results must be ordered in main query to define the streaming cursor
- Using `subscribeToMore`, I can subscribe to streams.
	- Same variables of the query are needed to define where, example
	  `where: { name: { _ilike: $search } }`
	- plus an additional `now` variable to define the cursor
	  `cursor: { initial_value: { created_at: $now }, ordering: ASC }`
- We can use either `update` or `updateQueries` to update the cache after mutations
  `updateQueries` seems easier as we only need the query name and return the modified result.
  It also works pretty much like `updateQuery` of `subscribeToMore`
- Avoid merging conflicts when updating queries
  https://dera.hashnode.dev/fix-cache-data-may-be-lost-when-replacing-the-getallposts-field-of-a-query-object-in-apollo-client

2023-03-16
Working on the M2M relations.

I just need to create to helper a function: setActivityAssets, which basically deletes all relations, then inserts new ones.
- `editedItem` is only for the base model
- need to add extra state `editedItemAssets`

2023-03-20
- Adding articles table, enums, permissions, migrations, seeds
- Task would have a single article not M2M

### Tasks
- [ ] Check GraphQL analysis and add to report
      https://wundergraph.com/blog/graphql_in_production_analyzing_public_graphql_apis_1_twitch_tv
- [ ] Replace `created_by` with `created_by_id` and then relations could be called `related_by`
- [ ] Add `label` to enums, so we have value, label, and comment

### Cool for later

- Better use of Fragments
  https://relay.dev/docs/tutorial/fragments-1/#step-1--define-a-fragment

### Notes
- When adding new fields to tables, make sure to update the metadata permissions as these fields won't be included automatically. This would cause issue with queries using the new fields for any role other than admin.

### issues
- [ ] Can't use admin role as it does not use the column presets
      https://github.com/hasura/graphql-engine/issues/6519

---

## UI

### Checking different frameworks
- Vuetify
  https://vuetifyjs.com/en/
  - 37k stars, 1k issues, used by 230k
  - Components that cover everything needed
  - Easy setup
- Buefy
	- bummer; You need Vue.js version 2.6+. (Vue 3 is not supported)
- Element Plus
  https://element-plus.org/en-US/
  20k stars, 1k issues, used by 40k
  - Looks nice
  - Has most elements needed
  - Has TS types

What features and components do I need?
- Must support TypeScript
- Responsiveness
- Layouts; any system of navigation header, footer, flex/grid columns/rows
- Cool looking buttons, text inputs, toggles, etc
- Modals for details, dialogs for confirmations
- Table; preferably with pagination. Inline edit would be cool, but not necessary in first iteration
- Chips, tags input, searchable dropdown

### Vuetify
>Installed Vuetify and it looks great!

#### Tree-Shaking
Tried Tree-Shaking to save some space, but it actually required extra plugin and during development I didn't get much help.
Oh! actually when making production builds it makes a big difference.
```
vite v4.1.4 building for production...
✓ 682 modules transformed.
dist/index.html                                             0.42 kB
dist/assets/materialdesignicons-webfont-739dc70d.woff2    391.69 kB
dist/assets/materialdesignicons-webfont-6d5e4be4.woff     568.65 kB
dist/assets/materialdesignicons-webfont-c02d41ce.ttf    1,261.79 kB
dist/assets/materialdesignicons-webfont-f5966bae.eot    1,262.01 kB
dist/assets/AboutView-22fe2de2.css                          0.28 kB │ gzip:   0.21 kB
dist/assets/index-3f7e7da8.css                            722.62 kB │ gzip: 100.93 kB
dist/assets/AboutView-5898eccf.js                           1.08 kB │ gzip:   0.60 kB
dist/assets/index-2ea8de01.js                             510.55 kB │ gzip: 165.16 kB

(!) Some chunks are larger than 500 kBs after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```
When using the loader
6mb to 4.5mb
```
vite v4.1.4 building for production...
✓ 461 modules transformed.
dist/index.html                                             0.42 kB
dist/assets/materialdesignicons-webfont-739dc70d.woff2    391.69 kB
dist/assets/materialdesignicons-webfont-6d5e4be4.woff     568.65 kB
dist/assets/materialdesignicons-webfont-c02d41ce.ttf    1,261.79 kB
dist/assets/materialdesignicons-webfont-f5966bae.eot    1,262.01 kB
dist/assets/AboutView-22fe2de2.css                          0.28 kB │ gzip:   0.21 kB
dist/assets/index-8990e72a.css                            614.77 kB │ gzip:  87.51 kB
dist/assets/AboutView-9561d9dd.js                           1.08 kB │ gzip:   0.60 kB
dist/assets/index-5d3d3d3d.js                             338.39 kB │ gzip: 113.47 kB
```
Removed the MDI icons and using the JS variant
> 4.5mb to 650kb!! (150gzipped)
```
vite v4.1.4 building for production...
✓ 462 modules transformed.
dist/index.html                       0.42 kB
dist/assets/AboutView-22fe2de2.css    0.28 kB │ gzip:   0.21 kB
dist/assets/index-ebd0443a.css      287.91 kB │ gzip:  35.79 kB
dist/assets/AboutView-ac2b89b3.js     1.08 kB │ gzip:   0.60 kB
dist/assets/index-a2e506d0.js       343.27 kB │ gzip: 115.37 kB
```

- https://vuetifyjs.com/en/features/treeshaking/
- https://vuetifyjs.com/en/features/icon-fonts/
- https://www.npmjs.com/package/vite-plugin-vuetify

### Layouts

I don't want to show any header or anything for non-logged in users, so I could create two layouts; 
- default: wraps all views for logged in user
- modal: wraps login and error (500, 404) views

### Views

#### AssetsView
- [x] Subscribe to more, for listing
- [x] Update cache on deleting
      No need to update cache on inserting as we are subscribed to more
- [x] All CRUD

#### ActivitiesView
- [x] Basics; list, search, CRUD

#### TasksViews
- [x] Basics; list, search, CRUD
- [x] When creating a task, add option to auto-create an article
- [x] Article id fields (for now simple text field)

#### AuthView
- [x] Login
- [x] Register
- [x] Logout
- [x] AutoLogin
- [x] AutoLogout
- [x] Navigation

#### ArticlesView
- [x] Basics; list, search, CRUD
- [x] List tasks

- Migrations; articles, article_type
- Metadata
- seeds
- gqp files
- View
- Route

### Components

#### DataTable
https://vuetifyjs.com/en/components/data-tables/basics/
- [x] Basic example
- [x] Server example
- [x] Search
- [x] Custom columns
- [x] CRUD example
- [ ] Sort, pagination

#### CRUDDialog

Using slots to accept children from paren
https://vuejs.org/guide/components/slots.html

#### Todos
- [x] MyDialog and DeleteDialog are almost identical
      CRUDDialog is now including a delete dialog

---

## Testing
- [x] Vitest vs. Jest
      Vitest seems to have better support for Vue/Nuxt
      Uses same project config, ESM, TS, JSX out of the box
```
# Run tests
npm run test:unit

# Run TS typechecks
npm run type-check
```

2023-03-27
Some issues with Testing Vuetify
https://github.com/vuetifyjs/vuetify/issues/14749
I just need to add few things to mounting options
```ts
const mountOptions = { global: { plugins: [createPinia(), router, vuetify] } }
```

Pinia has a testing mock to easily patch the store
https://pinia.vuejs.org/cookbook/testing.html

### Resources
- https://vuejs.org/guide/scaling-up/testing.html
- https://vitest.dev/guide/features.html
- [ ] https://testing-library.com/docs/queries/about
- https://github.com/testing-library/jest-dom#readme
- https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/
- Testing express apps
  https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/
- Testing v-model
  https://test-utils.vuejs.org/guide/advanced/v-model.html#a-simple-example
- Mocking
  https://vitest.dev/guide/mocking.html
- Cheatsheet
  https://testing-library.com/docs/vue-testing-library/cheatsheet
  
---

## Learning, Guides, Tutorials
- [x] Check which VueMastery courses I want to take

I'm familliar with Vue2 and Nuxt2, but I would start with the essentials and intros to understand how the 3rd versions differ.
I want to quickly check the TypeSccript intro just to decide whether I'm going to use it or not.
Testing comes directly afterward so I can setup my unit tests as I develop the pages and components.
I will skim the GraphQL tutorial to make sure I'm not reinventing the wheel.

- [x] [Intro to Vue 3](https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3/) - 57 mins beginner
- [x] [Pinia Fundamentals](https://www.vuemastery.com/courses/pinia-fundamentals/fundamentals-what-is-pinia/) - 18 min beginner
- [x] [Unit Testing Vue 3](https://www.vuemastery.com/courses/unit-testing-vue-3/what-to-test-vue-3/) - 43 beginner
- [x] [Real World Vue 3 (Composition API)](https://www.vuemastery.com/courses/real-world-vue-3-composition-api/) - 1hr beginner
- [ ] [Touring Vue Router](https://www.vuemastery.com/courses/touring-vue-router/vue-router-introduction) - 1 hr 20 min beginner [did't need]

- [x] [Nuxt 3 Essentials](https://www.vuemastery.com/courses/nuxt-3-essentials/nuxt-3-overview/) - 22 min intermediate
- [x] [Token-Based Authentication](https://www.vuemastery.com/courses/token-based-authentication/intro-to-authentication) - 51 min intermediate
- [ ] [Build a Blog w/ Nuxt 3 Content](https://www.vuemastery.com/courses/build-a-blog-nuxt3-content/nuxt3-blog-introduction/) - 41 min intermediate [won't take]

- [x] [Intro to Vue 3 + TypeScript](https://www.vuemastery.com/courses/vue3-typescript/why-vue-%26-typescript/) - 56 min advanced
- [x] [TypeScript Friendly Vue 3](https://www.vuemastery.com/courses/typescript-friendly-vue3/introduction-to-the-script-setup-syntax/) - 24 min advanced
- [x] [Querying with GraphQL](https://www.vuemastery.com/courses/querying-with-graphql/intro-to-graphql/) - 1hr 38 min advanced

### Intro to Vue 3
Seems like a very raw Vue course that uses CDN and simple JS files.
using `v-bind:attr` or `:attr`
`v-if`, `v-else`, `v-else-if` tags to conditionally render elements. `v-show` for showing
`v-for="(item, i) in list"` for lists rendering. use `:key` to uniquely id elements
Handle events with `v-on:EVENT` or `@EVENT`
Conditional classes using either `{myClass: condition}` or `[condition? 'my-class', '']` syntax
Computed properties are good as they are cached
Child components `this.$emit('my-event', arg)` events that parent can listen to with `@my-event=handleMyEvent(arg)`
`v-model` creates two-way binding
[Event modifiers](https://vuejs.org/guide/essentials/event-handling.html#event-modifiers)

### Nuxt 3 Essentials
Why Nuxt?
- [good] Reconfigured with sensible defaults; okay seems good
- [good] Folder structure; no need to configure router
- [ok] layouts; easy to setup multiple layouts and apply them to pages.  Helpful to create a layout for login/error/404 and another one for pages with header
- [no need] SSR for SEO; not so compelling for my use case as I don't care about SEO

Initialising the app and configuring the router to use pages

Creating the default layout

So cool with this handler `/server/api/[...].js` to all `useFetch` API calls from components.

We can use `await` in the setup script.

### Pinia Fundamentals
What is state? global state is better than props and events
Just like Vue component a store has; `name`, object with
- `state`: fn that returns object
- `actions`: object with functions that can access `this`
- `getters`: object with arrow functions that receive `state` as parameter
We can multiple modules under stores.

Creating store with `defineStore` and export it as `useAbcStore`

In the component we create local store from useAbcStore. We call actions as if they are methods on the local store.

For reactivity we `storeToRefs(store)` which returns the state variables as refs.

### Intro to Vue 3 + TypeScript

Cost: learning curve, but not as scary
Is it worth it? allows for scaling and prepare for open-source contributors
Vue support: Vue3 is rewritten in TS
TypeScript has `num` type
We can define custom types using `type`, these are simple native types with union
Complex types are defined with `interface`, better used for objects
Use `{} as Type` to override auto-inferred types
Better guide
https://vuejs.org/guide/typescript/composition-api.html
- `defineProps`, `withDefaults` and `defineEmites` https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
Generics `<T>`

### TypeScript Friendly Vue 3
Use `ref<T>` to explicitly infer types
Extra tutorial on reactivity `ref` vs. `reactive`
https://dmitripavlutin.com/ref-reactive-differences-vue/
https://vuejs.org/guide/essentials/reactivity-fundamentals.html
`interface Props{a: number; b?: string}`
`withDefaults(defineProps<Props>(), {b: 'hey'})`
Use `const emits = defineEmits<{(event: 'my-event', arg: number): void;}>()`
Then we call it in template `emit('my-event', 1)`

---

### Unit Testing Vue 3
Use stubs when we want to mock entire child components
Might need to flush all promises when testing API calls
Use jest-similar style hooks beforeEach afterEach for setup/tear tests

### Real World Vue 3 (Composition API)
Using router
Lifecycle hooks, API calls go into onMounted (might want to check for auth in router hooks)
Create `src/services` where we define API client and export methods
Use dynamic routes with `:params`
Use `<RouterLink :to="{name: 'route-name', params: {arg: val}}">`
On the route add `props: true` to send params as props to component
With historymode we need to add rewrite config in the hosting platform


### Querying with GraphQL
> Seriously! this is the best tutorial I've ever seen

Setting up ApolloClient and injecting it to the App
Loading queries from gql files
`userQuery` returns; `result`, `loading`, and `error`
	It takes, query, variables, and options {debounce, enabled}
	very useful to conditionally fire queries
Using `computed` to extract from results and give default value
Make use of Fragments to save on and unify fields in queries and mutations
Learning how to mutate objects
How to update cache manually after mutation
Tip: always return an id with queries to enable auto updates

### Token-Based Authentication

- Register
- Login
- Store
- Authentication
- Logout
- Errors
- Auto login

### Tasks
- [x] Refresh on $slots and $attrs
      https://vuejs.org/guide/components/attrs.html
      https://vuejs.org/guide/components/slots.html

### Tutorials
- https://vueschool.io/articles/vuejs-tutorials/composing-layouts-with-vue-router/
  Using named router views to define and mount multiple components per route. Useful to create layouts.
- https://javascript.plainenglish.io/how-to-create-your-own-layout-component-in-vue-js-32ad6ddc0d8f
  Layouts are basically components with a slot. We wrap views with the layout component.

### More courses
- https://hasura.io/learn/graphql/intro-graphql/introduction/
- https://hasura.io/learn/graphql/vue/introduction/

---

## Resources

- https://vuejs.org/api/sfc-spec.html
- https://vuejs.org/api/sfc-script-setup.html
- https://v4.apollo.vuejs.org/
- [ ] Collection of Vue Composition Utilities
      https://vueuse.org/

# 2023.02.02 - Thu
- Went over all weeks materials
- Structured the folders for Draft and Final report submissions

# 2022.02.06 - Mo
- Planned next five weeks; mainly how to finalise and submit both draft and final reports
- Started working on the [[UNI/CM3070 - Final/C-Draft Report/Submission]]
- Finalising project design

# 2023.02.07 - Tu
- Working on Design
	- Expanded system entities to include Comments
	- Defined the Pages, Modals, and Flows of the frontend
	- Reading more on GraphQL backend implementation

# 2023.02.08 - We
- Finalised [[UNI/CM3070 - Final/C-Draft Report/3-Design]]
	- Settled technology choices
	- I won't be implementing a backend rather use Hasura which exposes GraphQL endpoint from a Postgres schema
	- I will be using Nuxt.js v3 with Apollo client in the frontend

# 2023.02.11 - Sa
- Learning about GraphQL, Hasura, and Postgres

# 2023.02.12 - Su
- Started implementing the database components
	- Now exposing a proper GraphQL endpoint
	- Schema and Metadata are persisted in code
- Created simple JWT authentication server

---

# 2023.02.13 - Mo
- Working on and submitting draft report [[UNI/CM3070 - Final/C-Draft Report/Submission]]


---

---
# 2023-02-28 - Tue
> 9 hrs
- [x] Check grading schema!
- [x] Check initial proposal and preliminary report
	- [x] What are the main objectives?
	- [x] Start building the narrative
	      [[1-Objectives]]
- [x] Check draft report status and last diary items, where was I at?
	- ~ Finalised design and tech
	  Need to add sketches, diagrams
	- ~ Working database component with simple models and auth
	  no relations, no permissions
	- ? Nothing started on frontend
	- ? No planned testing or evaluation
- [x] Start VueMastery Vue3 and Nuxt3 tutorials
- [x] Attend Webinar and ask for the extension
- [x] Create doc for final submission


---

# 2023-03-01
>6.5 hrs
- Did not get much done as planned
- Managed to get TS working, but otherwise Nuxt seems to be creating more problems than what is promises to solve
- More VueMastery courses

# 2023-03-02
> 8 hrs
- [x] Finish as many Vue courses
- [x] Setup project
- [ ] Plan next 12 days assuming no extension will be given regardless
      We will most likely get at least 1 week, so 20th

# 2023-03-03
>5 hrs
- [x] Last batch of VueMaster courses
- Real progress on GraphQL setup and implementation in frontend

## The Grid, GraphQL, and AI
I was experimenting with ChatGPT. I provided it with my GraphQL schema–only the tables, no relations or aggregations as it claimed it understands how Hasura engine works.
Next, I started asking it questions so it returns queries. I'd then plug in these in GraphQL console and not to my surprise, I received actual results!

---
# 2023-03-04
> 4hrs
- Added CSS and components framework; Vuetify
- First version of activities view with actual data from database
  ![[Pasted image 20230305010858.png|600]]
- Started check authentication tutorial
- Polished grid-auth server

---
# 2023-03-06
> 2 hrs
- [x] Prepare for final exam
      [[Prep]]

# 2023-03-07
Online exam


# 2023-03-09
> 12 hrs
- Wrap up authentication
  Auth endpoints work. Generated token represent the user and ui is able to use these to make Graph calls.
  - The authentication on UI will be done later
- Plan for next ... 4 days

## Mini-Plan
- [09] Review objectives, design, and implementation
- [09] Database
	- Core models: users, assets, activities, tasks
	- Enums: asset type, activity type, ...
	- Relations
	- Fill data MANUALLY!
	- Migrations
- [09-10] Frontend
	- Core Views: Assets, Activities, Tasks
	  Data-table, no pagination, no sort, only search field
	- Components: CRUD Dialog (used for items of core views)
	  Accepts model, emits event to parent
- [11] Technical wrap up
	- READMEs
	- Deployment
- [12] Submission
	- Video
	- Report

# 2023-03-10
> 16 hrs
- Uni finally sent grades for preliminary and draft reports. No extensions yet.
  64% Pre, 45% Draft
- Search is complete for core views
- Initial version of CRUD ops

# 2023-03-11
> 9 hrs
- We got extension till 27.03!!
- Almost done with CRUD on assets view
- Realtime updates to datatable 

# 2023-03-12
> 9hrs
- From mini plan I almost did most of technicals.
- Wrap up CRUD, add to activities and tasks
- Took longer time, but all CRUD is now refactored using compostables
---

# 2023-03-13 - Mo
> 6 hrs
- Received feedback on draft, 45%
  Mainly formatting, citations, and mostly missing evaluation and product
- Talking with colleagues about IPs
  https://londoncs.slack.com/archives/C01JS7VL0TG/p1678708790776189?thread_ts=1678707667.702579&cid=C01JS7VL0TG
  https://www.gold.ac.uk/media/documents-by-section/about-us/governance/policies/intellectual-property-policy/Intellectual-Property-Policy.pdf
  > - [ ] I need to make sure the project is not commercially exploitable as its vesting IP rights are under UOL....

- Add simple auth pages; login, register
- Deploy so people can access and test
- I need new plan of two weeks

## xFinal Sprint

- [20] **Technical** (31 hrs)
	- [x] Login and register
	- [x] Initial Deployment
	- [x] Feedback round 1
	- [x] M2M relations; multi select of assets on activities
	      [mock] Activities on tasks
	      [mock] Comments on core views
- [10] **Feedback-1** (17 hrs)
	- [x] Send, collect, improve
	- [x] Write down a summary
	- [x] Info icons to explain what an entity is
- [10] **Feedback-2** (7 hrs)
	- [x] Send, collect
	- [x] Interviews
	- [x] Write down a summary
- [10] **Articles** (10 hrs)
	- [x] Basic page to list articles
	- [x] Task can have an article parent
- [20] **Testing and evaluation** (11 hrs)
	- [x] Smoke tests for views
	- [x] Simple tests for components
	- [x] Wrap up evaluation section of the report
- [10] **Deployment** (10 hrs)
	- [x] Instructions to launch the stack in single commands
	- [x] Polished README
- [10] **Design and literature** (7 hrs)
	- [x] UML diagram
	- [x] Sketches
	- [x] Userflow
	- [x] Review Sutori :/
- [20] **Submission** (5 hrs )
	- [ ] Video
	- Report
		- [x] Cover, ack, abstract
		- [x] Intro
		- [x] Literature
		- [x] Design
		- [x] Implementation
		- [x] Evaluation
		- [x] Conclusion
		- [x] Formatting
		- [x] Grammer
		- [x] Appendix: add remaining sketches, screens
		- [x] References
		- [x] Table of figures
	- Repo last checkins
		- [ ] Notes; refine, trim
		- [x] Previous screens

# 2023-03-14
> 8 hrs
- Initial deployment without ssl works on http://grid.nour.space
- Took much longer than expected

# 2023-03-15
>3
- Grid is live!
	https://grid.nour.space
	https://auth.grid.nour.space
	https://graph.grid.nour.space
- Make video, instruction, and send for feedback

# 2023-03-16
> 14 hrs
- Add assets and activities selectors to forms
- Improvements
This is taking forever, I need to stop development...!

# 2023-03-17
> 11 hours
- More feedback and improvements
- Released `0.3.1` which looks much better
- I believe I'm done with technical and ui features. Will be moving to testing
- The feedback was pretty helpful, now I need to compile it into
	- feedback
	- improvements
	- questions for round 2

# 2023-03-18
> 4 hrs
- UOL gave me extension till 03.04!
- Finished feedback 1

# 2023-03-19
> 3 hrs
- Feedback round 2: interview with Kalaji
- UI refactoring to dialogs and datatable
- Released `0.3.2`

---

# 2023-03-20 - Mo
> 10 hrs
- Implemented articles
- Released `0.4.0`

# 2023-03-21
> 4 hrs

Looks like I still need 60 hrs and this week I should have ~40. Remaining tasks are; feedback-2, testing and evaluation, and the submission.
- Recorded and sent feedback 2 video

# 2023-03-25
> 1hr
- Collecting feedback

# 2023-03-26
> 2hr
- Start unit tests

---

# 2023-03-27
> 7 hrs
- [x] Finish unit tests


# 2023-03-28
> 6 hrs
- Finalising local deployment

# 2023-03-29
> 6 hrs
- [x] Polish READMEs
- [x] One final deployment
- [x] Video of deployment
- [x] Interview with B

# 2023-03-30
> 10 hrs
- [x] Consolidate feedback
- [x] Done sketches and userflow diagram

I can use this for final video?
https://tome.app/uol-grid

# 2023-03-31

 The plan
 - **Start** with implementation

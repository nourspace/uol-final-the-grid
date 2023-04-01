# Objectives

Here I define objectives that I will be evaluating throughout the development phase.

1. $ [Good design] Develop a web platform called "The Grid" that enables collaboration in creating news reports and blog articles.

-   Offer a private solution ensuring user privacy and content ownership
-   Streamline the workflow for creating news reports, blog articles, and research papers
-   Optimize the authoring process for efficiency and simplicity

1. $ [Complete development]
	- Implemented core features
		- Persistence of structured information
		- Easy retrieval of information
		- Simple task management
	- Easy and documented setup

2. $ [Thorough evaluation] The Grid aims to meet the needs of a diverse group of users and support the creation of high-quality articles.

---

## Output

The overall project should match the following criteria from the template
![[#Outstanding (e.g. 1st) student project look like?]]

---

## Narrative

-   The digital age's abundance of news and research outlets hinders finding meaningful data.
-   Researchers and reporters struggle with inadequate tools or privacy-invading online services with excessive features.
-   The Grid aims to support research facilities and media agencies by preserving ownership, storing structured information, and aiding in research paper and news article production.
-   Comprising easy-to-deploy, upgradable, and replaceable components, The Grid offers flexibility and adaptability.


---

## Abstract

Objectives
-   Offer a private solution ensuring user privacy and content ownership
-   Streamline the workflow for research and data collection.
  To be followed by creating news reports, blog articles, and research papers.
-   Optimize the authoring process for efficiency and simplicity
Methods
- Looked for and analysed collaboration tools
- Interviewed students and professionals
- Read about different ways of storing and retrieving structured information
Results
- Developed set of components that work together as a research collaboration platform I call The Grid
  These are: database, graphql-engine, authentication backend, and web frontend
- Managed to implement the core features; data storage, retrieval, simple task management
- Convinced two teams (research lab, news agency) to trial The Grid
Conclusions
- Researchers and reporters lack tailored tools to help them in their research and data collection.
- Data privacy and ownership seem to be an overlooked concepts even by professionals that use whatever online tools available to them. This varies differently depending on team size. Larger corporations offer internal tooling and secure ways to access company resources. This is not available to smaller teams and individuals.
- I need to work on the concepts and userflows as these can be confusing on first impression.
- The Grid has potential to serve its audience.


https://wundergraph.com/blog/graphql_in_production_analyzing_public_graphql_apis_1_twitch_tv

```
In this web development project, the primary objective was to create a private solution that ensures user privacy and content ownership while streamlining the research and data collection workflow, ultimately followed by the creation of news reports, blog articles, and research papers. The authoring process was optimized for efficiency and simplicity.

Initial research involved analyzing collaboration tools and interviewing students and professionals. This led to the development of a research collaboration platform called The Grid, consisting of a database, GraphQL engine, authentication backend, and web frontend.

The core features, including data storage, retrieval, and simple task management, were implemented. Two teams, a research lab and a news agency, agreed to trial The Grid. The project revealed that researchers and reporters often lack tailored tools for research and data collection.

Data privacy and ownership are overlooked concepts, especially among smaller teams and individuals. The Grid has the potential to serve its target audience effectively, although improvements in concepts and user flows are necessary for better user experience.
```

---

## From Proposal, Preliminary, and Draft

### Concept and product

### Core features
-   Persistence of structured information
-   Easy retrieval of information
-   Simple task management

Additional Features
-   Reporting on activities
-   Publishing reports and articles

- Overall, The Grid is a web platform that aims to provide a private, efficient, and flexible solution for the production of news reports and blog articles. Through the implementation of core features such as the persistence of structured information, easy retrieval of information, and simple task management, The Grid aims to meet the needs of a diverse group of users and support the creation of high-quality articles.

### Motivation

- Data Ownership
  Private, security, local
- Tool For Reporters & Bloggers
  Focused on articles production workflow
- Efficiency & Flexibility
  Simple to use and easy to deploy

### Technology
- frontend: nuxt
- backend: framework then nothing
- database: orm to graphql engine
- deployment: docker, compose, k8s, helm

---

## From the templates

### What would the final product look like?

- The final product would be a working web application. Which solves the problem stated by the student. It would be implemented using an appropriate web framework (i.e. Django, Rails, Flask, GWT ) and make correct use of an appropriate data store (postgresql, mysql, redis, etc...).

 - The web application code should be clean and easy to understand. The logic of how is solved the problem should be easy to follow. The use of the data store should be appropriate for the problem at hand. For instance, if using a relational database the data store should be correctly normalised.    

- It should be easy to run the web application and interact with it. An appropriate web application client must be provided to interacting with the server side portion of the application . Typically this will be a series of web pages. There are other appropriate clients such as a mobile application.


### What kinds of techniques/processes are relevant to this project?

-   Server side programming (e.g Django/python, Rails/ruby, Tomcat/Java, etc...)
-   Frontend programming (javascript)
-   API design (REST standards)
-   Data store design/implementation (normalisation etc...)
-   unit testing

### What would the output of these techniques/processes look like?

- Server side: a clearly designed backend application that implements the application with minimal code and has good test coverage

- Frontend programming. An appropriate client for the web application that lets users use the web applications

- API Design: A well designed and unit tested API that covers all necessary functionality for the web applications

- Data Store: A correctly install and configured data store such as a relational database and the data store is appropriately designed for the task

### How will this project be evaluated and assessed by the student (i.e. during iteration of the project)?

What criteria are important?

The student should use appropriate white and black box testing. The application should have appropriate unit testing. Students should also use user testing to get feedback on their application and use that feedback to improve the application or inform the design


### Good (e.g. 2:2 – 2:1) student project look like?

- Application functions well with no obvious bugs
- The main functionality of the application is covered with appropriate unit tests
- The client side is easily understandable and easy to use
- The report gives a clear account of how the application was designed included the literature, research and prior-art that informed the design of the application
- User testing was appropriately gathered and has been used to inform the design of the application.
- Report is written to a good standard of english

### Outstanding (e.g. 1st) student project look like?

- All areas of the application (front end, unit testing, data store/model, etc...) are implemented to a highly polished standard
- Client side interface is clear and usable to an exemplary standard
- Minimal bugs are present in the code
- Unit testing exhaustively covers the application’s functionality, all student code and tests all possible failure modes
- Extensive user testing that has informed the design of the application at all stages
- Report is written to an excellent standard, with detailed information on the literature, research and prior-art that informed the project
- The report is highly detailed with extensive self-reflection about the design and implementation processes
- The report reflects clearly on what has worked well and what has not and provides insight in to future directions.

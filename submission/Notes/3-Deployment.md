# 4. Implementation (Deployment)

I will be using a docker-compose with multiple services
- database
- graphql
- auth
- ui
- nginx-proxy and letsencrypt certificate manager

These will be hosted on own server

## Prep Tasks
- [x] Test current compose
- [x] Allow setting sensitive envs from .env file
      secrets, endpoints, project name
- [x] db;  settings through .env
- [x] graphql-engine; settings
- [x] auth; Dockerfile
      npm install, build, run server
- [x] ui; Dokerfile
      npm install, build
	- [x] multi stage; copy dist to nginx image
	      https://v2.vuejs.org/v2/cookbook/dockerize-vuejs-app.html
	- [x] Base url
	      This is Vite speciality; https://vitejs.dev/guide/build.html#public-base-path
	- [x] Nginx rewrite to index.html

## Deploy to ion-02
- [x] pull git repo
- [x] DNS record for `grid.nour.space` and `*.grid.nour.space` to `85.215.114.128`
	- [x] Port 80, 443
- [x] create .env
- [x] docker-compose.prod
- [x] docker-compose up?
- [x] SSL
      https://github.com/nginx-proxy/acme-companion/
      Had multiple issues, but got it to work in the end somehow. `VIRTUAL_PORT` is essential on ui service.

## [Extra] Deploy to ion-monitoring
K8s deployment

- [ ] ## Extra Docker commands  
Later docker multi-arch

https://www.docker.com/blog/faster-multi-platform-builds-dockerfile-cross-compilation-guide/

```shell  
# Prepare for multi-arch builds  
docker buildx create --use  
docker buildx build --platform linux/amd64,linux/arm64 -t nourspace/grid-ui .  
```


## Submission tasks
The goal is to have a single command local deployment

- [x] fix docker-compose with sensible vars to run locally without any configurations
- [x] Polish README; info, tech, setup, dev, build, test
	- [x] auth
	- [x] ui
	- [x] database


issues
https://github.com/hasura/graphql-engine/issues/2824#issuecomment-1436457924

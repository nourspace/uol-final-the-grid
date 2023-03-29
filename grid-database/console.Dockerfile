# production stage
FROM node:18-slim as production-stage
WORKDIR /app
RUN apt update -yq && apt install ca-certificates -yq
RUN npm install --global hasura-cli

# Disable telemetry
RUN mkdir -p ~/.hasura && echo '{"enable_telemetry": false}' > ~/.hasura/config.json

EXPOSE 9090
CMD [ \
 "hasura", "console", \
 "--address", "0.0.0.0", "--console-port", "9090", "api-port", "9693", \
 "--no-browser", "--skip-update-check", \
 "--endpoint", "http://graphql-engine:8080", \
 "--console-hge-endpoint", "http://localhost:8080" \
]

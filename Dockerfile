FROM node:8-alpine
WORKDIR xpath-evaluator
RUN apk update && apk add git
ADD . .
RUN npm install --production && npm link
ENTRYPOINT ["sleep","infinity"]

# Stage 1
FROM node:10 as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build:development
RUN yarn test --watchAll=false

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY gzip.conf /etc/nginx/conf.d/gzip.conf

COPY --from=react-build /app/build /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

COPY ./env.sh .
COPY ./.env.* .

RUN apk add --no-cache bash

RUN chmod +x env.sh

RUN apk add openssh \
     && echo "root:Docker!" | chpasswd
COPY sshd_config /etc/ssh/
EXPOSE 80 2222
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

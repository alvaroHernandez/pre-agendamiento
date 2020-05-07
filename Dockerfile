# Stage 1
FROM node:10 as react-build
WORKDIR /app
COPY . ./
ARG ENVIRONMENT="development"
ENV ENVIRONMENT=$ENVIRONMENT
RUN yarn
RUN yarn build:$ENVIRONMENT
#RUN yarn test --watchAll=false

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
RUN apk add openssh \
     && echo "root:Docker!" | chpasswd
COPY sshd_config /etc/ssh/
EXPOSE 80 2222
CMD ["nginx", "-g", "daemon off;"]

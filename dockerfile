FROM node:12.18.4-alpine3.10

# Create Directory for Workdir
RUN mkdir -p /app

# Directory Workdir location apps
WORKDIR /app

# Copy file app to container
ADD ./* /app/

# Rename config & install modeule
RUN cp /app/config-example.json /app/config.json \
&& npm install

CMD [ "node", "/app/index.js" ]
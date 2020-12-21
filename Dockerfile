FROM node:lts-alpine

# Create Directory for Workdir
RUN mkdir -p /app

# Directory Workdir location apps
WORKDIR /app

# Copy file app to container
ADD ./* /app/

# Rename config & install module
RUN cp /app/config-example.json /app/config.json

RUN npm install

CMD [ "node", "/app/index.js" ]

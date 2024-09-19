# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18.19.0

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# update os and install vim
RUN apt update -y && apt install -y vim

# Install all the dependencies
RUN npm install --legacy-peer-deps

EXPOSE 4200

CMD npm start

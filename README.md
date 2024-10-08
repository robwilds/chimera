# Custom ADF to show AWS AI processed images

## Overview

This customnization utilizes a custom ADF app to visualize images processed with intelligence services.  

Any file with aspect AI:Labels will be captured and displayed.  OOTB, there's hard coding to look for the word Hyland in the image and classify as "hylandemployee"  and present with a green box.  Also any weapons that are identifed will be flagged with a red box and flash momentarily on screen. 

Clicking on the magnifying glass for each image will bring up the ADF meta data panel so you can see the properties including the tags.  You can also start a workflow in the workflow panel below (in case something needs to be review by other parties)

## Setup

This is intended to run with Alfresco ADP for solution engineers.  

If you would like run this standalone:  Edit the docker-compose.yml with the environment variables accordingly then run docker compose up -d from command line within the folder adn a chimera container will start with the adf app and the microservice.

If you would like to run everything local or in the cloud:  Edit the docker-compose.yml with the environment variables accordingly then  Simply add the contents of the docker-compose.yml to the existing ADP yaml file.  

you can also edit the config.json file within the root ADP folder (where adp.py is located) to be sure that the two additional containers start when ./adp.py start is executed

## Running the customization

Once everything is setup and running, you can go to http://<URL>:4200 to see the customization.  be sure to click on the logout button to see the login page and login with demo/demo.

after logging in please wait a few moments to see any aws processed images to show up on the home page


# ADF/APS/ACS Application with Angular CLI

Minimal ready-to-use Angular CLI project template pre-configured with ADF components.

## Quick start

```sh
npm install
npm start
```

## Supported ADF component libraries

This project has all the existing ADF component libraries already pre-configured.

The main focus of the project is:

- ADF integration and setup
- Basic demonstration of working components

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Proxy settings

The template provides certain proxy settings to allow running web application locally without CORS setup.
You can find details in the `proxy.conf.js` file.

List of URLs being proxied:

- `/alfresco` -> `http://0.0.0.0:8080`
- `/activiti-app` -> `http://0.0.0.0:9999`

## Code scaffolding

Run `ng generate component component-name -m app.module` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

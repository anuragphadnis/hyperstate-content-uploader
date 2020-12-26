# Submission for backend assignment task for [hyperstate](https://hyperstate.tech)

Used express for creating API, processing jobs are implemented using Bull which uses redis database in the background

## Requirements
* Redis

* To setup the project first install redis, you can use [docker-compose file](/docker/docker-compose.yml) 
* Add enviornment variables, refer env.sample for list of env variables
* create a directory where files can be saved with the following structure
- uploadDirectory
  - jpg
    - 360p
    - 480p
    - 720p
    - 1080p
  - png
    - 360p
    - 480p
    - 720p
    - 1080p
  - webp
    - 360p
    - 480p
    - 720p
    - 1080p
  * run command npm run start:dev to start the server
  * Refer to [file](postman/api.json) to interact with the API

## Libraries used:
* redis
* bull
* dotenv
* express
* multer
* sharp
* babel
* eslint
* husky
* nodemon


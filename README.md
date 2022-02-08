# neo
Spring 2022 Project

## Introduction

The gateway service is the entrypoint into the microservices architecture.
The UI service calls the API Gateway and based on the API route, the gateway would redirect the request to the appropriate microservice.

The gateway is also responsible for ensuring each request is authorized and communicates with the auth-service for this function, before re-directing to the concerned microservice.

REST API endpoints on the gateway are:
- GET /widget : Routes first to auth-service, then registry-service and finally data-service.
- GET /history : Routes first to auth-service and then to registry-service.
- GET /login : Routes to auth-service.
- GET /metadata : Routes to metadata-service.

## Prerequisites

* Docker Desktop

## Steps

### Running on Docker Desktop

All the docker images are hosted on our Docker repository: https://hub.docker.com/repository/docker/neoairavataproject

* To pull image of the Gateway microservice, open any terminal and run the below command to pull the image from our public Docker repository.
  ```
  docker pull neoairavataproject/gateway:latest
  ```
* To run the pulled image, execute the below command: (docker pull can be skipped as docker run will both pull and run the image)

  * To run in attach mode (i.e. see the output of the service in the terminal), execute below command:
  
  ```
  docker run -p 8081:8081 neoairavataproject/gateway:latest
  ```
  
  * To run in detach mode (hide the output of the service in the terminal)
  
  ```
  docker run -d -p 8081:8081 neoairavataproject/gateway:latest
  ```

### For running on localhost:

* Clone Airavata repository to a local directory

  ```
  git clone git@github.com:airavata-courses/neo.git
  ```

* Checkout develop branch

  ```
  git checkout feature-gateway
  ```
  
* Create virtual environment with pipenv

  ```
  pip install pipenv
  pipenv shell
  ```
  
* Install dependencies from requirements.txt
  ```
  pipenv install -r requirements.txt
  ```
  
* Start the Gateway service:
  ```
  python app.py
  ```
**Note:** This will start the service on port 8081 of localhost. This service would be running standalone in this case.
To experience the full functionality of this service and have it communicating with all other microservices, the easiest way is to run the ```docker-compose up``` command as specified in the main branch's README.md.


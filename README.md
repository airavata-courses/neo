# neo
Spring 2022 Project

## Introduction

Database service communicates with MongoDB using Node ODM Mongoose.
Model is created with two collections:-
- Users
- Widgets

It handles CRUD operations when asked.

## Prerequisites

* Docker
* Node

## Steps

### Setting up the development environment

* Clone Airavata repository to a local directory

  ```
  git clone git@github.com:airavata-courses/neo.git
  ```

* checkout to database feature branch

  ```
  git checkout feature-database-service
  ```

* Install node dependencies 

  ```
  cd database-service
  npm install
  ```


### Running the application locally 

  Run a mongo client locally using:
  ```
  docker-compose up
  ```
  on [./database-service/config]

  ```
  npm run compile
  npm run start
  ```

### Docker Image Location

https://hub.docker.com/repository/docker/neoairavataproject/database-service
```

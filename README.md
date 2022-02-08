# neo
Spring 2022 Project

## Introduction

Auth Service is present to integrate authentication and authorisation for all the non-public routes.
Auth public also creates a JWT to develop a session between client and server.
It validates Google Auth TokenID for initiating a login for any user

It communicates with User Register Service to send user details from TokenID for persisting user data received from Google

## Prerequisites

* Docker
* Node

## Steps

### Setting up the development environment

* Clone Airavata repository to a local directory

  ```
  git clone git@github.com:airavata-courses/neo.git
  ```

* checkout to auth feature branch

  ```
  git checkout feature-auth-service
  ```

* Install node dependencies 

  ```
  cd auth-service
  npm install
  ```


### Running the application locally 

  ```
  npm run compile
  npm run start
  ```

### Docker Image Location

https://hub.docker.com/repository/docker/neoairavataproject/auth-service
```

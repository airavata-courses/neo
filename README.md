# neo
Spring 2022 Project

## Introduction

This service will fetch nexrad 2 data from the public S3 bucket and return plot image in base64 format, that could be accessed through gRPC

## Prerequisites

* Docker
* python3.9
* Conda


## Steps

### Setting up the development environment

* Clone Airavata repository to a local directory

  ```
  git clone git@github.com:airavata-courses/neo.git
  ```

* Checkout develop branch

  ```
  git checkout feature-data-preparation-siphon
  ```
* create conda environment 

  ```
  conda env create -f environment.yml
  ```


### Running the docker image independently 

* All the docker images are hosted on https://hub.docker.com/repository/docker/neoairavataproject/data-service

  ```
  docker pull neoairavataproject/data-service:2.3
  ```

```
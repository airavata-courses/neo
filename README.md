# neo
Spring 2022 Project

Neo is a microservice architecture based application to visualize Doppler Radar Feed from the NEXRAD system's AWS S3 buckets.

## Software Requirements

* [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Installation Steps

* Clone project repository:

  ```git clone https://github.com/airavata-courses/neo.git```

* Change directory:

  ```cd neo```

* Checkout ```dev``` branch:

  ```git checkout dev```
  
  The ```dev``` branch contains the ```docker-compose.yml``` configuration file which will pull, build and run all images from our [neoairavata](https://hub.docker.com/u/neoairavataproject) public repository on Docker Hub.
  
## Launching all microservices:

   All our microservices are hosted on the [neoairavata](https://hub.docker.com/u/neoairavataproject) Docker hub repository.
  
* To start all microservices, execute the below command. Ensure that you are in the root directory of the ```dev``` branch while executing below command:

  ```docker-compose up```
  
**Note:** Each microservice's Docker image has been built with multi-arch support for ```linux/arm64``` and ```linux/amd64```.
   Based on the user's machine (arm64 or amd64 arch), the appropriate Docker image gets pulled by docker-compose.

## Accessing User Interface

Our UI service is exposed on port 4200 in the Docker container and maps to port 4200 of localhost.

Hence, after initiating all services with ```docker-compose up```, the UI of our application can be accessed from: ```http://localhost:4200```

## Technology Stack

- gRPC
- RESTful APIs
- Angular
- TypeScript
- Python
- Flask
- Java
- Nginx
- Docker (with docker-compose)

## Napkin Diagram

![Napkin 2 drawio](https://user-images.githubusercontent.com/9477137/152918166-e621fdbb-09d7-4d52-a6b2-e01b015a7a15.png)

## Architecture Diagram

![Neo System Architecture2](https://user-images.githubusercontent.com/35288428/152919633-c0686e43-8954-4fac-bf2c-59afc0aadb30.png)

## Team:
* Rajdeep Singh Chauhan (rajchauh@iu.edu)
* Nirav Raje (nraje@iu.edu)
* Shashank Jain (shasjain@iu.edu)

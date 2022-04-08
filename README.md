# neo

Spring 2022 Project

Neo is a microservice architecture based application to visualize Doppler Radar Feed from the NEXRAD system's [Registry of Open Data on AWS](https://registry.opendata.aws/noaa-nexrad/).

**Quick Reference Links:**

- [Project Milestone 1 Release](https://github.com/airavata-courses/neo/releases/tag/v1https://github.com/airavata-courses/neo/releases/tag/v1)
- [Project Milestone 1 Wiki](https://github.com/airavata-courses/neo/wiki/Project-1)

## Software Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Installation Steps

- Clone project repository:

  `git clone https://github.com/airavata-courses/neo.git`

- Change directory:

  `cd neo`

- Checkout `dev` branch:

  `git checkout dev`

  The `dev` branch contains the `docker-compose.yml` configuration file which will pull, build and run all images from our [neoairavata](https://hub.docker.com/u/neoairavataproject) public repository on Docker Hub.

## Launching all microservices:

All our microservices are hosted on the [neoairavata](https://hub.docker.com/u/neoairavataproject) Docker hub repository.

- Start Docker Desktop to ensure Docker Daemon is running. For running on local machine for Milestone 1, we highly recommend to ensure that Docker Desktop's default resource limits (especially RAM) are increased to atleast 75% of available system resources.

- To start all microservices, execute the below command in the terminal. Ensure that you are in the root directory of the `dev` branch while executing below command:

  `docker-compose up`

**Note:** Each microservice's Docker image has been built with multi-arch support for `linux/arm64` and `linux/amd64`.
Based on the user's machine (arm64 or amd64 arch), the appropriate Docker image gets pulled by docker-compose.

## Accessing User Interface

Our UI service is exposed on port 4200 in the Docker container and maps to port 4200 of localhost.

Hence, after initiating all services with `docker-compose up`, the UI of our application can be accessed from: `http://localhost:4200`

## Technology Stack

- gRPC
- RabbitMQ
- RESTful APIs
- Redis
- Angular
- TypeScript
- Python
- Flask
- Java
- Spring Boot
- Nginx
- Docker (with docker-compose)
- Kubernetes
- OpenStack API
- Terraform
- Ansible
- JetStream VMs

## Napkin Diagram

![Neo Napkin Diagram 2](https://user-images.githubusercontent.com/35288428/153309704-4b3c9175-3bb2-4208-92b2-b90a7c81effa.png)

## Architecture Diagram

![Neo System Architecture - Milestone 3 drawio (3)](https://user-images.githubusercontent.com/35288428/162355130-92150d06-fab4-4914-8894-1e4e4b9ccec9.png)

## Team:

- Rajdeep Singh Chauhan (rajchauh@iu.edu)
- Nirav Raje (nraje@iu.edu)
- Shashank Jain (shasjain@iu.edu)

# neo
Welcome to neo!

Neo is a microservice architecture based application to visualize Doppler Radar Feed from the NEXRAD system's [Registry of Open Data on AWS](https://registry.opendata.aws/noaa-nexrad/) and satellite data sourced from the [NASA MERRA 2 Earth Dataset](https://disc.gsfc.nasa.gov/datasets/M2I3NPASM_5.12.4/summary).

**Quick Reference Links:**

- [Project Milestone 1 Release](https://github.com/airavata-courses/neo/releases/tag/v1https://github.com/airavata-courses/neo/releases/tag/v1)
- [Wiki Home Page](https://github.com/airavata-courses/neo/wiki)
- [Project Milestone 1 Wiki](https://github.com/airavata-courses/neo/wiki/Project-1)
- [Project Milestone 2 Wiki](https://github.com/airavata-courses/neo/wiki/Project-2)
- [Project Milestone 3 Wiki](https://github.com/airavata-courses/neo/wiki/Project-3)
- [Project Milestone 4 Wiki](https://github.com/airavata-courses/neo/wiki/Project-4)

**Source Code Branches for Microservices:**
- [Gateway Service](https://github.com/airavata-courses/neo/tree/feature-gateway-milestone3)
- [UI Service](https://github.com/airavata-courses/neo/tree/feature-UI-milestone3)
- [Data Processor Service](https://github.com/airavata-courses/neo/tree/feature-data-processing)
- [User Service](https://github.com/airavata-courses/neo/tree/feature-user-milestone3)
- [Registry Service](https://github.com/airavata-courses/neo/tree/feature-registry-milestone3)
- [Auth Service](https://github.com/airavata-courses/neo/tree/feature-auth-milestone3)
- [Database Service](https://github.com/airavata-courses/neo/tree/feature-database-milestone3)
- [Redis DB Store Instance](https://github.com/airavata-courses/neo/tree/feature-redis-neo-milestone3)
- [Cache Service](https://github.com/airavata-courses/neo/tree/feature-redis-milestone3)
- [RabbitMQ Instance](https://github.com/airavata-courses/neo/tree/feature-rabbitmq-neo-milestone3)

***
### Technology Stack

| Function                                   | Language/Framework/Technology Used                                            |
|--------------------------------------------|-------------------------------------------------------------------------------|
| Backend Microservice Implementation        | TypeScript (Node.js, Nginx)<br>Python (Flask, Gunicorn)<br>Java (Spring Boot) |
| Frontend Microservice Implementation       | Angular<br>Redux                                                              |
| Inter-service Communication                | gRPC (primary)<br>RabbitMQ (for data service)<br>REST                         |
| Database & Cache Management                | MongoDB<br>Redis                                                              |
| Containerization & Container Orchestration | Docker<br>Kubernetes                                                          |
| Performance Testing                        | Apache JMeter (with Ultimate Thread Group plugin)                             |
| CI/CD, Infra-as-code, Build Automation     | Jenkins<br>OpenStack API<br>Terraform<br>Ansible                              |
| Secret Management                          | Kubeseal                                                                      |

***
### Napkin Diagram:

![Neo Napkin Diagram 3 drawio](https://user-images.githubusercontent.com/35288428/167030786-05d23df7-cd0f-425c-9ae1-9f616781eec8.png)
***
### System Architecture Diagram:

![image](https://user-images.githubusercontent.com/35288428/167029768-2f9119cc-aa69-4cc6-be77-39a28ed1e674.png)
***
### Visualizations Generated for NEXRAD and NASA datasets

#### NEXRAD Data Visualized:

![Screen Shot 2022-05-06 at 12 47 03 AM](https://user-images.githubusercontent.com/35288428/167070527-878ca5c5-ada3-44ec-ab3b-06e8f4f98342.png)

#### NASA Data Visualized:

![ezgif com-gif-maker](https://user-images.githubusercontent.com/35288428/167070567-f302f3a9-597b-4884-968b-b2d2636a277a.gif)



## Team 

- **Rajdeep Singh Chauhan**: [rajchauh@iu.edu]

   [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/rajdeep-singh-chauhan-205544a0/)
   [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/rajdeepc2792)

- **Nirav Raje**: [nraje@iu.edu]

   [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/niravraje/)
   [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/niravraje)

- **Shashank Jain** [shasjain@iu.edu]
   
   [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/shashankjain07/)
   [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/shanki07)


pipeline{
    agent any


    environment {
        REGISTRY = 'neoairavataproject/metadata-service'
        REGISTRY_CREDENTIAL = 'docker-credentials'
        SERVICE_NAME = 'metadata-service'
        KUBE_DIRECTORY = '/home/ubuntu/deploy'
    }
    stages{
        stage('Clone Git Repo') {
            steps{
                checkout scm
                echo "Successfully cloned git repository"
            }
        }

        stage('Test App') {
		    steps{
                echo "Successfully tested app"
            }
	    }

        stage('Build Docker Image') {
            agent any
            steps{
                sh 'docker image build . -t ${SERVICE_NAME}:latest'
                sh 'docker tag ${SERVICE_NAME}:latest ${REGISTRY}:latest'
                echo "Successfully built docker images"
            }
        }

        stage('Push Image to Dockerhub'){
            agent any
            steps{
                withCredentials([usernamePassword(credentialsId: 'REGISTRY_CREDENTIAL', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                    sh 'docker push ${REGISTRY}:latest'
                }
                echo "Successfully pushed image to docker hub"
            }    
        
        }

        stage('Clean Up Disk Space') {
            steps{
                sh "docker system prune -af --volumes" 
            }
        }    

        stage('Kubernetes Cluster Deployment') {
            steps{
                sshagent (credentials: ['PRIVATE_KEY'])
                {
                    script{
                        try{
                            sh 'ssh -o StrictHostKeyChecking=no ubuntu@149.165.153.238 mkdir ${SERVICE_NAME}'
                        }catch(error)
                        {}
                    }
                    sh 'scp -r -o StrictHostKeyChecking=no ${SERVICE_NAME}*.yaml ubuntu@149.165.153.238:/home/ubuntu/${SERVICE_NAME}'
                    script{
                        try{
                            sh 'ssh -o StrictHostKeyChecking=no ubuntu@149.165.153.238 sudo kubectl delete --ignore-not-found=true -f ${SERVICE_NAME}/${SERVICE_NAME}.yaml -f ${SERVICE_NAME}/${SERVICE_NAME}-deployment.yaml'
                            sh 'ssh -o StrictHostKeyChecking=no ubuntu@149.165.153.238 sudo kubectl apply -f ${SERVICE_NAME}/${SERVICE_NAME}.yaml -f ${SERVICE_NAME}/${SERVICE_NAME}-deployment.yaml'
                            sh 'ssh -o StrictHostKeyChecking=no ubuntu@149.165.153.238 sudo rm -rf ${SERVICE_NAME}'
                        }catch(error)
                        {}
                    }
                }
            }
        }
    }   
           
}
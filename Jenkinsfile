pipeline{
    agent any

    environment {
        SERVICE_NAME = 'rabbitmq-neo'
        DEPLOY_NAME = 'rabbitmq-neo-deploy'
        HOME_DIRECTORY = 'rabbitmq-neo'
        KUBE_DIRECTORY = '/home/ubuntu/deploy'
    }
    stages{
        stage('Clone Git Repo') {
            steps{
                checkout scm
                echo "Successfully cloned git repository"
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
                    sh 'scp -r -o StrictHostKeyChecking=no ${SERVICE_NAME}/*.yaml ubuntu@149.165.153.238:/home/ubuntu/${SERVICE_NAME}'
                    script{
                        try{
                            sh 'ssh -o StrictHostKeyChecking=no ubuntu@149.165.153.238 sudo kubectl apply --ignore-not-found=true -f ${SERVICE_NAME}/${SERVICE_NAME}-service.yaml -f ${SERVICE_NAME}/${SERVICE_NAME}-deployment.yaml'
                            sh 'ssh -o StrictHostKeyChecking=no ubuntu@149.165.153.238 sudo rm -rf ${SERVICE_NAME}'
                        }catch(error)
                        {}
                    }
                }
            }
        }
    }   
           
}
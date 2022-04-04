pipeline{
    agent any

    environment {
        SERVICE_NAME = 'mongo-neo'
        DEPLOY_NAME = 'mongo-deploy'
        HOME_DIRECTORY = 'mongo-neo'
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
                    sh 'scp -r -o StrictHostKeyChecking=no *.yaml ubuntu@149.165.153.238:/home/ubuntu/${SERVICE_NAME}'
                    script{
                        try{
                            sh 'ssh -o StrictHostKeyChecking=no ubuntu@149.165.153.238 sudo kubectl apply -f ${SERVICE_NAME}/db-pv.yaml -f ${SERVICE_NAME}/db-pvc.yaml -f ${SERVICE_NAME}/db-secrets.yaml -f ${SERVICE_NAME}/mongo-neo-service.yaml -f ${SERVICE_NAME}/mongo-neo-deployment.yaml'
                            sh 'ssh -o StrictHostKeyChecking=no ubuntu@149.165.153.238 sudo rm -rf ${SERVICE_NAME}'
                        }catch(error)
                        {}
                    }
                }
            }
        }
    }   
           
}
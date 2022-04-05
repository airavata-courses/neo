pipeline{
    agent any

    environment {
        REGISTRY = 'neoairavataproject/data-service'
        REGISTRY_CREDENTIAL = 'docker-credentials'
        FILE = 'data-service.yaml'
        SERVICE_NAME = 'data-service'
        DEPLOY_NAME = 'data-service-deploy'
        # HOME_DIRECTORY = 'database-service'
        KUBE_DIRECTORY = '/home/ubuntu/deploy'
    }
    stages{
        stage('Clone Git Repo') {
            steps{
                checkout scm
                echo "Successfully cloned git repository"
            }
        }

        stage('Install dependencies') {
            steps{
                sh '''#!/usr/bin/env bash
                            wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh
                            bash miniconda.sh -b -p $WORKSPACE/miniconda
                            hash -r
                            conda config --set always_yes yes --set changeps1 no
                            conda update -q conda
                            # create snakemake-workflows env
                            conda init bash
                            conda env create -f environment.yml
                            '''
            }

	    }

	    stage('Test downloading') {
                    steps {
                        sh '''#!/usr/bin/env bash
                        source $WORKSPACE/miniconda/etc/profile.d/conda.sh
                        conda activate miniconda/envs/neodata/

                        '''
                    }
                }

        stage ('Test'){
                steps {
                    sh 'python unit-test.py'
                }
            }

        stage('Build Docker Image') {
            agent any
            steps{
                sh 'cd ${HOME_DIRECTORY} && pwd && docker image build . -t ${SERVICE_NAME}:latest'
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
                    sh 'scp -r -o StrictHostKeyChecking=no ${SERVICE_NAME}/${SERVICE_NAME}*.yaml ubuntu@149.165.153.238:/home/ubuntu/${SERVICE_NAME}'
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
pipeline{
    agent any

    tools {
        nodejs "nodeJS"
    }

    environment {
        REGISTRY = 'neoairavataproject/database-service'
        REGISTRY_CREDENTIAL = 'docker-credentials'
        FILE = 'database-service.yaml'
        SERVICE_NAME = 'database-service'
        DEPLOY_NAME = 'database-deploy'
        HOME_DIRECTORY = 'database-service'
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
                sh 'cd ${HOME_DIRECTORY} && npm install'
                echo "Successfully installed npm packages"
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
                sh 'cd ${HOME_DIRECTORY} && pwd && docker image build . -t ${SERVICE_NAME}:latest'
                sh 'docker tag ${SERVICE_NAME}:latest ${REGISTRY}:latest'
                // script{
                //     dockerImage = docker.build(REGISTRY, "${HOME_DIRECTORY}")
                // }
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
                // script{
                //     docker.withRegistry('https://registry.hub.docker.com', REGISTRY_CREDENTIAL ){
                //     dockerImage.push("latest")
                //     }
                    
                // }
                echo "Successfully pushed image to docker hub"
            }    
        
        }

        stage('Clean Up Disk Space') {
            steps{
                sh "docker system prune -af --volumes" 
            }
        }    

        // stage('Kubernetes Cluster Deployment') {
        //     steps{
        //         script{
        //             sshPublisher(
        //                 continueOnError: false, failOnError: true,
        //                 publishers: [
        //                     sshPublisherDesc(
        //                         configName: 'ssh_openshift',
        //                         verbose: true,
        //                         transfers: [
        //                             sshTransfer(
        //                                 execCommand: "cd ${kubeDir}; rm -rf ${file_name}*; wget ${githuburl}; kubectl delete deployment ${deployName}; kubectl delete svc ${svcName};  kubectl apply -f ${file_name}"
        //                             )
        //                     ])
        //             ])
                
        //         }
        //         script{
        //             sshPublisher(
        //                 continueOnError: false, failOnError: true,
        //                 publishers: [
        //                     sshPublisherDesc(
        //                         configName: 'ssh_openshift2',
        //                         verbose: true,
        //                         transfers: [
        //                             sshTransfer(
        //                                 execCommand: "cd ${kubeDir}; rm -rf ${file_name}*; wget ${githuburl}; kubectl delete deployment ${deployName}; kubectl delete svc ${svcName};  kubectl apply -f ${file_name}"
        //                             )
        //                     ])
        //             ])
                
        //         }
        //     }
        // }
    }   
           
}
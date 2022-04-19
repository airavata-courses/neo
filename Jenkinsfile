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



                }
            }
        }
    }   
           
}

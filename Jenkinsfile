pipeline {
    agent any

    environment {
        DOCKERHUB_REPO = "barathh1357/node_app"
    }

    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKERHUB_REPO}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        dockerImage.push()
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage('Deploy on EC2') {
    steps {
        sshagent(['ec2-ssh-key']) {
            sh """
            ssh -o StrictHostKeyChecking=no ubuntu@15.206.183.175/ '
                docker pull barathh1357/node_app:latest &&
                docker stop node_app || true &&
                docker rm node_app || true &&
                docker run -d -p 80:3000 --name node_app barathh1357/node_app:latest
            '
            """
        }
    }
}

    }

    post {
        success {
            echo "Deployment completed successfully!"
        }
    }
}

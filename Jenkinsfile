pipeline {
    agent any

    environment {
        DOCKERHUB_REPO = "barathh1357/node_app"
        EC2_USER = "ubuntu"
        EC2_HOST = "52.66.227.159"
    }

    stages {
        stage('Clone') {
            steps {
                // Checkout your GitHub repository
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
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                        sudo docker pull ${DOCKERHUB_REPO}:latest &&
                        sudo docker stop node_app || true &&
                        sudo docker rm node_app || true &&
                        sudo docker run -d -p 80:3000 --name node_app ${DOCKERHUB_REPO}:latest
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
        failure {
            echo "Pipeline failed. Please check logs."
        }
    }
}

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
                        dockerImage.push("latest")      // Optional: push 'latest' tag
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Image pushed to Docker Hub: ${DOCKERHUB_REPO}:${env.BUILD_NUMBER}"
        }
    }
}

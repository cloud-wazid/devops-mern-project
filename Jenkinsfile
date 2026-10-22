
pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'wazid2003'
        BACKEND_IMAGE = 'wazid2003/devops-mern-backend'
        FRONTEND_IMAGE = 'wazid2003/devops-mern-frontend'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                bat 'docker build -t %BACKEND_IMAGE%:%BUILD_NUMBER% -t %BACKEND_IMAGE%:latest ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat 'docker build -t %FRONTEND_IMAGE%:%BUILD_NUMBER% -t %FRONTEND_IMAGE%:latest ./frontend'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                        docker login -u "%DOCKER_USER%" -p "%DOCKER_PASS%"
                        docker push %BACKEND_IMAGE%:%BUILD_NUMBER%
                        docker push %BACKEND_IMAGE%:latest
                        docker push %FRONTEND_IMAGE%:%BUILD_NUMBER%
                        docker push %FRONTEND_IMAGE%:latest
                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'MERN CI/CD Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}

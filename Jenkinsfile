pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'zeizz/node-sample-app'
    }
    stages {
        stage('Clone repo') {
            steps {
                git 'https://github.com/zei-ZZ/node-sample-app'
            }
        }

        stage('Run tests')
        {
            steps {
                sh 'npm run test'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }
        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-id',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
            }
        }
    }
}

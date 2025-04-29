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
                nodejs(nodeJSInstallationName: 'npm') {
                    sh 'npm install'
                    sh 'npm run test'
                }
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
                withKubeConfig([credentialsId: 'k8s-config',  caCertificate: '',]) {
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl apply -f k8s/service.yaml'
                    sh 'kubectl get svc'
                    sh 'kubectl get deployments'
                }
            }
        }
    }
}

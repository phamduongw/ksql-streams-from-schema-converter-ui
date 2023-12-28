pipeline {
    agent any

    tools {
        dockerTool "myDocker"
    }

    environment {
        DOCKER_CONTAINER_NAME = "ksql-streams-from-schema-converter-ui"
        DOCKER_CONTAINER_TAG = "${readJSON(file: 'package.json').version}"
    }

    stages {
        stage("Build") {
            steps {
                sh "docker build -t ${DOCKER_CONTAINER_NAME}:${DOCKER_CONTAINER_TAG} ."
            }
        }

        stage("Stop and Remove"){
            steps {
                sh "docker stop ${DOCKER_CONTAINER_NAME} && docker rm ${DOCKER_CONTAINER_NAME} || echo 'This container does not exist.'"
            }
        }

        stage("Deploy") {
            steps {
                sh "docker run -d -p 5173:80 --name ${DOCKER_CONTAINER_NAME} ${DOCKER_CONTAINER_NAME}:${DOCKER_CONTAINER_TAG}"
            }
        }
    }
}
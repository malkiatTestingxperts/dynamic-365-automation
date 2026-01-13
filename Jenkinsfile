pipeline {
    agent any

    tools {
        nodejs 'Node22'
        allure 'Allure'
    }

    environment {
        CI = "true"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                node -v
                npm -v
                npm ci
                npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat '''
                npx playwright test
                '''
            }
        }
    }

    post {
        always {
            echo "Publishing Allure Report..."

            allure([
                commandline: 'Allure',// Explicitly define which tool config to use
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
        }

        failure {
            echo "Tests failed. Check Allure tab for full details."
        }
    }
}




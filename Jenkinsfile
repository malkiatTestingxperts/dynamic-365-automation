pipeline {
    agent any

    tools {
        nodejs 'Node22'
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
            echo "Publishing Allure Report"

            script {
                if (fileExists('allure-results')) {
                    allure(
                        includeProperties: false,
                        jdk: '',
                        results: [[path: 'allure-results']],
                        tool: 'Allure'
                    )
                } else {
                    echo 'Allure results not found, skipping report generation'
                }
            }
        }

        failure {
            echo "Tests failed. Check Allure tab for full details."
        }
    }
}

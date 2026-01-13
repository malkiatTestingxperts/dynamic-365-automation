pipeline {
    agent any

    tools {
        nodejs 'Node22'     // Must exist in Jenkins Global Tools
        allure 'Allure'    // Must exist in Jenkins Global Tools
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
                sh '''
                node -v
                npm -v
                npm ci
                npx playwright install --with-deps
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                npx playwright test
                '''
            }
        }
    }

    post {
        always {
            echo "Publishing Allure Report..."

            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])

            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }

        failure {
            echo "Tests failed. Check Allure tab for full details."
        }
    }
}

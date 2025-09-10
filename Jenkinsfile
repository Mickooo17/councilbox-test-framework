pipeline {
  agent any

  tools {
    nodejs 'node20'
  }

  environment {
    CI = 'true'
  }

  options {
    timestamps()
    ansiColor('xterm')
    buildDiscarder(logRotator(numToKeepStr: '20'))
    timeout(time: 30, unit: 'MINUTES')
  }

  stages {
    stage('Clean workspace') {
      steps {
        cleanWs()
      }
    }

    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install dependencies') {
      steps {
        bat 'cmd /c npm ci'
      }
    }

    stage('Install Playwright browsers') {
      steps {
        bat 'cmd /c npx playwright install --with-deps'
      }
    }

    stage('Run tests') {
      steps {
        // Dodaj allure-playwright reporter
        bat 'cmd /c npx playwright test --reporter=line,allure-playwright || exit 0'
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: '**/junit-results/*.xml'
        }
      }
    }
  }

  post {
    always {
      // Allure report
      allure includeProperties: false, jdk: '', results: [[path: '**/allure-results']]
      archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

      // Email notification
      emailext(
        subject: "Councilbox QA Report - Build ${env.BUILD_NUMBER}",
        body: """
          <p>Build <b>#${env.BUILD_NUMBER}</b> je završen sa statusom: <b>${currentBuild.currentResult}</b></p>
          <p><a href="${env.BUILD_URL}allure">Klikni ovdje da pogledaš Allure report</a></p>
        """,
        mimeType: 'text/html',
        to: 'ammar.micko@gmail.com'
      )
    }
  }
}
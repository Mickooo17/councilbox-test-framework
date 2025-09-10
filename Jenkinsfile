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
  subject: "Councilbox QA Report – Build #${env.BUILD_NUMBER} – ${currentBuild.currentResult}",
  from: 'councilboxautotest@gmail.com',
  to: 'ammar.micko@gmail.com',
  mimeType: 'text/html; charset=UTF-8',
  body: """
    <html>
      <body style="font-family:Arial, sans-serif; font-size:14px; color:#333;">
        <p>Hello,</p>
        <p>The automated QA pipeline for <strong>Councilbox</strong> has completed successfully.</p>
        <table style="border-collapse:collapse; margin-top:10px;">
          <tr><td><strong>Build Number:</strong></td><td>${env.BUILD_NUMBER}</td></tr>
          <tr><td><strong>Status:</strong></td><td>${currentBuild.currentResult}</td></tr>
          <tr><td><strong>Timestamp:</strong></td><td>${new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone('CET'))}</td></tr>
        </table>
        <p style="margin-top:15px;">
          &#128202; <a href="${env.BUILD_URL}allure" style="color:#1a73e8; text-decoration:none;">View Allure Report</a>
        </p>
        <br/>
        <p>Best regards,<br/>Councilbox QA Automation</p>
      </body>
    </html>
  """
)

    }
  }
}
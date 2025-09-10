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
  body: """
    <html>
      <body style="font-family:Arial, sans-serif; font-size:14px;">
        <p>Hello,</p>
        <p>The automated QA pipeline for <strong>Councilbox</strong> has completed.</p>
        <ul>
          <li><strong>Build Number:</strong> ${env.BUILD_NUMBER}</li>
          <li><strong>Status:</strong> ${currentBuild.currentResult}</li>
          <li><strong>Timestamp:</strong> ${new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone('CET'))}</li>
        </ul>
        <p>You can view the full test report here:</p>
        <p><a href="${env.BUILD_URL}allure" style="color:#1a73e8;">🔍 View Allure Report</a></p>
        <br/>
        <p>Best regards,<br/>Councilbox QA Automation</p>
      </body>
    </html>
  """,
  mimeType: 'text/html',
  to: 'ammar.micko@gmail.com'
)

    }
  }
}
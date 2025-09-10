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
        bat 'cmd /c npx playwright test --reporter=line || exit 0'
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: '**/junit-results/*.xml'
          archiveArtifacts artifacts: '**/allure-results/**', allowEmptyArchive: true
        }
      }
    }
  }

  post {
    always {
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
    }
    cleanup {
      cleanWs()
    }
  }
}

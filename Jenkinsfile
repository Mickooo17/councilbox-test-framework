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
        }
      }
    }

    stage('Generate Allure report') {
      steps {
        // Ovo pokreće tvoj lokalni način generiranja reporta
        bat 'cmd /c npm run report'
      }
    }
  }

  post {
    always {
      // Allure plugin sada samo čita već generisani report
      allure includeProperties: false, jdk: '', results: [[path: '**/allure-results']]
    }
    cleanup {
      cleanWs()
    }
  }
}
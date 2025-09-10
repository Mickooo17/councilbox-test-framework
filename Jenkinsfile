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
        bat '''
          chcp 65001 >NUL
          npx playwright test --reporter=line,allure-playwright || exit 0
        '''
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: '**/junit-results/*.xml'
        }
      }
    }

    stage('Extract Allure Summary') {
      steps {
        bat 'cmd /c node scripts/extract-allure-summary.js'
        script {
          env.TOTAL_TESTS = readFile('total-tests.txt').trim()
          env.PASSED_TESTS = readFile('passed-tests.txt').trim()
          env.FAILED_TESTS_COUNT = readFile('failed-tests-count.txt').trim()
          env.SKIPPED_TESTS = readFile('skipped-tests.txt').trim()
          env.FAILED_TESTS_HTML = readFile('failed-tests.html')
        }
      }
    }
  }

  post {
    always {
      // Generiraj Allure report unutar Jenkinsa
      allure includeProperties: false, jdk: '', results: [[path: '**/allure-results']]
      archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

      // Pretvori Allure report u jedan HTML fajl
      bat 'cmd /c node scripts/allure-single-html.js'
      archiveArtifacts artifacts: 'allure-report-single.html', allowEmptyArchive: false

      // Pošalji email s HTML summaryjem i single-file Allure reportom
      emailext(
        subject: "${currentBuild.currentResult == 'SUCCESS' ? 'Councilbox QA Report - Build #' + env.BUILD_NUMBER + ' - SUCCESS' : 'Councilbox QA Failure - Build #' + env.BUILD_NUMBER}",
        from: 'Councilbox Automation <councilboxautotest@gmail.com>',
        to: 'ammar.micko@gmail.com',
        mimeType: 'text/html; charset=UTF-8',
        attachmentsPattern: 'allure-report-single.html',
        body: """
          <html>
            <body style="font-family:Arial, sans-serif; font-size:14px; color:#333; background-color:#f9f9f9; padding:20px;">
              
              <h2 style="color:#1a73e8; margin-bottom:5px;">Councilbox QA Pipeline Report</h2>
              <p style="margin-top:0; font-size:13px; color:#666;">Automated test execution summary</p>
              
              <table style="border-collapse:collapse; background:#fff; padding:10px; border:1px solid #ddd; width:100%; max-width:600px;">
                <tr><td><strong>Build Number:</strong></td><td>${env.BUILD_NUMBER}</td></tr>
                <tr><td><strong>Status:</strong></td><td style="color:${currentBuild.currentResult == 'SUCCESS' ? '#28a745' : '#d93025'}; font-weight:bold;">${currentBuild.currentResult}</td></tr>
                <tr><td><strong>Timestamp:</strong></td><td>${new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone('CET'))}</td></tr>
                <tr><td><strong>Total Tests:</strong></td><td>${env.TOTAL_TESTS}</td></tr>
                <tr><td><strong>Passed:</strong></td><td style="color:#28a745;">${env.PASSED_TESTS}</td></tr>
                <tr><td><strong>Failed:</strong></td><td style="color:#d93025;">${env.FAILED_TESTS_COUNT}</td></tr>
                <tr><td><strong>Skipped:</strong></td><td style="color:#ff9800;">${env.SKIPPED_TESTS}</td></tr>
              </table>
              
              ${currentBuild.currentResult == 'FAILURE' ? '<div style="margin-top:20px; background:#fff; padding:15px; border:1px solid #ddd;"><h3 style="color:#d93025; margin-top:0;">Failed Tests:</h3>' + env.FAILED_TESTS_HTML + '</div>' : ''}
              
              ${currentBuild.currentResult == 'FAILURE' ? '<p style="color:#d93025; margin-top:15px;"><strong>Attention:</strong> Please review the failed tests and logs for details.</p>' : ''}
              
              <p style="margin-top:20px;">📎 Full Allure report is attached as <strong>allure-report-single.html</strong> (open directly in browser)</p>
              
              <p style="margin-top:30px; font-size:12px; color:#999;">This is an automated message from the Councilbox QA Automation pipeline.</p>
              
            </body>
          </html>
        """
      )
    }
  }
}
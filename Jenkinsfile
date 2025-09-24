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

    stage('Deploy Allure to Netlify') {
      steps {
        withCredentials([string(credentialsId: 'netlify-token', variable: 'NETLIFY_AUTH_TOKEN')]) {
          script {
            // Generiši Allure HTML report
            bat 'npx allure generate allure-results --clean -o allure-report'

            // Deploy i hvatanje URL-a
            def deployOutput = bat(
              script: """
                npx netlify deploy ^
                  --auth %NETLIFY_AUTH_TOKEN% ^
                  --dir=allure-report ^
                  --prod ^
                  --site=c3ab54ef-3093-46fd-ada4-5d6ca4f18b6e
              """,
              returnStdout: true
            ).trim()

            // Očisti ANSI boje i nepotrebne znakove
            deployOutput = deployOutput.replaceAll("\\u001B\\[[;\\d]*m", "")

            // Regex koji hvata oba formata
            def match = (deployOutput =~ /(Website URL|Deployed to production URL):\s+(https?:\/\/\S+)/)
            if (match && match[0].size() > 2) {
              env.NETLIFY_URL = match[0][2]
              echo "✅ Netlify report URL: ${env.NETLIFY_URL}"
            } else {
              env.NETLIFY_URL = "N/A"
              echo "⚠️ Nije pronađen Netlify URL u outputu!"
              echo "Netlify output:\n${deployOutput}"
            }
          }
        }
      }
    }
  }

  post {
    always {
allure([
      includeProperties: false,
      jdk: '',
      results: [[path: 'allure-results']]
    ])

      
      archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

      emailext(
        subject: "${currentBuild.currentResult == 'SUCCESS' ? 'Councilbox QA Report - Build #' + env.BUILD_NUMBER + ' - SUCCESS' : 'Councilbox QA Failure - Build #' + env.BUILD_NUMBER}",
        from: 'Councilbox Automation <councilboxautotest@gmail.com>',
        to: 'ammar.micijevic@councilbox.com, dzenan.dzakmic@councilbox.com, muhamed.adzamija@councilbox.com, almir.demirovic@councilbox.com',
        mimeType: 'text/html; charset=UTF-8',
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
              
              <p style="margin-top:20px;">
                ${env.NETLIFY_URL != "N/A"
                  ? "<a href='${env.NETLIFY_URL}' target='_blank' style='display:inline-block; padding:10px 20px; background-color:#1a73e8; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;'>Open Full Allure Report</a>"
                  : "Deploy nije uspio — provjerite Jenkins log"}
              </p>
              
              <p style="margin-top:30px; font-size:12px; color:#999;">This is an automated message from the Councilbox QA Automation pipeline.</p>
              
            </body>
          </html>
        """
      )
    }
  }
}
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
                script {
                    // catchError ensures the pipeline continues even if Netlify upload fails
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        withCredentials([string(credentialsId: 'netlify-token', variable: 'NETLIFY_AUTH_TOKEN')]) {
                            bat 'npx allure generate allure-results --clean -o allure-report'

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

                            deployOutput = deployOutput.replaceAll("\\u001B\\[[;\\d]*m", "")

                            def match = (deployOutput =~ /(Website URL|Deployed to production URL):\s+(https?:\/\/\S+)/)
                            if (match && match[0].size() > 2) {
                                env.NETLIFY_URL = match[0][2]
                                echo "✅ Netlify report URL: ${env.NETLIFY_URL}"
                            } else {
                                env.NETLIFY_URL = "N/A"
                                echo "⚠️ Netlify URL not found in output!"
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (env.NETLIFY_URL == null) { env.NETLIFY_URL = "N/A" }
                
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])

                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

                // Email notification with English labels and logic for Netlify limit
                emailext(
                    subject: "${currentBuild.currentResult == 'SUCCESS' ? 'Councilbox QA Report - Build #' + env.BUILD_NUMBER + ' - SUCCESS' : 'Councilbox QA Failure - Build #' + env.BUILD_NUMBER}",
                    from: 'Councilbox Automation <councilboxautotest@gmail.com>',
                    to: 'ammar.micijevic@councilbox.com, dzenan.dzakmic@councilbox.com, muhamed.adzamija@councilbox.com, almir.demirovic@councilbox.com, emiliano.ribaudo@councilbox.com',
                    mimeType: 'text/html; charset=UTF-8',
                    body: """
                        <html>
                          <body style="font-family:Arial, sans-serif; font-size:14px; color:#333; background-color:#f9f9f9; padding:20px;">
                            <h2 style="color:#1a73e8; margin-bottom:5px;">Councilbox QA Pipeline Report</h2>
                            <table style="border-collapse:collapse; background:#fff; padding:10px; border:1px solid #ddd; width:100%; max-width:600px;">
                              <tr><td><strong>Build Number:</strong></td><td>${env.BUILD_NUMBER}</td></tr>
                              <tr><td><strong>Status:</strong></td><td style="color:${currentBuild.currentResult == 'SUCCESS' ? '#28a745' : '#d93025'}; font-weight:bold;">${currentBuild.currentResult}</td></tr>
                              <tr><td><strong>Duration:</strong></td><td>${currentBuild.durationString}</td></tr>
                              <tr><td><strong>Total Tests:</strong></td><td>${env.TOTAL_TESTS}</td></tr>
                              <tr><td><strong>Passed:</strong></td><td style="color:#28a745;">${env.PASSED_TESTS}</td></tr>
                              <tr><td><strong>Failed:</strong></td><td style="color:#d93025;">${env.FAILED_TESTS_COUNT}</td></tr>
                              <tr><td><strong>Skipped:</strong></td><td style="color:#ff9800;">${env.SKIPPED_TESTS}</td></tr>
                            </table>
                            <p style="margin-top:20px;">
                                ${env.NETLIFY_URL != "N/A" 
                                    ? "<a href='${env.NETLIFY_URL}' style='display:inline-block; padding:10px 20px; background-color:#1a73e8; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;'>Open Full Allure Report</a>" 
                                    : "<b style='color:#d93025;'>Report unavailable (Netlify free tier limit reached or upload failed)</b>"}
                            </p>
                            <p style="font-size:12px; color:#999; margin-top:30px;">This is an automated message from the Councilbox QA Automation pipeline.</p>
                          </body>
                        </html>
                    """
                )

                // Sending real data to n8n Webhook for Google Sheets
                bat """
                  curl.exe -X POST http://localhost:5678/webhook/playwright-results ^
                  -H "Content-Type: application/json" ^
                  -d "{\\"status\\":\\"${currentBuild.currentResult}\\",\\"env\\":\\"staging\\",\\"build\\":\\"${env.BUILD_NUMBER}\\",\\"duration\\":\\"${currentBuild.durationString}\\",\\"total\\":\\"${env.TOTAL_TESTS}\\",\\"passed\\":\\"${env.PASSED_TESTS}\\",\\"failed\\":\\"${env.FAILED_TESTS_COUNT}\\",\\"skipped\\":\\"${env.SKIPPED_TESTS}\\",\\"reportUrl\\":\\"${env.NETLIFY_URL}\\"}"
                """
            }
        }
    }
}
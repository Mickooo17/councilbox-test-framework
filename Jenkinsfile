pipeline {
    agent any

    parameters {
        booleanParam(name: 'SEND_EMAIL', defaultValue: true, description: 'Check to send an email notification after the build completes')
        string(name: 'FAILED_TEST_NAME', defaultValue: '', description: 'Name of the failed test')
        string(name: 'TEST_STEPS', defaultValue: '', description: 'Steps to reproduce the failure')
        string(name: 'ERROR_MESSAGE', defaultValue: '', description: 'Error message from the failure')
    }

    tools {
        nodejs 'node20'
    }

    environment {
        CI = 'true'
        GITHUB_USER = 'Mickooo17'
        GITHUB_REPO = 'councilbox-test-framework'
        PAGES_URL = "https://${GITHUB_USER}.github.io/${GITHUB_REPO}"
    }

    options {
        timestamps()
        ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh '''
                  # U Linuxu koristimo export za charset
                  export LANG=en_US.UTF-8
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
                sh 'node scripts/extract-allure-summary.js'
                script {
                    env.TOTAL_TESTS = readFile('total-tests.txt').trim()
                    env.PASSED_TESTS = readFile('passed-tests.txt').trim()
                    env.FAILED_TESTS_COUNT = readFile('failed-tests-count.txt').trim()
                    env.SKIPPED_TESTS = readFile('skipped-tests.txt').trim()
                    env.FAILED_TEST_NAME = readFile('failed-test-name.txt').trim()
                    env.TEST_STEPS = readFile('failed-test-steps.txt').trim()
                    env.ERROR_MESSAGE = readFile('failed-test-error.txt').trim()
                    env.BUILD_STATUS = currentBuild.currentResult
                    env.BUILD_DURATION = currentBuild.durationString
                }
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        def reportPath = "builds/${env.BUILD_NUMBER}"
                        env.FINAL_REPORT_URL = "${env.PAGES_URL}/${reportPath}/"

                        withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                            sh """
                                # Brisanje starog foldera ako postoji
                                rm -rf gh-pages-temp
                                
                                echo "Cloning gh-pages branch..."
                                git clone --branch gh-pages --single-branch https://${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git gh-pages-temp
                                
                                # --- TREND HISTORY LOGIC ---
                                PREV_BUILD=\$((${env.BUILD_NUMBER}-1))
                                if [ -d "gh-pages-temp/builds/\$PREV_BUILD/history" ]; then
                                    echo "Previous history found in build \$PREV_BUILD. Copying to results..."
                                    mkdir -p allure-results/history
                                    cp -r gh-pages-temp/builds/\$PREV_BUILD/history/* allure-results/history/
                                else
                                    echo "No previous history found for trend charts."
                                endif

                                echo "Generating Allure report..."
                                npx allure generate allure-results --clean -o allure-report
                                
                                echo "Preparing deployment folder for build ${env.BUILD_NUMBER}..."
                                mkdir -p gh-pages-temp/builds/${env.BUILD_NUMBER}
                                
                                echo "Copying report files..."
                                cp -r allure-report/* gh-pages-temp/builds/${env.BUILD_NUMBER}/
                                
                                cd gh-pages-temp
                                git config user.name "Jenkins Automation"
                                git config user.email "jenkins@councilbox.com"
                                
                                echo "Committing and pushing to GitHub Pages..."
                                git add builds/
                                git commit -m "Add Allure report for build ${env.BUILD_NUMBER} with history trend"
                                git push https://${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git gh-pages
                            """
                        }
                        echo "✅ Report successfully deployed to: ${env.FINAL_REPORT_URL}"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (env.FINAL_REPORT_URL == null) { env.FINAL_REPORT_URL = "N/A" }
                
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])

                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

                // --- EMAIL NOTIFICATION ---
                if (params.SEND_EMAIL) {
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
                                <div style="margin-top:20px; padding:15px; background-color:#fff3cd; border-left:4px solid #ff9800; border-radius:3px;">
                                  <h3 style="margin-top:0; color:#856404;">First Failed Test Details:</h3>
                                  <p><strong>Test Name:</strong> ${env.FAILED_TEST_NAME ?: 'N/A'}</p>
                                  <p><strong>Steps to Reproduce:</strong> ${env.TEST_STEPS ?: 'N/A'}</p>
                                  <p><strong>Error Message:</strong> ${env.ERROR_MESSAGE ?: 'N/A'}</p>
                                </div>
                                <p style="margin-top:20px;">
                                    <a href='${env.FINAL_REPORT_URL}' style='display:inline-block; padding:10px 20px; background-color:#1a73e8; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;'>Open Full Allure Report (GitHub Pages)</a>
                                </p>
                              </body>
                            </html>
                        """
                    )
                }

                // --- n8n WEBHOOK (Linux/Docker version using curl) ---
                sh """
                    curl -X POST http://host.docker.internal:5678/webhook/playwright-results \
                    -H "Content-Type: application/json" \
                    -d '{
                        "status": "${env.BUILD_STATUS}",
                        "env": "staging",
                        "build": "${env.BUILD_NUMBER}",
                        "duration": "${env.BUILD_DURATION}",
                        "total": "${env.TOTAL_TESTS}",
                        "passed": "${env.PASSED_TESTS}",
                        "failed": "${env.FAILED_TESTS_COUNT}",
                        "skipped": "${env.SKIPPED_TESTS}",
                        "failedTestName": "${env.FAILED_TEST_NAME}",
                        "testSteps": "${env.TEST_STEPS}",
                        "errorMessage": "${env.ERROR_MESSAGE}",
                        "reportUrl": "${env.FINAL_REPORT_URL}"
                    }' || echo "Webhook failed"
                """
            }
        }
    }
}
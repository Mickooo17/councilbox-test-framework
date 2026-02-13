pipeline {
    agent any

    parameters {
        booleanParam(name: 'SEND_EMAIL', defaultValue: true, description: 'Check to send an email notification after the build completes')
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
            steps {
        deleteDir()
        git(
            url: 'git@github.com:Mickooo17/councilbox-test-framework.git',
            branch: 'main',
            credentialsId: 'github-ssh'
        )
    }
}


        stage('Install Dependencies') {
            steps {
                bat 'cmd /c npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'cmd /c npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                bat '''
                  @echo off
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
                    env.FAILED_TEST_NAME = readFile('failed-test-name.txt').trim()
                    env.TEST_STEPS = readFile('failed-test-steps.txt').trim()
                    env.ERROR_MESSAGE = readFile('failed-test-error.txt').trim()
                    
                    // Set status based on test results
                    if (env.FAILED_TESTS_COUNT.toInteger() > 0) {
                        currentBuild.result = 'UNSTABLE'
                        env.BUILD_STATUS = 'UNSTABLE'
                    } else {
                        env.BUILD_STATUS = currentBuild.currentResult ?: 'SUCCESS'
                    }
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
                            bat """
                                @echo off
                                if exist gh-pages-temp rmdir /s /q gh-pages-temp
                                
                                echo Cloning gh-pages branch...
                                git clone --branch gh-pages --single-branch https://%GITHUB_TOKEN%@github.com/%GITHUB_USER%/%GITHUB_REPO%.git gh-pages-temp
                                
                                :: --- TREND HISTORY LOGIC ---
                                set /a PREV_BUILD=%BUILD_NUMBER%-1
                                if exist gh-pages-temp\\builds\\%PREV_BUILD%\\history (
                                    echo Previous history found in build %PREV_BUILD%. Copying to results...
                                    if not exist allure-results\\history mkdir allure-results\\history
                                    xcopy /s /e /y gh-pages-temp\\builds\\%PREV_BUILD%\\history allure-results\\history\\
                                ) else (
                                    echo No previous history found for trend charts.
                                )

                                echo Generating Allure report...
                                call npx allure generate allure-results --clean -o allure-report
                                
                                echo Preparing deployment folder for build %BUILD_NUMBER%...
                                if not exist gh-pages-temp\\builds mkdir gh-pages-temp\\builds
                                mkdir gh-pages-temp\\builds\\%BUILD_NUMBER%
                                
                                echo Copying report files...
                                xcopy /s /e /y allure-report gh-pages-temp\\builds\\%BUILD_NUMBER%\\
                                
                                cd gh-pages-temp
                                git config user.name "Jenkins Automation"
                                git config user.email "jenkins@councilbox.com"
                                
                                echo Committing and pushing to GitHub Pages...
                                git add builds/
                                git commit -m "Add Allure report for build ${env.BUILD_NUMBER} with history trend"
                                git push https://%GITHUB_TOKEN%@github.com/%GITHUB_USER%/%GITHUB_REPO%.git gh-pages
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
                    echo "📧 Sending email notification..."
                    emailext(
                        subject: "${currentBuild.currentResult == 'SUCCESS' ? 'Councilbox QA Report - Build #' + env.BUILD_NUMBER + ' - SUCCESS' : 'Councilbox QA Failure - Build #' + env.BUILD_NUMBER}",
                        from: 'Councilbox Automation <councilboxautotest@gmail.com>',
                        to: 'ammar.micijevic@councilbox.com, dzenan.dzakmic@councilbox.com, muhamed.adzamija@councilbox.com, almir.demirovic@councilbox.com, emiliano.ribaudo@councilbox.com',
                        mimeType: 'text/html; charset=UTF-8',
                        body: """
                            <html>
                              <body style="font-family:Arial, sans-serif; font-size:14px; color:#333;">
                                <h2 style="color:#1a73e8;">Councilbox QA Report - Build #${env.BUILD_NUMBER}</h2>
                                
                                <p><strong>Status:</strong> <span style="color:${currentBuild.currentResult == 'SUCCESS' ? '#28a745' : '#d93025'}; font-weight:bold; font-size:16px;">${currentBuild.currentResult}</span></p>
                                
                                <p style="font-size:16px;">
                                  <strong>Passed:</strong> <span style="color:#28a745;">${env.PASSED_TESTS}</span> | 
                                  <strong>Failed:</strong> <span style="color:#d93025;">${env.FAILED_TESTS_COUNT}</span>
                                  <strong>Skipped:</strong> <span style="color:#ff9800;">${env.SKIPPED_TESTS}</span>
                                </p>
                                
                                <div style="margin-top:15px; padding:10px; background-color:#fff3cd; border-left:4px solid #ff9800; border-radius:3px;">
                                  <h3 style="margin-top:0; color:#856404;">First Failed Test Details:</h3>
                                  <p><strong>Test Name:</strong> ${env.FAILED_TEST_NAME ?: 'N/A'}</p>
                                  <p><strong>Steps to Reproduce:</strong> ${env.TEST_STEPS ?: 'N/A'}</p>
                                  <p><strong>Error Message:</strong> ${env.ERROR_MESSAGE ?: 'N/A'}</p>
                                </div>
                                
                                <p style="margin-top:15px;">
                                    <a href='${env.FINAL_REPORT_URL}' style='display:inline-block; padding:8px 16px; background-color:#1a73e8; color:#fff; text-decoration:none; border-radius:4px; font-weight:bold;'>Open Full Allure Report (GitHub Pages)</a>
                                </p>
                              </body>
                            </html>
                        """
                    )
                }

                // --- n8n WEBHOOK (Windows version using curl) ---
                bat "curl -X POST http://localhost:5678/webhook/playwright-results -H \"Content-Type: application/json\" -d \"{\\\"status\\\":\\\"${env.BUILD_STATUS}\\\",\\\"env\\\":\\\"staging\\\",\\\"build\\\":\\\"${env.BUILD_NUMBER}\\\",\\\"duration\\\":\\\"${env.BUILD_DURATION}\\\",\\\"total\\\":\\\"${env.TOTAL_TESTS}\\\",\\\"passed\\\":\\\"${env.PASSED_TESTS}\\\",\\\"failed\\\":\\\"${env.FAILED_TESTS_COUNT}\\\",\\\"skipped\\\":\\\"${env.SKIPPED_TESTS}\\\",\\\"failedTestName\\\":\\\"${env.FAILED_TEST_NAME}\\\",\\\"testSteps\\\":\\\"${env.TEST_STEPS}\\\",\\\"errorMessage\\\":\\\"${env.ERROR_MESSAGE}\\\",\\\"reportUrl\\\":\\\"${env.FINAL_REPORT_URL}\\\"}\" || echo Webhook failed"
            }
        }
    }
}
pipeline {
    agent any

    parameters {
        booleanParam(
            name: 'SEND_EMAIL',
            defaultValue: true,
            description: 'Send email notification after build'
        )
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
            steps { cleanWs() }
        }

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install Dependencies') {
            steps { bat 'cmd /c npm ci' }
        }

        stage('Install Playwright Browsers') {
            steps { bat 'cmd /c npx playwright install --with-deps' }
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
                }
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {

                        def reportPath = "builds/${env.BUILD_NUMBER}"
                        env.FINAL_REPORT_URL = "${env.PAGES_URL}/${reportPath}/"

                        withCredentials([
                            string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')
                        ]) {
                            bat """
                                @echo off
                                if exist gh-pages-temp rmdir /s /q gh-pages-temp

                                git clone --branch gh-pages --single-branch https://%GITHUB_TOKEN%@github.com/%GITHUB_USER%/%GITHUB_REPO%.git gh-pages-temp

                                set /a PREV_BUILD=%BUILD_NUMBER%-1
                                if exist gh-pages-temp\\builds\\%PREV_BUILD%\\history (
                                    if not exist allure-results\\history mkdir allure-results\\history
                                    xcopy /s /e /y gh-pages-temp\\builds\\%PREV_BUILD%\\history allure-results\\history\\
                                )

                                call npx allure generate allure-results --clean -o allure-report

                                if not exist gh-pages-temp\\builds mkdir gh-pages-temp\\builds
                                mkdir gh-pages-temp\\builds\\%BUILD_NUMBER%
                                xcopy /s /e /y allure-report gh-pages-temp\\builds\\%BUILD_NUMBER%\\

                                cd gh-pages-temp
                                git config user.name "Jenkins Automation"
                                git config user.email "jenkins@councilbox.com"
                                git add builds/
                                git commit -m "Add Allure report for build ${env.BUILD_NUMBER}"
                                git push https://%GITHUB_TOKEN%@github.com/%GITHUB_USER%/%GITHUB_REPO%.git gh-pages
                            """
                        }

                        echo "Report deployed to: ${env.FINAL_REPORT_URL}"
                    }
                }
            }
        }
    }

    post {
        always {
            script {

                if (env.FINAL_REPORT_URL == null) {
                    env.FINAL_REPORT_URL = "N/A"
                }

                // --------------------------------------
                // ALLURE FAILURE EXTRACTION
                // --------------------------------------
                def failedTestsDetails = []

                try {
                    def files = findFiles(glob: 'allure-results/*-result.json')

                    for (file in files) {
                        def json = readJSON file: file.path

                        if (json.status == 'failed' || json.status == 'broken') {

                            def fullError = json.statusDetails?.message ?: "Unknown error"
                            def errorMessage = fullError ? fullError.split('\n')[0] : "Unknown error"

                            def failedStepObj = json.steps?.find {
                                it.status == 'failed' || it.status == 'broken'
                            }

                            def stepFlow = json.steps
                                    ?.collect { it.name }
                                    ?.join(" -> ") ?: "No steps recorded"

                            failedTestsDetails << [
                                test_name          : json.name ?: "Unknown test",
                                test_id            : json.uuid ?: "N/A",
                                status             : json.status,
                                error_message      : errorMessage,
                                full_error_details : fullError,
                                failed_step        : failedStepObj?.name ?: "Unknown step",
                                failed_step_error  : failedStepObj?.statusDetails?.message ?: "",
                                steps_to_reproduce : stepFlow,
                                duration           : (json.stop - json.start) ?: 0,
                                severity           : json.severity ?: "normal",
                                timestamp          : json.start ?: "N/A"
                            ]
                        }
                    }
                } catch (Exception e) {
                    echo "Allure failure extraction failed: ${e.message}"
                }

                // --------------------------------------
                // FORCE BUILD STATUS *BEFORE* PAYLOAD
                // --------------------------------------
                if (failedTestsDetails.size() > 0) {
                    echo "WARNING: ${failedTestsDetails.size()} test(s) failed - Setting build to UNSTABLE"
                    currentBuild.result = 'UNSTABLE'
                }

                // --------------------------------------
                // MANUAL JSON (SANDBOX SAFE)
                // --------------------------------------
                def failuresJsonParts = []

                for (f in failedTestsDetails) {
                    failuresJsonParts << """{
                        "test_name":"${f.test_name}",
                        "test_id":"${f.test_id}",
                        "status":"${f.status}",
                        "error_message":"${f.error_message}",
                        "full_error_details":"${f.full_error_details}",
                        "failed_step":"${f.failed_step}",
                        "failed_step_error":"${f.failed_step_error}",
                        "steps_to_reproduce":"${f.steps_to_reproduce}",
                        "duration":${f.duration},
                        "severity":"${f.severity}",
                        "timestamp":"${f.timestamp}"
                    }"""
                }

                def failuresJson = "[${failuresJsonParts.join(',')}]"

                def webhookPayload = """{
                    "build":"${env.BUILD_NUMBER}",
                    "status":"${currentBuild.currentResult}",
                    "report_url":"${env.FINAL_REPORT_URL}",
                    "failures":${failuresJson}
                }"""

                writeFile file: 'webhook-payload.json', text: webhookPayload

                // --------------------------------------
                // EMAIL (SUMMARY ONLY)
                // --------------------------------------
                if (params.SEND_EMAIL) {
                    emailext(
                        subject: currentBuild.currentResult == 'SUCCESS'
                            ? "Councilbox QA Report - Build #${env.BUILD_NUMBER} - SUCCESS"
                            : "Councilbox QA Failure - Build #${env.BUILD_NUMBER}",

                        from: 'Councilbox Automation <councilboxautotest@gmail.com>',
                        to: 'ammar.micijevic@councilbox.com',
                        mimeType: 'text/html; charset=UTF-8',

                        body: """
                            <html>
                              <body>
                                <h2>Councilbox QA Report - Build #${env.BUILD_NUMBER}</h2>
                                <p>Status: ${currentBuild.currentResult}</p>
                                <p>Passed: ${env.PASSED_TESTS} | Failed: ${env.FAILED_TESTS_COUNT}</p>
                                <a href="${env.FINAL_REPORT_URL}">View Allure Report</a>
                              </body>
                            </html>
                        """
                    )
                }

                // --------------------------------------
                // N8N WEBHOOK (WINDOWS SAFE)
                // --------------------------------------
                echo "Triggering n8n webhook..."
                bat 'curl.exe -X POST http://localhost:5678/webhook/playwright-results -H "Content-Type: application/json" -d @webhook-payload.json'
            }
        }
    }
}
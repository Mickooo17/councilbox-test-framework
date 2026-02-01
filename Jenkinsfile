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
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
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
                // ALLURE FAILURE EXTRACTION (FOR N8N)
                // --------------------------------------
                def failedTestsDetails = []

                try {
                    def files = findFiles(glob: 'allure-results/*-result.json')

                    for (file in files) {
                        def json = readJSON file: file.path

                        if (json.status == 'failed' || json.status == 'broken') {

                            def testName = json.name ?: "Unknown test"

                            def fullErrorDetails = json.statusDetails?.message ?: "Unknown error"
                            
                            def errorMessage = "Unknown error"
                            if (fullErrorDetails && fullErrorDetails != "Unknown error") {
                                def lines = fullErrorDetails.split('\n')
                                if (lines && lines.length > 0) {
                                    errorMessage = lines[0]
                                }
                            }

                            def failedStepObj = json.steps?.find {
                                it.status == 'failed' || it.status == 'broken'
                            }

                            def failedStep = failedStepObj?.name ?: "Unknown step"
                            def failedStepError = failedStepObj?.statusDetails?.message ?: ""

                            def stepFlow = json.steps
                                    ?.collect { it.name }
                                    ?.join(" -> ") ?: "No steps recorded"

                            def stepDetails = json.steps?.collect { step ->
                                [
                                    name: step.name,
                                    status: step.status,
                                    duration: step.stop - step.start
                                ]
                            } ?: []

                            failedTestsDetails << [
                                test_name           : testName,
                                test_id             : json.uuid ?: "N/A",
                                status              : json.status,
                                error_message       : errorMessage,
                                full_error_details  : fullErrorDetails,
                                failed_step         : failedStep,
                                failed_step_error   : failedStepError,
                                steps_to_reproduce  : stepFlow,
                                all_steps           : stepDetails,
                                duration            : json.stop - json.start,
                                severity            : json.severity ?: "normal",
                                timestamp           : json.start ?: "N/A"
                            ]
                        }
                    }
                } catch (Exception e) {
                    echo "Allure failure extraction failed: ${e.message}"
                }

                // Convert failedTestsDetails to JSON string manually (Jenkins sandbox safe)
                def failuresJson = "[]"
                if (failedTestsDetails && failedTestsDetails.size() > 0) {
                    def jsonParts = []
                    for (failure in failedTestsDetails) {
                        def stepDetailsParts = []
                        if (failure.all_steps) {
                            for (step in failure.all_steps) {
                                stepDetailsParts << """{"name":"${step.name?.replaceAll('"', '\\\\"')}","status":"${step.status}","duration":${step.duration ?: 0}}"""
                            }
                        }
                        def stepsJson = "[${stepDetailsParts.join(', ')}]"
                        
                        jsonParts << """{
                            "test_name":"${failure.test_name?.replaceAll('"', '\\\\"')}",
                            "test_id":"${failure.test_id}",
                            "status":"${failure.status}",
                            "error_message":"${failure.error_message?.replaceAll('"', '\\\\"')}",
                            "full_error_details":"${failure.full_error_details?.replaceAll('"', '\\\\"')}",
                            "failed_step":"${failure.failed_step?.replaceAll('"', '\\\\"')}",
                            "failed_step_error":"${failure.failed_step_error?.replaceAll('"', '\\\\"')}",
                            "steps_to_reproduce":"${failure.steps_to_reproduce?.replaceAll('"', '\\\\"')}",
                            "all_steps":${stepsJson},
                            "duration":${failure.duration ?: 0},
                            "severity":"${failure.severity}",
                            "timestamp":"${failure.timestamp}"
                        }"""
                    }
                    failuresJson = "[${jsonParts.join(', ')}]"
                }

                // --------------------------------------
                // EMAIL (SUMMARY ONLY)
                // --------------------------------------
                if (params.SEND_EMAIL) {
                    emailext(
                        subject: currentBuild.currentResult == 'SUCCESS'
                            ? "Councilbox QA Report - Build #${env.BUILD_NUMBER} - SUCCESS"
                            : "Councilbox QA Failure - Build #${env.BUILD_NUMBER}",

                        from: 'Councilbox Automation <councilboxautotest@gmail.com>',
                        to: 'ammar.micijevic@councilbox.com, dzenan.dzakmic@councilbox.com, muhamed.adzamija@councilbox.com, almir.demirovic@councilbox.com, emiliano.ribaudo@councilbox.com',
                        mimeType: 'text/html; charset=UTF-8',

                        body: """
                            <html>
                              <body style="font-family:Arial, sans-serif;">
                                <h2>Councilbox QA Report - Build #${env.BUILD_NUMBER}</h2>
                                <p><strong>Status:</strong> ${currentBuild.currentResult}</p>
                                <p>
                                  <strong>Tests:</strong>
                                  Passed: ${env.PASSED_TESTS} /
                                  Failed: ${env.FAILED_TESTS_COUNT}
                                </p>
                                <p>
                                  <a href="${env.FINAL_REPORT_URL}">
                                    View Full Allure Report
                                  </a>
                                </p>
                              </body>
                            </html>
                        """
                    )
                }

                // --------------------------------------
                // N8N WEBHOOK (ONE-LINE CURL, WINDOWS SAFE)
                // --------------------------------------
                echo "Triggering n8n webhook..."

                bat "curl.exe -X POST http://localhost:5678/webhook/playwright-results -H \"Content-Type: application/json\" -d \"{\\\"build\\\":\\\"${env.BUILD_NUMBER}\\\",\\\"status\\\":\\\"${currentBuild.currentResult}\\\",\\\"report_url\\\":\\\"${env.FINAL_REPORT_URL}\\\",\\\"failures\\\":${failuresJson}}\""
            }
        }
    }
}

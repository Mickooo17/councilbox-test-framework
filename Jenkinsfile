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
            steps { checkout scm }
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

                        withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
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
                
                // Kreiramo mapu podataka koju ćemo poslati
                def payloadMap = [
                    status: currentBuild.currentResult,
                    build: env.BUILD_NUMBER,
                    reportUrl: env.FINAL_REPORT_URL,
                    test_name: "All tests passed",
                    error_reason: "N/A",
                    failed_step: "N/A",
                    steps_to_reproduce: "N/A"
                ]

                // --- EKSTRAKCIJA DETALJA IZ ALLURE JSON-A ---
                try {
                    def files = findFiles(glob: 'allure-results/*-result.json')
                    for (file in files) {
                        def json = readJSON file: file.path
                        if (json.status == 'failed' || json.status == 'broken') {
                            payloadMap.test_name = json.name ?: "Unknown Test"
                            
                            // Duboka pretraga za Error Message
                            def failedStepObj = json.steps.find { it.status == 'failed' || it.status == 'broken' }
                            payloadMap.error_reason = failedStepObj?.statusDetails?.message?.split('\n')?.getAt(0) ?: json.statusDetails?.message?.split('\n')?.getAt(0) ?: "Check Report"
                            payloadMap.failed_step = failedStepObj ? failedStepObj.name : "Assertion Failure"
                            
                            // Skraćivanje koraka da ne preopteretimo paket
                            def stepsList = json.steps.collect { it.name }
                            payloadMap.steps_to_reproduce = stepsList.size() > 7 ? stepsList[0..6].join(" -> ") + "..." : stepsList.join(" -> ")
                            break
                        }
                    }
                } catch (Exception e) {
                    echo "Allure detail extraction failed: ${e.message}"
                }

                allure([includeProperties: false, jdk: '', results: [[path: 'allure-results']]])
                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

                // --- BASE64 ENKODIRANJE (ZA WINDOWS STABILNOST) ---
                def jsonString = groovy.json.JsonOutput.toJson(payloadMap)
                def base64Payload = jsonString.getBytes("UTF-8").encodeBase64().toString()

                // --- EMAIL NOTIFIKACIJA ---
                if (params.SEND_EMAIL) {
                    emailext(
                        subject: "${currentBuild.currentResult == 'SUCCESS' ? 'Councilbox QA Report - Build #' + env.BUILD_NUMBER + ' - SUCCESS' : 'Councilbox QA Failure - Build #' + env.BUILD_NUMBER}",
                        from: 'Councilbox Automation <councilboxautotest@gmail.com>',
                        to: 'ammar.micijevic@councilbox.com',
                        mimeType: 'text/html; charset=UTF-8',
                        body: "<h2>Report Build #${env.BUILD_NUMBER}</h2><p>Status: ${currentBuild.currentResult}</p><a href='${env.FINAL_REPORT_URL}'>View Report</a>"
                    )
                }

                // --- n8n WEBHOOK (Šaljemo Base64 string pod ključem "data") ---
                echo "Triggering n8n webhook with Base64 payload..."
                bat "curl.exe -X POST http://localhost:5678/webhook/playwright-results -H \"Content-Type: application/json\" -d \"{\\\"data\\\":\\\"${base64Payload}\\\"}\""
            }
        }
    }
}
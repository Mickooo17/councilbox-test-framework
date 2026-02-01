pipeline {
    agent any

    parameters {
        booleanParam(name: 'SEND_EMAIL', defaultValue: true, description: 'Check to send an email notification')
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
        }

        stage('Extract Allure Summary') {
            steps {
                script {
                    try {
                        bat 'cmd /c node scripts/extract-allure-summary.js'
                        env.TOTAL_TESTS = readFile('total-tests.txt').trim()
                        env.PASSED_TESTS = readFile('passed-tests.txt').trim()
                        env.FAILED_TESTS_COUNT = readFile('failed-tests-count.txt').trim()
                        env.SKIPPED_TESTS = readFile('skipped-tests.txt').trim()
                    } catch (Exception e) {
                        echo "Summary extraction failed, using defaults."
                        env.TOTAL_TESTS = "0"; env.PASSED_TESTS = "0"; env.FAILED_TESTS_COUNT = "0"; env.SKIPPED_TESTS = "0"
                    }
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
                                git commit -m "Add Allure report for build ${env.BUILD_NUMBER}"
                                git push https://%GITHUB_TOKEN%@github.com/%GITHUB_USER%/%GITHUB_REPO%.git gh-pages
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (env.FINAL_REPORT_URL == null) { env.FINAL_REPORT_URL = "N/A" }
                
                def failedStep = "N/A"
                def errorReason = "No failure detected"
                def stepsToReproduce = "N/A"
                def testName = "All tests passed"

                // --- NOVA LOGIKA ZA EKSTRAKCIJU GREŠKE --- 
                try {
                    def files = findFiles(glob: 'allure-results/*-result.json')
                    for (file in files) {
                        def json = readJSON file: file.path
                        if (json.status == 'failed' || json.status == 'broken') {
                            testName = json.name ?: "Unknown Test"
                            
                            // Prvo gledamo specifični korak koji je pao 
                            def failedStepObj = json.steps.find { it.status == 'failed' || it.status == 'broken' }
                            
                            // Ako korak ima poruku (tu obično piše "Expected URL..."), uzmi nju 
                            if (failedStepObj?.statusDetails?.message) {
                                errorReason = failedStepObj.statusDetails.message
                            } else {
                                errorReason = json.statusDetails?.message ?: "Check Allure Report"
                            }
                            
                            failedStep = failedStepObj ? failedStepObj.name : "Assertion Failure"
                            stepsToReproduce = json.steps.collect { it.name }.join(" -> ")
                            break
                        }
                    }
                } catch (Exception e) {
                    echo "Allure JSON extraction failed: ${e.message}"
                }

                allure([includeProperties: false, jdk: '', results: [[path: 'allure-results']]])
                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

                // --- ČIŠĆENJE ZA CURL (Windows Safe) --- 
                def cleanTestName = testName.replace('"', '').replace('\\', '/')
                def cleanError = errorReason.split('\n')[0].replace('"', '').replace('\\', '/')
                def cleanSteps = stepsToReproduce.replace('"', '').replace('\\', '/')
                def cleanFailedStep = failedStep.replace('"', '').replace('\\', '/')

                // --- EMAIL ---
                if (params.SEND_EMAIL) {
                    emailext(
                        subject: "QA Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                        from: 'councilboxautotest@gmail.com',
                        to: 'ammar.micijevic@councilbox.com',
                        body: "Build status: ${currentBuild.currentResult}\nReport: ${env.FINAL_REPORT_URL}",
                        mimeType: 'text/html'
                    )
                }

                // --- n8n WEBHOOK (Single line Fix) --- 
                echo "Triggering n8n with: ${cleanError}"
                bat "curl.exe -X POST http://localhost:5678/webhook/playwright-results -H \"Content-Type: application/json\" -d \"{\\\"status\\\":\\\"${currentBuild.currentResult}\\\",\\\"test_name\\\":\\\"${cleanTestName}\\\",\\\"build\\\":\\\"${env.BUILD_NUMBER}\\\",\\\"failed_step\\\":\\\"${cleanFailedStep}\\\",\\\"error_reason\\\":\\\"${cleanError}\\\",\\\"steps_to_reproduce\\\":\\\"${cleanSteps}\\\",\\\"reportUrl\\\":\\\"${env.FINAL_REPORT_URL}\\\"}\""
            }
        }
    }
}
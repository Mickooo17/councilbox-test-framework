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

                // --- DINAMIČKO IZVLAČENJE GREŠKE (BEZ HARDKODIRANJA) ---
                try {
                    // Tražimo JSON koji sadrži rezultate testa
                    def resultFiles = findFiles(glob: 'allure-results/*-result.json')
                    if (resultFiles.length > 0) {
                        def lastResult = readJSON file: resultFiles[0].path
                        // Izvlačimo poruku o grešci (npr. Timeout error)
                        env.ERROR_MESSAGE = lastResult.statusDetails?.message?.split('\n')?.getAt(0) ?: "Nema poruke o grešci"
                        // Izvlačimo naziv koraka koji je pao
                        def failedStepObj = lastResult.steps.find { it.status == 'failed' || it.status == 'broken' }
                        env.FAILED_STEP = failedStepObj ? failedStepObj.name : "Nepoznat korak"
                        
                        // Skupljamo sve prethodne korake u jedan niz (Steps to Reproduce)
                        env.ALL_STEPS = lastResult.steps.collect { it.name }.join(" -> ")
                    } else {
                        env.ERROR_MESSAGE = "Nisu pronađeni Allure rezultati"
                        env.FAILED_STEP = "N/A"
                        env.ALL_STEPS = "N/A"
                    }
                } catch (Exception e) {
                    env.ERROR_MESSAGE = "Greška pri čitanju JSON-a: ${e.message}"
                    env.FAILED_STEP = "Error"
                    env.ALL_STEPS = "Error"
                }

                allure([includeProperties: false, jdk: '', results: [[path: 'allure-results']]])
                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

                // --- n8n WEBHOOK SA DINAMIČKIM PODACIMA ---
                // Čistimo navodnike i nove redove za siguran curl prenos
                def safeError = env.ERROR_MESSAGE.replace('"', '\\"').replace('\n', ' ')
                def safeSteps = env.ALL_STEPS.replace('"', '\\"').replace('\n', ' ')

                bat """
                  curl.exe -X POST http://localhost:5678/webhook/playwright-results ^
                  -H "Content-Type: application/json" ^
                  -d "{\\"status\\":\\"${currentBuild.currentResult}\\", ^
                      \\"env\\":\\"staging\\", ^
                      \\"build\\":\\"${env.BUILD_NUMBER}\\", ^
                      \\"failed_step\\":\\"${env.FAILED_STEP}\\", ^
                      \\"error_reason\\":\\"${safeError}\\", ^
                      \\"steps_to_reproduce\\":\\"${safeSteps}\\", ^
                      \\"reportUrl\\":\\"${env.FINAL_REPORT_URL}\\"}"
                """
            }
        }
    }
}
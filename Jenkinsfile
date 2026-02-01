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
                script {
                    try {
                        bat 'cmd /c node scripts/extract-allure-summary.js'
                        env.TOTAL_TESTS = readFile('total-tests.txt').trim()
                        env.PASSED_TESTS = readFile('passed-tests.txt').trim()
                        env.FAILED_TESTS_COUNT = readFile('failed-tests-count.txt').trim()
                        env.SKIPPED_TESTS = readFile('skipped-tests.txt').trim()
                    } catch (e) {
                        echo "Summary extraction failed"
                        env.TOTAL_TESTS = "0"; env.PASSED_TESTS = "0"; env.FAILED_TESTS_COUNT = "0"
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
                // 1. Inicijalizacija Allure-a i pauza
                allure([includeProperties: false, jdk: '', results: [[path: 'allure-results']]])
                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
                sleep time: 5, unit: 'SECONDS' 

                if (env.FINAL_REPORT_URL == null) { env.FINAL_REPORT_URL = "N/A" }
                
                def fName = "Test build"
                def fError = "Check report for details"
                def fStep = "N/A"
                def fPath = "N/A"

                try {
                    // DEBUG: Izlistaj fajlove da vidimo putanju u logu
                    echo "--- DEBUG: Lista fajlova u allure-results ---"
                    bat 'dir allure-results'
                    
                    // 2. Duboka pretraga za JSON rezultatima
                    def files = findFiles(glob: '**/allure-results/*-result.json')
                    echo "Pronađeno Allure fajlova: ${files.length}"
                    
                    // Ako gore ne nađe ništa, probaj širu pretragu
                    if (files.length == 0) {
                        files = findFiles(glob: '**/*-result.json')
                        echo "Pronađeno JSON fajlova bilo gdje: ${files.length}"
                    }
                    
                    for (file in files) {
                        def json = readJSON file: file.path
                        if (json.status == 'failed' || json.status == 'broken') {
                            echo "Obrađujem grešku iz fajla: ${file.path}"
                            fName = json.name ?: "Test Failed"
                            fError = json.statusDetails?.message?.split('\n')?.getAt(0) ?: "Error detected"
                            
                            def stepObj = json.steps.find { it.status == 'failed' || it.status == 'broken' }
                            fStep = stepObj ? stepObj.name : "Assertion"
                            
                            def stepsList = json.steps.collect { it.name }
                            fPath = stepsList.size() > 5 ? stepsList.take(5).join(" -> ") + "..." : stepsList.join(" -> ")
                            break 
                        }
                    }
                } catch (e) { 
                    echo "Greška u skripti: ${e.message}"
                }

                // 3. Agresivno čišćenje za Windows CMD
                fName = fName.replaceAll(/[^a-zA-Z0-9 ]/, "")
                fError = fError.replaceAll(/[^a-zA-Z0-9 ]/, "")
                fStep = fStep.replaceAll(/[^a-zA-Z0-9 ]/, "")
                fPath = fPath.replaceAll(/[^a-zA-Z0-9 >]/, "")

                // 4. Email notifikacija
                if (params.SEND_EMAIL) {
                    emailext(
                        subject: "QA Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                        from: 'Councilbox Automation <councilboxautotest@gmail.com>',
                        to: 'ammar.micijevic@councilbox.com',
                        mimeType: 'text/html',
                        body: "Status: ${currentBuild.currentResult}<br>Test: ${fName}<br>Error: ${fError}<br><a href='${env.FINAL_REPORT_URL}'>Full Report</a>"
                    )
                }

                // 5. n8n Webhook poziv
                echo "Slanje na n8n: Name=${fName}, Error=${fError}"
                bat "curl.exe -X POST http://localhost:5678/webhook/playwright-results -H \"Content-Type: application/json\" -d \"{\\\"status\\\":\\\"${currentBuild.currentResult}\\\",\\\"test_name\\\":\\\"${fName}\\\",\\\"build\\\":\\\"${env.BUILD_NUMBER}\\\",\\\"failed_step\\\":\\\"${fStep}\\\",\\\"error_reason\\\":\\\"${fError}\\\",\\\"steps_to_reproduce\\\":\\\"${fPath}\\\",\\\"reportUrl\\\":\\\"${env.FINAL_REPORT_URL}\\\"}\""
            }
        }
    }
}
pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    environment {
        CI = 'true'
        // Promijeni ovo na tvoj GitHub profil i repo
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
                    // env.FAILED_TESTS_HTML = readFile('failed-tests.html') // Opciono ako ti treba za email
                }
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        // Generisanje Allure Reporta lokalno
                        bat 'npx allure generate allure-results --clean -o allure-report'
                        
                        // Definisanje putanje: builds/203
                        def reportPath = "builds/${env.BUILD_NUMBER}"
                        env.FINAL_REPORT_URL = "${env.PAGES_URL}/${reportPath}/"

                        withCredentials([usernamePassword(credentialsId: 'github-token', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                            bat """
                                @echo off
                                if exist gh-pages-temp rmdir /s /q gh-pages-temp
                                git clone --branch gh-pages https://%GIT_USERNAME%:%GIT_PASSWORD%@github.com/%GITHUB_USER%/%GITHUB_REPO%.git gh-pages-temp
                                
                                xcopy /s /e /i allure-report gh-pages-temp\\${reportPath}
                                
                                cd gh-pages-temp
                                git config user.name "Jenkins Automation"
                                git config user.email "jenkins@councilbox.com"
                                git add .
                                git commit -m "Add report for build ${env.BUILD_NUMBER}"
                                git push https://%GIT_USERNAME%:%GIT_PASSWORD%@github.com/%GITHUB_USER%/%GITHUB_REPO%.git gh-pages
                            """
                        }
                        echo "✅ Report deployed to: ${env.FINAL_REPORT_URL}"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Ako deploy nije uspio, stavljamo N/A za n8n i email
                if (env.FINAL_REPORT_URL == null) { env.FINAL_REPORT_URL = "N/A" }
                
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])

                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

                // Email notification
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
                                ${env.FINAL_REPORT_URL != "N/A" 
                                    ? "<a href='${env.FINAL_REPORT_URL}' style='display:inline-block; padding:10px 20px; background-color:#1a73e8; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;'>Open Full Allure Report (GitHub Pages)</a>" 
                                    : "<b style='color:#d93025;'>Report upload failed</b>"}
                            </p>
                            <p style="font-size:12px; color:#999; margin-top:30px;">This is an automated message from the Councilbox QA Automation pipeline.</p>
                          </body>
                        </html>
                    """
                )

                // Slanje na n8n Webhook sa NOVIM URL-om
                bat """
                  curl.exe -X POST http://localhost:5678/webhook/playwright-results ^
                  -H "Content-Type: application/json" ^
                  -H "Accept: application/json" ^
                  -d "{\\"status\\":\\"${currentBuild.currentResult}\\",\\"env\\":\\"staging\\",\\"build\\":\\"${env.BUILD_NUMBER}\\",\\"duration\\":\\"${currentBuild.durationString}\\",\\"total\\":\\"${env.TOTAL_TESTS}\\",\\"passed\\":\\"${env.PASSED_TESTS}\\",\\"failed\\":\\"${env.FAILED_TESTS_COUNT}\\",\\"skipped\\":\\"${env.SKIPPED_TESTS}\\",\\"reportUrl\\":\\"${env.FINAL_REPORT_URL}\\"}"
                """
            }
        }
    }
}
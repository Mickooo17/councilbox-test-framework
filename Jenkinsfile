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
        TEST_ENV = 'staging'
        JAVA_TOOL_OPTIONS = '-Dfile.encoding=UTF-8 -Dstdout.encoding=UTF-8 -Dstderr.encoding=UTF-8'
        GITHUB_USER = 'Mickooo17'
        GITHUB_REPO = 'councilbox-test-framework'
        PAGES_URL = "https://${GITHUB_USER}.github.io/${GITHUB_REPO}"

        // Staging credentials loaded from Jenkins Credentials Store
        STAGING_ADMIN_PROFESSIONAL_PASSWORD = credentials('STAGING_ADMIN_PROFESSIONAL_PASSWORD')
        STAGING_SUPERADMIN_PASSWORD         = credentials('STAGING_SUPERADMIN_PASSWORD')
    }

    options {
        timestamps()
        ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Checkout & Clean Reports') {
            steps {
                // Brzinsko brisanje samo foldera sa starim izvještajima, bez diranja koda
                bat 'if exist playwright-report rmdir /s /q playwright-report'
                bat 'if exist test-results rmdir /s /q test-results'
                bat 'if exist allure-results rmdir /s /q allure-results'

                // Ako postoji stari teški .git sa starim objektima, ukloni ga radi trenutnog 2-sekundnog shallow clone-a
                bat 'if exist .git rmdir /s /q .git'

                // Shallow clone (depth 1) za ultra-brzi checkout zadnjeg commita
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [
                        [$class: 'CloneOption', depth: 1, noTags: true, reference: '', shallow: true]
                    ],
                    submoduleCfg: [],
                    userRemoteConfigs: [[
                        credentialsId: 'github-ssh',
                        url: 'https://github.com/Mickooo17/councilbox-test-framework.git'
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                // Ubrzana instalacija bez sigurnosnih provjera i fund poruka
                bat 'cmd /c npm install --no-audit --no-fund --prefer-offline'
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
                  npx playwright test --project=Chromium --reporter=line,allure-playwright || exit 0
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
                    env.FULL_ERROR = readFile('failed-test-full-error.txt').trim()
                    env.FAILED_STEP = readFile('failed-test-failed-step.txt').trim()
                    env.FAILED_STEP_ERROR = readFile('failed-test-failed-step-error.txt').trim()
                    env.ERROR_CONTEXT = readFile('failed-test-error-context.txt').trim()
                    
                    env.HAS_SCREENSHOT = fileExists('failed-test-screenshot-base64.txt') ? 'true' : 'false'
                    
                    def failedCount = env.FAILED_TESTS_COUNT.toInteger()
                    def skippedCount = env.SKIPPED_TESTS.toInteger()

                    if (failedCount > 0 || skippedCount > 0) {
                        currentBuild.result = 'UNSTABLE'
                        env.BUILD_STATUS = 'UNSTABLE'
                    } else {
                        env.BUILD_STATUS = 'SUCCESS'
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
                                set GIT_TERMINAL_PROMPT=0
                                if exist gh-pages-temp rmdir /s /q gh-pages-temp
                                
                                echo Cloning gh-pages branch (shallow)...
                                git clone --depth 1 --branch gh-pages --single-branch https://%GITHUB_TOKEN%@github.com/%GITHUB_USER%/%GITHUB_REPO%.git gh-pages-temp
                                
                                :: --- TREND HISTORY LOGIC ---
                                set /a PREV_BUILD=%BUILD_NUMBER%-1
                                if exist gh-pages-temp\\builds\\%PREV_BUILD%\\history (
                                    echo Previous history found in build %PREV_BUILD%. Copying to results...
                                    if not exist allure-results\\history mkdir allure-results\\history
                                    xcopy /s /e /y gh-pages-temp\\builds\\%PREV_BUILD%\\history allure-results\\history\\
                                ) else (
                                    echo No previous history found for trend charts.
                                )

                                echo Generating Allure environment and executor metadata...
                                node generate-allure-meta.js

                                echo Generating Allure report...
                                call npx allure generate allure-results --clean -o allure-report
                                
                                echo Preparing deployment folder for build %BUILD_NUMBER%...
                                if not exist gh-pages-temp\\builds mkdir gh-pages-temp\\builds
                                mkdir gh-pages-temp\\builds\\%BUILD_NUMBER%
                                
                                echo Copying new report files...
                                xcopy /s /e /y allure-report gh-pages-temp\\builds\\%BUILD_NUMBER%\\
                                
                                echo Cleaning up old builds (keeping only last 10)...
                                powershell -Command "if (Test-Path 'gh-pages-temp\\builds') { Get-ChildItem -Path 'gh-pages-temp\\builds' -Directory | Where-Object { \$_ -match '^\\d+\$' } | Sort-Object { [int]\$_.Name } -Descending | Select-Object -Skip 10 | Remove-Item -Recurse -Force }"

                                cd gh-pages-temp
                                git config user.name "Jenkins Automation"
                                git config user.email "jenkins@councilbox.com"
                                
                                echo Committing and pushing to GitHub Pages...
                                git add -A
                                git commit -m "Add Allure report for build ${env.BUILD_NUMBER} and cleanup old reports"
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

                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

                // --- EMAIL NOTIFICATION ---
                if (params.SEND_EMAIL) {
                    echo "📧 Sending email notification..."
                    def statusText = currentBuild.currentResult == 'SUCCESS' ? 'SUCCESS' : 'FAILURE'
                    def statusColor = currentBuild.currentResult == 'SUCCESS' ? '#2eae6f' : '#e53e3e'

                    emailext(
                        subject: "Councilbox QA Report - Build #${env.BUILD_NUMBER} - ${statusText}",
                        from: 'Councilbox Automation <councilboxautotest@gmail.com>',
                        to: 'ammar.micijevic@councilbox.com, dzenan.dzakmic@councilbox.com, muhamed.adzamija@councilbox.com, almir.demirovic@councilbox.com, emiliano.ribaudo@councilbox.com',
                        mimeType: 'text/html; charset=UTF-8',
                        body: """
                            <!DOCTYPE html>
                            <html>
                            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 20px;">
                              <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

                                <div style="background-color: ${statusColor}; padding: 30px 20px; text-align: center;">
                                  <h1 style="color: white; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">${statusText}</h1>
                                  <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Build #${env.BUILD_NUMBER}</p>
                                </div>

                                <div style="padding: 30px;">
                                  <p style="color: #4a5568; font-size: 16px; text-align: center; margin-bottom: 25px;">
                                    Automated tests have completed. Here is the summary:
                                  </p>

                                  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 30px;">
                                    <div style="text-align: center; padding: 15px; background-color: #f7fafc; border-radius: 6px;">
                                      <div style="font-size: 24px; font-weight: bold; color: #2d3748;">${env.TOTAL_TESTS}</div>
                                      <div style="font-size: 12px; color: #718096; text-transform: uppercase;">Total</div>
                                    </div>
                                    <div style="text-align: center; padding: 15px; background-color: #f0fff4; border-radius: 6px;">
                                      <div style="font-size: 24px; font-weight: bold; color: #38a169;">${env.PASSED_TESTS}</div>
                                      <div style="font-size: 12px; color: #718096; text-transform: uppercase;">Passed</div>
                                    </div>
                                    <div style="text-align: center; padding: 15px; background-color: #fff5f5; border-radius: 6px;">
                                      <div style="font-size: 24px; font-weight: bold; color: #e53e3e;">${env.FAILED_TESTS_COUNT}</div>
                                      <div style="font-size: 12px; color: #718096; text-transform: uppercase;">Failed</div>
                                    </div>
                                  </div>

                                  <div style="text-align: center;">
                                    <a href="${env.FINAL_REPORT_URL}"
                                       style="display: inline-block; background-color: #3182ce; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                                       View Full Allure Report
                                    </a>
                                  </div>
                                </div>

                                <div style="background-color: #edf2f7; padding: 15px; text-align: center; font-size: 12px; color: #718096;">
                                  <p style="margin: 0;">Sent by Councilbox Automation &bull; Jenkins</p>
                                </div>
                              </div>
                            </body>
                            </html>
                        """
                    )
                }

                // --- n8n WEBHOOK ---
                powershell(returnStatus: true, script: """
                    try {
                        function Read-SafeFile(\$filePath) {
                            if (Test-Path \$filePath) {
                                \$content = Get-Content \$filePath -Raw -ErrorAction SilentlyContinue
                                if (\$content) { return \$content.Trim().Replace('"', "'") }
                            }
                            return 'N/A'
                        }

                        \$cleanTestName      = Read-SafeFile 'failed-test-name.txt'
                        \$cleanSteps         = Read-SafeFile 'failed-test-steps.txt'
                        \$cleanError         = Read-SafeFile 'failed-test-error.txt'
                        \$cleanFullError     = Read-SafeFile 'failed-test-full-error.txt'
                        \$cleanFailedStep    = Read-SafeFile 'failed-test-failed-step.txt'
                        \$cleanFailedStepErr = Read-SafeFile 'failed-test-failed-step-error.txt'
                        \$cleanErrorContext  = Read-SafeFile 'failed-test-error-context.txt'
                        \$screenshotBase64   = Read-SafeFile 'failed-test-screenshot-base64.txt'

                        \$body = @{
                            status           = "${env.BUILD_STATUS}"
                            env              = "staging"
                            build            = "${env.BUILD_NUMBER}"
                            duration         = "${env.BUILD_DURATION}"
                            total            = "${env.TOTAL_TESTS}"
                            passed           = "${env.PASSED_TESTS}"
                            failed           = "${env.FAILED_TESTS_COUNT}"
                            skipped          = "${env.SKIPPED_TESTS}"
                            failedTestName   = \$cleanTestName
                            testSteps        = \$cleanSteps
                            errorMessage     = \$cleanError
                            fullError        = \$cleanFullError
                            failedStep       = \$cleanFailedStep
                            failedStepError  = \$cleanFailedStepErr
                            errorContext     = \$cleanErrorContext
                            screenshotBase64 = \$screenshotBase64
                            reportUrl        = "${env.FINAL_REPORT_URL}"
                        } | ConvertTo-Json -Depth 5

                        Invoke-RestMethod `
                            -Uri "http://localhost:5678/webhook/playwright-results" `
                            -Method Post `
                            -Body \$body `
                            -ContentType "application/json; charset=utf-8"

                        Write-Host "Webhook sent successfully"
                    }
                    catch {
                        Write-Host "Webhook failed but build will continue"
                        Write-Host \$_.Exception.Message
                    }
                """)
            }
        }
    }
}
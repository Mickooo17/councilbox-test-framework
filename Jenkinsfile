pipeline {
    agent any

    parameters {
        choice(name: 'TEST_ENV', choices: ['staging', 'dev', 'prod'], description: 'Select test environment')
        string(name: 'TEST_FILE', defaultValue: '', description: 'Specific test file path (leave empty for all tests)')
        string(name: 'TEST_TITLE', defaultValue: '', description: 'Test title filter (-g flag, leave empty for all)')
        booleanParam(name: 'SEND_EMAIL', defaultValue: true, description: 'Send email notification after build completes')
        booleanParam(name: 'SEND_TEAMS', defaultValue: true, description: 'Send MS Teams notification after build completes')
    }

    tools {
        nodejs 'node20'
    }

    environment {
        CI = 'true'
        TEST_ENV = "${params.TEST_ENV ?: 'staging'}"
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
                // Clean old reports and temporary files
                bat 'if exist playwright-report rmdir /s /q playwright-report'
                bat 'if exist test-results rmdir /s /q test-results'
                bat 'if exist allure-results rmdir /s /q allure-results'
                bat 'if exist junit-results rmdir /s /q junit-results'
                bat 'if exist email-body.html del /f /q email-body.html'

                // Git pull main branch
                git(
                    url: 'https://github.com/Mickooo17/councilbox-test-framework.git',
                    branch: 'main',
                    credentialsId: 'github-ssh'
                )
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'cmd /c npm install --no-audit --no-fund --prefer-offline'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'cmd /c npx playwright install --with-deps chromium'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    def testFlags = "--project=Chromium --reporter=line,allure-playwright,junit:junit-results/results.xml"
                    if (params.TEST_FILE?.trim()) {
                        testFlags = "${params.TEST_FILE.trim()} ${testFlags}"
                    }
                    if (params.TEST_TITLE?.trim()) {
                        testFlags = "${testFlags} -g \"${params.TEST_TITLE.trim()}\""
                    }

                    bat """
                      @echo off
                      chcp 65001 >NUL
                      npx playwright test ${testFlags} || exit 0
                    """
                }
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
                    env.TOTAL_TESTS        = fileExists('total-tests.txt') ? readFile('total-tests.txt').trim() : '0'
                    env.PASSED_TESTS       = fileExists('passed-tests.txt') ? readFile('passed-tests.txt').trim() : '0'
                    env.FAILED_TESTS_COUNT = fileExists('failed-tests-count.txt') ? readFile('failed-tests-count.txt').trim() : '0'
                    env.SKIPPED_TESTS      = fileExists('skipped-tests.txt') ? readFile('skipped-tests.txt').trim() : '0'
                    env.BROKEN_TESTS       = fileExists('broken-tests.txt') ? readFile('broken-tests.txt').trim() : '0'

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
                            withEnv([
                                "BUILD_NUMBER=${env.BUILD_NUMBER}",
                                "GITHUB_TOKEN=${env.GITHUB_TOKEN}"
                            ]) {
                                bat 'cmd /c node scripts/deploy-allure-gh-pages.js'
                            }
                        }
                        echo "✅ Report successfully deployed to: ${env.FINAL_REPORT_URL}"
                    }
                }
            }
        }

        stage('Generate HTML Email Report') {
            steps {
                script {
                    if (env.FINAL_REPORT_URL == null) {
                        env.FINAL_REPORT_URL = "${env.PAGES_URL}/builds/${env.BUILD_NUMBER}/"
                    }

                    withEnv([
                        "BUILD_NUMBER=${env.BUILD_NUMBER}",
                        "TEST_ENV=${env.TEST_ENV}",
                        "REPORT_URL=${env.FINAL_REPORT_URL}",
                        "GITHUB_RUN_URL=${env.BUILD_URL ?: env.FINAL_REPORT_URL}",
                        "BUILD_DURATION=${env.BUILD_DURATION}"
                    ]) {
                        bat 'cmd /c node scripts/generate-email-html.js'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (env.FINAL_REPORT_URL == null) {
                    env.FINAL_REPORT_URL = "${env.PAGES_URL}/builds/${env.BUILD_NUMBER}/"
                }

                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

                // --- 1. EMAIL NOTIFICATION (Identical to GitHub Actions) ---
                if (params.SEND_EMAIL && fileExists('email-body.html')) {
                    echo "📧 Sending HTML email notification..."
                    def statusText = (currentBuild.currentResult == 'SUCCESS') ? 'SUCCESS' : 'FAILURE'
                    def emailBodyHtml = readFile('email-body.html')

                    emailext(
                        subject: "Councilbox QA Report - Build #${env.BUILD_NUMBER} - ${statusText}",
                        from: 'Councilbox Automation <councilboxautotest@gmail.com>',
                        to: 'ammar.micijevic@councilbox.com, dzenan.dzakmic@councilbox.com, muhamed.adzamija@councilbox.com, almir.demirovic@councilbox.com, emiliano.ribaudo@councilbox.com',
                        mimeType: 'text/html; charset=UTF-8',
                        body: emailBodyHtml
                    )
                }

                // --- 2. MS TEAMS ADAPTIVE CARD (Identical to GitHub Actions) ---
                if (params.SEND_TEAMS) {
                    echo "📢 Sending MS Teams Adaptive Card notification..."
                    try {
                        withCredentials([string(credentialsId: 'TEAMS_WEBHOOK_URL', variable: 'TEAMS_WEBHOOK_URL')]) {
                            withEnv([
                                "TEAMS_WEBHOOK_URL=${env.TEAMS_WEBHOOK_URL}",
                                "BUILD_NUMBER=${env.BUILD_NUMBER}",
                                "REPORT_URL=${env.FINAL_REPORT_URL}",
                                "GITHUB_RUN_URL=${env.BUILD_URL ?: env.FINAL_REPORT_URL}",
                                "TEST_ENV=${env.TEST_ENV}",
                                "BUILD_DURATION=${env.BUILD_DURATION}"
                            ]) {
                                bat 'cmd /c node scripts/send-teams-card.js'
                            }
                        }
                    } catch (Exception e) {
                        echo "⚠️ MS Teams notification skipped or failed: ${e.message}"
                    }
                }
            }
        }
    }
}
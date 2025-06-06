pipeline {
    agent any
    stages {
        stage('Integration continue') {
            steps {
                git branch: 'main', url: 'https://github.com/KONATE-ABDRAHAMANE/certification_font.git'
            }
        }
        stage('Sonarcube') {
            steps {
                sh '''
                    sonar-scanner \
                      -Dsonar.projectKey=konate_certification_font \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=https://2a26-212-114-26-208.ngrok-free.app \
                      -Dsonar.token=sqp_11070b46ede081e91dc495e45c016e5cffbbe31d
                
                '''
            }
        }
        stage('Deployement via FTP') {
            steps {
                sh '''
                    lftp -d -u $siteUser,$sitePass ftp://ftp-lafia-market.alwaysdata.net -e "
                        mirror -R . www/;
                        bye
                    "
                '''
            }
        }
    }
}
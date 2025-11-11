pipeline {
  agent any

  parameters {
    string(name: 'REGISTRY_URL', defaultValue: '', description: 'Optional Docker registry (e.g. registry.hub.docker.com/username). Leave empty to skip login but you can still push to public registries if allowed.')
    string(name: 'IMAGE_NAME', defaultValue: 'exam-app', description: 'Docker image name')
    string(name: 'IMAGE_TAG', defaultValue: '', description: 'Image tag (if empty, build number or "latest" will be used)')
    booleanParam(name: 'PUSH_IMAGE', defaultValue: false, description: 'If true, push the built image to the registry')
    string(name: 'DOCKER_CREDENTIALS_ID', defaultValue: '', description: 'Jenkins credentials id (username/password) for Docker registry login. Leave empty for anonymous/presigned pushes if supported.')
    booleanParam(name: 'DEPLOY_TO_K8S', defaultValue: false, description: 'If true, apply Kubernetes manifests in the repo (requires kubeconfig file credential)')
    string(name: 'KUBECONFIG_CREDENTIALS_ID', defaultValue: '', description: 'Jenkins "File" credentials id that contains a kubeconfig to access the cluster')
    string(name: 'K8S_NAMESPACE', defaultValue: 'default', description: 'Kubernetes namespace to apply manifests to')
  }

  environment {
    // Choose a sensible tag if none provided
    IMAGE_TAG = "${params.IMAGE_TAG?.trim() ? params.IMAGE_TAG : (env.BUILD_NUMBER ?: 'latest')}"
    IMAGE = "${params.REGISTRY_URL?.trim() ? params.REGISTRY_URL + '/' : ''}${params.IMAGE_NAME}:${env.IMAGE_TAG}"
  }

  stages {
    stage('Checkout') {
      steps {
        // Ensure we have the repository checked out
        checkout scm
      }
    }

    stage('Build Docker image') {
      steps {
        script {
          echo "Building image: ${env.IMAGE}"
          // Show docker version if available for easier debugging
          sh 'docker --version || true'
          sh "docker build -t ${env.IMAGE} ."
        }
      }
    }

    stage('Push image') {
      when {
        expression { return params.PUSH_IMAGE }
      }
      steps {
        script {
          // Login if credentials provided
          if (params.DOCKER_CREDENTIALS_ID?.trim()) {
            withCredentials([usernamePassword(credentialsId: params.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
              sh "echo \"$DOCKER_PASS\" | docker login ${params.REGISTRY_URL} -u \"$DOCKER_USER\" --password-stdin"
            }
          }
          sh "docker push ${env.IMAGE}"
        }
      }
    }

    stage('Deploy to Kubernetes') {
      when {
        expression { return params.DEPLOY_TO_K8S }
      }
      steps {
        script {
          if (!params.KUBECONFIG_CREDENTIALS_ID?.trim()) {
            error 'KUBECONFIG_CREDENTIALS_ID is required to deploy to Kubernetes'
          }

          // Use Jenkins file-credentials to provide kubeconfig at runtime
          withCredentials([file(credentialsId: params.KUBECONFIG_CREDENTIALS_ID, variable: 'KUBECONFIG_FILE')]) {
            // Make a temporary copy of the manifest, update image reference, and apply
            sh 'cp app-deploy.yaml app-deploy.yaml.ci || true'
            // Replace any image line in the deployment manifest with our built image
            // This is a lightweight approach; adjust for multi-container deployments as needed
            sh "sed -i 's|image:.*|image: ${env.IMAGE}|g' app-deploy.yaml.ci || true"

            sh "kubectl --kubeconfig=$KUBECONFIG_FILE apply -f app-deploy.yaml.ci -n ${params.K8S_NAMESPACE} || true"
            sh "kubectl --kubeconfig=$KUBECONFIG_FILE apply -f app-service.yaml -n ${params.K8S_NAMESPACE} || true"
            // Wait for rollout (best-effort)
            sh "kubectl --kubeconfig=$KUBECONFIG_FILE rollout status deployment --all -n ${params.K8S_NAMESPACE} || true"
            // Cleanup temp file
            sh 'rm -f app-deploy.yaml.ci || true'
          }
        }
      }
    }
  }

  post {
    always {
      echo "Pipeline finished with status: ${currentBuild.currentResult}"
    }
  }
}


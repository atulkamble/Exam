# Exam
# 🧾 **Final Exam – DevOps**

- **Course:** Cloud Computing / DevOps
- **Duration:** 1 Hour
- **Total Marks:** 50
- **Exam Type:** Practical (Hands-On Assessment)
- **Role:** You are working as a **DevOps Engineer at Cloudnautic**.

---

## 🧩 **Section A – Practical Tasks (50 Marks)**

Attempt **any 4 out of 7** tasks.
Each task carries **12.5 Marks** (Total = 50).
All tasks are scenario-based and require screenshots + GitHub submission.

---

### **1️⃣ GIT – Repository & Branching Workflow**

**Scenario:**
Your team is starting a new DevOps project. Set up version control for collaboration.

**Tasks:**

1. Initialize a Git repository and connect to GitHub.
2. Create a branch `feature/login`.
3. Make changes and commit using meaningful messages.
4. Merge `feature/login` into `main` via pull request or CLI.
5. Show logs and rollback one commit.

---

### **2️⃣ DOCKER – Application Containerization**

**Scenario:**
You are asked to containerize a static or dynamic web app for testing.

**Tasks:**

1. Write a `Dockerfile` to run the app on port `8080`.
2. Build and run the container.
3. Push the image to Docker Hub (`atuljkamble/app:v1`).
4. Pull and run it on another system to verify.

**Bonus:** Use a custom `index.html` or API message.

---

### **3️⃣ KUBERNETES – App Deployment**

**Scenario:**
Deploy the Dockerized application on a Kubernetes cluster.

**Tasks:**

1. Create a deployment file `app-deploy.yaml` (replicas = 2).
2. Create a `NodePort` service `app-service.yaml`.
3. Access app via `EXTERNAL-IP:NodePort`.
4. Delete one pod and show it self-heals automatically.

**Expected Output:** `kubectl get pods`, `kubectl get svc`, running app screenshot.

---

### **4️⃣ TERRAFORM – Automate AWS Infrastructure**

**Scenario:**
Provision AWS resources using Infrastructure as Code.

**Tasks:**

1. Write Terraform code to create one EC2 instance.
2. Use variables for region and instance type.
3. Output instance public IP.
4. Destroy resources using `terraform destroy`.

**Bonus:** Configure remote backend (S3 or Azure Blob).

---

### **5️⃣ JENKINS – Continuous Integration Pipeline**

**Scenario:**
Automate Docker build and deployment using Jenkins.

**Tasks:**

1. Install Jenkins and configure Docker inside it.
2. Create a Pipeline job with GitHub integration.
3. Build Docker image automatically after every commit.
4. Add post-build step: print “Build Successful” or run container.

**Expected Output:** Jenkins console log + Docker image build proof.

---

### **6️⃣ AWS – Web Hosting & Backup**

**Scenario:**
Host and secure a website using AWS cloud services.

**Tasks:**

1. Launch EC2 (Linux) and install Apache or Nginx.
2. Host a sample web page.
3. Create an S3 bucket and upload backup files.
4. Verify access through EC2 public IP and S3 object URL.

---

### **7️⃣ END-TO-END CI/CD – Integration Task**

**Scenario:**
Integrate multiple DevOps tools for a full pipeline.

**Tasks:**

1. Code hosted on GitHub → Jenkins build → Docker image → Deploy on Kubernetes or EC2.
2. Create pipeline stages: *Clone → Build → Push → Deploy*.
3. Store Terraform or Kubernetes manifests inside repo.
4. Document every step with screenshots.

**Bonus:** Show build trigger on code commit.

---

## 🧾 **Evaluation Criteria**

| Component                       | Description                                                       | Marks        |
| ------------------------------- | ----------------------------------------------------------------- | ------------ |
| **Tool Mastery**                | Correct usage of Git, Docker, Terraform, Jenkins, Kubernetes, AWS | 20           |
| **Implementation & Output**     | Working screenshots, error handling, commands                     | 20           |
| **Documentation & GitHub Repo** | Organized code, readme, step-by-step explanations                 | 10           |
| **Total**                       |                                                                   | **50 Marks** |


## 🐳 Kubernetes deployment (app-deploy.yaml & app-service.yaml)

Follow these steps to deploy the Dockerized app to a Kubernetes cluster, expose it via a NodePort, and demonstrate self-healing when a pod is deleted.

1) (Optional) Build and push image

	- If you're using a remote cluster (cloud), build and push an image to a registry (Docker Hub, ECR, etc.) and update the image name in `app-deploy.yaml`.

```bash
# Example (Docker Hub):
docker build -t <your-dockerhub-username>/exam:latest .
docker push <your-dockerhub-username>/exam:latest
# Then update app-deploy.yaml to use <your-dockerhub-username>/exam:latest
```

	- If you're using `minikube` you can load the local image directly instead of pushing:

```bash
minikube image build -t exam:latest .   # or: docker build -t exam:latest . && minikube image load exam:latest
```

2) Apply the Kubernetes manifests

```bash
kubectl apply -f app-deploy.yaml
kubectl apply -f app-service.yaml
```

3) Confirm resources

```bash
kubectl get deployments
kubectl get pods
kubectl get svc app-service
```

4) Access the app via EXTERNAL-IP:NodePort

- If you are on a cloud cluster or have nodes with external IPs, find a node external IP and combine with the NodePort (30080):

```bash
kubectl get nodes -o wide
# pick a node External-IP (or use cloud provider's node IP) and browse to http://<NODE_EXTERNAL_IP>:30080
```

- For `minikube` use the helper to get a URL:

```bash
minikube service app-service --url
# or:
minikube ip  # then http://<MINIKUBE_IP>:30080
```

5) Demonstrate self-healing (delete one pod)

```bash
# list pods
kubectl get pods -l app=exam-app

# delete one pod (use the pod name from the previous command)
kubectl delete pod <POD_NAME>

# watch new pod come up to replace it
kubectl get pods -w
```

You should see Kubernetes terminate the deleted pod and the Deployment controller create a new pod to keep the replica count at 2.

Troubleshooting
- If pods stay in CrashLoopBackOff, describe the pod for details:
  kubectl describe pod <POD_NAME>
- If the image can't be pulled, ensure the image name is correct and accessible from the cluster, or use `imagePullPolicy: IfNotPresent` with images pre-loaded into nodes.

Notes
- The provided `app-deploy.yaml` uses `image: atulkamble/exam:latest`. Replace this with your registry image or load it into your cluster if using Minikube.
- NodePort is set to `30080` in `app-service.yaml`. Change to another value if this port is unavailable.

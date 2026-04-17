# 🚀 MyApp - IaC & CI/CD with K3s Cluster

## 📌 Overview

This project demonstrates a fully automated application deployment system using modern **DevOps** and **Cloud Native** technologies.

It integrates multiple components into a complete pipeline, including:

- **Infrastructure as Code (IaC)** using Terraform  
- **Containerization** using Docker  
- **Container Orchestration** using K3s (Lightweight Kubernetes)  
- **CI/CD Pipeline** using GitHub Actions  
- **Backend Application** built with Node.js (Express)

### 🎯 Objectives

- Automate infrastructure provisioning using Terraform  
- Build a complete **CI/CD pipeline** (Build → Push → Deploy)  
- Deploy applications automatically to a **K3s cluster**  
- Implement **automatic rollback** when deployment fails  
- Demonstrate a **distributed system** using multiple pods and load balancing  

---


## 🏗️ System Architecture

```
Developer
   │
   │ git push
   ▼
GitHub Repository
   │
   ▼
GitHub Actions Runner
(Self-hosted)
   │
   ├── Build Docker Image
   │
   └── Push Image → Docker Hub
                      │
                      ▼
                SSH to K3s Master
                      │
                      ▼
               Kubernetes Cluster
               ┌──────────────┐
               │ Deployment   │
               │ 2 Replicas   │
               └──────┬───────┘
                      │
              Kubernetes Service
                      │
                      ▼
                  NodePort
                 Port 30080
                      │
                      ▼
                   Internet
```



---

## ☸️ K3s Cluster Topology

```
                K3s Cluster

          ┌─────────────────────┐
          │     Master Node     │
          │---------------------│
          │ kube-apiserver      │
          │ scheduler           │
          │ controller-manager  │
          └─────────┬───────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
   Worker Node 1           Worker Node 2
        │                       │
     Pod: myapp              Pod: myapp
```



---

## 📁 Project Structure

```
project
│
├── terraform
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf   
│
├── k8s
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
│
├── .github
│   └── workflows
│       └── main.yml
│
├── Dockerfile
├── package.json
├── server1.js
│
└── README.md
```



---

## ⚙️ Infrastructure Provisioning (Terraform)

The Kubernetes cluster is automatically provisioned using **Terraform** with the SSH provider.

### 🔄 Provisioning Workflow

```
Terraform Apply
       │
       ▼
Connect to Master Node via SSH
       │
       ▼
Install K3s Server
       │
       ▼
Generate Node Token
       │
       ▼
Retrieve Token
       │
       ▼
Connect to Worker Node
       │
       ▼
Install K3s Agent
       │
       ▼
Worker joins cluster
```
### ✅ Verify Cluster

After provisioning:
```
kubectl get nodes
```
Expected output
```
NAME       STATUS   ROLES                  AGE
master     Ready    control-plane,master   2m
worker1    Ready    <none>                 1m
```

## 🔄 CI/CD Pipeline
The CI/CD pipeline is implemented using GitHub Actions.
### Pipeline workflow:
```
Code Push
   │
   ▼
GitHub Actions Trigger
   │
   ▼
Build Docker Image
   │
   ▼
Push Image to Docker Hub
   │
   ▼
SSH into K3s Master
   │
   ▼
Update Kubernetes Deployment
   │
   ▼
Rolling Update
   │
   ├── Success → Deployment completed
   │
   └── Failure → Automatic Rollback
```


### 🐳 Docker Image Build
Application container is built using:
```
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["node", "server1.js"]
```


### ☸️ Kubernetes Deployment
Application runs with:  
2 replicas
NodePort service
accessible from external network
Deployment:
```
replicas: 2
```
Service:
```
type: NodePort
nodePort: 30080
```


### 🌍 Access the Application
After deployment:
```
http://NODE_IP:30080
```
📊 Application Displays
Pod hostname
Node IP
Runtime information

➡️ This helps visualize load balancing across pods


### 🔁 Automatic Rollback
The CI/CD pipeline automatically rolls back if deployment fails.
```
Rollout failure
      │
      ▼
kubectl rollout undo deployment/myapp
      │
      ▼
Restore previous stable version
```
This ensures high availability and safe deployments.


### ▶️ How to Run
1. Provision the cluster
```
terraform init
terraform apply
```


2️. Deploy application via CI/CD
Push code to GitHub
```
git push origin main
```
GitHub Actions will automatically:
```
Build Image
Push Image
Deploy to Kubernetes
```



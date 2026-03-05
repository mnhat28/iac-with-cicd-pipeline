MyApp – Automated CI/CD Deployment to K3s Cluster












A cloud-native demo application showing how to build a complete CI/CD pipeline that automatically deploys a Node.js application to a K3s Kubernetes cluster.

This project demonstrates modern DevOps practices, including:

Infrastructure automation

Containerization

Continuous Integration

Continuous Deployment

Kubernetes orchestration

Automatic rollback strategy

🏗 Architecture Overview
## 🏗 Architecture Overview

```text
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
   ┌─────────┴─────────┐
   │                   │
   │  Build Docker     │
   │      Image        │
   │                   │
   ▼                   ▼
Docker Image       Push Image
  (Build)        → Docker Hub
                      │
                      ▼
               SSH to K3s Master
                      │
                      ▼
               Kubernetes Cluster
               ┌──────────────┐
               │  Deployment  │
               │  2 Replicas  │
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

                         
☸️ K3s Cluster Topology
## ☸️ K3s Cluster Topology

```text
                K3s Cluster
           ┌─────────────────────┐
           │      Master Node    │
           │                     │
           │  kube-apiserver     │
           │  scheduler          │
           │  controller-manager │
           └─────────┬───────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
   ┌─────────────┐          ┌─────────────┐
   │ Worker Node │          │ Worker Node │
   │      1      │          │      2      │
   └──────┬──────┘          └──────┬──────┘
          │                        │
     ┌────▼────┐              ┌────▼────┐
     │   Pod   │              │   Pod   │
     │  myapp  │              │  myapp  │
     └─────────┘              └─────────┘
```

Each deployment creates 2 pods for high availability.

🔁 CI/CD Pipeline

The CI/CD pipeline is implemented using GitHub Actions.

Trigger:

Push to main branch

Pipeline workflow:

1. Checkout repository
2. Login to Docker Hub
3. Build Docker Image
4. Push Image to DockerHub
5. SSH to K3s Master Node
6. Update Kubernetes Deployment
7. Apply Deployment
8. Monitor Rollout
9. Auto Rollback if Failed
🔄 Automatic Rollback Strategy

If a deployment fails during rollout:

kubectl rollout status deployment/myapp

The pipeline automatically executes:

kubectl rollout undo deployment/myapp

This ensures:

✔ Zero broken deployments
✔ Reliable production updates
✔ Safe continuous delivery

🐳 Docker

The application is containerized using Docker.

Build Image
docker build -t myapp .
Run Container
docker run -p 80:80 myapp
☸️ Kubernetes Deployment

The application is deployed using a Kubernetes Deployment.

replicas: 2

Benefits:

High availability

Load balancing

Self-healing pods

🌐 Kubernetes Service

The service exposes the application using NodePort.

type: NodePort
nodePort: 30080

Access the application:

http://<NODE_IP>:30080
🖥 Application Features

The Node.js application displays runtime information:

Pod Hostname

Node IP Address

Server Uptime

Service Port

This helps demonstrate Kubernetes load balancing when refreshing the page.

Example output:

Node IP: 10.42.0.5
Hostname: myapp-7c9fdbb8b9-x2g7p
Port: 80
Uptime: 30s
📂 Project Structure
myapp
│
├── .github
│   └── workflows
│       └── main.yml        # CI/CD pipeline
│
├── Dockerfile              # Container build config
├── package.json            # NodeJS dependencies
├── server1.js              # Express application
│
├── deployment.yaml         # Kubernetes Deployment
├── service.yaml            # Kubernetes Service
├── ingress.yaml            # Kubernetes Ingress
│
└── README.md
🔐 GitHub Secrets

The CI/CD pipeline requires these secrets:

Secret	Purpose
DOCKERHUB_USERNAME	DockerHub login
DOCKERHUB_TOKEN	DockerHub access token
MASTER_HOST	K3s master IP
MASTER_USER	SSH username
MASTER_SSH_KEY	SSH private key
📊 DevOps Features

✔ Infrastructure as Code (Terraform)
✔ Containerized application
✔ Automated CI/CD pipeline
✔ Kubernetes orchestration
✔ Automatic rollback
✔ Multi-pod deployment
✔ Load balancing demonstration

🧪 Demo

After deployment:

http://<NODE_IP>:30080

You will see a dynamic landing page showing:

Node IP

Pod hostname

Uptime

Interactive UI

Refreshing the page may return different pods, demonstrating Kubernetes load balancing.

🎓 Academic Context

Course: Distributed Computing Systems
Class: NT533.Q13

Project Topic:

Infrastructure as Code & CI/CD Deployment
on a K3s Kubernetes Cluster

Team Members:

Trần Minh Nhật

Huỳnh Lâm Tuấn Phong

📜 License

This project is developed for educational and demonstration purposes.

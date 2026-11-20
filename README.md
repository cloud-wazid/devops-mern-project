# DevOps MERN Project

A MERN (MongoDB, Express, React, Node.js) task management application, containerized with Docker and built through a Jenkins CI/CD pipeline.

🔗 **Live demo:** [devops-mern-project.vercel.app](https://devops-mern-project.vercel.app)

## Tech Used
React, Node.js, Express, MongoDB (Atlas), Docker, Jenkins, Docker Hub, Git/GitHub

## Project Structure
- `frontend/` – React app with its own Dockerfile
- `backend/` – Node.js/Express API with its own Dockerfile
- `Jenkinsfile` – CI/CD pipeline definition

## CI/CD Pipeline (Jenkins)
Code push → Jenkins pipeline → Docker image build → push to Docker Hub

Pipeline stages: <Checkout, Build images, Push to Docker Hub, ...>

## Run Locally
```bash
git clone https://github.com/cloud-wazid/devops-mern-project.git
cd devops-mern-project

# backend
cd backend
npm install
npm start

# frontend (new terminal)
cd frontend
npm install
npm start
```

## Run with Docker
```bash
docker build -t mern-backend ./backend
docker build -t mern-frontend ./frontend
docker run -d -p <PORT>:<PORT> mern-backend
docker run -d -p <PORT>:<PORT> mern-frontend
```

## Environment Variables
Create a `.env` in `backend/`:
```
MONGO_URI=<your MongoDB Atlas connection string>
PORT=<port>
```

## Issues Solved
- Fixed frontend/API connectivity and MongoDB Atlas network-access issues
- Fixed Docker Hub credentials ID in the Jenkins pipeline

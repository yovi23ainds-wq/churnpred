# 🚀 Complete Setup & Deployment Guide

**Project**: Customer Churn Prediction Dashboard  
**Audience**: Developers, DevOps Engineers, System Administrators

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Running the Application](#running-the-application)
5. [Docker Deployment](#docker-deployment)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance](#maintenance)

---

## ✅ Prerequisites

### System Requirements

#### Minimum Requirements
- **OS**: macOS, Linux, or Windows 10+
- **RAM**: 4GB
- **Storage**: 2GB free space
- **CPU**: 2 cores

#### Recommended Requirements
- **OS**: macOS or Linux
- **RAM**: 8GB+
- **Storage**: 5GB free space
- **CPU**: 4+ cores

### Software Requirements

#### Required Software

1. **Python 3.8+**
   ```bash
   # Check Python version
   python --version
   # or
   python3 --version
   
   # Should output: Python 3.8.x or higher
   ```

2. **Node.js 16+**
   ```bash
   # Check Node version
   node --version
   
   # Should output: v16.x.x or higher
   ```

3. **npm 8+**
   ```bash
   # Check npm version
   npm --version
   
   # Should output: 8.x.x or higher
   ```

4. **Git**
   ```bash
   # Check Git version
   git --version
   
   # Should output: git version 2.x.x
   ```

#### Optional Software

1. **Docker** (for containerized deployment)
   ```bash
   docker --version
   docker-compose --version
   ```

2. **Virtual Environment Tool**
   ```bash
   # venv (built-in with Python)
   # or
   pip install virtualenv
   ```

---

## 🛠️ Local Development Setup

### Step 1: Clone the Repository

```bash
# Clone the project
git clone <repository-url>
cd CHURN\ PREDICTION

# Or if you already have the files
cd /path/to/CHURN\ PREDICTION
```

### Step 2: Backend Setup

#### 2.1 Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# You should see (venv) in your terminal prompt
```

#### 2.2 Install Python Dependencies

```bash
# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Verify installation
pip list
```

**Expected packages:**
- fastapi
- uvicorn
- pydantic
- xgboost
- pandas
- numpy
- scikit-learn
- python-multipart

#### 2.3 Verify Model Files

```bash
# Check if model files exist
ls -lh churn_model.pkl columns.pkl

# Should show:
# churn_model.pkl (size: ~1-5MB)
# columns.pkl (size: ~1-10KB)
```

### Step 3: Frontend Setup

#### 3.1 Navigate to Frontend Directory

```bash
cd frontend
```

#### 3.2 Install Node Dependencies

```bash
# Install dependencies
npm install

# This will install:
# - react
# - react-dom
# - vite
# - tailwindcss
# - axios
# - recharts
# - lucide-react
# - and dev dependencies

# Verify installation
npm list --depth=0
```

#### 3.3 Verify Configuration

```bash
# Check if config files exist
ls -la

# Should show:
# - package.json
# - vite.config.js
# - tailwind.config.js
# - postcss.config.js
```

---

## ⚙️ Environment Configuration

### Backend Environment Variables

#### Create .env file (Optional)

```bash
# In project root
touch .env
```

#### Add Configuration

```bash
# .env
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Model Configuration
MODEL_PATH=churn_model.pkl
COLUMNS_PATH=columns.pkl

# Logging
LOG_LEVEL=INFO
```

### Frontend Environment Variables

#### Create .env file

```bash
# In frontend directory
cd frontend
touch .env
```

#### Add Configuration

```bash
# frontend/.env
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=10000
```

#### Update API Service (if using env vars)

```javascript
// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

---

## 🚀 Running the Application

### Method 1: Using Startup Script (Recommended)

#### Start Backend

```bash
# In project root
chmod +x start.sh
./start.sh
```

#### Start Frontend (New Terminal)

```bash
# Open new terminal
cd frontend
npm run dev
```

### Method 2: Manual Start

#### Start Backend

```bash
# In project root
# Activate virtual environment first
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Will watch for changes in these directories: ['/path/to/project']
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [12345] using StatReload
INFO:     Started server process [12346]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

#### Start Frontend (New Terminal)

```bash
# Navigate to frontend
cd frontend

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Method 3: Using Process Managers

#### Using PM2 (Node.js Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Start backend
pm2 start "uvicorn app.main:app --host 0.0.0.0 --port 8000" --name churn-backend

# Start frontend
cd frontend
pm2 start "npm run dev" --name churn-frontend

# View status
pm2 status

# View logs
pm2 logs

# Stop all
pm2 stop all

# Restart all
pm2 restart all
```

---

## 🐳 Docker Deployment

### Prerequisites

```bash
# Install Docker
# macOS: Download Docker Desktop
# Linux: sudo apt-get install docker docker-compose
# Windows: Download Docker Desktop

# Verify installation
docker --version
docker-compose --version
```

### Method 1: Docker Compose (Recommended)

#### Build and Run

```bash
# In project root
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

#### Access Application

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

#### Stop Containers

```bash
# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Method 2: Individual Docker Containers

#### Build Backend Image

```bash
# Build image
docker build -t churn-backend .

# Run container
docker run -d \
  --name churn-backend \
  -p 8000:8000 \
  -v $(pwd):/app \
  churn-backend
```

#### Build Frontend Image

```bash
# Navigate to frontend
cd frontend

# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
EOF

# Build image
docker build -t churn-frontend .

# Run container
docker run -d \
  --name churn-frontend \
  -p 3000:3000 \
  -v $(pwd):/app \
  churn-frontend
```

#### View Logs

```bash
# Backend logs
docker logs -f churn-backend

# Frontend logs
docker logs -f churn-frontend
```

---

## 🌐 Production Deployment

### Option 1: Cloud Platform (AWS, GCP, Azure)

#### Backend Deployment (AWS EC2 Example)

```bash
# 1. Launch EC2 instance (Ubuntu 22.04)
# 2. SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# 3. Install dependencies
sudo apt update
sudo apt install python3-pip python3-venv nginx

# 4. Clone repository
git clone <your-repo-url>
cd CHURN\ PREDICTION

# 5. Setup virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 6. Install and configure Gunicorn
pip install gunicorn

# 7. Create systemd service
sudo nano /etc/systemd/system/churn-api.service
```

**Service File:**
```ini
[Unit]
Description=Churn Prediction API
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/CHURN PREDICTION
Environment="PATH=/home/ubuntu/CHURN PREDICTION/venv/bin"
ExecStart=/home/ubuntu/CHURN PREDICTION/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000

[Install]
WantedBy=multi-user.target
```

```bash
# 8. Start service
sudo systemctl start churn-api
sudo systemctl enable churn-api
sudo systemctl status churn-api

# 9. Configure Nginx
sudo nano /etc/nginx/sites-available/churn-api
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# 10. Enable site
sudo ln -s /etc/nginx/sites-available/churn-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Frontend Deployment (Vercel/Netlify)

**Vercel Deployment:**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to frontend
cd frontend

# 3. Build for production
npm run build

# 4. Deploy
vercel --prod
```

**Netlify Deployment:**

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Navigate to frontend
cd frontend

# 3. Build for production
npm run build

# 4. Deploy
netlify deploy --prod --dir=dist
```

**Update API URL:**

```javascript
// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-api-domain.com';
```

### Option 2: Docker on VPS

```bash
# 1. SSH into VPS
ssh root@your-vps-ip

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 4. Clone repository
git clone <your-repo-url>
cd CHURN\ PREDICTION

# 5. Update docker-compose.yml for production
nano docker-compose.yml
```

**Production docker-compose.yml:**
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      - API_HOST=0.0.0.0
      - API_PORT=8000
    restart: always

  frontend:
    build: ./frontend
    ports:
      - "80:3000"
    environment:
      - VITE_API_URL=http://your-domain.com:8000
    depends_on:
      - backend
    restart: always
```

```bash
# 6. Deploy
docker-compose up -d --build

# 7. View logs
docker-compose logs -f
```

### Option 3: Kubernetes (Advanced)

#### Create Kubernetes Manifests

**backend-deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: churn-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: churn-backend
  template:
    metadata:
      labels:
        app: churn-backend
    spec:
      containers:
      - name: backend
        image: your-registry/churn-backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: API_HOST
          value: "0.0.0.0"
        - name: API_PORT
          value: "8000"
---
apiVersion: v1
kind: Service
metadata:
  name: churn-backend-service
spec:
  selector:
    app: churn-backend
  ports:
  - port: 8000
    targetPort: 8000
  type: LoadBalancer
```

```bash
# Deploy to Kubernetes
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml

# Check status
kubectl get pods
kubectl get services
```

---

## 🔧 Troubleshooting

### Common Issues

#### Issue 1: Port Already in Use

**Error:**
```
ERROR: [Errno 48] Address already in use
```

**Solution:**
```bash
# Find process using port 8000
lsof -i :8000

# Kill process
kill -9 <PID>

# Or use different port
uvicorn app.main:app --port 8001
```

#### Issue 2: Module Not Found

**Error:**
```
ModuleNotFoundError: No module named 'fastapi'
```

**Solution:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

#### Issue 3: Model File Not Found

**Error:**
```
FileNotFoundError: [Errno 2] No such file or directory: 'churn_model.pkl'
```

**Solution:**
```bash
# Check if files exist
ls -la *.pkl

# Ensure you're in project root
pwd

# If files are missing, restore from backup or retrain
```

#### Issue 4: CORS Error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
```python
# In app/main.py, update CORS origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Issue 5: Frontend Build Fails

**Error:**
```
npm ERR! code ELIFECYCLE
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Try build again
npm run build
```

#### Issue 6: Docker Build Fails

**Error:**
```
ERROR: failed to solve: process "/bin/sh -c pip install -r requirements.txt" did not complete successfully
```

**Solution:**
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Or rebuild specific service
docker-compose build --no-cache backend
```

---

## 🔄 Maintenance

### Regular Maintenance Tasks

#### 1. Update Dependencies

**Backend:**
```bash
# Activate virtual environment
source venv/bin/activate

# Update pip
pip install --upgrade pip

# Update all packages
pip list --outdated
pip install --upgrade <package-name>

# Update requirements.txt
pip freeze > requirements.txt
```

**Frontend:**
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update to latest versions
npm install <package-name>@latest

# Update package.json
npm install
```

#### 2. Model Retraining

```bash
# Navigate to training folder
cd training

# Place new data
cp /path/to/new/data.xlsx .

# Run training notebook
jupyter notebook churn_pred.ipynb

# Copy new model files
cp churn_model.pkl ../
cp columns.pkl ../

# Restart backend
# (Backend will automatically load new model on restart)
```

#### 3. Database Backup (if using database)

```bash
# PostgreSQL backup
pg_dump -U username -d database_name > backup.sql

# Restore
psql -U username -d database_name < backup.sql
```

#### 4. Log Rotation

```bash
# Configure logrotate
sudo nano /etc/logrotate.d/churn-api
```

```
/var/log/churn-api/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 ubuntu ubuntu
}
```

#### 5. Monitoring

```bash
# Check system resources
htop

# Check disk space
df -h

# Check memory
free -h

# Check Docker stats
docker stats

# Check application logs
tail -f /var/log/churn-api/app.log
```

### Performance Optimization

#### Backend Optimization

```python
# Use connection pooling
# Use caching (Redis)
# Optimize model loading
# Use async operations
# Add request rate limiting
```

#### Frontend Optimization

```bash
# Build for production
npm run build

# Analyze bundle size
npm run build -- --analyze

# Optimize images
# Use lazy loading
# Implement code splitting
```

---

## 📊 Health Checks

### Automated Health Checks

```bash
# Create health check script
cat > health_check.sh << 'EOF'
#!/bin/bash

# Check backend
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/health)
if [ "$BACKEND_STATUS" = "200" ]; then
    echo "✅ Backend: Healthy"
else
    echo "❌ Backend: Unhealthy (HTTP $BACKEND_STATUS)"
fi

# Check frontend
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo "✅ Frontend: Healthy"
else
    echo "❌ Frontend: Unhealthy (HTTP $FRONTEND_STATUS)"
fi
EOF

chmod +x health_check.sh
./health_check.sh
```

### Cron Job for Monitoring

```bash
# Add to crontab
crontab -e

# Add line (check every 5 minutes)
*/5 * * * * /path/to/health_check.sh >> /var/log/health_check.log 2>&1
```

---

## 🎯 Summary

This guide covers:

✅ **Complete Setup**: From prerequisites to running application  
✅ **Multiple Deployment Options**: Local, Docker, Cloud, Kubernetes  
✅ **Troubleshooting**: Common issues and solutions  
✅ **Maintenance**: Regular tasks and optimization  
✅ **Monitoring**: Health checks and logging  

Follow these steps for a successful deployment!

---

**Last Updated**: April 25, 2026  
**Version**: 1.0.0

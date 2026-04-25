# 🚀 Quick Reference Card

**Customer Churn Prediction Dashboard**

---

## 📦 Quick Commands

### Start Application

```bash
# Backend (Terminal 1)
source venv/bin/activate  # Windows: venv\Scripts\activate
./start.sh

# Frontend (Terminal 2)
cd frontend && npm run dev
```

### Access URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 🐳 Docker Commands

```bash
# Start
docker-compose up --build

# Start detached
docker-compose up -d --build

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Restart
docker-compose restart
```

---

## 🔧 Git Commands

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git remote add origin <url>
git push -u origin main

# Daily workflow
git status
git add .
git commit -m "feat: description"
git push

# Update from remote
git pull origin main
```

---

## 🧪 Testing

```bash
# Backend
pytest
pytest --cov=app

# Frontend
cd frontend
npm test
npm test -- --coverage

# API test
python test_api.py
```

---

## 📝 Common Tasks

### Update Dependencies

```bash
# Backend
pip install --upgrade <package>
pip freeze > requirements.txt

# Frontend
cd frontend
npm update
npm install <package>@latest
```

### Retrain Model

```bash
cd training
jupyter notebook churn_pred.ipynb
# Run all cells
cp churn_model.pkl ../
cp columns.pkl ../
# Restart backend
```

### Check Logs

```bash
# Backend logs
tail -f app.log

# Frontend logs
# Check browser console

# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## 🔍 Troubleshooting

### Port in use
```bash
lsof -i :8000
kill -9 <PID>
```

### Module not found
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### CORS error
```python
# app/main.py
allow_origins=["http://localhost:3000"]
```

### Frontend build fails
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 API Quick Reference

### Health Check
```bash
curl http://localhost:8000/health
```

### Predict
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"Tenure": 12, "CityTier": 1, ...}'
```

---

## 📚 Documentation

- README.md - Overview
- COMPLETE_SETUP_GUIDE.md - Setup
- TECH_STACK_DOCUMENTATION.md - Tech details
- ARCHITECTURE_GUIDE.md - Architecture
- GITHUB_PUSH_INSTRUCTIONS.md - GitHub setup

---

## 🎯 Project Structure

```
.
├── app/              # Backend
├── frontend/         # Frontend
├── training/         # Model training
├── *.pkl            # Model files
└── docs/            # Documentation
```

---

## ⚡ Performance

- API: 14ms avg
- Page load: <1s
- Model: <50ms
- Memory: ~200MB

---

## 🔐 Security

- Input validation: Pydantic
- CORS: Configured
- Error handling: Comprehensive
- Type safety: Python hints

---

## 📞 Support

- Issues: GitHub Issues
- Docs: DOCUMENTATION_INDEX.md
- Email: your.email@example.com

---

**Version**: 1.0.0  
**Last Updated**: 2026-04-25

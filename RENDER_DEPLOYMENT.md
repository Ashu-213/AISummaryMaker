# 🚀 AI Summary Maker - Render Deployment Guide

## Overview
This guide walks you through deploying your Pure Gemini AI Summary Maker on Render.com with proper security and environment configuration.

## Prerequisites
- GitHub account with your code repository
- Render.com account (free tier available)
- Google Gemini API key

## 🎯 Deployment Steps

### 1. Prepare Your Repository

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Verify `.env` files are NOT committed:**
   - Only `.env.example` files should be in your repo
   - Actual `.env` files with secrets should be ignored

### 2. Deploy Backend on Render

1. **Go to Render Dashboard:**
   - Visit [render.com](https://render.com)
   - Click "New +" → "Web Service"

2. **Connect Repository:**
   - Connect your GitHub account
   - Select your AI Summary repository
   - Choose "backend" as the root directory

3. **Configure Service:**
   ```
   Name: ai-summary-backend
   Environment: Python 3
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Build Command: pip install -r requirements.txt
   Start Command: python app.py
   ```

4. **Set Environment Variables:**
   In Render dashboard, add these environment variables:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ALLOWED_ORIGINS=*
   PORT=10000
   HOST=0.0.0.0
   DEBUG=False
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://ai-summary-backend.onrender.com`)

### 3. Deploy Frontend on Render

1. **Create New Static Site:**
   - In Render dashboard: "New +" → "Static Site"
   - Connect same repository
   - Choose "frontend" as root directory

2. **Configure Static Site:**
   ```
   Name: ai-summary-frontend
   Root Directory: frontend
   Build Command: npm ci && npm run build
   Publish Directory: build
   ```

3. **Set Environment Variables:**
   ```
   REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy:**
   - Click "Create Static Site"
   - Wait for build and deployment

### 4. Update CORS Configuration

1. **Update Backend Environment:**
   - Go to your backend service in Render
   - Update `ALLOWED_ORIGINS` with your frontend URL:
     ```
     ALLOWED_ORIGINS=https://your-frontend-url.onrender.com
     ```

2. **Redeploy Backend:**
   - Click "Manual Deploy" → "Deploy latest commit"

## 🔒 Security Best Practices

### Environment Variables
- ✅ Never commit `.env` files with real secrets
- ✅ Use Render's environment variable dashboard
- ✅ Set `DEBUG=False` in production
- ✅ Restrict CORS to your frontend domain

### API Key Security
- ✅ Keep Gemini API key in Render environment variables
- ✅ Monitor API usage in Google Cloud Console
- ✅ Set up usage limits and alerts

## 🌐 URLs After Deployment

After successful deployment, you'll have:

**Backend API:** `https://your-backend-name.onrender.com`
- Health check: `https://your-backend-name.onrender.com/health`
- Summarize endpoint: `https://your-backend-name.onrender.com/summarize`
- PDF extraction: `https://your-backend-name.onrender.com/extract-pdf`

**Frontend App:** `https://your-frontend-name.onrender.com`
- Full AI Summary Maker interface

## 🔧 Local Development vs Production

### Local Development
```bash
# Backend
cd backend
source venv/bin/activate  # or .\venv\Scripts\Activate.ps1 on Windows
python app.py

# Frontend
cd frontend
npm start
```

### Production Environment Variables

**Backend (.env for local, Render dashboard for production):**
```
GEMINI_API_KEY=your_api_key
ALLOWED_ORIGINS=https://your-frontend-domain.com
PORT=10000
HOST=0.0.0.0
DEBUG=False
```

**Frontend (.env for local, Render dashboard for production):**
```
REACT_APP_API_BASE_URL=https://your-backend-domain.com
```

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Check `ALLOWED_ORIGINS` includes your frontend URL
   - Ensure backend is redeployed after CORS changes

2. **API Key Issues:**
   - Verify `GEMINI_API_KEY` is set correctly in Render
   - Check API key has proper permissions in Google Cloud

3. **Build Failures:**
   - Check build logs in Render dashboard
   - Ensure all dependencies are in `requirements.txt`

4. **Frontend Can't Connect to Backend:**
   - Verify `REACT_APP_API_BASE_URL` points to correct backend URL
   - Check backend health endpoint is accessible

## 📊 Monitoring

### Health Checks
- Backend: `GET https://your-backend.onrender.com/health`
- Expected response: `{"status": "healthy", "ai_engine": "gemini-pure"}`

### Logs
- View logs in Render dashboard
- Monitor API usage in Google Cloud Console

## 🎯 Next Steps

1. **Custom Domain (Optional):**
   - Add custom domain in Render dashboard
   - Update environment variables with new domain

2. **SSL Certificate:**
   - Automatically provided by Render
   - Ensure all URLs use HTTPS

3. **Performance Monitoring:**
   - Monitor response times
   - Set up alerts for downtime

## 💡 Tips for Success

- ✅ Test locally before deploying
- ✅ Use `.env.example` for team collaboration
- ✅ Keep secrets in environment variables, never in code
- ✅ Monitor API usage and costs
- ✅ Set up staging environment for testing

Your AI Summary Maker is now ready for production deployment on Render! 🚀

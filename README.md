# 🚀 AI Summary Maker - Pure Gemini AI

## 📋 Quick Start for Render Deployment

Your AI Summary Maker is **100% ready for secure deployment on Render** 🚀

### 1. Backend Deployment (Web Service)
```
Repository: Connect your GitHub repo
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: python app.py
```

**Environment Variables in Render Dashboard:**
```
GEMINI_API_KEY=your_actual_api_key
ALLOWED_ORIGINS=https://your-frontend-url.onrender.com
PORT=10000
HOST=0.0.0.0
DEBUG=False
```

### 2. Frontend Deployment (Static Site)
```
Repository: Same GitHub repo
Root Directory: frontend
Build Command: npm ci && npm run build
Publish Directory: build
```

**Environment Variables in Render Dashboard:**
```
REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com
```

### 3. Security Checklist ✅
- ✅ All secrets in environment variables (not in code)
- ✅ CORS restricted to frontend domain
- ✅ DEBUG=False in production
- ✅ .env files ignored in git

### 4. Test Your Deployment
1. Backend health: `https://your-backend.onrender.com/health`
2. Frontend app: `https://your-frontend.onrender.com`

**Backend:**
- Python Flask
- Hugging Face Transformers
- PDFplumber
- Flask-CORS

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ 
- Node.js 16+
- npm or yarn

### 1. Clone & Setup
```bash
cd "E:\web_projects\AI Summary"
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
The backend will run on `http://127.0.0.1:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will run on `http://localhost:3000`

## 📖 Usage

1. **Upload PDF**: Drag & drop a PDF file or click to browse
2. **Or Paste Text**: Type or paste text in the text area
3. **Choose Length**: Select short, medium, or detailed summary
4. **Generate**: Click "Generate AI Summary" 
5. **Add Notes**: Write your thoughts in the notes section
6. **Export**: Copy to clipboard or download as TXT file

## 🤖 AI Models

The app uses Hugging Face Transformers with these models:
- **t5-small**: Lightweight, fast processing (default)
- **facebook/bart-large-cnn**: Better quality (can be swapped in)

## 🔧 Configuration

### Change AI Model
Edit `backend/app.py`:
```python
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
```

### Adjust Summary Lengths
Modify the `length_params` in `backend/app.py`:
```python
length_params = {
    'short': {'max_length': 50, 'min_length': 20},
    'medium': {'max_length': 130, 'min_length': 30},
    'detailed': {'max_length': 250, 'min_length': 50}
}
```

## 📁 Project Structure
```
AI Summary/
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json       # Node dependencies
└── README.md
```

## 🚧 Known Limitations

- PDF text extraction works best with text-based PDFs
- Large files may take longer to process
- Runs locally (no cloud storage)
- Summary quality depends on input text quality

## 🔮 Future Enhancements

- [ ] Export to PDF/DOCX
- [ ] Highlight key points
- [ ] Dark/Light mode toggle
- [ ] Save summaries locally
- [ ] Multiple AI model options
- [ ] Batch processing

## 🐛 Troubleshooting

**Backend won't start:**
- Check Python version: `python --version`
- Install dependencies: `pip install -r requirements.txt`

**Frontend won't start:**
- Check Node version: `node --version`  
- Install dependencies: `npm install`

**PDF upload fails:**
- Ensure PDF contains extractable text (not scanned images)
- Check file size (large files may timeout)

**AI summarization fails:**
- Ensure text is not empty
- Check if text is too short (minimum ~20 words)
- Restart backend if model failed to load

## 📄 License

MIT License - feel free to use and modify!

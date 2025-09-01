from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import io
import logging
import os
from dotenv import load_dotenv
import google.generativeai as genai
import json

# Load environment variables

# Load environment variables
load_dotenv()

# Get allowed CORS origins from env (comma separated)
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', '*')
if ALLOWED_ORIGINS == '*':
    cors_origins = '*'
else:
    cors_origins = [origin.strip() for origin in ALLOWED_ORIGINS.split(',')]

app = Flask(__name__)
CORS(app, origins=cors_origins)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Gemini AI
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if not GEMINI_API_KEY or GEMINI_API_KEY == 'your_gemini_api_key_here':
    logger.error("❌ GEMINI_API_KEY not configured! Please add your API key to .env file")
    gemini_model = None
else:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        gemini_model = genai.GenerativeModel('gemini-1.5-flash')
        logger.info("✅ Gemini AI initialized successfully!")
    except Exception as e:
        logger.error(f"❌ Failed to initialize Gemini: {e}")
        gemini_model = None

# Pure Gemini AI Summarization System
def gemini_summarize(text, length='medium'):
    """
    Advanced Gemini AI summarization with perfect content understanding
    """
    if not gemini_model:
        return {
            "error": "Gemini AI not available. Please configure your API key in .env file."
        }
    
    try:
        # Advanced length-specific prompting for optimal results
        length_configs = {
            'short': {
                'sentences': '2-3 sentences',
                'focus': 'the absolute most critical insights and main conclusion',
                'style': 'concise and impactful'
            },
            'medium': {
                'sentences': '4-6 sentences', 
                'focus': 'key themes, main applications, and important implications',
                'style': 'balanced and comprehensive'
            },
            'detailed': {
                'sentences': '6-8 sentences',
                'focus': 'all major sections, applications, benefits, concerns, and future outlook',
                'style': 'thorough and well-structured'
            }
        }
        
        config = length_configs.get(length, length_configs['medium'])
        
        # Expert-level prompting for maximum quality
        prompt = f"""You are a world-class summarization expert. Analyze this text and create a professional, high-quality summary.

REQUIREMENTS:
- Create exactly {config['sentences']} that capture {config['focus']}
- Style: {config['style']}
- Ensure BALANCED coverage across ALL major sections of the text
- Maintain the original tone and key conclusions
- Include both opportunities AND challenges mentioned
- Write in natural, flowing language (not choppy extracted sentences)

CRITICAL: Focus on BREADTH over depth - touch on all major themes rather than over-emphasizing one area.

TEXT TO ANALYZE:
{text}

Provide your response in this EXACT JSON format (ensure valid JSON):
{{
    "main_summary": "Your expertly crafted {config['sentences']} summary here. Ensure it flows naturally and covers the full breadth of the content.",
    "key_points": [
        "First key insight (concise, under 70 chars)",
        "Second key insight (concise, under 70 chars)",
        "Third key insight (concise, under 70 chars)",
        "Fourth key insight (concise, under 70 chars)"
    ]
}}

Focus on creating a summary that someone could read and understand the full scope and balance of the original text."""

        # Generate with optimized parameters
        response = gemini_model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=0.3,  # Lower temperature for more consistent, focused output
                top_p=0.8,
                max_output_tokens=1000,
            )
        )
        
        response_text = response.text.strip()
        logger.info(f"Gemini response received: {len(response_text)} characters")
        
        # Advanced JSON extraction
        try:
            # Try direct JSON parsing first
            result = json.loads(response_text)
            
        except json.JSONDecodeError:
            # Advanced extraction for responses wrapped in markdown or extra text
            start_markers = ['{', '```json\n{', '```\n{']
            end_markers = ['}', '}\n```', '}```']
            
            json_str = None
            for start_marker in start_markers:
                start_idx = response_text.find(start_marker)
                if start_idx != -1:
                    for end_marker in end_markers:
                        end_idx = response_text.find(end_marker, start_idx)
                        if end_idx != -1:
                            if start_marker == '{':
                                json_str = response_text[start_idx:end_idx + 1]
                            else:
                                json_str = response_text[start_idx + len(start_marker) - 1:end_idx + 1]
                            break
                    if json_str:
                        break
            
            if json_str:
                result = json.loads(json_str)
            else:
                raise json.JSONDecodeError("Could not find valid JSON", response_text, 0)
        
        # Validate and enhance the result
        if not isinstance(result, dict) or 'main_summary' not in result:
            raise ValueError("Invalid response structure from Gemini")
        
        # Ensure we have key points
        if 'key_points' not in result or not isinstance(result['key_points'], list):
            # Extract key points from summary if missing
            sentences = result['main_summary'].split('. ')
            result['key_points'] = [
                (sentence[:65] + '...') if len(sentence) > 68 else sentence 
                for sentence in sentences[:4] if sentence.strip()
            ]
        
        # Clean and optimize the response
        summary = result['main_summary'].strip()
        key_points = []
        
        for point in result['key_points'][:4]:  # Limit to 4 points
            cleaned_point = point.strip().rstrip('.')
            if len(cleaned_point) > 70:
                cleaned_point = cleaned_point[:67] + '...'
            if cleaned_point and cleaned_point not in key_points:
                key_points.append(cleaned_point)
        
        # Calculate quality metrics
        word_count = len(summary.split())
        sentence_count = len([s for s in summary.split('.') if s.strip()])
        
        return {
            "main_summary": summary,
            "key_points": key_points,
            "structure": length,
            "method": "gemini-ai-pure",
            "quality_metrics": {
                "word_count": word_count,
                "sentence_count": sentence_count,
                "key_points_count": len(key_points)
            }
        }
        
    except json.JSONDecodeError as e:
        logger.error(f"JSON parsing error: {e}")
        logger.error(f"Raw response: {response_text}")
        return {"error": "Failed to parse AI response. Please try again."}
        
    except Exception as e:
        logger.error(f"Gemini API error: {e}")
        return {"error": f"AI summarization failed: {str(e)}"}
@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "ai_engine": "gemini-pure",
        "gemini_available": gemini_model is not None,
        "message": "🤖 Pure Gemini AI Summary Maker is ready!"
    })

@app.route('/summarize', methods=['POST'])
def summarize_text():
    """Pure Gemini AI summarization endpoint"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({"error": "No text provided"}), 400
        
        text = data['text'].strip()
        length = data.get('length', 'medium')  # short, medium, detailed
        
        if not text:
            return jsonify({"error": "Empty text provided"}), 400
        
        if len(text) < 50:
            return jsonify({"error": "Text too short to summarize (minimum 50 characters)"}), 400
        
        logger.info(f"🤖 Using Pure Gemini AI for summarization with length: {length}")
        
        # Use pure Gemini AI summarization
        summary_result = gemini_summarize(text, length)
        
        if not summary_result:
            return jsonify({"error": "Failed to generate summary"}), 500
        
        if isinstance(summary_result, dict) and "error" in summary_result:
            return jsonify({"error": summary_result["error"]}), 400
        
        # Calculate additional metrics
        sentence_count = len([s for s in summary_result["main_summary"].split('.') if s.strip()]) if summary_result["main_summary"] else 0
        original_sentences = len([s for s in text.split('.') if s.strip()])
        
        return jsonify({
            "summary": summary_result["main_summary"],
            "key_points": summary_result["key_points"],
            "structure": summary_result["structure"],
            "original_length": len(text),
            "summary_length": len(summary_result["main_summary"]),
            "sentence_count": sentence_count,
            "original_sentences": original_sentences,
            "quality_metrics": summary_result.get("quality_metrics", {}),
            "length_setting": length,
            "method": summary_result.get("method", "gemini-ai-pure"),
            "ai_engine": "🤖 Pure Gemini AI"
        })
        
    except Exception as e:
        logger.error(f"Error in Pure Gemini summarization: {e}")
        return jsonify({"error": f"AI summarization failed: {str(e)}"}), 500

@app.route('/extract-pdf', methods=['POST'])
def extract_pdf_text():
    """Extract text from uploaded PDF"""
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        if not file.filename.lower().endswith('.pdf'):
            return jsonify({"error": "File must be a PDF"}), 400
        
        # Read PDF and extract text
        pdf_bytes = file.read()
        text_content = ""
        page_count = 0
        
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            page_count = len(pdf.pages)
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text_content += page_text + "\n"
        
        if not text_content.strip():
            return jsonify({"error": "No text found in PDF. This might be a scanned document."}), 400
        
        return jsonify({
            "text": text_content.strip(),
            "pages": page_count,
            "character_count": len(text_content),
            "word_count": len(text_content.split())
        })
        
    except Exception as e:
        logger.error(f"Error extracting PDF: {e}")
        return jsonify({"error": f"PDF extraction failed: {str(e)}"}), 500


if __name__ == '__main__':
    print("🚀 Pure Gemini AI Summary Maker Backend Starting...")
    print("📝 Endpoints available:")
    print("   GET  /health - Health check")
    print("   POST /extract-pdf - Extract text from PDF")
    print("   POST /summarize - Pure Gemini AI summarization")

    if gemini_model:
        print("\n🤖 Pure Gemini AI is ready!")
        print("   ✅ World-class AI summarization enabled")
        print("   🎯 Advanced content understanding")
        print("   🧠 Perfect balance and breadth coverage")
    else:
        print("\n⚠️ Gemini AI not configured")
        print("   🔑 API key required for Pure Gemini system")
        print("   💡 To enable Gemini AI:")
        print("      1. Get free API key: https://makersuite.google.com/app/apikey")
        print("      2. Add to .env file: GEMINI_API_KEY=your_key_here")
        print("      3. Restart the server")

    # Use PORT from env or default to 5000
    port = int(os.getenv('PORT', 5000))
    debug_mode = os.getenv('DEBUG', 'False').lower() == 'true'
    host = os.getenv('HOST', '0.0.0.0')

    print(f"\n🌐 Server starting on http://{host}:{port}")
    app.run(debug=debug_mode, host=host, port=port)

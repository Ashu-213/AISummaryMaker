import React from 'react';

function SummaryResult({ summaryData, userNotes, onNotesChange, onCopy, onDownload, onStartOver }) {
  if (!summaryData) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 slide-in">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onStartOver}
          className="btn-secondary flex items-center gap-2"
        >
          <span>←</span> Start Over
        </button>
        <div className="text-center">
          <h1 className="text-3xl font-bold logo-container">
            <span className="logo-container">📊</span> <span className="gradient-text">Summary Results</span>
          </h1>
          <p className="text-gray-600">Your intelligent document analysis</p>
        </div>
        <div className="w-24"></div> {/* Spacer for centering */}
      </div>

      {/* Statistics Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="stats-card">
          <div className="text-3xl font-bold text-blue-600">
            {Math.round((1 - summaryData.summary_length / summaryData.original_length) * 100)}%
          </div>
          <div className="text-sm text-gray-600 font-medium">Compression</div>
        </div>
        <div className="stats-card">
          <div className="text-3xl font-bold text-green-600">
            {summaryData.sentence_count}
          </div>
          <div className="text-sm text-gray-600 font-medium">Key Sentences</div>
        </div>
        <div className="stats-card">
          <div className="text-3xl font-bold text-purple-600">
            {summaryData.key_points.length}
          </div>
          <div className="text-sm text-gray-600 font-medium">Key Points</div>
        </div>
        <div className="stats-card">
          <div className="text-3xl font-bold text-orange-600">
            {summaryData.sections_covered || 'N/A'}
          </div>
          <div className="text-sm text-gray-600 font-medium">Sections Covered</div>
        </div>
      </div>

      {/* Main Summary Section */}
      <div className="card-highlight">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3 logo-container">🤖</span>
          <h2 className="text-2xl font-bold text-gray-800">AI Summary</h2>
          <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium logo-container ${
            summaryData.method.includes('gemini') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {summaryData.method.includes('gemini') ? '🧠 Gemini AI' : '📝 Rule-based'}
          </span>
        </div>
        <div className="summary-section">
          <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
            {summaryData.summary}
          </p>
        </div>
      </div>

      {/* Key Points Section */}
      <div className="card">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3">🔑</span>
          <h2 className="text-2xl font-bold text-gray-800">Key Points</h2>
          <span className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Concise & Focused
          </span>
        </div>
        <div className="space-y-3">
          {summaryData.key_points.map((point, index) => (
            <div key={index} className="key-point">
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{point}</p>
              </div>
            </div>
          ))}
        </div>
        {summaryData.key_points.length === 0 && (
          <p className="text-gray-500 italic text-center py-8">No key points identified</p>
        )}
      </div>

      {/* User Notes Section */}
      <div className="card">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3 logo-container">📝</span>
          <h2 className="text-2xl font-bold text-gray-800">Your Notes & Insights</h2>
        </div>
        <textarea
          value={userNotes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add your thoughts, insights, questions, or additional notes here..."
          className="input-field min-h-[200px] resize-none"
          rows={8}
        />
        <div className="flex justify-between items-center mt-3">
          <div className="text-sm text-gray-500">
            Characters: {userNotes.length}
            {userNotes.length > 0 && (
              <span className="ml-4">
                Words: {userNotes.split(' ').filter(word => word.length > 0).length}
              </span>
            )}
          </div>
          {userNotes.length > 0 && (
            <span className="text-green-600 text-sm font-medium">✓ Notes saved</span>
          )}
        </div>
      </div>

      {/* Export Actions */}
      <div className="card">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3">📤</span>
          <h2 className="text-2xl font-bold text-gray-800">Export & Share</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <button 
            onClick={onCopy}
            className="btn-primary flex items-center justify-center gap-3 copy-btn"
          >
            <span>📋</span> Copy to Clipboard
          </button>
          <button 
            onClick={onDownload}
            className="btn-secondary flex items-center justify-center gap-3"
          >
            <span>💾</span> Download Report
          </button>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Export includes:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Complete AI summary with statistics</li>
            <li>• All key points and insights</li>
            <li>• Identified keywords and topics</li>
            <li>• Your personal notes and thoughts</li>
          </ul>
        </div>
      </div>

      {/* Document Analysis Summary */}
      <div className="card glass-effect">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Analysis Summary</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {summaryData.original_sentences}
              </div>
              <div className="text-sm text-gray-600">Original Sentences</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {summaryData.sentence_count}
              </div>
              <div className="text-sm text-gray-600">Summary Sentences</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {summaryData.original_length}
              </div>
              <div className="text-sm text-gray-600">Original Characters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryResult;

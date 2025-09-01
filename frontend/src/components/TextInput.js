import React from 'react';

function TextInput({ value, onChange }) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed

  return (
    <div className="space-y-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your article, research paper, or any text you want to summarize here...

✨ Pro tips:
• Longer texts (100+ words) work best
• Academic papers and articles are perfect
• News articles, blog posts, and reports too!"
        className="input-field min-h-[300px] resize-none"
        rows={12}
      />
      
      {/* Text Statistics */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="text-xl font-bold text-blue-600">{value.length}</div>
          <div className="text-sm text-blue-700">Characters</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-600">{wordCount}</div>
          <div className="text-sm text-green-700">Words</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
          <div className="text-xl font-bold text-purple-600">{readingTime}</div>
          <div className="text-sm text-purple-700">Min to read</div>
        </div>
      </div>
      
      {/* Content Quality Indicator */}
      {value.length > 0 && (
        <div className="mt-4">
          {value.length < 100 ? (
            <div className="flex items-center gap-2 text-orange-600">
              <span>⚠️</span>
              <span className="text-sm">Add more text for better summaries (100+ characters recommended)</span>
            </div>
          ) : value.length < 500 ? (
            <div className="flex items-center gap-2 text-blue-600">
              <span>👍</span>
              <span className="text-sm">Good length! Ready for summarization</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <span>🎯</span>
              <span className="text-sm">Perfect! This length will generate an excellent summary</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TextInput;

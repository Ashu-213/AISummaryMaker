import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="glass-effect rounded-2xl p-8 max-w-md w-full text-center">
        <div className="space-y-6">
          {/* Animated Icon */}
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center logo-container">
              <span className="text-2xl animate-pulse">🤖</span>
            </div>
          </div>
          
          {/* Loading Messages */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-800">
              AI is Processing...
            </h3>
            <p className="text-gray-600">
              Analyzing your content and extracting key insights
            </p>
          </div>
          
          {/* Progress Indicators */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Progress</span>
              <span>Processing...</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
          </div>
          
          {/* Fun Facts */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              <span className="font-semibold logo-container">💡 Did you know?</span><br />
              Our AI can process thousands of words in seconds and identify the most important information for you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;

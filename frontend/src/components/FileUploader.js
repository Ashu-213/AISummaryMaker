import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUploader({ onFileUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 group
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 shadow-xl scale-105' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-lg'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className={`text-6xl transition-transform duration-300 ${isDragActive ? 'scale-110' : 'group-hover:scale-110'}`}>
            📁
          </div>
          {isDragActive ? (
            <div>
              <p className="text-blue-600 font-bold text-xl">
                Drop your PDF here! 🎯
              </p>
              <p className="text-blue-500">
                We'll extract the text for you
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-700 font-semibold text-lg mb-2">
                Drag & drop your PDF here
              </p>
              <p className="text-blue-600 font-medium">
                or click to browse files
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Supports text-based PDFs up to 10MB
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2 logo-container">💡 Tips for best results:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use text-based PDFs (not scanned images)</li>
          <li>• Smaller files process faster</li>
          <li>• Academic papers and articles work great</li>
        </ul>
      </div>
    </div>
  );
}

export default FileUploader;

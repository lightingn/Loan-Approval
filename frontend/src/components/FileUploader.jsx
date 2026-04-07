import { useState, useCallback } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';

export default function FileUploader({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile.name.endsWith('.csv')) {
      setError("Please upload a valid .csv file.");
      setFile(null);
      return;
    }
    setError(null);
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  return (
    <div className="w-full">
      <div 
        className={`relative p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
          dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          accept=".csv"
          onChange={handleChange}
        />
        
        {file ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-12 w-12 text-secondary mb-3" />
            <p className="font-semibold text-text">{file.name}</p>
            <p className="text-sm text-muted">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadCloud className="h-12 w-12 text-muted mb-3" />
            <p className="text-lg font-medium text-text mb-1">Drag and drop your dataset</p>
            <p className="text-sm text-muted">or click to browse (.csv only)</p>
          </div>
        )}
      </div>
      
      {error && <p className="text-danger flex text-sm mt-2 font-medium">{error}</p>}
    </div>
  );
}

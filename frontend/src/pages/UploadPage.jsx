import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import FileUploader from '../components/FileUploader';
import DataPreview from '../components/DataPreview';
import LoadingSpinner from '../components/LoadingSpinner';
import { useModelStatus } from '../hooks/useModelStatus';
import { DownloadCloud, Info } from 'lucide-react';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploadData, setUploadData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  
  const { fetchStatus } = useModelStatus();
  const navigate = useNavigate();

  const handleUploadClick = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const res = await api.uploadDataset(file);
      setUploadData(res);
      toast.success(res.message || "Dataset uploaded successfully!");
    } catch (e) {
      toast.error(e.message || "Failed to upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleTrainClick = async () => {
    setIsTraining(true);
    try {
      await api.trainModel();
      toast.success("Training started in the background...");
      
      const poll = setInterval(async () => {
        const d = await api.getModelStatus();
        if (d.trained) {
          clearInterval(poll);
          setIsTraining(false);
          await fetchStatus();
          toast.success(`Model trained successfully! Accuracy: ${(d.accuracy * 100).toFixed(1)}%`);
        }
      }, 3000);
    } catch (e) {
      toast.error(e.message || "Failed to train model.");
      setIsTraining(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Dataset Manager</h1>
        <p className="text-muted">Upload historical loan data to train the prediction model.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-text">1. Upload CSV Dataset</h2>
        </div>
        
        <FileUploader onFileSelect={setFile} />
        
        <button 
          disabled={!file || isUploading || !!uploadData}
          onClick={handleUploadClick}
          className="w-full mt-6 py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/90 transition disabled:opacity-50 flex justify-center"
        >
          {isUploading ? <LoadingSpinner size="sm" className="border-t-white" /> : "Upload Dataset"}
        </button>
      </div>

      {uploadData && (
        <div className="animate-fade-in-up mt-8">
          <DataPreview 
            columns={uploadData.columns} 
            data={uploadData.preview_data} 
            missingValues={uploadData.missing_values} 
          />

          <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-text">Dataset Ready</h2>
              <p className="text-muted text-sm">{uploadData.rows} rows identified. Check the preview for missing values.</p>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              {isTraining ? (
                <div className="flex items-center gap-3 text-secondary font-medium px-4 py-2">
                  <LoadingSpinner size="sm" className="border-t-secondary" /> Training in progress...
                </div>
              ) : (
                <button onClick={handleTrainClick} className="w-full sm:w-auto px-6 py-2.5 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition">
                  Train Model Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-3 text-sm text-primary mt-8">
        <Info className="h-5 w-5 shrink-0" />
        <div>
          <span className="font-semibold block mb-1">Expected CSV Columns</span>
          Gender, Married, Dependents, Education, Self_Employed, ApplicantIncome, CoapplicantIncome, LoanAmount, Loan_Amount_Term, Credit_History, Property_Area, Loan_Status (Y/N).
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import LoanForm from '../components/LoanForm';
import ResultCard from '../components/ResultCard';
import { useModelStatus } from '../hooks/useModelStatus';

export default function PredictPage() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useModelStatus();

  const handlePredict = async (formData) => {
    if (!status.trained) {
      toast.error('Model not trained yet. Please upload a dataset to train first.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.predict(formData);
      setResult(res);
      toast.success("Prediction completed.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      toast.error(e.message || "Failed to make prediction.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
        
        <div className="lg:col-span-7">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">Loan Application</h1>
            <p className="text-muted">Enter applicant details to predict approval probability.</p>
          </div>
          <LoanForm onSubmit={handlePredict} isLoading={isLoading} />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
          {result ? (
            <ResultCard result={result} />
          ) : (
            <div className="bg-white rounded-xl shadow-card p-10 border border-gray-100 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">No Prediction Yet</h3>
              <p className="text-muted max-w-sm">
                Fill out the application form comprehensively and submit to receive an AI-powered prediction decision.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

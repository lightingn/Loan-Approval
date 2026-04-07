import { Link } from 'react-router-dom';
import { Brain, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 leading-tight">
          Loan Approval Prediction
        </h1>
        <p className="text-xl text-muted font-medium">
          Powered by Machine Learning — Fast, Fair, Transparent
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <Link to="/predict" className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-primary/90 transition flex items-center justify-center gap-2">
          Predict a Loan <ArrowRight className="h-5 w-5" />
        </Link>
        <Link to="/upload" className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl border border-gray-100 transition flex items-center justify-center gap-2">
          Upload Dataset <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-50 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Brain className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-text mb-3">Random Forest AI</h3>
          <p className="text-muted">A robust ensemble model trained on your proprietary data for maximum precision.</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-50 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
          <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
            <Zap className="h-7 w-7 text-secondary" />
          </div>
          <h3 className="text-xl font-bold text-text mb-3">Instant Results</h3>
          <p className="text-muted">Process complete applicant profiles in fractions of a second with background inference.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-50 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
          <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
            <ShieldCheck className="h-7 w-7 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-text mb-3">Explainable Predictions</h3>
          <p className="text-muted">Receive clear percentage confidences and feature impact reports for fair decision making.</p>
        </div>
      </div>
    </div>
  );
}

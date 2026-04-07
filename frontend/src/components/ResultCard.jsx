import FeatureImportanceBar from './FeatureImportanceBar';
import ProbabilityMeter from './ProbabilityMeter';
import { CheckCircle, XCircle } from 'lucide-react';

export default function ResultCard({ result }) {
  if (!result) return null;

  const isApproved = result.prediction === "Approved";
  
  return (
    <div className={`bg-white rounded-xl shadow-card p-6 border-l-4 ${isApproved ? 'border-secondary' : 'border-danger'} transition-all`}>
      <div className="flex items-center gap-3 mb-4">
        {isApproved ? (
          <CheckCircle className="h-10 w-10 text-secondary" />
        ) : (
          <XCircle className="h-10 w-10 text-danger" />
        )}
        <h2 className="text-2xl font-bold text-text">
          {isApproved ? '✓ Loan Approved' : '✗ Loan Rejected'}
        </h2>
      </div>

      <ProbabilityMeter probability={result.probability} />

      <div className="mt-8">
        <h3 className="font-semibold text-text mb-2">
          {isApproved ? 'Key Factors Supporting Approval' : 'Key Factors Against Approval'}
        </h3>
        <FeatureImportanceBar data={result.feature_importances} />
      </div>

      <div className="mt-6 p-4 bg-background rounded-lg border border-gray-100">
        <p className="text-sm text-text font-medium">{result.reason}</p>
        {!isApproved && (
          <p className="text-xs text-muted mt-2">
            Tip: Improving your credit history and reducing your loan amount relative to income may increase approval odds.
          </p>
        )}
      </div>
    </div>
  );
}

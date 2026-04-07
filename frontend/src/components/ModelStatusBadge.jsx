import { useModelStatus } from '../hooks/useModelStatus';
import LoadingSpinner from './LoadingSpinner';

export default function ModelStatusBadge() {
  const { status, loading } = useModelStatus();

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full text-xs text-muted">
        <LoadingSpinner size="sm" /> <span>Checking model...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${status.trained ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'}`}>
      <span className={`h-2 w-2 rounded-full ${status.trained ? 'bg-secondary' : 'bg-accent'} ${status.trained ? 'animate-pulse' : ''}`}></span>
      {status.trained ? 'Model Ready' : 'No Model'}
    </div>
  );
}

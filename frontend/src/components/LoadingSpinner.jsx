export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-4',
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-gray-200 border-t-primary ${sizeClasses[size]} ${className}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

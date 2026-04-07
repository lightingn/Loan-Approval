import { Link } from 'react-router-dom';
import ModelStatusBadge from './ModelStatusBadge';
import { Activity } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow border-b border-gray-100 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Activity className="h-6 w-6 text-secondary" />
          <span>LoanScore AI</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-muted hover:text-primary transition font-medium">Home</Link>
          <Link to="/upload" className="text-muted hover:text-primary transition font-medium">Upload Dataset</Link>
          <Link to="/predict" className="text-muted hover:text-primary transition font-medium">Predict</Link>
          <ModelStatusBadge />
        </div>
      </div>
    </nav>
  );
}

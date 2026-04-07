import { motion } from 'framer-motion';

export default function ProbabilityMeter({ probability }) {
  const percent = Math.round(probability * 100);
  let color = 'bg-danger';
  if (probability >= 0.6) color = 'bg-secondary';
  else if (probability >= 0.4) color = 'bg-accent';

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-end mb-1 text-sm font-medium">
        <span className="text-muted">Approval Confidence</span>
        <span className="text-text">{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-3 rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

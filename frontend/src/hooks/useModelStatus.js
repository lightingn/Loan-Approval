import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useModelStatus() {
  const [status, setStatus] = useState({ trained: false, accuracy: null, last_trained: null });
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const data = await api.getModelStatus();
      setStatus(data);
    } catch (e) {
      console.error("Failed to fetch model status", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  return { status, fetchStatus, loading };
}

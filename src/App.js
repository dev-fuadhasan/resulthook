import React, { useState } from 'react';
import ResultForm from './ResultForm';
import ResultDisplay from './ResultDisplay';
import { fetchResult } from './api';

export default function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (form) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetchResult(form);
      setResult(res);
    } catch (e) {
      setError('Could not fetch result. Try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h1>Bangladesh Board Results (Unofficial Proxy)</h1>
      <ResultForm onSubmit={handleSubmit} loading={loading} />
      <ResultDisplay result={result} error={error} />
    </div>
  );
} 
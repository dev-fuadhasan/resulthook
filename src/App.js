import React, { useState } from 'react';
import ResultForm from './ResultForm';
import ResultDisplay from './ResultDisplay';
import { fetchResult } from './api';
import './styles.css';

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
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <h1 style={{ color: '#00796b', textAlign: 'center', fontWeight: 700, marginBottom: 32 }}>
        Bangladesh Board Results <span style={{ fontWeight: 400, fontSize: '1.1rem' }}>(Unofficial Proxy)</span>
      </h1>
      <ResultForm onSubmit={handleSubmit} loading={loading} />
      <ResultDisplay result={result} error={error} />
    </div>
  );
} 
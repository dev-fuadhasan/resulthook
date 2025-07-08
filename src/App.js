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
    <div className="main-container">
      <h1 className="main-title">Bangladesh Board Results</h1>
      <ResultForm onSubmit={handleSubmit} loading={loading} />
      <ResultDisplay result={result} error={error} />
    </div>
  );
} 
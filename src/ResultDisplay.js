import React from 'react';

export default function ResultDisplay({ result, error }) {
  if (error) return <div className="result-display" style={{ color: '#d32f2f', background: '#ffebee', border: '2px solid #ffcdd2' }}>{error}</div>;
  if (!result) return null;
  if (result.error) return <div className="result-display" style={{ color: '#d32f2f', background: '#ffebee', border: '2px solid #ffcdd2' }}>{result.error}</div>;
  if (result.status !== 0) return <div className="result-display" style={{ color: '#d32f2f', background: '#ffebee', border: '2px solid #ffcdd2' }}>{result.msg || 'No result found.'}</div>;
  const res = result.res;
  return (
    <div className="result-display">
      <h2>Result</h2>
      <div className="result-name">{res.name} ({res.roll_no})</div>
      <div className={`result-gpa${res.result !== 'P' ? ' result-fail' : ''}`}>GPA: {res.gpa} {res.result !== 'P' && '(Failed)'}</div>
      <div className="result-row"><span className="result-label">Institute:</span><span className="result-value">{res.inst_name}</span></div>
      <div className="result-row"><span className="result-label">Board:</span><span className="result-value">{res.board_name}</span></div>
      <div className="result-row"><span className="result-label">Exam:</span><span className="result-value">{res.exam_name}</span></div>
      <div className="result-row"><span className="result-label">Year:</span><span className="result-value">{res.pass_year}</span></div>
      <div className="result-row"><span className="result-label">Result:</span><span className="result-value">{res.result === 'P' ? 'Passed' : 'Failed'}</span></div>
      <div className="result-row"><span className="result-label">Group:</span><span className="result-value">{res.stud_group}</span></div>
      <div className="result-row"><span className="result-label">Details:</span><span className="result-value">{res.display_details}</span></div>
      {res.display_details_ca && <div className="result-row"><span className="result-label">CA:</span><span className="result-value">{res.display_details_ca}</span></div>}
    </div>
  );
} 
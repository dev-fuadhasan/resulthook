import React from 'react';

export default function ResultDisplay({ result, error }) {
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!result) return null;
  if (result.error) return <div style={{ color: 'red' }}>{result.error}</div>;
  if (result.status !== 0) return <div style={{ color: 'red' }}>{result.msg || 'No result found.'}</div>;
  const res = result.res;
  return (
    <div className="result-display">
      <h2>Result for {res.name} ({res.roll_no})</h2>
      <div>Institute: {res.inst_name}</div>
      <div>Board: {res.board_name}</div>
      <div>Exam: {res.exam_name}</div>
      <div>Year: {res.pass_year}</div>
      <div>GPA: {res.gpa}</div>
      <div>Result: {res.result}</div>
      <div>Details: {res.display_details}</div>
      {res.display_details_ca && <div>CA: {res.display_details_ca}</div>}
    </div>
  );
} 
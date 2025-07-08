import React from 'react';

function getSubjectName(code, subDetails) {
  const found = subDetails?.find(s => s.SUB_CODE === code || s.SUB_CODE === code.toString());
  if (!found) return code;
  return found.SUB_NAME;
}

function parseDisplayDetails(details) {
  // Example: "101:A ,107:A+,109:B ,150:A-,111:A-,136:A+,137:A ,138:A ,154:A+,126:A"
  if (!details) return [];
  return details.split(',').map(pair => {
    const [code, grade] = pair.split(':').map(s => s.trim());
    return { code, grade };
  });
}

function parseDisplayDetailsCA(details) {
  // Example: "147:A+,156:A+"
  if (!details) return [];
  return details.split(',').map(pair => {
    const [code, grade] = pair.split(':').map(s => s.trim());
    return { code, grade };
  });
}

export default function ResultDisplay({ result, error }) {
  if (error) return <div className="result-display" style={{ color: '#d32f2f', background: '#ffebee', border: '2px solid #ffcdd2' }}>{error}</div>;
  if (!result) return null;
  if (result.error) return <div className="result-display" style={{ color: '#d32f2f', background: '#ffebee', border: '2px solid #ffcdd2' }}>{result.error}</div>;
  if (result.status !== 0) return <div className="result-display" style={{ color: '#d32f2f', background: '#ffebee', border: '2px solid #ffcdd2' }}>{result.msg || 'No result found.'}</div>;
  const res = result.res;
  const subDetails = result.sub_details || [];
  const subjectGrades = parseDisplayDetails(res.display_details);
  const caGrades = parseDisplayDetailsCA(res.display_details_ca);
  // Optional subject: 126 (Higher Mathematics)
  const optionalCode = '126';
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
      {/* Subject-wise results */}
      <div style={{ width: '100%', marginTop: 24 }}>
        <div style={{ fontWeight: 700, color: '#0097a7', marginBottom: 8, fontSize: '1.1rem' }}>Subject-wise Grades</div>
        <table className="subject-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Subject</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {subjectGrades.map(({ code, grade }) => (
              <tr key={code} className={code === optionalCode ? 'optional-row' : ''}>
                <td>{code}</td>
                <td>{getSubjectName(code, subDetails)}{code === optionalCode ? ' (Optional)' : ''}</td>
                <td>{grade}</td>
              </tr>
            ))}
            {caGrades.length > 0 && caGrades.map(({ code, grade }) => (
              <tr key={code} className="ca-row">
                <td>{code}</td>
                <td>{getSubjectName(code, subDetails)} (CA)</td>
                <td>{grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
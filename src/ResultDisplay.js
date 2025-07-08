import React from "react";

function ResultDisplay({ result }) {
  if (!result) return null;
  // You may need to adjust this based on the actual API response structure
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Result</h3>
      <pre style={{ background: "#f0f0f0", padding: 10 }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

export default ResultDisplay; 
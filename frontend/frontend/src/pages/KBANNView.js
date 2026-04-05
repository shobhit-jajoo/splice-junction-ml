import { useState } from "react";
import API from "../api/api";

function KBANNView() {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!sequence) return;
    setLoading(true);
    try {
      const res = await API.post("/kbann/features", { sequence });
      setResult(res.data);
    } catch (error) {
      console.error("Error analyzing sequence", error);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>🧬 KBANN Rule Visualization</h2>
      </div>
      
      <div className="card-body">
        <div className="input-group">
          <input
            className="styled-input"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder="Enter DNA sequence (e.g. ATGC...)"
          />
          <button 
            className="primary-btn" 
            onClick={handleCheck} 
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {result && (
          <div className="result-box">
            <h4>Detected Features:</h4>
            <pre className="code-block">
              {JSON.stringify(result.features, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default KBANNView;
import { useState } from "react";
import API from "../api/api";

function ProbabilityBars({ probabilities }) {
  return (
    <div className="probability-list">
      {Object.entries(probabilities).map(([label, value]) => (
        <div key={label} className="probability-row">
          <div className="probability-head">
            <span>{label}</span>
            <span>{(value * 100).toFixed(1)}%</span>
          </div>
          <div className="probability-track">
            <div
              className="probability-fill"
              style={{ width: `${(value * 100).toFixed(1)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function KBANNView() {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (!sequence.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/predict/compare", { sequence });
      setResult(res.data);
    } catch (err) {
      const message = err.response?.data?.error || "Failed to analyze sequence.";
      setError(message);
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>🧬 Dual-Model Junction Prediction</h2>
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
            {loading ? "Predicting..." : "Predict in Both Models"}
          </button>
        </div>

        {error && <p style={{ color: "#dc2626", marginTop: "-0.5rem" }}>{error}</p>}

        {result && (
          <div className="result-box dual-model-result">
            <p>
              <strong>Sequence:</strong>{" "}
              <span className="mono-text">{result.sequence}</span>
            </p>

            <div className="model-grid">
              <div className="model-card">
                <h4>KBANN</h4>
                <p>
                  Predicted Class:{" "}
                  <span className="prediction-badge">{result.KBANN.prediction}</span>
                </p>
                <p>
                  Confidence: {(result.KBANN.confidence * 100).toFixed(1)}%
                </p>
                <ProbabilityBars probabilities={result.KBANN.probabilities} />
                <h5>Rule Features</h5>
                <pre className="code-block">
                  {JSON.stringify(result.KBANN.features, null, 2)}
                </pre>
              </div>

              <div className="model-card">
                <h4>Deep Learning</h4>
                <p>
                  Predicted Class:{" "}
                  <span className="prediction-badge">{result.DeepLearning.prediction}</span>
                </p>
                <p>
                  Confidence: {(result.DeepLearning.confidence * 100).toFixed(1)}%
                </p>
                <ProbabilityBars probabilities={result.DeepLearning.probabilities} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default KBANNView;

import { useEffect, useState } from "react";
import API from "../api/api";

function Metrics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/metrics/kbann").then(res => setData(res.data));
  }, []);

  if (!data) {
    return (
      <div className="card">
        <div className="card-body">
          <p style={{ color: "var(--text-muted)" }}>Loading metrics...</p>
        </div>
      </div>
    );
  }

  // Helper to format decimals to percentages (e.g., 0.954 -> "95.4%")
  const formatPercent = (val) => `${(val * 100).toFixed(1)}%`;

  return (
    <div className="card">
      <div className="card-header">
        <h2>📈 KBANN Model Metrics</h2>
      </div>
      
      <div className="card-body">
        {/* Metric Cards Grid */}
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label">Accuracy</span>
            <span className="stat-value">{formatPercent(data.accuracy)}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Precision</span>
            <span className="stat-value">{formatPercent(data.precision)}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Recall</span>
            <span className="stat-value">{formatPercent(data.recall)}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">F1 Score</span>
            <span className="stat-value">{formatPercent(data.f1_score)}</span>
          </div>
        </div>

        <h3 style={{ marginTop: "2rem", color: "var(--text-main)", fontSize: "1rem" }}>
          Confusion Matrix
        </h3>
        <pre className="code-block" style={{ marginTop: "0.5rem" }}>
          {JSON.stringify(data.confusion_matrix, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Metrics;
import { useEffect, useState } from "react";
import API from "../api/api";
import ChartBox from "../components/ChartBox";

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/analytics/classes").then(res => setData(res.data));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2>📊 Class Distribution</h2>
      </div>
      <div className="card-body">
        {!data ? (
          <p style={{ color: "var(--text-muted)" }}>Loading analytics...</p>
        ) : (
          <ChartBox data={data} />
        )}
      </div>
    </div>
  );
}

export default Analytics;
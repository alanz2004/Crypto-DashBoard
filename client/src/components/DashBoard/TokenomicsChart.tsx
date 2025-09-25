import React, { useEffect, useState } from "react";
import './TokenomicsChart.css'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface TokenomicsItem {
  name: string;
  value: number;
}

interface TokenomicsChartProps {
  projectId: string;
}

const COLORS = ["#6A5ACD", "#20B2AA", "#FF69B4", "#FFD700", "#7B68EE"];

const TokenomicsChart: React.FC<TokenomicsChartProps> = ({ projectId }) => {
  const { token } = useAuth();
  const [tokenomics, setTokenomics] = useState<TokenomicsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokenomics = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/projects/${projectId}/tokenomics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setTokenomics(data.tokenomics || []);
        } else {
          setTokenomics([]);
        }
      } catch (err) {
        console.error("Failed to fetch tokenomics", err);
        setTokenomics([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTokenomics();
    }
  }, [projectId, token]);

  if (loading) {
    return <p className="tokenomics-loading">Loading tokenomics...</p>;
  }

  return (
   <div className="tokenomic-chart-container">
      <h2 className="tokenomic-chart-title">Project Tokenomics</h2>

      {tokenomics.length > 0 ? (
        <div className="tokenomic-chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tokenomics}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  typeof percent === "number" ? `${name} ${(percent * 100).toFixed(0)}%` : name
                }
                outerRadius={120}
                dataKey="value"
              >
                {tokenomics.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="tokenomic-no-data">
          <p>No tokenomics found for this project.</p>
          <button className="tokenomic-btn" onClick={() => navigate("/helper")}>
            Build Tokenomics with AI
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenomicsChart;

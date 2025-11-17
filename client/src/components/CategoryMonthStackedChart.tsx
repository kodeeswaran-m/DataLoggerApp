import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";

const MONTHS = ["April", "May", "June", "July", "Aug", "Sep", "Oct"];

const CATEGORY_COLORS: Record<string, string> = {
  "Generic AI": "#4F46E5",
  "Gen AI , Agentic AI": "#16A34A",
  "COTS and Integration": "#0284C7",
  "Insurance Core Offerings": "#D97706",
  "Tech Needs": "#DC2626",
  NA: "#6B7280",
};

export default function CategoryMonthStackedChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/ProspectDetail");
      const json = await res.json();
      setData(json.data);
    } catch (err) { 
      console.error("Failed to load:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p>Loading chart...</p>;

  // Transformed matrix
  const matrix: Record<string, number[]> = {
    "Generic AI": Array(MONTHS.length).fill(0),
    "Gen AI , Agentic AI": Array(MONTHS.length).fill(0),
    "COTS and Integration": Array(MONTHS.length).fill(0),
    "Insurance Core Offerings": Array(MONTHS.length).fill(0),
    "Tech Needs": Array(MONTHS.length).fill(0),
    NA: Array(MONTHS.length).fill(0),
  };

  data.forEach((item) => {
    const cat = item.category;
    const month = item.month;
    const idx = MONTHS.indexOf(month);

    if (matrix[cat] && idx !== -1) matrix[cat][idx] += 1;
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "500px",
        height: "100%",
        maxHeight: "500px",
        margin: "auto",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "10px",
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        Monthly Category Distribution
      </h3>

      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          width: "100%",
        }}
      >
        <BarChart
          height={350}
          series={Object.entries(matrix).map(([category, values]) => ({
            data: values,
            label: category,
            id: category,
            stack: "total",
            color: CATEGORY_COLORS[category],
          }))}
          xAxis={[
            {
              data: MONTHS,
              scaleType: "band",
              tickLabelStyle: {
                fontSize: 10,
                fontWeight: 600,
              },
            },
          ]}
          yAxis={[{ width: 35, tickLabelStyle: { fontSize: 10 } }]}
          slotProps={{
            bar: {
              borderRadius: 8, 
            },
          }}
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
    </Box>
  );
}

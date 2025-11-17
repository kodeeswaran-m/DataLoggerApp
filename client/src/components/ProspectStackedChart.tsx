import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";

interface ProspectItem {
  geo: string;
  category: string;
}

export default function ProspectStackedChart() {
  const [geoList, setGeoList] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [matrix, setMatrix] = useState<Record<string, number[]>>({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ProspectDetail");
      const json = await response.json();
      const data: ProspectItem[] = json.data;
      console.log("Data", data);

      if (!Array.isArray(data)) return;

      // Extract unique GEO names dynamically
      const geos = Array.from(new Set(data.map((d) => d.geo)));
      console.log("geo", geos);
      // Extract unique CATEGORIES dynamically
      const categories = Array.from(new Set(data.map((d) => d.category)));
      console.log("categories", categories);
      // Create matrix: geo -> array of counts for each category
      const tempMatrix: Record<string, number[]> = {};
      console.log("tempMatrix", tempMatrix);
      geos.forEach((geo) => {
        tempMatrix[geo] = Array(categories.length).fill(0);
      });

      data.forEach((item) => {
        const geoIndex = geos.indexOf(item.geo);
        const catIndex = categories.indexOf(item.category);

        if (geoIndex !== -1 && catIndex !== -1) {
          tempMatrix[item.geo][catIndex] += 1;
        }
      });

      setGeoList(geos);
      setCategoryList(categories);
      setMatrix(tempMatrix);
    } catch (error) {
      console.error("Error loading prospect data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (!categoryList.length || !geoList.length) return <p>No data available</p>;

  return (
    <Paper
      elevation={6}
      sx={{
        width: "100%",
        maxWidth: "500px",
        height: { xs: 320, sm: 420, md: 500 },
        padding: 2,
        borderRadius: "20px",
        background: "linear-gradient(145deg, #ffffff, #f3f4f6)",
        boxShadow:
          "rgba(0, 0, 0, 0.08) 0px 8px 24px, rgba(0, 0, 0, 0.04) 0px 2px 8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          mb: 2,
          color: "#1f2937",
          textAlign: "center",
        }}
      >
        Prospect Category Distribution by GEO
      </Typography>

      <Box sx={{ flex: 1, width: "100%" }}>
        <BarChart
          xAxis={[
            {
              data: categoryList,
              scaleType: "band",
              tickLabelStyle: {
                fontSize: 11,
                fontWeight: 600,
                fill: "#374151",
                whiteSpace: "normal",
              },
            },
          ]}
          yAxis={[
            {
              label: "Count",
              labelStyle: {
                fill: "#4b5563",
                fontSize: 12,
                fontWeight: 600,
              },
              tickLabelStyle: { fontSize: 11, fill: "#4b5563" },
            },
          ]}
          series={geoList.map((geo, index) => ({
            data: matrix[geo],
            label: geo,
            id: geo,
            stack: "total",
            color: COLORS[index % COLORS.length], 
          }))}
          margin={{ top: 20, bottom: 60, left: 60, right: 20 }}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: 20,
              labelStyle: {
                fontSize: 12,
                fontWeight: 600,
                fill: "#374151",
              },
            },
          }}
          sx={{
            "& .MuiBarElement-root": {
              rx: 8,
            },
          }}
        />
      </Box>
    </Paper>
  );
}

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#0284C7",
  "#F59E0B",
  "#A855F7",
  "#DC2626",
  "#059669",
  "#7C3AED",
];

import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

interface ApiResponse {
  success: boolean;
  xAxis: string[];
  seriesLabels: string[];
  data: Record<string, number[]>;
  filterNames: string[];
}

export default function DynamicRechartsBar({ url }: { url: string }) {
  const [xAxis, setXAxis] = useState<string[]>([]);
  const [seriesLabels, setSeriesLabels] = useState<string[]>([]);
  const [filterLabels, setFilterLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<Record<string, number[]>>({});

  const [selectedXAxis, setSelectedXAxis] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [chartType, setChartType] = useState<"stacked" | "bar">("stacked");

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#a4de6c"];

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get<ApiResponse>(url);
        const api = res.data;
        if (!api.success) return;

        setXAxis(api.xAxis);
        setSeriesLabels(api.seriesLabels);
        setChartData(api.data);
        setFilterLabels(api.filterNames);
        setSelectedXAxis(api.xAxis);
        setSelectedSeries(api.seriesLabels);
      } catch (err) {
        console.error("DynamicChart API Error:", err);
      }
    }
    loadData();
  }, [url]);

  const dataset = useMemo(() => {
    return selectedXAxis.map((label) => {
      const trimmedLabel = label.length > 9 ? label.slice(0, 9) + ".." : label;
      const row: any = { x: trimmedLabel };
      selectedSeries.forEach((series) => {
        const originalIndex = xAxis.indexOf(label);
        row[series] = chartData[series]?.[originalIndex] ?? 0;
      });
      return row;
    });
  }, [selectedXAxis, selectedSeries, chartData, xAxis]);

  return (
    <Box sx={{ padding: "20px" }}>
      {/* FILTER SECTION */}
      <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
        {/* X-Axis Filter */}
        <FormControl
          sx={{
            width: 200,
            "& .MuiInputBase-root": { height: 36, fontSize: "0.8rem" },
            "& .MuiInputLabel-root": { fontSize: "0.8rem", top: "-4px" },
          }}
        >
          <InputLabel>{filterLabels[0]}</InputLabel>
          <Select
            multiple
            value={selectedXAxis}
            onChange={(e) => setSelectedXAxis(e.target.value as string[])}
            input={<OutlinedInput label="X-Axis" />}
            renderValue={(sel) => sel.join(", ")}
            MenuProps={{
              PaperProps: {
                sx: {
                  width: 200,
                  maxHeight: 240,
                  "& .MuiMenuItem-root": {
                    minHeight: 28,
                    fontSize: "0.8rem",
                    py: 0.3,
                  },
                },
              },
            }}
          >
            {xAxis.map((label) => (
              <MenuItem key={label} value={label}>
                <Checkbox
                  checked={selectedXAxis.includes(label)}
                  sx={{ p: 0.3 }}
                />
                <ListItemText
                  primary={label}
                  sx={{ "& .MuiTypography-root": { fontSize: "0.8rem" } }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Series Filter */}
        <FormControl
          sx={{
            width: 200,
            "& .MuiInputBase-root": { height: 36, fontSize: "0.8rem" },
            "& .MuiInputLabel-root": { fontSize: "0.8rem", top: "-4px" },
          }}
        >
          <InputLabel>{filterLabels[1]}</InputLabel>
          <Select
            multiple
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value as string[])}
            input={<OutlinedInput label="Series" />}
            renderValue={(sel) => sel.join(", ")}
            MenuProps={{
              PaperProps: {
                sx: {
                  width: 200,
                  maxHeight: 240,
                  "& .MuiMenuItem-root": {
                    minHeight: 28,
                    fontSize: "0.8rem",
                    py: 0.3,
                  },
                },
              },
            }}
          >
            {seriesLabels.map((label) => (
              <MenuItem key={label} value={label}>
                <Checkbox
                  checked={selectedSeries.includes(label)}
                  sx={{ p: 0.3 }}
                />
                <ListItemText
                  primary={label}
                  sx={{ "& .MuiTypography-root": { fontSize: "0.8rem" } }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Chart Type Filter */}
        <FormControl
          sx={{
            width: 180,
            "& .MuiInputBase-root": { height: 36, fontSize: "0.8rem" },
            "& .MuiInputLabel-root": { fontSize: "0.8rem", top: "-4px" },
          }}
        >
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "stacked" | "bar")}
            input={<OutlinedInput label="Chart Type" />}
            MenuProps={{
              PaperProps: {
                sx: {
                  width: 180,
                  maxHeight: 240,
                  "& .MuiMenuItem-root": {
                    minHeight: 28,
                    fontSize: "0.8rem",
                    py: 0.3,
                  },
                },
              },
            }}
          >
            <MenuItem value="stacked">Stacked Bar Chart</MenuItem>
            <MenuItem value="bar">Bar Chart</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* CHART */}
      <Paper
        elevation={3}
        sx={{
          width: "70%",
          height: "400px",
          margin: "auto",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dataset}
            margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
            layout="horizontal"
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="x"
              tick={{ fontSize: 9, fontWeight: 400 }}
              interval={0}
            />
            <YAxis type="number" tick={{ fontSize: 9, fontWeight: 400 }} />

            {/* ↓↓↓ SMALLER TOOLTIP FONT ↓↓↓ */}
            <Tooltip
           
              contentStyle={{
                fontSize: "10px", // tooltip box text
                padding: "4px 6px",
              }}
              labelStyle={{
                fontSize: "10px", // X-axis label inside tooltip
                fontWeight: "bold",
              }}
              itemStyle={{
                fontSize: "10px", // label + value for each bar
              }}
            />

            {/* ↓↓↓ SMALLER LEGEND FONT ↓↓↓ */}
            <Legend
              wrapperStyle={{
                fontSize: "10px", // reduces legend item text
                paddingTop: "10px",
              }}
            />

            {selectedSeries.map((series, index) => (
              <Bar
                key={series}
                dataKey={series}
                stackId={chartType === "stacked" ? "a" : undefined}
                fill={colors[index % colors.length]}
                maxBarSize={35}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

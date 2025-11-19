import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import DynamicBarChart from "../../components/CategoryGeoBarChart/CategoryGeoBarChart";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const ProspectCharts = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {/* Heading */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 2,
        }}
      >
        Prospect Charts
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Geo-wise Analysis" />
        <Tab label="Month-wise Analysis" />
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={tab} index={0}>
        <DynamicBarChart url="http://localhost:5000/api/prospectDetail/chart-data" />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <DynamicBarChart url="http://localhost:5000/api/prospectDetail/chart-data-month" />
      </TabPanel>
    </Box>
  );
};

export default ProspectCharts;

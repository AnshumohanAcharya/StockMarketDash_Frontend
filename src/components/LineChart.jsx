// src/components/LineChart.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useGetStockDetailsQuery } from "../services/stockApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const financialData = [
  {
    name: "S&P 500",
    symbol: "^GSPC",
    value: 498.84,
    change: 4.76,
    perchange: 0.96,
  },
  {
    name: "Nasdaq",
    symbol: "^IXIC",
    value: 433.35,
    change: 4.8,
    perchange: 1.12,
  },
  {
    name: "Dow Jones",
    symbol: "^DJI",
    value: 384.31,
    change: 1.49,
    perchange: 0.39,
  },
  {
    name: "Russell 2000",
    symbol: "^RUT",
    value: 199.45,
    change: 4.84,
    perchange: 2.49,
  },
  {
    name: "Crude Oil",
    symbol: "CL=F",
    value: 71.54,
    change: -1.11,
    perchange: -1.53,
  },
  {
    name: "Gold",
    symbol: "GC=F",
    value: 184.42,
    change: -0.1,
    perchange: -0.06,
  },
  {
    name: "Silver",
    symbol: "SI=F",
    value: 20.44,
    change: 0.24,
    perchange: 1.21,
  },
  {
    name: "10-Year Bond",
    symbol: "^TNX",
    value: 93.88,
    change: 0.34,
    perchange: 0.36,
  },
  {
    name: "Bitcoin",
    symbol: "BTC-USD",
    value: 24.57,
    change: 1.14,
    perchange: 4.87,
  },
];

const LineChart = ({ isDashboard }) => {
  const [selectedIndex, setSelectedIndex] = useState(financialData[0]);
  const [interval, setInterval] = useState("1d");
  const { data, isFetching, refetch } = useGetStockDetailsQuery({
    symbol: selectedIndex.symbol,
    interval,
  });

  useEffect(() => {
    refetch(); // Refetch data when interval or selectedIndex changes
  }, [interval, selectedIndex, refetch]);

  const formatChartData = (data) => {
    if (!data || !data.chart || !data.chart.result) return {};
    const result = data.chart.result[0];
    const labels = result.timestamp.map((ts) =>
      new Date(ts * 1000).toLocaleDateString()
    );
    const prices = result.indicators.quote[0].close;

    return {
      labels: labels,
      datasets: [
        {
          label: `${selectedIndex.name} Price`,
          data: prices,
          borderColor: "rgba(75,192,192,1)",
          fill: false,
        },
      ],
    };
  };

  const chartData = formatChartData(data);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "#1E1E1E",
        p: 2,
        borderRadius: 2,
      }}
    >
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1E1E1E", color: "#FFFFFF", flex: 1 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#FFFFFF" }}>Indices</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>Value</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>Change</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>% Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {financialData.map((row) => (
              <TableRow
                key={row.name}
                onClick={() => setSelectedIndex(row)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                }}
              >
                <TableCell sx={{ color: "#FFFFFF" }}>{row.name}</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }}>{row.value}</TableCell>
                <TableCell
                  sx={{ color: row.change > 0 ? "#4CAF50" : "#F44336" }}
                >
                  {row.change}
                </TableCell>
                <TableCell
                  sx={{ color: row.perchange > 0 ? "#4CAF50" : "#F44336" }}
                >
                  {row.perchange}
                  {"%"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ flex: 2, ml: { md: 2 }, mt: { xs: 2, md: 0 } }}>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          sx={{ mb: 2 }}
        >
          <Button onClick={() => setInterval("1d")}>1D</Button>
          <Button onClick={() => setInterval("5d")}>5D</Button>
          <Button onClick={() => setInterval("1m")}>1M</Button>
          <Button onClick={() => setInterval("6m")}>6M</Button>
          <Button onClick={() => setInterval("1y")}>1Y</Button>
          <Button onClick={() => setInterval("5y")}>5Y</Button>
          <Button onClick={() => setInterval("max")}>max</Button>
        </ButtonGroup>
        {!isFetching ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    color: "#FFFFFF",
                  },
                },
                tooltip: {
                  enabled: true,
                  backgroundColor: "#333333",
                  titleColor: "#FFFFFF",
                  bodyColor: "#FFFFFF",
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#FFFFFF",
                  },
                  grid: {
                    color: "rgba(255,255,255,0.1)",
                  },
                },
                y: {
                  ticks: {
                    color: "#FFFFFF",
                  },
                  grid: {
                    color: "rgba(255,255,255,0.1)",
                  },
                },
              },
            }}
          />
        ) : (
          <Typography color="#FFFFFF">Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default LineChart;

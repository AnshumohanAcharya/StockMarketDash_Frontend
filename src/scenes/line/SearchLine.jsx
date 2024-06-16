// src/components/LineChart.js
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useGetStockDetailsQuery } from "../../services/stockApi";
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

const LineChart = ({ symbol, interval }) => {
  const { data, isFetching, refetch } = useGetStockDetailsQuery({
    symbol,
    interval,
  });

  useEffect(() => {
    if (symbol) {
      refetch(); // Refetch data when interval or symbol changes
    }
  }, [interval, symbol, refetch]);

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
          label: `${symbol} Price`,
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
      <Box sx={{ flex: 2, ml: { md: 2 }, mt: { xs: 2, md: 0 } }}>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          sx={{ mb: 2 }}
        >
          <Button onClick={() => refetch()}>1D</Button>
          <Button onClick={() => refetch()}>5D</Button>
          <Button onClick={() => refetch()}>1M</Button>
          <Button onClick={() => refetch()}>6M</Button>
          <Button onClick={() => refetch()}>1Y</Button>
          <Button onClick={() => refetch()}>5Y</Button>
          <Button onClick={() => refetch()}>max</Button>
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

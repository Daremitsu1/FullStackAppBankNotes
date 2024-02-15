import React from "react";
import { RadarChart as CarbonRadarChart } from "@carbon/charts-react";
import { rgb } from "d3";

const RadarChart = ({ variance, skewness, curtosis, entropy, prediction }) => {
  const data = {
    labels: ["Variance", "Skewness", "Curtosis", "Entropy"],
    datasets: [
      {
        label: "Data",
        data: [variance, skewness, curtosis, entropy],
      },
      {
        label: "Prediction",
        data: [prediction, prediction, prediction, prediction],
      },
    ],
  };

  const options = {
    scales: {
      ticks: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  return (
    <div>
      <CarbonRadarChart data={data} options={options} />
    </div>
  );
};

export default RadarChart;


import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const data = {
    labels: ["우호성", "신경성", "개방성", "외향성", "성실성"],
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 90, 81, 56],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto bg-none">
      <h2 className="text-xl font-bold mb-4 text-start text-[#F9DA9B]">
        당신의 성향
      </h2>
      <Radar
        data={data}
        options={options}
        className="bg-white border shadow-lg"
      />
    </div>
  );
};

export default RadarChart;

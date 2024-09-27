import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { getData } from "../http";
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

interface ResultItem {
  [key: string]: number;
}

const RadarChart = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<ResultItem>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(`/users/${id}`);
        setUserData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const userDataSet = userData ? [
    userData.question1 + userData.question2,
    userData.question3 + userData.question4,
    userData.question5 + userData.question6,
    userData.question7 + userData.question8,
    userData.question9 + userData.question10,
  ] : [];

  const data = {
    labels: ["우호성", "신경성", "개방성", "외향성", "성실성"],
    datasets: [
      {
        label: "Dataset 1",
        data: userDataSet,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "rgba(255, 255, 255, 0.2)", // 배경 기준선(축)의 색상을 흰색으로 변경
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // 원형 그리드 선의 색상을 흰색으로 변경
        },
        suggestedMin: 0,
        suggestedMax: 10,
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
        className="bg-[#282C34] border shadow-lg"
      />
    </div>
  );
};

export default RadarChart;

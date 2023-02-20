import React from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Donutchart = ({ min, max }) => {
  return (
    <Doughnut
      data={{
        labels: "",
        datasets: [
          {
            label: "",
            data: [min, max],
            backgroundColor: ["#01A7E7", "#EF1378"],
            hoverOffset: 4,
          },
        ],
      }}
      options={{
        plugins: {
          title: {
            display: false,
            text: "Users Gained between 2016-2020",
          },
        },
      }}
    />
  );
};

export default Donutchart;

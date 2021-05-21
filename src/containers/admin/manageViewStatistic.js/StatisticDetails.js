import { RollbackOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { setTitle } from "redux/actions/admin/setTitle";

const input = [
  {
    month: "01/2021",
    data: {
      points: 8, // average all point task in the month,
      time_working: 38, // average all time in the month
    },
  },
  {
    month: "02/2021",
    data: {
      points: 7, // average all point task in the month,
      time_working: 37, // average all time in the month
    },
  },
  {
    month: "03/2021",
    data: {
      points: 8.5, // average all point task in the month,
      time_working: 39, // average all time in the month
    },
  },
  {
    month: "04/2021",
    data: {
      points: 6, // average all point task in the month,
      time_working: 35, // average all time in the month
    },
  },
  {
    month: "05/2021",
    data: {
      points: 9, // average all point task in the month,
      time_working: 38, // average all time in the month
    },
  },
  {
    month: "06/2021",
    data: {
      points: 5, // average all point task in the month,
      time_working: 40, // average all time in the month
    },
  },
  {
    month: "07/2021",
    data: {
      points: 8, // average all point task in the month,
      time_working: 35, // average all time in the month
    },
  },
  {
    month: "08/2021",
    data: {
      points: 6, // average all point task in the month,
      time_working: 38, // average all time in the month
    },
  },
  {
    month: "09/2021",
    data: {
      points: 8, // average all point task in the month,
      time_working: 40, // average all time in the month
    },
  },
  {
    month: "10/2021",
    data: {
      points: 10, // average all point task in the month,
      time_working: 39.5, // average all time in the month
    },
  },
  {
    month: "11/2021",
    data: {
      points: 9, // average all point task in the month,
      time_working: 34, // average all time in the month
    },
  },
  {
    month: "12/2021",
    data: {
      points: 7, // average all point task in the month,
      time_working: 36, // average all time in the month
    },
  },
];

const data = {
  labels: input.map((item) => item.month),
  datasets: [
    {
      label: "Achieved",
      data: input.map(
        (item) =>
          parseFloat(
            (item.data.points / 10 + item.data.time_working / 40) / 2
          ).toFixed(4) * 100
      ),
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 245, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 150, 132, 0.2)",
        "rgba(54, 162, 100, 0.2)",
        "rgba(255, 80, 206, 0.2)",
        "rgba(75, 10, 192, 0.2)",
        "rgba(153, 222, 111, 0.2)",
        "rgba(255, 64, 164, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 245, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 150, 132, 1)",
        "rgba(54, 162, 100, 1)",
        "rgba(255, 80, 206, 1)",
        "rgba(75, 10, 192, 1)",
        "rgba(153, 222, 111, 1)",
        "rgba(255, 64, 164, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
        },
      },
    ],
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          var label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y + "%";
          }
          return label;
        },
      },
    },
  },
};

const StatisticDetails = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("View Statistics detail"));
  }, [dispatch]);

  return (
    <div className="manage-schedule-detail">
      <div className="manage-schedule-detail__inner">
        <div
          className="block__back-previous-page"
          style={{ marginLeft: -2, marginTop: 15 }}
        >
          <RollbackOutlined onClick={() => window.history.back()} />
          <div onClick={() => window.history.back()}>Back to previous page</div>
        </div>
        <div style={{ marginBottom: 30 }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default StatisticDetails;

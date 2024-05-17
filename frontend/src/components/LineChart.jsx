import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	LinearScale,
} from "chart.js";
import { getValuableDatasets } from "../utils/constants";
import useEmails from "../hooks/useEmails";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineChart = () => {
	const { emails } = useEmails();

	if (!emails) return;
	const labels = emails?.map((email) =>
		new Date(email.createdAt).toLocaleDateString()
	);

	const delivered = emails?.map((email) => email.analytics.delivered);
	const opened = emails?.map((email) => email.analytics.opened);
	const clicked = emails?.map((email) => email.analytics.clicked);

	const data = {
		labels,
		datasets: [
			{
				label: "Delivered",
				data: delivered,
				borderColor: "#F1B9B7",
				backgroundColor: "#F1B9B750",
				fill: false,
				tension: 0.4,
			},

			{
				label: "Opened",
				data: opened,
				borderColor: "rgba(54, 162, 235, 1)",
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				fill: false,
				tension: 0.4,
			},
			{
				label: "Clicked",
				data: clicked,
				borderColor: "rgba(255, 206, 86, 1)",
				backgroundColor: "rgba(255, 206, 86, 0.2)",
				fill: false,
				tension: 0.4,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
				labels: {
					color: "white",
				},
			},
			title: {
				display: true,
				text: "Email Analytics Over Time",
				color: "white",
			},
		},
		scales: {
			x: {
				ticks: {
					color: "white",
				},
				grid: {
					color: "rgba(255, 255, 255, 0.2)",
				},
			},
			y: {
				ticks: {
					color: "white",
				},
				grid: {
					color: "rgba(255, 255, 255, 0.2)",
				},
			},
		},
	};

	return <Line data={data} options={options} />;
};

export default LineChart;

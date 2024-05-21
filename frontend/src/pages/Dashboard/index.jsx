import { Box } from "@mui/material";
import { mockEmails, BASE_URL } from "../../utils/constants";
import useEmails from "../../hooks/useEmails";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DashboardContent from "../../components/DashboardContent";

const Dashboard = () => {
	const { emails } = useEmails();

	const [emailStats, setEmailStats] = useState(null);

	useEffect(() => {
		const fetchEmailStats = async () => {
			try {
				const response = await fetch(BASE_URL + "/api/getAllStats");
				if (!response.ok) {
					throw new Error("Failed to fetch email stats");
				}
				const data = await response.json();
				setEmailStats(data);
			} catch (err) {
				console.log("Fetch Stats :: ", err.mesage);
			}
		};

		fetchEmailStats();

		const intervalId = setInterval(fetchEmailStats, 10000);
		return () => clearInterval(intervalId);
	}, []);

	const exportDataToCSV = () => {
		let csv = "ID,Subject,Created At,Delivered,Opened,Clicked\n";
		emails?.forEach((email) => {
			csv += `${email._id},${email.subject},${new Date(
				email.createdAt
			).toLocaleDateString()},${email.analytics.delivered.length},${
				email.analytics.opened.length
			},${email.analytics.clicked.length}\n`;
		});

		const blob = new Blob([csv], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.style.display = "none";
		a.href = url;
		a.download = "email-data.csv";
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
	};

	const exportDataToPDF = () => {
		const doc = new jsPDF();
		const tableColumn = [
			"ID",
			"Subject",
			"Created At",
			"Delivered",
			"Opened",
			"Clicked",
		];
		const tableRows = [];

		emails?.forEach((email) => {
			const emailData = [
				email._id,
				email.subject,
				new Date(email.createdAt).toLocaleDateString(),
				email.analytics.delivered.length,
				email.analytics.opened.length,
				email.analytics.clicked.length,
			];
			tableRows.push(emailData);
		});

		doc.text("Email Analytics Data", 14, 15);
		autoTable(doc, { startY: 20, head: [tableColumn], body: tableRows });
		doc.save("email-data.pdf");
	};

	const latestEmail =
		emails?.length == 0
			? { analytics: { delivered: [], opened: [], clicked: [] } }
			: emails?.[emails.length - 1];

	if (!emailStats) return;

	return (
		<Box m="20px">
			<DashboardContent
				delivered={emailStats?.totalDelivered}
				opened={emailStats?.totalOpened}
				clicked={emailStats?.totalClicked}
				isMainDashboard
				latestEmail={latestEmail}
				totalSent={emailStats?.totalSent}
				exportDataToCSV={exportDataToCSV}
				exportDataToPDF={exportDataToPDF}
				emails={emails}
			/>
		</Box>
	);
};

export default Dashboard;

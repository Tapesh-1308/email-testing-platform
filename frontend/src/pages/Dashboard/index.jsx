import { Box, Button, Divider, Typography } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { mockEmails, BASE_URL } from "../../utils/constants";
import LineChart from "../../components/LineChart";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useEmails from "../../hooks/useEmails";
import { useEffect, useState } from "react";

const Dashboard = () => {
	const navigate = useNavigate();
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
			).toLocaleDateString()},${email.analytics.delivered},${
				email.analytics.opened
			},${email.analytics.clicked}\n`;
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
				email.analytics.delivered,
				email.analytics.opened,
				email.analytics.clicked,
			];
			tableRows.push(emailData);
		});

		doc.text("Email Analytics Data", 14, 15);
		autoTable(doc, { startY: 20, head: [tableColumn], body: tableRows });
		doc.save("email-data.pdf");
	};

	const truncateText = (text, maxLength) => {
		return text.length > maxLength
			? text.substring(0, maxLength) + "..."
			: text;
	};

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "2-digit", day: "2-digit" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	if (!emailStats) return;
	
	return (
		<Box m="20px">
			<Box
				sx={{
					display: "flex",
					gap: "10px",
					margin: "10px",
					justifyContent: "flex-end",
				}}
			>
				<Button
					sx={{
						fontSize: "14px",
						fontWeight: "bold",
						padding: "10px 20px",
					}}
					variant="contained"
					onClick={() => exportDataToCSV()}
				>
					<DownloadOutlinedIcon sx={{ mr: "10px", fontSize: "20px" }} />
					Download as CSV
				</Button>
				<Button
					sx={{
						fontSize: "14px",
						fontWeight: "bold",
						padding: "10px 20px",
					}}
					variant="contained"
					onClick={() => exportDataToPDF()}
				>
					<DownloadOutlinedIcon sx={{ mr: "10px", fontSize: "20px" }} />
					Download as PDF
				</Button>
			</Box>
			<Box
				display="grid"
				gridTemplateColumns="repeat(4, 1fr)"
				gridAutoRows="140px"
				gap="20px"
			>
				<Box
					backgroundColor="#444"
					borderRadius="10px"
					p="20px"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Box display="flex" gap="20px" flexDirection="column">
						<Typography variant="h6" color="white">
							Subscribers
						</Typography>
						<Typography variant="subtitle1" color="white">
							150+
						</Typography>
					</Box>
					<Box
						width="80px"
						borderRadius="50px"
						backgroundColor="#2b994880"
						p="5px 10px"
						display="flex"
						gap="10px"
						alignItems="center"
						justifyContent="center"
					>
						<Typography variant="body2">10%</Typography>{" "}
						<GroupAddIcon fontSize="20px" />
					</Box>
				</Box>
				<Box
					backgroundColor="#444"
					borderRadius="10px"
					p="20px"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Box display="flex" gap="20px" flexDirection="column">
						<Typography variant="h6" color="white">
							Delivered
						</Typography>
						<Typography variant="subtitle1" color="white">
							{emailStats?.totalDelivered}
							<Typography color="#bbb" display="inline">
								/{emailStats?.totalSent}
							</Typography>
						</Typography>
					</Box>
					<Box
						width="80px"
						borderRadius="50px"
						backgroundColor="#2b994880"
						p="5px 10px"
						display="flex"
						gap="10px"
						alignItems="center"
						justifyContent="center"
					>
						<Typography variant="body2">
							{(
								(emailStats?.totalDelivered / emailStats?.totalSent) *
								100
							).toFixed(1)}
							%
						</Typography>
						<MarkEmailUnreadIcon fontSize="20px" />
					</Box>
				</Box>
				<Box
					backgroundColor="#444"
					borderRadius="10px"
					p="20px"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Box display="flex" gap="20px" flexDirection="column">
						<Typography variant="h6" color="white">
							Opened
						</Typography>
						<Typography variant="subtitle1" color="white">
							{emailStats?.totalOpened}
							<Typography color="#bbb" display="inline">
								/{emailStats?.totalDelivered}
							</Typography>
						</Typography>
					</Box>
					<Box
						width="80px"
						borderRadius="50px"
						backgroundColor="#2b994880"
						p="5px 10px"
						display="flex"
						gap="10px"
						alignItems="center"
						justifyContent="center"
					>
						<Typography variant="body2">
							{(
								(emailStats?.totalOpened / emailStats?.totalDelivered) *
								100
							).toFixed(1)}
							%
						</Typography>
						<RemoveRedEyeIcon fontSize="20px" />
					</Box>
				</Box>
				<Box
					backgroundColor="#444"
					borderRadius="10px"
					p="20px"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Box display="flex" gap="20px" flexDirection="column">
						<Typography variant="h6" color="white">
							Clicked
						</Typography>
						<Typography variant="subtitle1" color="white">
							{emailStats?.totalClicked}
							<Typography color="#bbb" display="inline">
								/{emailStats?.totalOpened}
							</Typography>
						</Typography>
					</Box>
					<Box
						width="80px"
						borderRadius="50px"
						backgroundColor="#fc032c80"
						p="5px 10px"
						display="flex"
						gap="10px"
						alignItems="center"
						justifyContent="center"
					>
						<Typography variant="body2">
							{(
								(emailStats?.totalClicked / emailStats?.totalOpened) *
								100
							).toFixed(1)}
							%
						</Typography>
						<AdsClickIcon fontSize="20px" />
					</Box>
				</Box>
			</Box>

			<Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="300px"
				gap="20px"
				mt="20px"
			>
				<Box
					gridColumn="span 5"
					backgroundColor="#444"
					borderRadius="5px"
					p="15px 20px"
					overflow="auto"
				>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						p="15px"
					>
						<Typography variant="h5" fontWeight="600">
							Recent Emails
						</Typography>
					</Box>
					<Divider color="#777" />
					{emails?.map((email, idx) => (
						<Box
							key={`${email._id}-${idx}`}
							display="flex"
							alignItems="center"
							justifyContent="space-around"
							p="15px 5px"
							gap="20px"
							borderBottom="4px solid #888"
						>
							<Box>
								<Typography>{truncateText(email.subject, 14)}</Typography>
							</Box>
							<Typography variant="subtitle1">
								{formatDate(email.createdAt)}
							</Typography>
							<Button
								p="5px"
								onClick={() => navigate(`/emails/${email._id}`)}
								variant="contained"
								sx={{ textTransform: "none", fontSize: "12px" }}
							>
								View Analytics
							</Button>
						</Box>
					))}
				</Box>
				<Box
					gridColumn="span 7"
					backgroundColor="#444"
					borderRadius="5px"
					p="15px 20px"
				>
					<LineChart
						
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;

import LineChart from "./LineChart";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const DashboardContent = ({
	delivered = 0,
	opened = 0,
	clicked = 0,
	isMainDashboard = true,
	latestEmail,
	totalSent = 0,
	exportDataToCSV,
	exportDataToPDF,
	emails = [],
}) => {
	const navigate = useNavigate();

	const truncateText = (text, maxLength) => {
		return text.length > maxLength
			? text.substring(0, maxLength) + "..."
			: text;
	};

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "2-digit", day: "2-digit" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const getChangePercentage = (current, previous) => {
		if (previous == 0) return 100;
		return (((current - previous) / previous) * 100).toFixed(1);
	};

	const deliveredPercentage = getChangePercentage(
		delivered,
		delivered - latestEmail?.analytics?.delivered?.length
	);

	const openedPercentage = getChangePercentage(
		opened,
		opened - latestEmail?.analytics?.opened?.length
	);

	const clickedPercentage = getChangePercentage(
		clicked,
		clicked - latestEmail?.analytics?.clicked?.length
	);

	return (
		<Box>
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
				{isMainDashboard && (
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
							<Typography variant="body2">10%</Typography>
							<GroupAddIcon fontSize="20px" />
						</Box>
					</Box>
				)}
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
							{delivered}
							<Typography color="#bbb" display="inline">
								/{totalSent}
							</Typography>
						</Typography>
					</Box>
					<Box
						width="80px"
						borderRadius="50px"
						backgroundColor={
							deliveredPercentage >= 0 ? "#2b994880" : "#fc032c80"
						}
						p="5px 10px"
						display="flex"
						gap="10px"
						alignItems="center"
						justifyContent="center"
					>
						<Typography variant="body2">{deliveredPercentage}%</Typography>
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
							{opened}
							<Typography color="#bbb" display="inline">
								/{delivered}
							</Typography>
						</Typography>
					</Box>
					<Box
						width="80px"
						borderRadius="50px"
						backgroundColor={openedPercentage >= 0 ? "#2b994880" : "#fc032c80"}
						p="5px 10px"
						display="flex"
						gap="10px"
						alignItems="center"
						justifyContent="center"
					>
						<Typography variant="body2">{openedPercentage}%</Typography>
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
							{clicked}
							<Typography color="#bbb" display="inline">
								/{opened}
							</Typography>
						</Typography>
					</Box>
					<Box
						width="80px"
						borderRadius="50px"
						backgroundColor={clickedPercentage >= 0 ? "#2b994880" : "#fc032c80"}
						p="5px 10px"
						display="flex"
						gap="10px"
						alignItems="center"
						justifyContent="center"
					>
						<Typography variant="body2">{clickedPercentage}%</Typography>
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
				{isMainDashboard && (
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
						{isMainDashboard &&
							emails?.map((email, idx) => (
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
				)}

				<Box
					gridColumn={isMainDashboard ? "span 7" : "span 12"}
					backgroundColor="#444"
					borderRadius="5px"
					p="15px 20px"
				>
					<LineChart />
				</Box>
			</Box>
		</Box>
	);
};

export default DashboardContent;

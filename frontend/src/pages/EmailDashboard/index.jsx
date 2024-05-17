import { useParams } from "react-router-dom";
import { mockEmails } from "../../utils/constants";
import { useEffect, useState } from "react";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Typography } from "@mui/material";

const EmailDashboard = () => {
	const { id } = useParams();
	const [emailData, setEmailData] = useState(null);

	useEffect(() => {
		const getEmailDataById = async (id) => {
			try {
				const response = await fetch(
					"http://localhost:5000/api/getEmailById/" + id
				);
				if (!response.ok) {
					throw new Error("Failed to fetch email data");
				}
				const data = await response.json();
				setEmailData(data);
			} catch (err) {
				console.log("Fetch email data by id :: ", err);
			}
		};

		if (id) getEmailDataById(id);
	}, [id]);

	if (!emailData) {
		return <div>Loading...</div>;
	}

	return (
		<Box
			m="20px"
			display="grid"
			gridTemplateColumns="repeat(2, 1fr)"
			height="90vh"
			gap="40px"
		>
			<Box backgroundColor="#444" borderRadius="10px" p="20px" height="100%">
				<Typography variant="h5">{emailData?.subjectName}</Typography>
				<Box borderBottom="4px solid #888" pt="10px"></Box>
				<div dangerouslySetInnerHTML={{ __html: emailData?.body }}></div>
			</Box>

			<Box display="grid" gridTemplateRows="repeat(3, 1fr)" gap="20px">
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
							Delievered
						</Typography>
						<Typography variant="subtitle1" color="white">
							{emailData?.analytics?.delivered}
							<Typography color="#bbb" display="inline">
								/{emailData?.to?.length}
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
						<Typography>
							{(
								(emailData?.analytics?.delivered /
									(emailData?.to?.length || 1)) *
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
							{emailData?.analytics?.opened}
							<Typography color="#bbb" display="inline">
								/{emailData?.analytics?.delivered}
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
						<Typography>
							{(
								(emailData?.analytics?.opened /
									(emailData?.analytics?.delivered || 1)) *
								100
							).toFixed(1)}
							%
						</Typography>{" "}
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
							{emailData?.analytics?.clicked}
							<Typography color="#bbb" display="inline">
								/{emailData?.analytics?.opened}
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
						<Typography>
							{(
								(emailData?.analytics?.clicked /
									(emailData?.analytics?.opened || 1)) *
								100
							).toFixed(1)}
							%
						</Typography>{" "}
						<AdsClickIcon fontSize="20px" />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default EmailDashboard;

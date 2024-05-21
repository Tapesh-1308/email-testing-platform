import { useParams } from "react-router-dom";
import { BASE_URL, mockEmails } from "../../utils/constants";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import DashboardContent from "../../components/DashboardContent";
import useEmails from "../../hooks/useEmails";

const EmailDashboard = () => {
	const { id } = useParams();
	const [emailData, setEmailData] = useState(null);
	const { emails } = useEmails();

	useEffect(() => {
		const getEmailDataById = async (id) => {
			if (!id) return;

			try {
				const response = await fetch(BASE_URL + "/api/getEmailById/" + id);
				if (!response.ok) {
					throw new Error("Failed to fetch email data");
				}
				const data = await response.json();
				setEmailData(data);
			} catch (err) {
				console.log("Fetch email data by id :: ", err);
			}
		};

		getEmailDataById();
		const intervalId = setInterval(() => getEmailDataById(id), 10000);
		return () => clearInterval(intervalId);
	}, [id]);

	if (!emailData) {
		return <div>Loading...</div>;
	}

	const lastPrevEmail =
		emails.length >= 2
			? emails[emails.length - 2]
			: { analytics: { delivered: [], opened: [], clicked: [] } };


	return (
		<Box
			m="20px"
			display="grid"
			gridTemplateColumns="repeat(12, 1fr)"
			height="90vh"
			gap="40px"
		>
			<Box
				gridColumn="span 5"
				backgroundColor="#444"
				borderRadius="10px"
				p="20px"
				height="100%"
			>
				<Typography variant="h5">{emailData?.subject}</Typography>
				<Box borderBottom="4px solid #888" pt="10px"></Box>
				<div dangerouslySetInnerHTML={{ __html: emailData?.body }}></div>
			</Box>

			<Box gridColumn="span 7">
				<DashboardContent
					delivered={emailData?.analytics?.delivered?.length}
					opened={emailData?.analytics?.opened?.length}
					clicked={emailData?.analytics?.clicked?.length}
					isMainDashboard={false}
					exportDataToCSV={() => {}}
					exportDataToPDF={() => {}}
					totalSent={emailData?.to?.length}
					latestEmail={lastPrevEmail}
				/>
			</Box>
		</Box>
	);
};

export default EmailDashboard;

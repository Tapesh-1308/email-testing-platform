import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HTMLEmailForm from "../../components/HTMLEmailForm";
import DragDropEmailForm from "../../components/DragDropEmailForm";
import { BASE_URL, mockSubscribers } from "../../utils/constants";
import { addEmail } from "../../store/emailsSlice";
import { useDispatch } from "react-redux";

const CreateEmail = () => {
	const location = useLocation();
	const [subject, setSubject] = useState("");
	const [templateOption, setTemplateOption] = useState("");
	const [senderName, setSenderName] = useState("tapesh");

	const dispatch = useDispatch();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		setSubject(searchParams.get("subject") || "");
		setTemplateOption(searchParams.get("template") || "");
		setSenderName(searchParams.get("senderName") || "");
	}, [location.search]);

	const sendEmail = async (htmlEmailBody) => {
		const emailData = {
			subject,
			from: senderName,
			body: htmlEmailBody,
			to: mockSubscribers.map((subscriber) => subscriber.email),
		};

		try {
			const response = await fetch(BASE_URL + "/api/createEmail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(emailData),
			});

			if (!response.ok) {
				throw new Error("Failed to send email");
			}

			const newEmail = await response.json();
			dispatch(addEmail(newEmail));
		} catch (error) {
			console.error("Error: sending Email", error);
		}
	};

	return (
		<Box m="20px">
			<h1>{subject}</h1>
			<Box height="70vh">
				{templateOption == "html" ? (
					<HTMLEmailForm sendEmail={sendEmail} />
				) : (
					<DragDropEmailForm sendEmail={sendEmail} />
				)}
			</Box>
		</Box>
	);
};

export default CreateEmail;

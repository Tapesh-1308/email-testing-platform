import { Box, Button } from "@mui/material";
import { useRef, useState } from "react";
import EmailEditor from "react-email-editor";

const DragDropEmailForm = ({ sendEmail }) => {
	const emailEditorRef = useRef(null);

	const handleSendEmail = () => {
		const unlayer = emailEditorRef.current?.editor;

		unlayer?.exportHtml((data) => {
			const { design, html } = data;
			console.log("exportHtml", html);

			sendEmail(html);
		});
	};
	return (
		<div>
				<EmailEditor ref={emailEditorRef} />
			<Box display="flex" justifyContent="flex-end" mt="10px">
				<Button
					variant="contained"
					color="primary"
					onClick={() => handleSendEmail()}
				>
					Send Email
				</Button>
			</Box>
		</div>
	);
};

export default DragDropEmailForm;

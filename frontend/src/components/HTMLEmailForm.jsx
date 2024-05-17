import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const HTMLEmailForm = ({ sendEmail }) => {
	const [htmlEmailBody, setHtmlEmailBody] = useState("");
	return (
		<>
			<TextField
				label="Enter Email Body"
				multiline
				fullWidth
				rows={17}
				placeholder="<h1>Hello World</h1>"
				value={htmlEmailBody}
				onChange={(e) => setHtmlEmailBody(e.target.value)}
			/>
			<Box display="flex" justifyContent="flex-end" mt="10px">
				<Button variant="contained" color="primary" onClick={() => sendEmail(htmlEmailBody)}>
					Send Email
				</Button>
			</Box>
		</>
	);
};

export default HTMLEmailForm;

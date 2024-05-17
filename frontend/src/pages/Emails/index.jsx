import {
	Button,
	Modal,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	FormControl,
	Box,
	Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useEmails from "../../hooks/useEmails";

const Emails = () => {
	const [open, setOpen] = useState(false);
	const [subject, setSubject] = useState("");
	const [senderName, setSenderName] = useState("");
	const [subjectTouched, setSubjectTouched] = useState(false);
	const [senderNameTouched, setSenderNameTouched] = useState(false);
	const [templateOption, setTemplateOption] = useState("html");
	const navigate = useNavigate();

	const { emails } = useEmails();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSubject("");
		setSenderName("");
		setSubjectTouched(false);
		setSenderNameTouched(false);
	};

	const handleSubmit = () => {
		if (subject == "" || senderName == "") return;

		navigate(
			`new?subject=${encodeURIComponent(subject)}&template=${encodeURIComponent(
				templateOption
			)}&senderName=${encodeURIComponent(senderName)}`
		);
	};

	return (
		<Box m="20px" display="flex" flexWrap="wrap" gap="20px">
			<Modal
				open={open}
				onClose={handleClose}
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<Box backgroundColor="#444" p="20px" borderRadius="10px">
					<h2>Create a New Email</h2>
					<TextField
						label="Enter Subject"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						onBlur={() => setSubjectTouched(true)}
						fullWidth
						margin="normal"
						required
						helperText={
							subjectTouched && subject == "" ? "Cannot be empty" : ""
						}
						error={subjectTouched && subject == ""}
					/>
					<FormControl component="fieldset" margin="normal" fullWidth>
						<FormLabel component="legend">Choose Template</FormLabel>
						<RadioGroup
							aria-label="templateOption"
							name="templateOption"
							value={templateOption}
							onChange={(e) => setTemplateOption(e.target.value)}
						>
							<FormControlLabel
								value="html"
								control={<Radio />}
								label="HTML Editor"
							/>
							<FormControlLabel
								value="dragDrop"
								control={<Radio />}
								label="Drag and Drop Editor"
							/>
						</RadioGroup>
					</FormControl>
					<TextField
						label="Enter Sender Name"
						value={senderName}
						onChange={(e) => setSenderName(e.target.value)}
						onBlur={() => setSenderNameTouched(true)}
						fullWidth
						margin="normal"
						required
						helperText={
							senderNameTouched && senderName == "" ? "Cannot be empty" : ""
						}
						error={senderNameTouched && senderName == ""}
					/>
					<Button
						type="submit"
						variant="contained"
						onClick={handleSubmit}
						fullWidth
					>
						Next
					</Button>
				</Box>
			</Modal>

			<Button variant="contained" color="inherit" onClick={handleOpen}>
				<AddIcon />
				<Typography variant="body1">Create new Email</Typography>
			</Button>

			{emails?.map(({ _id, subject }) => (
				<Box
					key={_id}
					width="200px"
					height="200px"
					border="1px solid #eee"
					borderRadius="10px"
					display="flex"
					alignItems="center"
					justifyContent="center"
					textAlign="center"
					sx={{ cursor: "pointer" }}
					onClick={() => navigate("/emails/" + _id)}
				>
					<Typography variant="body1">{subject}</Typography>
				</Box>
			))}
		</Box>
	);
};

export default Emails;

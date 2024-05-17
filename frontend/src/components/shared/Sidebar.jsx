import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { NAV_LIST } from "../../utils/constants";

const Sidebar = () => {
	const navigate = useNavigate();
	return (
		<Box
			width="240px"
			minHeight="100vh"
			height="100%"
			overflow="auto"
			borderRight="1px solid #fff"
			position="fixed"
			role="presentation"
		>
			<List>
				{NAV_LIST.map(({ name, path }) => (
					<ListItem key={name} onClick={() => navigate(path)}>
						<ListItemButton>
							<ListItemText primary={name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default Sidebar;

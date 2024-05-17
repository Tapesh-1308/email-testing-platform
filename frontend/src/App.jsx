import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "./components/shared/Sidebar";
import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

const App = () => {
	const darkTheme = createTheme({
		palette: {
			mode: "dark",
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Sidebar />
			<Box pl="240px">
				<Outlet />
			</Box>
		</ThemeProvider>
	);
};

export default App;

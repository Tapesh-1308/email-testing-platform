import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockSubscribers } from "../../utils/constants";
import { Box } from "@mui/material";

const Subscribers = () => {
	const columns = [
		{ field: "id", headerName: "ID", flex: 1 },
		{ field: "userId", headerName: "User ID", flex: 1 },
		{
			field: "name",
			headerName: "Name",
			flex: 1,
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1,
		},
		{
			field: "phone",
			headerName: "Phone Number",
			flex: 1,
		},
	];

	return (
		<Box
			m="20px"
			height="65vh"
			sx={{
				"& .MuiDataGrid-root": {
					border: "none",
				},
				"& .MuiDataGrid-cell": {
					borderBottom: "none",
				},
			}}
		>
			<DataGrid
				rows={mockSubscribers}
				columns={columns}
				slots={{
					toolbar: GridToolbar,
				}}
			/>
		</Box>
	);
};

export default Subscribers;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Dashboard from "./pages/Dashboard";
import Emails from "./pages/Emails";
import Subscribers from "./pages/Subscribers";
import CreateEmail from "./pages/CreateEmail";
import EmailDashboard from "./pages/EmailDashboard";
import store from "./store/store.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "/emails",
				element: <Emails />,
			},
			{
				path: "/emails/new",
				element: <CreateEmail />,
			},
			{
				path: "/emails/:id",
				element: <EmailDashboard />,
			},
			{
				path: "/subscribers",
				element: <Subscribers />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
		<RouterProvider router={router}>
			<App />
		</RouterProvider>
		</Provider>
	</React.StrictMode>
);

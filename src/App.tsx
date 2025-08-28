import Box from "@mui/material/Box";
import TpRoutes from "@/routes/TpRoutes";
import Header from "@/components/organisms/Header";

import { BrowserRouter } from "react-router-dom";
import { colors } from "@/constants/colors";
import "./App.css";

const isDevelopment = import.meta.env.DEV;

const AppLayout = () => {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				backgroundColor: colors.background,
				transition: "background-color 0.3s ease",
			}}
		>
			<Box
				sx={{
					backgroundColor: colors.backgroundHeader,
					padding: "1rem",
					boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
					zIndex: 10,
					position: "sticky",
					top: 0,
				}}
			>
				<Header />
			</Box>

			<Box sx={{ padding: "1rem", flex: 1, overflowY: "auto" }}>
				<TpRoutes />
			</Box>
		</Box>
	);
};

// O componente principal que decide se usa o Router ou não
const App = () => {
	return isDevelopment ? (
		<BrowserRouter>
			<AppLayout />
		</BrowserRouter>
	) : (
		<AppLayout />
	);
};

export default App;

import Dashboard from "@/components/pages/Dashboard";
import People from "@/components/pages/People";
import Schedule from "@/components/pages/Schedule";
import { Routes, Route, Navigate } from "react-router-dom";

const TpRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="dashboard" replace />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/people" element={<People />} />
			<Route path="/schedule" element={<Schedule />} />
		</Routes>
	);
};

export default TpRoutes;

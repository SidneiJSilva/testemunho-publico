import React from "react";
import MyPage from "@/pages/tests/MyPage";
import MyPage2 from "@/pages/tests/MyPage2";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

const isDevelopment = import.meta.env.DEV;

const RouterWrapper = ({ children }: { children: React.ReactNode }) => {
	return isDevelopment ? (
		<BrowserRouter>{children}</BrowserRouter>
	) : (
		<>{children}</>
	);
};

const App = () => {
	return (
		<RouterWrapper>
			<Routes>
				<Route path="/" element={<Navigate to="dashboard" replace />} />
				<Route path="/dashboard" element={<MyPage />} />
				<Route path="/page2" element={<MyPage2 />} />
			</Routes>
		</RouterWrapper>
	);
};

export default App;

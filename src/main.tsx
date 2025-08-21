// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const isDevelopment = import.meta.env.DEV;

if (isDevelopment) {
	createRoot(document.getElementById("tp")!).render(
		// <StrictMode>
		<App />
		// </StrictMode>
	);
}

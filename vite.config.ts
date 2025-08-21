import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
	mode: "development",
	plugins: [
		react(),
		federation({
			name: "tp",
			filename: "remoteEntry.js",
			exposes: {
				"./App": "./src/App.tsx",
			},
			shared: ["react", "react-dom", "react-router-dom"],
		}),
	],
	server: {
		port: 5001,
		open: true,
	},
	preview: {
		port: 5001,
		open: true,
	},
});

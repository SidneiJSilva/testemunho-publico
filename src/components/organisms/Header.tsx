import Navigation from "@/components/molecules/Navigation";
import { Box } from "@mui/material";

export default function Header() {
	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
			<Navigation />
		</Box>
	);
}

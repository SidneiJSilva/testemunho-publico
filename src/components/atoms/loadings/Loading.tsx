import { Box, CircularProgress } from "@mui/material";

type InlineLoaderProps = {
	size?: number;
};

export default function Loading({ size = 32 }: InlineLoaderProps) {
	return (
		<Box
			sx={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 10,
			}}
		>
			<CircularProgress size={size} />
		</Box>
	);
}

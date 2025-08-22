// src/components/organisms/TerritoryDialog.tsx
import { PeopleDialogHeader } from "@/components/molecules/PeopleDialogHeader";
import { PeopleDialogContent } from "@/components/molecules/PeopleDialogContent";
import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	CircularProgress,
} from "@mui/material";
import { Box, Typography } from "@mui/material";

import { type PeopleInterface } from "@/interfaces";
import { peopleStore } from "@/stores";
import { colors } from "@/constants/colors";

export default function PeopleDialog({
	openDialog,
	peopleData,
	closeDialog,
}: {
	openDialog: boolean;
	peopleData: PeopleInterface;
	closeDialog: () => void;
}) {
	const { isLoading } = peopleStore();

	return (
		<Dialog open={openDialog} onClose={closeDialog} maxWidth="sm" fullWidth>
			{isLoading && (
				<Box
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						bgcolor: "rgba(255,255,255,0.6)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 10,
					}}
				>
					<CircularProgress size={70} />
				</Box>
			)}
			<PeopleDialogHeader person={peopleData} />

			<DialogContent sx={{ backgroundColor: colors.background }}>
				<PeopleDialogContent person={peopleData} />
			</DialogContent>

			<DialogActions>
				<Box
					sx={{
						display: "flex",
						justifyContent: "end",
						width: "100%",
						alignItems: "center",
					}}
				>
					<Button onClick={closeDialog}>Fechar</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
}

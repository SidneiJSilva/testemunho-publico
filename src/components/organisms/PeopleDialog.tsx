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
import { Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { type PeopleInterface } from "@/interfaces";
import { peopleStore } from "@/stores";
import { colors } from "@/constants/colors";
import { useState } from "react";

export default function PeopleDialog({
	openDialog,
	peopleData,
	closeDialog,
}: {
	openDialog: boolean;
	peopleData: PeopleInterface;
	closeDialog: () => void;
}) {
	const { isDialogLoading } = peopleStore();
	const [isSaveLoading, setIsSaveLoading] = useState(false);

	const saveAndClose = async () => {
		console.log("saving ...");
		setIsSaveLoading(true);

		setTimeout(() => {
			setIsSaveLoading(false);
			closeDialog();
		}, 1000);
	};

	return (
		<Dialog open={openDialog} onClose={closeDialog} maxWidth="sm" fullWidth>
			{(isDialogLoading || isSaveLoading) && (
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
						gap: 2,
					}}
				>
					<Button onClick={closeDialog}>Fechar</Button>

					<Button
						variant="contained"
						color="success"
						endIcon={<SaveIcon />}
						onClick={saveAndClose}
					>
						Salvar
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
}

// src/components/organisms/PeopleDialog.tsx
import { PeopleDialogHeader } from "@/components/molecules/PeopleDialogHeader";
import { PeopleDialogContent } from "@/components/molecules/PeopleDialogContent";
import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	CircularProgress,
	Box,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useSchema } from "@/hooks";
import { useState } from "react";

export default function PeopleDialog({
	openDialog,
	closeDialog,
}: {
	openDialog: boolean;
	closeDialog: () => void;
}) {
	const [isDialogLoading, setIsDialogLoading] = useState(false);

	const saveAndClose = async () => {
		closeDialog();
	};

	return (
		<Dialog open={openDialog} onClose={closeDialog} maxWidth="sm" fullWidth>
			{isDialogLoading && (
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
			<h1>HEADER</h1>

			<DialogContent
				sx={{ backgroundColor: (theme) => theme.palette.background.default }}
			>
				DIALOG CONTENT
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
					<Button size="small" onClick={closeDialog}>
						Fechar
					</Button>

					<Button
						size="small"
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

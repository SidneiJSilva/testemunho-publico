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
import { type PeopleInterface } from "@/interfaces";
import { peopleStore } from "@/stores";
import { useState, useEffect } from "react";
import { usePeople } from "@/hooks";

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
	const { savePersonData } = usePeople();
	const [editedPerson, setEditedPerson] = useState<PeopleInterface>(peopleData);

	useEffect(() => {
		setEditedPerson(peopleData);
	}, [peopleData]);

	const saveAndClose = async () => {
		await savePersonData(editedPerson);

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
			{/* O Header também deve mostrar os dados editados */}
			<PeopleDialogHeader person={editedPerson} />

			<DialogContent
				sx={{ backgroundColor: (theme) => theme.palette.background.default }}
			>
				{/* 5. PASSAMOS O ESTADO E A FUNÇÃO DE ATUALIZAÇÃO PARA O FILHO */}
				<PeopleDialogContent
					person={editedPerson}
					onPersonChange={setEditedPerson}
				/>
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

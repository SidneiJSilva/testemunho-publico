import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Typography,
	type SelectChangeEvent,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";

import { type PeopleInterface } from "@/interfaces";
import { colors } from "@/constants/colors";
import { useState } from "react";
import { usePeople } from "@/hooks";
import { peopleStore } from "@/stores";

export default function PeopleDialogFamily({
	person,
}: {
	person: PeopleInterface;
}) {
	const [newMemberFamilyId, setNewMemberFamilyId] = useState("");
	const [showNewFamilyMember, setShowNewFamilyMember] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [familyMemberToDelete, setFamilyMemberToDelete] = useState<
		number | null
	>(null);

	const { people } = peopleStore();
	const { addNewFamilyMember, removeFamilyMember } = usePeople();

	const handleChange = (event: SelectChangeEvent) => {
		setNewMemberFamilyId(event.target.value as string);
	};

	const handleAddNewFamilyMember = async () => {
		const payload = {
			peopleId: person.peopleid,
			familyMemberId: parseInt(newMemberFamilyId),
		};

		await addNewFamilyMember(payload);
		setNewMemberFamilyId("");
	};

	const handleDeleteFamilyMember = (familyMembderId: number) => {
		setFamilyMemberToDelete(familyMembderId);
		setShowConfirmation(true);
	};

	const cancelDelete = () => {
		setFamilyMemberToDelete(null);
		setShowConfirmation(false);
	};

	const confirmDelete = async () => {
		if (!familyMemberToDelete) return;

		const payload = {
			peopleId: person.peopleid,
			familyMemberId: familyMemberToDelete,
		};

		await removeFamilyMember(payload);
		setFamilyMemberToDelete(null);
		setShowConfirmation(false);
	};

	return (
		<Stack spacing={2}>
			<Typography variant="h6" color={colors.textSubtitles}>
				Família
			</Typography>

			<Box
				sx={{
					display: "flex",
					padding: ".5rem",
					gap: 2,
					backgroundColor: "white",
					borderRadius: ".5rem",
					border: 1,
					borderColor: colors.border,
					flexDirection: { xs: "column", sm: "row" },
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						flex: "1 1 auto",
						minWidth: 0,
						display: "flex",
						flexWrap: "wrap",
						gap: 1,
						alignItems: "center",
					}}
				>
					{person.familymembers &&
						person.familymembers.map((member) => (
							<Chip
								key={member.peopleId}
								size="small"
								label={member.fullName}
								disabled={showConfirmation}
								onDelete={() => handleDeleteFamilyMember(member.peopleId)}
								sx={{
									backgroundColor: colors.secondary,
									color: colors.primary,
									"& .MuiChip-deleteIcon": {
										color: colors.primary,
										transition: "color 0.2s ease-in-out",
									},
									"& .MuiChip-deleteIcon:hover": {
										color: colors.error,
									},
								}}
							/>
						))}
				</Box>

				<Box
					sx={{
						flex: "0 0 auto",
						display: "flex",
						justifyContent: "end",
					}}
				>
					<Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
						{showNewFamilyMember && (
							<>
								<FormControl size="small" sx={{ minWidth: 120 }}>
									<InputLabel id="select-family-member">Familiar</InputLabel>

									<Select
										labelId="select-family-member"
										id="family-member-select"
										value={newMemberFamilyId}
										label="Familiar"
										disabled={showConfirmation}
										onChange={handleChange}
									>
										{people.map((p) => (
											<MenuItem value={p.peopleid}>{p.fullname}</MenuItem>
										))}
									</Select>
								</FormControl>

								<IconButton
									disabled={!newMemberFamilyId || showConfirmation}
									color="success"
									onClick={handleAddNewFamilyMember}
									sx={{
										backgroundColor: "white",
										borderRadius: 2,
									}}
								>
									<SaveIcon />
								</IconButton>
							</>
						)}

						<IconButton
							color={showNewFamilyMember ? "error" : "warning"}
							disabled={showConfirmation}
							onClick={() => setShowNewFamilyMember(!showNewFamilyMember)}
							sx={{
								backgroundColor: "white",
								borderRadius: "50%",
							}}
						>
							{showNewFamilyMember ? <CloseIcon /> : <AddIcon />}
						</IconButton>
					</Box>
				</Box>
			</Box>

			{showConfirmation && (
				<Box
					sx={{
						display: "flex",
						padding: ".5rem",
						alignItems: "center",
						justifyContent: "space-between",
						gap: 2,
						backgroundColor: "white",
						border: 1,
						borderColor: colors.border,
						borderRadius: ".5rem",
						flexDirection: { xs: "column", sm: "row" },
					}}
				>
					<Typography variant="body1" color={colors.text}>
						Excluir{" "}
						{
							person.familymembers.find(
								(p) => p.peopleId === familyMemberToDelete
							)?.fullName
						}
						?
					</Typography>

					<Box
						sx={{
							display: "flex",
							gap: 2,
						}}
					>
						<Button color="primary" onClick={cancelDelete}>
							Cancelar
						</Button>

						<Button variant="contained" color="warning" onClick={confirmDelete}>
							Confirmar
						</Button>
					</Box>
				</Box>
			)}
		</Stack>
	);
}

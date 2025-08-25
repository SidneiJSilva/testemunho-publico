import {
	Box,
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

	const { people } = peopleStore();
	const { addNewFamilyMember } = usePeople();

	const handleChange = (event: SelectChangeEvent) => {
		setNewMemberFamilyId(event.target.value as string);
	};

	const handleDeleteFamilyMember = (id: number) => {
		console.log("delete", id);
	};

	const handleAddNewFamilyMember = async () => {
		const payload = {
			peopleId: person.peopleid,
			familyMemberId: parseInt(newMemberFamilyId),
		};

		await addNewFamilyMember(payload);
		setNewMemberFamilyId("");
	};

	return (
		<Stack spacing={2}>
			<Typography variant="h6" color="white">
				Família
			</Typography>

			<Box
				sx={{
					display: "flex",
					padding: ".5rem",
					gap: 2,
					backgroundColor: colors.backgroundLight,
					borderRadius: ".5rem",
					flexDirection: { xs: "column", sm: "row" },
				}}
			>
				<Box
					sx={{
						flex: "1 1 auto",
						minWidth: 0,
						display: "flex",
						flexWrap: "wrap",
						gap: 1,
						alignItems: "flex-start",
					}}
				>
					{person.familymembers &&
						person.familymembers.map((member) => (
							<Chip
								key={member.peopleId}
								size="small"
								label={member.fullName}
								onDelete={() => handleDeleteFamilyMember(member.peopleId)}
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
										onChange={handleChange}
									>
										{people.map((p) => (
											<MenuItem value={p.peopleid}>{p.fullname}</MenuItem>
										))}
									</Select>
								</FormControl>

								<IconButton
									disabled={!newMemberFamilyId}
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
		</Stack>
	);
}

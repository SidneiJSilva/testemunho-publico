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
import Chip from "@mui/material/Chip";

import { type PeopleInterface } from "@/interfaces";
import { colors } from "@/constants/colors";
import { useState } from "react";

export default function PeopleDialogFamily({
	person,
}: {
	person: PeopleInterface;
}) {
	const [newMemberFamilyId, setNewMemberFamilyId] = useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setNewMemberFamilyId(event.target.value as string);
	};

	const family = [
		{
			id: 1,
			fullName: "Joana Costa",
		},
		{
			id: 2,
			fullName: "Manuel COsta",
		},
	];

	const handleDeleteFamilyMember = (id) => {
		console.log("delete", id);
	};

	const handleAddNewFamilyMember = () => {
		console.log("novo familiar: ", newMemberFamilyId);

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
				}}
			>
				<Box sx={{ flex: 1, maxWidth: "50%" }}>
					<Box sx={{ display: "flex", gap: 1 }}>
						<FormControl fullWidth size="small">
							<InputLabel id="select-family-member">Familiar</InputLabel>

							<Select
								labelId="select-family-member"
								id="family-member-select"
								value={newMemberFamilyId}
								label="Familiar"
								onChange={handleChange}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>

						<Box
							sx={{
								backgroundColor: "white",
								borderRadius: 2,
							}}
						>
							<IconButton
								disabled={!newMemberFamilyId}
								color="success"
								onClick={handleAddNewFamilyMember}
							>
								<SaveIcon />
							</IconButton>
						</Box>
					</Box>
				</Box>

				<Box
					sx={{
						flex: 1,
						maxWidth: "50%",
						flexWrap: "wrap",
						display: "flex",
						gap: 1,
						alignItems: "flex-start",
					}}
				>
					{family.map((member) => (
						<Chip
							key={member.id}
							size="small"
							label={member.fullName}
							onDelete={() => handleDeleteFamilyMember(member.id)}
						/>
					))}
				</Box>
			</Box>
		</Stack>
	);
}

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {
	Box,
	FormControl,
	IconButton,
	InputLabel,
	OutlinedInput,
	Typography,
} from "@mui/material";

import { type PeopleInterface } from "@/interfaces";
import { colors } from "@/constants/colors";
import { useState, useEffect } from "react";

export function PeopleDialogHeader({
	person,
	onPersonChange,
}: {
	person: PeopleInterface;
	onPersonChange: (updatedPerson: PeopleInterface) => void;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState({
		firstname: person.firstname,
		lastname: person.lastname,
	});

	useEffect(() => {
		setEditedName({
			firstname: person.firstname,
			lastname: person.lastname,
		});
	}, [person]);

	const handleNameChange = (field: "firstname" | "lastname", value: string) => {
		setEditedName((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = () => {
		const newFullname = `${editedName.firstname} ${editedName.lastname}`.trim();

		onPersonChange({
			...person,
			firstname: editedName.firstname,
			lastname: editedName.lastname,
			fullname: newFullname,
		});

		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditedName({
			firstname: person.firstname,
			lastname: person.lastname,
		});

		setIsEditing(false);
	};

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			padding={2}
		>
			{isEditing ? (
				<Box display="flex" gap={1} alignItems="center">
					<FormControl variant="outlined" size="small">
						<InputLabel>Nome</InputLabel>

						<OutlinedInput
							value={editedName.firstname}
							onChange={(e) => handleNameChange("firstname", e.target.value)}
							label="Nome"
						/>
					</FormControl>

					<FormControl variant="outlined" size="small">
						<InputLabel>Apelido</InputLabel>

						<OutlinedInput
							value={editedName.lastname}
							onChange={(e) => handleNameChange("lastname", e.target.value)}
							label="Apelido"
						/>
					</FormControl>

					<IconButton onClick={handleCancel}>
						<CloseIcon sx={{ fontSize: "1.2rem", color: colors.error }} />
					</IconButton>

					<IconButton onClick={handleSave}>
						<CheckIcon sx={{ fontSize: "1.2rem", color: colors.success }} />
					</IconButton>
				</Box>
			) : (
				<Box display="flex" gap={2} alignItems="center">
					<Typography variant="h5" fontWeight="bold" color={colors.text}>
						{person.fullname}
					</Typography>

					<IconButton onClick={() => setIsEditing(true)}>
						<EditIcon sx={{ fontSize: "1.2rem", color: colors.primary }} />
					</IconButton>
				</Box>
			)}
		</Box>
	);
}

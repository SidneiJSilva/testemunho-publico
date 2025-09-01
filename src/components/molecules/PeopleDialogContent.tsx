// src/components/molecules/PeopleDialogContent.tsx

import PeopleDialogAbsences from "./PeopleDialogAbsences";
import FormControlLabel from "@mui/material/FormControlLabel";
import GenderSwitch from "@/components/atoms/inputs/GenderSwitch";
import CheckSwitch from "@/components/atoms/inputs/CheckSwitch";
import Checkbox from "@mui/material/Checkbox";
import { Box, Stack, Typography } from "@mui/material";

import { type PeopleInterface, type PeopleAvailability } from "@/interfaces";
import { colors } from "@/constants/colors";
import "dayjs/locale/pt-br";
import PeopleDialogFamily from "./PeopleDialogFamily";

export function PeopleDialogContent({
	person,
	onPersonChange,
}: {
	person: PeopleInterface;
	onPersonChange: (updatedPerson: PeopleInterface) => void;
}) {
	const handleSwitchChange = (
		field: keyof PeopleInterface,
		isChecked: boolean
	) => {
		onPersonChange({ ...person, [field]: isChecked });
	};

	const handleGenderChange = (isChecked: boolean) => {
		onPersonChange({ ...person, gender: isChecked ? "female" : "male" });
	};

	const handleAvailabilityChange = (
		field: keyof PeopleAvailability,
		isChecked: boolean
	) => {
		onPersonChange({
			...person,
			availability: {
				...person.availability,
				[field]: isChecked,
			},
		});
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gap: "1rem",
				}}
			>
				<FormControlLabel
					control={
						<GenderSwitch
							checked={person.gender === "female"}
							onChange={(e) => handleGenderChange(e.target.checked)}
						/>
					}
					label="Gênero"
					sx={{ color: colors.text }}
				/>
				<FormControlLabel
					control={
						<CheckSwitch
							checked={person.tpapproved}
							onChange={(e) =>
								handleSwitchChange("tpapproved", e.target.checked)
							}
						/>
					}
					label="TP Aprovado"
					sx={{ color: colors.text }}
				/>
				<FormControlLabel
					control={
						<CheckSwitch
							checked={person.techskills}
							onChange={(e) =>
								handleSwitchChange("techskills", e.target.checked)
							}
						/>
					}
					label="Tecnologia"
					sx={{ color: colors.text }}
				/>
				<FormControlLabel
					control={
						<CheckSwitch
							checked={person.regularpionner}
							onChange={(e) =>
								handleSwitchChange("regularpionner", e.target.checked)
							}
						/>
					}
					label="Pioneiro"
					sx={{ color: colors.text }}
				/>
				<FormControlLabel
					control={
						<CheckSwitch
							checked={person.active}
							onChange={(e) => handleSwitchChange("active", e.target.checked)}
						/>
					}
					label="Ativo"
					sx={{ color: colors.text }}
				/>
			</Box>

			{person.tpapproved && (
				<Stack spacing={2}>
					<Typography variant="h6" color={colors.textSubtitles}>
						Disponibilidade
					</Typography>

					<Box
						sx={{
							display: "grid",
							gridTemplateRows: "repeat(4, 1fr)",
							gridAutoFlow: "column",
							columnGap: "1rem",
							rowGap: 0,
							padding: ".5rem",
							border: 1,
							borderColor: colors.border,
							borderRadius: ".5rem",
							backgroundColor: "white",
						}}
					>
						{/* MONDAY */}
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: "1rem",
								alignItems: "center",
							}}
						>
							<Typography variant="body1" fontWeight={700} color={colors.text}>
								Segunda
							</Typography>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.mondaymorning}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"mondaymorning",
												e.target.checked
											)
										}
									/>
								}
								label="Manhã"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.mondayafternoon}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"mondayafternoon",
												e.target.checked
											)
										}
									/>
								}
								label="Tarde"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
						</Box>

						{/* TUESDAY */}
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: "1rem",
								alignItems: "center",
							}}
						>
							<Typography variant="body1" fontWeight={700} color={colors.text}>
								Terça
							</Typography>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.tuesdaymorning}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"tuesdaymorning",
												e.target.checked
											)
										}
									/>
								}
								label="Manhã"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.tuesdayafternoon}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"tuesdayafternoon",
												e.target.checked
											)
										}
									/>
								}
								label="Tarde"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
						</Box>

						{/* WEDNESDAY */}
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: "1rem",
								alignItems: "center",
							}}
						>
							<Typography variant="body1" fontWeight={700} color={colors.text}>
								Quarta
							</Typography>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.wednesdaymorning}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"wednesdaymorning",
												e.target.checked
											)
										}
									/>
								}
								label="Manhã"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.wednesdayafternoon}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"wednesdayafternoon",
												e.target.checked
											)
										}
									/>
								}
								label="Tarde"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
						</Box>

						{/* THURSDAY */}
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: "1rem",
								alignItems: "center",
							}}
						>
							<Typography variant="body1" fontWeight={700} color={colors.text}>
								Quinta
							</Typography>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.thursdaymorning}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"thursdaymorning",
												e.target.checked
											)
										}
									/>
								}
								label="Manhã"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.thursdayafternoon}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"thursdayafternoon",
												e.target.checked
											)
										}
									/>
								}
								label="Tarde"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
						</Box>

						{/* FRIDAY */}
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: "1rem",
								alignItems: "center",
							}}
						>
							<Typography variant="body1" fontWeight={700} color={colors.text}>
								Sexta
							</Typography>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.fridaymorning}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"fridaymorning",
												e.target.checked
											)
										}
									/>
								}
								label="Manhã"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.fridayafternoon}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"fridayafternoon",
												e.target.checked
											)
										}
									/>
								}
								label="Tarde"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
						</Box>

						{/* SATURDAY */}
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: "1rem",
								alignItems: "center",
							}}
						>
							<Typography variant="body1" fontWeight={700} color={colors.text}>
								Sábado
							</Typography>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.saturdaymorning}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"saturdaymorning",
												e.target.checked
											)
										}
									/>
								}
								label="Manhã"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.saturdayafternoon}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"saturdayafternoon",
												e.target.checked
											)
										}
									/>
								}
								label="Tarde"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
						</Box>

						{/* SUNDAY */}
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: "1rem",
								alignItems: "center",
							}}
						>
							<Typography variant="body1" fontWeight={700} color={colors.text}>
								Domingo
							</Typography>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.sundaymorning}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"sundaymorning",
												e.target.checked
											)
										}
									/>
								}
								label="Manhã"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={person.availability.sundayafternoon}
										sx={{ "&.Mui-checked": { color: colors.primary } }}
										onChange={(e) =>
											handleAvailabilityChange(
												"sundayafternoon",
												e.target.checked
											)
										}
									/>
								}
								label="Tarde"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "0.75rem",
										color: colors.text,
									},
								}}
							/>
						</Box>
					</Box>

					<PeopleDialogFamily person={person} />

					<PeopleDialogAbsences person={person} />
				</Stack>
			)}
		</Box>
	);
}

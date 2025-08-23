import FormControlLabel from "@mui/material/FormControlLabel";
import GenderSwitch from "@/components/atoms/inputs/GenderSwitch";
import CheckSwitch from "@/components/atoms/inputs/CheckSwitch";
import Checkbox from "@mui/material/Checkbox";
import { Box, Stack, Typography } from "@mui/material";

import { useState } from "react";
import { type PeopleInterface } from "@/interfaces";

export function PeopleDialogContent({ person }: { person: PeopleInterface }) {
	const [isFemale, setIsFemale] = useState(person.gender === "female");
	const [isTPApproved, setIsTPApproved] = useState(person.tpapproved);
	const [isTechSkilled, setIsTechSkilled] = useState(person.techskills);
	const [isPionner, setIsPionner] = useState(person.regularpionner);
	const [mondayMorning, setMondayMorning] = useState(person.mondaymorning);
	const [mondayAfternoon, setMondayAfernoon] = useState(person.mondayafternoon);
	const [tuesdayMorning, setTuesdayMorning] = useState(person.tuesdaymorning);
	const [tuesdayAfternoon, setTuesdayAfternoon] = useState(
		person.tuesdayafternoon
	);
	const [wednesdayMorning, setWednesdayMorning] = useState(
		person.wednesdaymorning
	);
	const [wednesdayAfternoon, setWednesdayAfternoon] = useState(
		person.wednesdayafternoon
	);
	const [thursdayMorning, setThursdayMorning] = useState(
		person.thursdaymorning
	);
	const [thursdayAfternoon, setThursdayAfternoon] = useState(
		person.thursdayafternoon
	);
	const [fridayMorning, setFridayMorning] = useState(person.fridaymorning);
	const [fridayAfternoon, setFridayAfternoon] = useState(
		person.fridayafternoon
	);
	const [saturdayMorning, setSaturdayMorning] = useState(
		person.saturdaymorning
	);
	const [saturdayAfternoon, setSaturdayAfternoon] = useState(
		person.saturdayafternoon
	);
	const [sundayMorning, setSundayMorning] = useState(person.sundaymorning);
	const [sundayAfternoon, setSundayAfternoon] = useState(
		person.sundayafternoon
	);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 4,
			}}
		>
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
							checked={isFemale}
							onChange={(e) => setIsFemale(e.target.checked)}
						/>
					}
					label="Gênero"
					sx={{
						color: "white",
					}}
				/>

				<FormControlLabel
					control={
						<CheckSwitch
							checked={isTPApproved}
							onChange={(e) => setIsTPApproved(e.target.checked)}
						/>
					}
					label="TP Aprovado"
					sx={{ color: "white" }}
				/>

				<FormControlLabel
					control={
						<CheckSwitch
							checked={isTechSkilled}
							onChange={(e) => setIsTechSkilled(e.target.checked)}
						/>
					}
					label="Tecnologia"
					sx={{ color: "white" }}
				/>

				<FormControlLabel
					control={
						<CheckSwitch
							checked={isPionner}
							onChange={(e) => setIsPionner(e.target.checked)}
						/>
					}
					label="Pioneiro"
					sx={{ color: "white" }}
				/>
			</Box>

			<Stack spacing={2}>
				<Typography variant="h6" color="white">
					Disponibilidade
				</Typography>

				<Box
					sx={{
						display: "grid",
						gridTemplateRows: "repeat(4, 1fr)",
						gridAutoFlow: "column",
						columnGap: "2.5rem", // espaço só entre colunas
						rowGap: 0,
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
						<Typography variant="body1" color="white">
							Segunda
						</Typography>

						<FormControlLabel
							control={
								<Checkbox
									checked={mondayMorning}
									color="warning"
									onChange={(e) => setMondayMorning(e.target.checked)}
								/>
							}
							label="Manhã"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
								},
							}}
						/>

						<FormControlLabel
							control={
								<Checkbox
									checked={mondayAfternoon}
									color="warning"
									onChange={(e) => setMondayAfernoon(e.target.checked)}
								/>
							}
							label="Tarde"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
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
						<Typography variant="body1" color="white">
							Terça
						</Typography>

						<FormControlLabel
							control={
								<Checkbox
									checked={tuesdayMorning}
									color="warning"
									onChange={(e) => setTuesdayMorning(e.target.checked)}
								/>
							}
							label="Manhã"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
								},
							}}
						/>

						<FormControlLabel
							control={
								<Checkbox
									checked={tuesdayAfternoon}
									color="warning"
									onChange={(e) => setTuesdayAfternoon(e.target.checked)}
								/>
							}
							label="Tarde"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
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
						<Typography variant="body1" color="white">
							Quarta
						</Typography>

						<FormControlLabel
							control={
								<Checkbox
									checked={wednesdayMorning}
									color="warning"
									onChange={(e) => setWednesdayMorning(e.target.checked)}
								/>
							}
							label="Manhã"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
								},
							}}
						/>

						<FormControlLabel
							control={
								<Checkbox
									checked={wednesdayAfternoon}
									color="warning"
									onChange={(e) => setWednesdayAfternoon(e.target.checked)}
								/>
							}
							label="Tarde"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
								},
							}}
						/>
					</Box>

					{/* QUINTA */}
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "repeat(3, 1fr)",
							gap: "1rem",
							alignItems: "center",
						}}
					>
						<Typography variant="body1" color="white">
							Quinta
						</Typography>

						<FormControlLabel
							control={
								<Checkbox
									checked={thursdayMorning}
									color="warning"
									onChange={(e) => setThursdayMorning(e.target.checked)}
								/>
							}
							label="Manhã"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
								},
							}}
						/>

						<FormControlLabel
							control={
								<Checkbox
									checked={thursdayAfternoon}
									color="warning"
									onChange={(e) => setThursdayAfternoon(e.target.checked)}
								/>
							}
							label="Tarde"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
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
						<Typography variant="body1" color="white">
							Sexta
						</Typography>

						<FormControlLabel
							control={
								<Checkbox
									checked={fridayMorning}
									color="warning"
									onChange={(e) => setFridayMorning(e.target.checked)}
								/>
							}
							label="Manhã"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
								},
							}}
						/>

						<FormControlLabel
							control={
								<Checkbox
									checked={fridayAfternoon}
									color="warning"
									onChange={(e) => setFridayAfternoon(e.target.checked)}
								/>
							}
							label="Tarde"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
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
						<Typography variant="body1" color="white">
							Sábado
						</Typography>

						<FormControlLabel
							control={
								<Checkbox
									checked={saturdayMorning}
									color="warning"
									onChange={(e) => setSaturdayMorning(e.target.checked)}
								/>
							}
							label="Manhã"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
								},
							}}
						/>

						<FormControlLabel
							control={
								<Checkbox
									checked={saturdayAfternoon}
									color="warning"
									onChange={(e) => setSaturdayAfternoon(e.target.checked)}
								/>
							}
							label="Tarde"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
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
						<Typography variant="body1" color="white">
							Domingo
						</Typography>

						<FormControlLabel
							control={
								<Checkbox
									checked={sundayMorning}
									color="warning"
									onChange={(e) => setSundayMorning(e.target.checked)}
								/>
							}
							label="Manhã"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
								},
							}}
						/>

						<FormControlLabel
							control={
								<Checkbox
									checked={sundayAfternoon}
									color="warning"
									onChange={(e) => setSundayAfternoon(e.target.checked)}
								/>
							}
							label="Tarde"
							sx={{
								"& .MuiFormControlLabel-label": {
									fontSize: "0.75rem",
									color: "white",
								},
							}}
						/>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
}

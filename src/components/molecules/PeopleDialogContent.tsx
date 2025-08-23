import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import GenderSwitch from "@/components/atoms/inputs/GenderSwitch";
import CheckSwitch from "@/components/atoms/inputs/CheckSwitch";
import Checkbox from "@mui/material/Checkbox";
import UpdateIcon from "@mui/icons-material/Update";
import HistoryIcon from "@mui/icons-material/History";
import { Box, Stack, Typography } from "@mui/material";

import { useState } from "react";
import { type PeopleInterface } from "@/interfaces";
import { colors } from "@/constants/colors";
import { formatDate } from "@/utils/dates";

export function PeopleDialogContent({ person }: { person: PeopleInterface }) {
	const { availability } = person;

	const [isFemale, setIsFemale] = useState(person.gender === "female");
	const [isTPApproved, setIsTPApproved] = useState(person.tpapproved);
	const [isTechSkilled, setIsTechSkilled] = useState(person.techskills);
	const [isPionner, setIsPionner] = useState(person.regularpionner);
	const [mondayMorning, setMondayMorning] = useState(
		availability.mondaymorning
	);
	const [mondayAfternoon, setMondayAfernoon] = useState(
		availability.mondayafternoon
	);
	const [tuesdayMorning, setTuesdayMorning] = useState(
		availability.tuesdaymorning
	);
	const [tuesdayAfternoon, setTuesdayAfternoon] = useState(
		availability.tuesdayafternoon
	);
	const [wednesdayMorning, setWednesdayMorning] = useState(
		availability.wednesdaymorning
	);
	const [wednesdayAfternoon, setWednesdayAfternoon] = useState(
		availability.wednesdayafternoon
	);
	const [thursdayMorning, setThursdayMorning] = useState(
		availability.thursdaymorning
	);
	const [thursdayAfternoon, setThursdayAfternoon] = useState(
		availability.thursdayafternoon
	);
	const [fridayMorning, setFridayMorning] = useState(
		availability.fridaymorning
	);
	const [fridayAfternoon, setFridayAfternoon] = useState(
		availability.fridayafternoon
	);
	const [saturdayMorning, setSaturdayMorning] = useState(
		availability.saturdaymorning
	);
	const [saturdayAfternoon, setSaturdayAfternoon] = useState(
		availability.saturdayafternoon
	);
	const [sundayMorning, setSundayMorning] = useState(
		availability.sundaymorning
	);
	const [sundayAfternoon, setSundayAfternoon] = useState(
		availability.sundayafternoon
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

			{isTPApproved && (
				<Stack spacing={2}>
					<Typography variant="h6" color="white">
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
							backgroundColor: colors.backgroundLight,
							borderRadius: ".5rem",
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
										checked={mondayMorning}
										color="success"
										onChange={(e) => setMondayMorning(e.target.checked)}
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
										checked={mondayAfternoon}
										color="success"
										onChange={(e) => setMondayAfernoon(e.target.checked)}
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
										checked={tuesdayMorning}
										color="success"
										onChange={(e) => setTuesdayMorning(e.target.checked)}
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
										checked={tuesdayAfternoon}
										color="success"
										onChange={(e) => setTuesdayAfternoon(e.target.checked)}
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
										checked={wednesdayMorning}
										color="success"
										onChange={(e) => setWednesdayMorning(e.target.checked)}
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
										checked={wednesdayAfternoon}
										color="success"
										onChange={(e) => setWednesdayAfternoon(e.target.checked)}
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

						{/* QUINTA */}
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
										checked={thursdayMorning}
										color="success"
										onChange={(e) => setThursdayMorning(e.target.checked)}
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
										checked={thursdayAfternoon}
										color="success"
										onChange={(e) => setThursdayAfternoon(e.target.checked)}
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
										checked={fridayMorning}
										color="success"
										onChange={(e) => setFridayMorning(e.target.checked)}
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
										checked={fridayAfternoon}
										color="success"
										onChange={(e) => setFridayAfternoon(e.target.checked)}
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
										checked={saturdayMorning}
										color="success"
										onChange={(e) => setSaturdayMorning(e.target.checked)}
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
										checked={saturdayAfternoon}
										color="success"
										onChange={(e) => setSaturdayAfternoon(e.target.checked)}
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
										checked={sundayMorning}
										color="success"
										onChange={(e) => setSundayMorning(e.target.checked)}
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
										checked={sundayAfternoon}
										color="success"
										onChange={(e) => setSundayAfternoon(e.target.checked)}
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

					<Typography variant="h6" color="white">
						Ausências
					</Typography>

					<Box
						sx={{
							display: "grid",
							// 1. Mude para 3 colunas. "auto" faz a coluna do ícone se ajustar ao conteúdo.
							gridTemplateColumns: "1fr 1fr auto",
							alignItems: "center", // Alinha os itens verticalmente
							gap: "0.5rem", // Adiciona um espaçamento entre as colunas
							padding: ".5rem",
							backgroundColor: colors.backgroundLight,
							borderRadius: ".5rem",
						}}
					>
						<Typography variant="caption" fontWeight={700} color={colors.text}>
							Início
						</Typography>

						<Typography variant="caption" fontWeight={700} color={colors.text}>
							Fim
						</Typography>

						<Typography variant="caption" fontWeight={700} color={colors.text}>
							Status
						</Typography>

						{person.absences?.length > 0 ? (
							person.absences.map((absence) => (
								<React.Fragment key={absence.id}>
									<Typography
										variant="body1"
										fontWeight={700}
										color={absence.active ? colors.text : colors.box5}
									>
										{formatDate(absence.startdate)}
									</Typography>

									<Typography
										variant="body1"
										fontWeight={700}
										color={absence.active ? colors.text : colors.box5}
									>
										{formatDate(absence.enddate)}
									</Typography>

									<Box sx={{ display: "flex", justifyContent: "center" }}>
										{absence.active ? (
											<UpdateIcon sx={{ color: colors.text }} />
										) : (
											<HistoryIcon sx={{ color: colors.box5 }} />
										)}
									</Box>
								</React.Fragment>
							))
						) : (
							<Typography
								variant="body1"
								fontWeight={700}
								color={colors.text}
								sx={{ gridColumn: "1 / 4", textAlign: "center" }}
							>
								Sem ausências
							</Typography>
						)}
					</Box>
				</Stack>
			)}
		</Box>
	);
}

import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import GenderSwitch from "@/components/atoms/inputs/GenderSwitch";
import CheckSwitch from "@/components/atoms/inputs/CheckSwitch";
import Checkbox from "@mui/material/Checkbox";
import UpdateIcon from "@mui/icons-material/Update";
import HistoryIcon from "@mui/icons-material/History";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Stack, Typography } from "@mui/material";

import { usePeople } from "@/hooks";
import { useState } from "react";
import { type PeopleInterface } from "@/interfaces";
import { colors } from "@/constants/colors";
import { formatDate } from "@/utils/dates";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

export function PeopleDialogContent({ person }: { person: PeopleInterface }) {
	const { availability } = person;
	const { addNewAbsence } = usePeople();

	// Constants
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
	const [newStartDate, setNewStartDate] = useState<Dayjs | null>(dayjs());
	const [newEndDate, setNewEndDate] = useState<Dayjs | null>(dayjs());
	const [showNewAbsence, setShowNewAbsence] = useState(false);

	// Functions
	const handleClickAbsence = async () => {
		let startDate = "";
		let endDate = "";

		if (newStartDate) {
			startDate = new Date(newStartDate.toString()).toISOString();
		}

		if (newEndDate) {
			endDate = new Date(newEndDate.toString()).toISOString();
		}

		const payload = {
			peopleId: person.peopleid,
			startDate: startDate,
			endDate: endDate,
		};

		await addNewAbsence(payload);

		setShowNewAbsence(false);
		setNewStartDate(dayjs());
		setNewEndDate(dayjs());
	};

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

					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography variant="h6" color="white">
							Ausências
						</Typography>

						{!showNewAbsence && (
							<Box
								sx={{
									backgroundColor: "white",
									borderRadius: 100,
								}}
							>
								<IconButton
									color="warning"
									onClick={() => setShowNewAbsence(true)}
								>
									<AddIcon />
								</IconButton>
							</Box>
						)}
					</Box>

					{showNewAbsence && (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								padding: ".5rem",
								paddingTop: ".75rem",
								backgroundColor: colors.backgroundLight,
								borderRadius: ".5rem",
							}}
						>
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								adapterLocale="pt-br"
							>
								<DatePicker
									label="Data inicial"
									format="DD/MM/YYYY"
									minDate={dayjs()}
									slotProps={{
										textField: { size: "small" },
									}}
									value={newStartDate}
									onChange={(newValue) => {
										setNewStartDate(newValue);
										setNewEndDate(newValue);
									}}
								/>
							</LocalizationProvider>

							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								adapterLocale="pt-br"
							>
								<DatePicker
									label="Data final"
									format="DD/MM/YYYY"
									minDate={newStartDate || dayjs()}
									slotProps={{
										textField: { size: "small" },
									}}
									value={newEndDate}
									onChange={(newValue) => setNewEndDate(newValue)}
								/>
							</LocalizationProvider>

							<Box
								sx={{
									backgroundColor: "white",
									borderRadius: 2,
								}}
							>
								<IconButton
									color="error"
									onClick={() => setShowNewAbsence(false)}
								>
									<CloseIcon />
								</IconButton>
							</Box>

							<Box
								sx={{
									backgroundColor: "white",
									borderRadius: 2,
								}}
							>
								<IconButton color="success" onClick={handleClickAbsence}>
									<SaveIcon />
								</IconButton>
							</Box>
						</Box>
					)}

					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr auto",
							alignItems: "center",
							gap: "0.5rem",
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

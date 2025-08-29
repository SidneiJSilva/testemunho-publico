import React from "react";
import UpdateIcon from "@mui/icons-material/Update";
import HistoryIcon from "@mui/icons-material/History";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, Typography } from "@mui/material";

import { usePeople } from "@/hooks";
import { useState } from "react";
import { type PeopleInterface } from "@/interfaces";
import { colors } from "@/constants/colors";
import { formatDate } from "@/utils/dates";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

export default function PeopleDialogAbsences({
	person,
}: {
	person: PeopleInterface;
}) {
	const { addNewAbsence, removeAbsence } = usePeople();

	const [showNewAbsence, setShowNewAbsence] = useState<boolean>(false);
	const [newStartDate, setNewStartDate] = useState<Dayjs | null>(dayjs());
	const [newEndDate, setNewEndDate] = useState<Dayjs | null>(dayjs());
	const [showDeleteConfirmation, setShowDeleteConfirmation] =
		useState<boolean>(false);
	const [absenceToDeleteId, setAbsenceToDeleteId] = useState<number | null>(
		null
	);

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

	const cancelDelete = () => {
		setAbsenceToDeleteId(null);
		setShowDeleteConfirmation(false);
	};

	const handleDeleteClick = (absenceId: number) => {
		setShowDeleteConfirmation(true);
		setAbsenceToDeleteId(absenceId);
	};

	const confirmDelete = async () => {
		if (absenceToDeleteId) {
			await removeAbsence(absenceToDeleteId);
		}

		setAbsenceToDeleteId(null);
		setShowDeleteConfirmation(false);
	};

	return (
		<>
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Typography variant="h6" color={colors.textSubtitles}>
					Ausências
				</Typography>

				{!showNewAbsence && (
					<Box
						sx={{
							backgroundColor: "white",
							borderRadius: 100,
							marginRight: ".4rem",
						}}
					>
						<IconButton color="warning" onClick={() => setShowNewAbsence(true)}>
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
						backgroundColor: "white",
						border: 1,
						borderColor: colors.border,
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
						<IconButton color="success" onClick={handleClickAbsence}>
							<SaveIcon />
						</IconButton>
					</Box>

					<Box
						sx={{
							backgroundColor: "white",
							borderRadius: 2,
						}}
					>
						<IconButton color="error" onClick={() => setShowNewAbsence(false)}>
							<CloseIcon />
						</IconButton>
					</Box>
				</Box>
			)}

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr auto auto",
					alignItems: "center",
					gap: "0.5rem",
					padding: ".5rem",
					backgroundColor: "white",
					border: 1,
					borderColor: colors.border,
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

				<Typography variant="caption" fontWeight={700} color={colors.text}>
					Actions
				</Typography>

				{person.absences?.length > 0 ? (
					person.absences.map((absence) => (
						<React.Fragment key={absence.id}>
							<Typography
								variant="body1"
								fontWeight={700}
								sx={{
									backgroundColor:
										absence.id === absenceToDeleteId ? colors.secondary : "",
									color:
										absence.id === absenceToDeleteId
											? colors.primary
											: absence.active
											? colors.text
											: colors.box5,
								}}
							>
								{formatDate(absence.startdate)}
							</Typography>

							<Typography
								variant="body1"
								fontWeight={700}
								sx={{
									backgroundColor:
										absence.id === absenceToDeleteId ? colors.secondary : "",
									color:
										absence.id === absenceToDeleteId
											? colors.primary
											: absence.active
											? colors.text
											: colors.box5,
								}}
							>
								{formatDate(absence.enddate)}
							</Typography>

							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									backgroundColor:
										absence.id === absenceToDeleteId ? colors.secondary : "",
								}}
							>
								{absence.active ? (
									<UpdateIcon sx={{ color: colors.text }} />
								) : (
									<HistoryIcon sx={{ color: colors.box5 }} />
								)}
							</Box>

							<Box sx={{ display: "flex", justifyContent: "center" }}>
								{absence.active ? (
									<IconButton
										disabled={showDeleteConfirmation}
										size="small"
										color="error"
										sx={{ cursor: "pointer", padding: 0 }}
									>
										<DeleteIcon onClick={() => handleDeleteClick(absence.id)} />
									</IconButton>
								) : (
									"-"
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

			{showDeleteConfirmation && (
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
						Confirma?
					</Typography>

					<Box
						sx={{
							display: "flex",
							gap: 2,
						}}
					>
						<Button color="primary" size="small" onClick={cancelDelete}>
							Cancelar
						</Button>

						<Button
							variant="contained"
							color="warning"
							size="small"
							onClick={confirmDelete}
						>
							Confirmar
						</Button>
					</Box>
				</Box>
			)}
		</>
	);
}
